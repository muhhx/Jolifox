import { Campaign, PlannedDate, Image, Language } from "../entity";
import type { ICampaignFindRepository, ICampaignUpdateRepository } from "./interfaces";

export class CampaignUpdateService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignUpdateRepository: ICampaignUpdateRepository
  ) {}

  async handle(campaignId: number, payload: Partial<Omit<Campaign, 'id' | 'createdTime' | 'toObject'>>): Promise<Campaign> {
    const existingCampaign = await this.campaignFindRepository.findById(campaignId);

    if (!existingCampaign?.pageId) throw new Error("Campaign ID not found.");

    const campaign = new Campaign({
      ...existingCampaign,
      plannedDate: payload.plannedDate ? new PlannedDate(payload.plannedDate) : existingCampaign.plannedDate,
      language: payload.language ? new Language(payload.language) : existingCampaign.language,
      images: payload.images ? payload.images.map((image) => new Image(image)) : existingCampaign.images,
      ...payload,
    });

    await this.campaignUpdateRepository.update(existingCampaign.pageId, campaign);

    return campaign;
  }
}
