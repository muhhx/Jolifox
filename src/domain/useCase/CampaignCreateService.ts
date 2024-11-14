import { Campaign } from "../entity";
import type { ICampaignCreateRepository } from "./interfaces";

export class CampaignCreateService {
  constructor(
    private readonly campaignCreateRepository: ICampaignCreateRepository
  ) {}

  async handle(payload: Omit<Campaign, 'validatePayload'>): Promise<void> {
    const defaultCover = `https://plus.unsplash.com/premium_photo-1730828574186-8b5c216a057f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

    const campaign = new Campaign({ ...payload, cover: defaultCover });

    await this.campaignCreateRepository.create(campaign);

    return;
  }
}
