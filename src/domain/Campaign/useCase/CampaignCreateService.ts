import { Campaign, Image, Language, PlannedDate } from "../entity";
import type { ICampaignCreateRepository } from "./interfaces";

export class CampaignCreateService {
  constructor(
    private readonly campaignCreateRepository: ICampaignCreateRepository
  ) {}

  async handle(payload: Partial<Omit<Campaign, "id" | "createdTime" | "pageId">>): Promise<void> {
    const campaign = new Campaign({
      plannedDate: payload.plannedDate && new PlannedDate(payload.plannedDate),
      language: payload.language && new Language(payload.language),
      images: payload.images && payload.images.map((image) => new Image(image)),
      ...payload,
    });

    await this.campaignCreateRepository.create(campaign);

    return;
  }
}
