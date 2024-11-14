import type { ICampaignFindRepository, ICampaignUpdateRepository } from "./interfaces";
import { ResourceNotFoundError } from "../../node";
import { Campaign } from "../entity";

export class CampaignUpdateService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignUpdateRepository: ICampaignUpdateRepository
  ) {}

  async handle(campaignId: number, payload: Omit<Campaign, 'validatePayload'>): Promise<Campaign> {
    const existingCampaign = await this.campaignFindRepository.findById(campaignId);

    if (!existingCampaign?.pageId) throw new ResourceNotFoundError("Campaign ID not found.");

    const updatedCampaign = new Campaign({ ...existingCampaign, ...payload });

    await this.campaignUpdateRepository.update(existingCampaign.pageId, updatedCampaign);

    return updatedCampaign;
  }
}
