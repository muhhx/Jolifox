import type { ICampaignDeleteRepository } from "../../domain/useCase";
import { client } from "../database/Notion";

export class CampaignDeleteRepository implements ICampaignDeleteRepository {
  async delete(campaignId: string): Promise<void> {
    await client.deletePage({ page_id: campaignId });
  }
}
