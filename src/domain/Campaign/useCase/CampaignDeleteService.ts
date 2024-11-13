import type { ICampaignDeleteRepository, ICampaignFindRepository } from "./interfaces";

export class CampaignDeleteService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignDeleteRepository: ICampaignDeleteRepository
  ) {}

  async handle(campaignId: number): Promise<void> {
    const existingCampaign = await this.campaignFindRepository.findById(campaignId);

    if (!existingCampaign?.pageId) throw new Error("Campaign ID not found.");

    await this.campaignDeleteRepository.delete(existingCampaign.pageId);

    return;
  }
}
