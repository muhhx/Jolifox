import { ICampaignCreateRepository } from "../interfaces";
import { CampaignCreateService } from "../CampaignCreateService";
import { Campaign } from "../../entity";
import { ValidationError } from "../../../node";

describe("CampaignCreateService", () => {
    const campaignCreateRepository: ICampaignCreateRepository = {
        create: jest.fn(),
    }
    const campaignCreateService = new CampaignCreateService(campaignCreateRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should pass the Campaign instance to repository's create method", async () => {
        const payload = {
            description: "Campaign description",
            language: { color: "blue", name: "English" },
        };

        await campaignCreateService.handle(payload);
        expect(campaignCreateRepository.create).toHaveBeenCalledWith(expect.any(Campaign));
    })
    it("should throw ValidationError if Campaign payload is invalid", async () => {
        const invalidPayload = {
            language: { color: "invalid_color", name: "English" },
        };

        await expect(campaignCreateService.handle(invalidPayload)).rejects.toThrow(ValidationError);
        expect(campaignCreateRepository.create).not.toHaveBeenCalled();
    })
  });