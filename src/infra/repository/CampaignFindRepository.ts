import type { ICampaignFindRepository } from "../../domain/useCase";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { InternalServerError } from "../../node";
import { Campaign } from "../../domain/entity";
import { client } from "../database/Notion";

export class CampaignFindRepository implements ICampaignFindRepository {
  async findById(campaignId: number): Promise<Campaign | null> {
    const campaign = await client.queryDatabase({
      filter: {
        property: "ID",
        unique_id: { equals: campaignId },
      },
    });

    if (!campaign) return null;

    return this.convertToDomainObject(campaign);
  }

  private convertToDomainObject(page: PageObjectResponse): Campaign {
    /** Os dados vindos do Notion não são necessariamente confiáveis. Por isso, é sempre feito uma validação de schema. */
    if (page.properties["Content"]?.type !== "rich_text") throw new InternalServerError("Invalid database schema.");

    if (page.properties["image content"]?.type !== "rich_text") throw new InternalServerError("Invalid database schema.");

    if (page.properties["Description"]?.type !== "rich_text") throw new InternalServerError("Invalid database schema.");

    if (page.properties["Campaign"]?.type !== "rich_text") throw new InternalServerError("Invalid database schema.");

    if (page.properties["Where"]?.type !== "rich_text") throw new InternalServerError("Invalid database schema.");

    if (page.properties["Company"]?.type !== "title") throw new InternalServerError("Invalid database schema.");

    if (page.properties["ID"]?.type !== "unique_id") throw new InternalServerError("Invalid database schema.");

    if (page.properties["PlannedDate"]?.type !== "date") throw new InternalServerError("Invalid database schema.");

    if (page.properties["Language"]?.type !== "select") throw new InternalServerError("Invalid database schema.");

    if (page.properties["Image"]?.type !== "files") throw new InternalServerError("Invalid database schema.");

    if (!page.created_time) throw new InternalServerError("Invalid database schema.");

    if (!page.id) throw new InternalServerError("Invalid database schema.");

    return new Campaign({
      id: page.properties["ID"]?.unique_id.number || undefined,
      pageId: page.id,
      campaign: page.properties["Campaign"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      company: page.properties["Company"]?.title?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      description: page.properties["Description"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      where: page.properties["Where"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      content: page.properties["Content"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      imageContent: page.properties["image content"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      createdTime: new Date(page.created_time),
      plannedDate: page.properties["PlannedDate"]?.date ? {
        start: new Date(page.properties["PlannedDate"].date.start),
        end: page.properties["PlannedDate"].date.end ? new Date(page.properties["PlannedDate"].date.end) : undefined,
      } : undefined,
      language: page.properties["Language"]?.select ? {
        name: page.properties["Language"].select.name,
        color: page.properties["Language"].select.color,
      } : undefined,
      images: page.properties["Image"].files?.flatMap((image) =>
        image.type === "external"
          ? { name: image.name, url: image.external.url }
          : image.type === "file"
          ? { name: image.name, url: image.file.url }
          : []
      ),
    });
  }
}
