import {
  ICampaignDeleteRepository,
  ICampaignFindRepository,
} from "../interfaces";
import { CampaignDeleteService } from "../CampaignDeleteService";
import { Campaign } from "../../entity";
import { ResourceNotFoundError } from "../../../node";

describe("CampaignDeleteService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete an existing campaign by pageId", async () => {
    const campaignId = 1;
    const existingCampaign = { pageId: "pageId" };
    const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = {
      findById: jest.fn(),
    };
    const campaignDeleteRepository: jest.Mocked<ICampaignDeleteRepository> = {
      delete: jest.fn(),
    };
    const campaignDeleteService = new CampaignDeleteService(
      campaignFindRepository,
      campaignDeleteRepository
    );

    campaignFindRepository.findById.mockResolvedValue(
      existingCampaign as Campaign
    );

    await campaignDeleteService.handle(campaignId);

    expect(campaignFindRepository.findById).toHaveBeenCalledWith(campaignId);
    expect(campaignDeleteRepository.delete).toHaveBeenCalledWith(
      existingCampaign.pageId
    );
  });

  it("should throw an error if campaign is not found", async () => {
    const campaignId = 1;
    const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = {
      findById: jest.fn(),
    };
    const campaignDeleteRepository: jest.Mocked<ICampaignDeleteRepository> = {
      delete: jest.fn(),
    };
    const campaignDeleteService = new CampaignDeleteService(
      campaignFindRepository,
      campaignDeleteRepository
    );

    campaignFindRepository.findById.mockResolvedValueOnce(null);

    await expect(campaignDeleteService.handle(campaignId)).rejects.toThrow(
      ResourceNotFoundError
    );
    expect(campaignFindRepository.findById).toHaveBeenCalledWith(campaignId);
    expect(campaignDeleteRepository.delete).not.toHaveBeenCalled();
  });
});
