import type { ICampaignDeleteRepository, ICampaignFindRepository } from "./interfaces";
import { ResourceNotFoundError } from "../../node";

export class CampaignDeleteService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignDeleteRepository: ICampaignDeleteRepository
  ) {}

  async handle(campaignId: number): Promise<void> {
    const existingCampaign = await this.campaignFindRepository.findById(campaignId);

    if (!existingCampaign?.pageId) throw new ResourceNotFoundError("Campaign ID not found.");

    await this.campaignDeleteRepository.delete(existingCampaign.pageId);

    return;
  }
}
