import { BadRequestError, parseResponse, StatusCode } from "../../../../node";
import { campaignDeleteController } from "../campaignDeleteController";
import { CampaignDeleteService } from "../../../../domain/useCase";

jest.mock("../../../../node", () => ({
  ...jest.requireActual("../../../../node"),
  parseResponse: jest.fn(),
}));

describe("campaignDeleteController", () => {
  let mockService: jest.Mocked<CampaignDeleteService>;
  let mockRequest: any;

  beforeEach(() => {
    mockService = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<CampaignDeleteService>;

    mockRequest = {
      params: {
        campaignId: "123",
      },
    };
  });

  it("should throw BadRequestError if campaignId is missing", async () => {
    const controller = campaignDeleteController(mockService);
    mockRequest.params.campaignId = undefined;

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("ID must be a valid number.");
  });

  it("should throw BadRequestError if campaignId is not a valid number", async () => {
    const controller = campaignDeleteController(mockService);
    mockRequest.params.campaignId = "abc"; // Invalid campaignId

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("ID must be a valid number.");
  });

  it("should call service.handle with the parsed campaignId if validation passes", async () => {
    const controller = campaignDeleteController(mockService);

    await controller(mockRequest);

    expect(mockService.handle).toHaveBeenCalledWith(123);
  });

  it("should return parsed response with StatusCode.NoContent on success", async () => {
    const controller = campaignDeleteController(mockService);

    await controller(mockRequest);

    expect(parseResponse).toHaveBeenCalledWith(undefined, StatusCode.NoContent);
  });
});
