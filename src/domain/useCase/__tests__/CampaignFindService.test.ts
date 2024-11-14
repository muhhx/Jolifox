import { ICampaignFindRepository } from "../interfaces";
import { CampaignFindService } from "../CampaignFindService";
import { Campaign } from "../../entity";
import { ResourceNotFoundError } from "../../../node";

describe("CampaignFindService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should find an existing campaign by id", async () => {
    const campaignId = 1;
    const existingCampaign = { pageId: "pageId" };
    const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = { findById: jest.fn() };
    const campaignFindService = new CampaignFindService(campaignFindRepository);

    campaignFindRepository.findById.mockResolvedValue(existingCampaign as Campaign);

    const result = await campaignFindService.handle(campaignId);

    expect(result).toBe(existingCampaign);
    expect(campaignFindRepository.findById).toHaveBeenCalledWith(campaignId);
  });

  it("should throw ResourceNotFoundError if campaign is not found", async () => {
    const campaignId = 1;
    const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = { findById: jest.fn() };
    const campaignFindService = new CampaignFindService(campaignFindRepository);

    campaignFindRepository.findById.mockResolvedValueOnce(null);

    await expect(campaignFindService.handle(campaignId)).rejects.toThrow(ResourceNotFoundError);
    expect(campaignFindRepository.findById).toHaveBeenCalledWith(campaignId);
  });
});
