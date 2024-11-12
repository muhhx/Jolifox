import type { ICampaignFindRepository } from "../../domain/Campaign/useCase";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { Campaign, PlannedDate, Image, Language } from "../../domain/Campaign/entity";
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

    // Espera que campo "Content" exista && que seja "rich_text".
    if (page.properties["Content"]?.type !== "rich_text") throw new Error("Content is required.");

    // Espera que campo "image content" exista && que seja "rich_text".
    if (page.properties["image content"]?.type !== "rich_text") throw new Error("image content is required.");

    // Espera que campo "Description" exista && que seja "rich_text".
    if (page.properties["Description"]?.type !== "rich_text") throw new Error("Description is required.");

    // Espera que campo "Campaign" exista && que seja "rich_text".
    if (page.properties["Campaign"]?.type !== "rich_text") throw new Error("Campaign is required.");

    // Espera que campo "Where" exista && que seja "rich_text".
    if (page.properties["Where"]?.type !== "rich_text") throw new Error("Where is required.");

    // Espera que campo "Company" exista && que seja "title".
    if (page.properties["Company"]?.type !== "title") throw new Error("Company is required.");

    // Espera que campo "ID" exista && que seja "unique_id".
    if (page.properties["ID"]?.type !== "unique_id") throw new Error("ID is required.");

    // Espera que campo "PlannedDate" exista && que seja "date".
    if (page.properties["PlannedDate"]?.type !== "date") throw new Error("PlannedDate is required.");

    // Espera que campo "Language" exista && que seja "select".
    if (page.properties["Language"]?.type !== "select") throw new Error("Language is required.");

    // Espera que campo "Image" exista && que seja "date".
    if (page.properties["Image"]?.type !== "files") throw new Error("Image is required.");

    if (!page.created_time) throw new Error("CreatedTime is required.");

    if (!page.id) throw new Error("Page ID is required.");


    return new Campaign({
      id: page.properties["ID"]?.unique_id.number || undefined,
      pageId: page.id,
      campaign: page.properties["Campaign"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      company: page.properties["Company"]?.title?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      description: page.properties["Description"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      // plannedDate: page.properties["PlannedDate"]?.date ? { 
      //   start: new Date(page.properties["PlannedDate"].date.start),
      //   end: page.properties["PlannedDate"].date.end ? new Date(page.properties["PlannedDate"].date.end) : undefined
      // } : undefined,
      plannedDate: page.properties["PlannedDate"]?.date ? new PlannedDate({ 
        start: new Date(page.properties["PlannedDate"].date.start),
        end: page.properties["PlannedDate"].date.end ? new Date(page.properties["PlannedDate"].date.end) : undefined
      }) : undefined,
      where: page.properties["Where"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      // language: page.properties["Language"]?.select ? {
      //   name: page.properties["Language"].select.name,
      //   color: page.properties["Language"].select.color
      // } : undefined,
      language: page.properties["Language"]?.select ? new Language({
        name: page.properties["Language"].select.name,
        color: page.properties["Language"].select.color
      }) : undefined,
      content: page.properties["Content"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      imageContent: page.properties["image content"]?.rich_text?.reduce((acc, item) => acc + item.plain_text, "") || undefined,
      // images: page.properties["Image"].files?.flatMap((image) => {
      //   return image.type === "external"
      //     ? { name: image.name, url: image.external.url }
      //     : image.type === "file"
      //     ? { name: image.name, url: image.file.url }
      //     : []
      // }),
      images: page.properties["Image"].files?.flatMap((image) => {
        return image.type === "external"
          ? new Image({ name: image.name, url: image.external.url })
          : image.type === "file"
          ? new Image({ name: image.name, url: image.file.url })
          : []
      }),
      createdTime: new Date(page.created_time),
    });
  }
}
