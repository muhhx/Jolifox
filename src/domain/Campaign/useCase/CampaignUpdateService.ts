import { Campaign } from "../entity";
import type { ICampaignFindRepository, ICampaignUpdateRepository } from "./interfaces";

export class CampaignUpdateService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignUpdateRepository: ICampaignUpdateRepository
  ) {}

  async handle(campaignId: number, payload: Omit<Campaign, 'validatePayload'>): Promise<Campaign> {
    const existingCampaign = await this.campaignFindRepository.findById(campaignId);

    if (!existingCampaign?.pageId) throw new Error("Campaign ID not found.");

    const updatedCampaign = new Campaign({ ...existingCampaign, ...payload });

    await this.campaignUpdateRepository.update(existingCampaign.pageId, updatedCampaign);

    return updatedCampaign;
  }
}
