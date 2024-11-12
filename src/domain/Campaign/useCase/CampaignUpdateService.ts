import { Campaign } from "../entity";
import type {
  ICampaignFindRepository,
  ICampaignUpdateRepository,
} from "./interfaces";


  /**
   * Controller:
   * 1. Error if no Campaign ID or payload provided
   * 2. Validate fields (type and if exists)
   * 3. Created DTO to make sure there is no aditional fields
   */

export class CampaignUpdateService {
  constructor(
    private readonly campaignFindRepository: ICampaignFindRepository,
    private readonly campaignUpdateRepository: ICampaignUpdateRepository
  ) {}

  async handle(campaignId: string, payload: Partial<Omit<Campaign, 'id' | 'createdTime' | 'toObject'>>): Promise<Campaign> {
    // 1. Verifies if campaignId exists in database.
    const existingCampaign = await this.campaignFindRepository.findById(+campaignId);

    if (!existingCampaign) throw new Error("Campaign ID not found.");

    // 2. If it does, updates the Domain model and validates.
    const updatedCampaign = new Campaign({ ...existingCampaign, ...payload });
    // console.log("Payload...", payload);
    console.log("Existing Campaign...", existingCampaign);
    console.log("Updated Campaign...", updatedCampaign);

    // 3. Persist data in the database
    await this.campaignUpdateRepository.update(campaignId, updatedCampaign);

    // 4. Return the updated model.
    return updatedCampaign;
  }
}
