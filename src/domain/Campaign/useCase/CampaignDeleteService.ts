import type {
  ICampaignDeleteRepository,
  ICampaignFindRepository,
} from "./interfaces";

export class CampaignDeleteService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignDeleteRepository: ICampaignDeleteRepository
  ) {}

  async handle(campaignId: string): Promise<void> {
    // 1. Verifies if campaignId exists in database.
    const existingCampaign = await this.campaignFindRepository.findById(
      +campaignId
    );

    if (!existingCampaign) throw new Error("Campaign ID not found.");

    // 2. Deletes it
    await this.campaignDeleteRepository.delete(campaignId);

    return;
  }
}
