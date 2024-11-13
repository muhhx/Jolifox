import type { ICampaignCreateRepository } from "../../domain/useCase";
import { Campaign } from "../../domain/entity";
import { client } from "../database/Notion";

export class CampaignCreateRepository implements ICampaignCreateRepository {
  async create(campaign: Campaign): Promise<void> {
    const convertedCampaign = this.convertToDatabaseSchema(campaign);

    await client.createPage({ ...convertedCampaign });

    return;
  }

  private convertToDatabaseSchema(campaign: Campaign) {
    return {
      ...(campaign.icon && {
        icon: { emoji: campaign.icon as any },
      }),
      ...(campaign.cover && {
        cover: { external: { url: campaign.cover } },
      }),
      properties: {
        ...(campaign.description && {
          Description: { rich_text: [{ text: { content: campaign.description } }] },
        }),
        ...(campaign.where && {
          Where: { rich_text: [{ text: { content: campaign.where } }] },
        }),
        ...(campaign.company && {
          Company: { title: [{ text: { content: campaign.company } }] },
        }),
        ...(campaign.content && {
          Content: { rich_text: [{ text: { content: campaign.content } }] },
        }),
        ...(campaign.campaign && {
          Campaign: { rich_text: [{ text: { content: campaign.campaign } }] },
        }),
        ...(campaign.imageContent && {
          "image content": { rich_text: [{ text: { content: campaign.imageContent } }] },
        }),
        ...(campaign.language && {
          Language: {
            select: {
              name: campaign.language.name,
              color: campaign.language.color as any,
            },
          },
        }),
        ...(campaign.images?.length && {
          Image: {
            files: campaign.images.map((image) => ({
              name: image.name,
              external: { url: image.url },
            })),
          },
        }),
        ...(campaign.plannedDate && {
          PlannedDate: {
            date: {
              start: `${campaign.plannedDate.start.getFullYear()}-${(
                campaign.plannedDate.start.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${(campaign.plannedDate.start.getDate() + 1)
                .toString()
                .padStart(2, "0")}`,
              end: campaign.plannedDate.end
                ? `${campaign.plannedDate.end.getFullYear()}-${(
                    campaign.plannedDate.end.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${(
                    campaign.plannedDate.end.getDate() + 1
                  )
                    .toString()
                    .padStart(2, "0")}`
                : undefined,
            },
          },
        }),
      },
    };
  }
}
