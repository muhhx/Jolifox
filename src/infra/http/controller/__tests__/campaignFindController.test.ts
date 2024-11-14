import { BadRequestError, parseResponse, StatusCode } from "../../../../node";
import { campaignFindController } from "../campaignFindController";
import { CampaignFindService } from "../../../../domain/useCase";
import { Campaign } from "../../../../domain/entity";

jest.mock("../../../../node", () => ({
  ...jest.requireActual("../../../../node"),
  parseResponse: jest.fn(),
}));

describe("campaignFindController", () => {
  let mockService: jest.Mocked<CampaignFindService>;
  let mockRequest: any;

  beforeEach(() => {
    mockService = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<CampaignFindService>;

    mockRequest = {
      params: {
        campaignId: "123",
      },
    };
  });

  it("should throw BadRequestError if campaignId is missing", async () => {
    const controller = campaignFindController(mockService);
    mockRequest.params.campaignId = undefined;

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("ID must be a valid number.");
  });

  it("should throw BadRequestError if campaignId is not a valid number", async () => {
    const controller = campaignFindController(mockService);
    mockRequest.params.campaignId = "abc"; // Invalid campaignId

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("ID must be a valid number.");
  });

  it("should call service.handle with the parsed campaignId if validation passes", async () => {
    const controller = campaignFindController(mockService);

    await controller(mockRequest);

    expect(mockService.handle).toHaveBeenCalledWith(123);
  });

  it("should return parsed response with StatusCode.OK on successful retrieval", async () => {
    const controller = campaignFindController(mockService);
    const mockResponse = { id: 123, name: "Sample Campaign" };
    mockService.handle.mockResolvedValue(mockResponse as unknown as Campaign);

    await controller(mockRequest);

    expect(parseResponse).toHaveBeenCalledWith(mockResponse, StatusCode.OK);
  });
});
