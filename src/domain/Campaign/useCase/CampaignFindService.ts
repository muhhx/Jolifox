import type { ICampaignFindRepository } from "./interfaces";
import type { Campaign } from "../entity";

import { ResourceNotFoundError } from "../../../node";

export class CampaignFindService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository
  ) {}

  async handle(campaignId: number): Promise<Campaign> {
    const campaign = await this.campaignFindRepository.findById(campaignId);

    if (!campaign) throw new ResourceNotFoundError("Campaign Not Found.");

    return campaign;
  }
}
