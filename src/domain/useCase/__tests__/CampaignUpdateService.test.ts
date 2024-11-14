import { ICampaignFindRepository, ICampaignUpdateRepository } from "../interfaces";
import { CampaignUpdateService } from "../CampaignUpdateService";
import { ResourceNotFoundError, ValidationError } from "../../../node";
import { Campaign } from "../../entity";

// const payload = {
//     id: 1,
//     pageId: "pageId",
//     description: "oldDescription",
//     imageContent: "imageContent",
//     company: "company",
//     content: "content",
//     language: { color: "blue", name: "name" },
//     icon: "✨",
//     where: "where",
//     plannedDate: { start: new Date(), end: new Date() },
//     cover: "coverURL",
//     images: [{ name: "name", url: "url" }],
//     campaign: "campaign",
//     createdTime: new Date(),
// }

describe("CampaignUpdateService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should pass all validations and update correctly.", async () => {
        const payload = {
            pageId: "pageId",
            description: "oldDescription",
            company: "oldCompany",
        }
        const campaignMock = new Campaign(payload)
        const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = { findById: jest.fn() };
        const campaignUpdateRepository: jest.Mocked<ICampaignUpdateRepository> = { update: jest.fn() };
        const campaignUpdateService = new CampaignUpdateService(campaignFindRepository, campaignUpdateRepository);

        campaignFindRepository.findById.mockResolvedValue(campaignMock);
        
        const result = await campaignUpdateService.handle(1, { company: "newCompany" });

        expect(campaignFindRepository.findById).toHaveBeenCalledWith(1);
        expect(campaignUpdateRepository.update).toHaveBeenCalled();
        expect(result.description).toBe("oldDescription");
        expect(result.company).toBe("newCompany");
    });

    it("should throw ValidationError if Campaign payload is invalid", async () => {
        const payload = {
            pageId: "pageId",
        }
        const campaignMock = new Campaign(payload)
        const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = { findById: jest.fn() };
        const campaignUpdateRepository: jest.Mocked<ICampaignUpdateRepository> = { update: jest.fn() };
        const campaignUpdateService = new CampaignUpdateService(campaignFindRepository, campaignUpdateRepository);

        campaignFindRepository.findById.mockResolvedValue(campaignMock);

        await expect(campaignUpdateService.handle(1, { language: { color: "invalid_color", name: "name" } })).rejects.toThrow(ValidationError);
        expect(campaignFindRepository.findById).toHaveBeenCalledWith(1);
        expect(campaignUpdateRepository.update).not.toHaveBeenCalled();
    })

    it("should throw ResourceNotFoundError if campaign is not found", async () => {
        const campaignFindRepository: jest.Mocked<ICampaignFindRepository> = { findById: jest.fn() };
        const campaignUpdateRepository: jest.Mocked<ICampaignUpdateRepository> = { update: jest.fn() };
        const campaignUpdateService = new CampaignUpdateService(campaignFindRepository, campaignUpdateRepository);

        campaignFindRepository.findById.mockResolvedValue(null);

        await expect(campaignUpdateService.handle(1, { company: "newCompany" })).rejects.toThrow(ResourceNotFoundError);
        expect(campaignFindRepository.findById).toHaveBeenCalledWith(1);
        expect(campaignUpdateRepository.update).not.toHaveBeenCalled();
    })
  });