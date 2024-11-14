import { BadRequestError, parseResponse, StatusCode } from "../../../../node";
import { campaignUpdateController } from "../campaignUpdateController";
import { CampaignUpdateService } from "../../../../domain/useCase";
import { campaignUpdateValidation } from "../../../services/validation";
import { Campaign } from "../../../../domain/entity";

jest.mock("../../../../node", () => ({
  ...jest.requireActual("../../../../node"),
  parseResponse: jest.fn(),
}));

jest.mock("../../../services/validation", () => ({
  campaignUpdateValidation: {
    parse: jest.fn(),
  },
}));

describe("campaignUpdateController", () => {
  let mockService: jest.Mocked<CampaignUpdateService>;
  let mockRequest: any;

  beforeEach(() => {
    mockService = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<CampaignUpdateService>;

    mockRequest = {
      params: { campaignId: "123" },
      body: {
        where: "Location A",
        images: [{ name: "image1", url: "http://example.com/image1.jpg" }],
        company: "Company A",
        content: "Campaign Content",
      },
    };
  });

  it("should throw BadRequestError if campaignId is missing", async () => {
    const controller = campaignUpdateController(mockService);
    mockRequest.params.campaignId = undefined;

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("ID must be a valid number.");
  });

  it("should throw BadRequestError if campaignId is not a valid number", async () => {
    const controller = campaignUpdateController(mockService);
    mockRequest.params.campaignId = "abc"; // Invalid campaignId

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("ID must be a valid number.");
  });

  it("should throw BadRequestError if request body is missing", async () => {
    const controller = campaignUpdateController(mockService);
    mockRequest.body = undefined;

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("Body is required.");
  });

  it("should validate and parse the request body", async () => {
    const controller = campaignUpdateController(mockService);
    const parsedBody = { ...mockRequest.body };
    (campaignUpdateValidation.parse as jest.Mock).mockReturnValue(parsedBody);

    await controller(mockRequest);

    expect(campaignUpdateValidation.parse).toHaveBeenCalledWith(mockRequest.body);
  });

  it("should call service.handle with the parsed campaignId and body if validation passes", async () => {
    const controller = campaignUpdateController(mockService);
    const parsedBody = { ...mockRequest.body };
    (campaignUpdateValidation.parse as jest.Mock).mockReturnValue(parsedBody);

    await controller(mockRequest);

    expect(mockService.handle).toHaveBeenCalledWith(123, parsedBody);
  });

  it("should return parsed response with StatusCode.OK on successful update", async () => {
    const controller = campaignUpdateController(mockService);
    const parsedBody = { ...mockRequest.body };
    const mockResponse = { message: "Campaign updated successfully" };
    (campaignUpdateValidation.parse as jest.Mock).mockReturnValue(parsedBody);
    mockService.handle.mockResolvedValue(mockResponse as unknown as Campaign);

    await controller(mockRequest);

    expect(parseResponse).toHaveBeenCalledWith(mockResponse, StatusCode.OK);
  });
});
