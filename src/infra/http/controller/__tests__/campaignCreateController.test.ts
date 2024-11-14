import { BadRequestError, parseResponse, StatusCode } from "../../../../node";
import { campaignCreateController } from "../campaignCreateController";
import { campaignCreateValidation } from "../../../services/validation";
import { CampaignCreateService } from "../../../../domain/useCase";

jest.mock("../../../services/validation");
jest.mock("../../../../node", () => ({
  ...jest.requireActual("../../../../node"),
  parseResponse: jest.fn(),
}));

describe("campaignCreateController", () => {
  let mockService: jest.Mocked<CampaignCreateService>;
  let mockRequest: any;

  beforeEach(() => {
    mockService = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<CampaignCreateService>;

    mockRequest = {
      body: {
        where: "Test Location",
        images: [{ name: "Image 1", url: "https://example.com/image1.png" }],
        company: "Test Company",
        content: "Test Content",
        campaign: "Test Campaign",
        language: { color: "blue", name: "English" },
        plannedDate: { start: "2023-01-01", end: "2023-01-31" },
        description: "Test Description",
        imageContent: "Image Content",
      },
    };
  });

  it("should throw BadRequestError if body is missing", async () => {
    const controller = campaignCreateController(mockService);
    mockRequest.body = undefined;

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("Body is required.");
  });

  it("should throw validation error if request body is invalid", async () => {
    const controller = campaignCreateController(mockService);
    mockRequest.body = { where: "" }; // Invalid value for "where"

    (campaignCreateValidation.parse as jest.Mock).mockImplementation(() => {
      throw new BadRequestError("[where] Cannot be an empty string");
    });

    await expect(controller(mockRequest)).rejects.toThrow(BadRequestError);
    await expect(controller(mockRequest)).rejects.toThrow("[where] Cannot be an empty string");
  });

  it("should return parsed response with StatusCode.Created on success", async () => {
    const controller = campaignCreateController(mockService);

    (campaignCreateValidation.parse as jest.Mock).mockReturnValue(mockRequest.body);

    await controller(mockRequest);

    expect(parseResponse).toHaveBeenCalledWith(undefined, StatusCode.Created);
  });
});
