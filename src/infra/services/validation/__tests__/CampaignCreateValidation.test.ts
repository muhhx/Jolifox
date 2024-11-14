import { campaignCreateValidation } from "../CampaignCreateValidation";
import { BadRequestError } from "../../../../node";

describe("CampaignCreateValidation", () => {
  it("should validate a valid payload successfully", () => {
    const validPayload = {
      where: "Test Location",
      images: [{ name: "Image 1", url: "https://example.com/image1.png" }],
      company: "Test Company",
      content: "Test Content",
      campaign: "Test Campaign",
      language: { name: "English", color: "blue" },
      plannedDate: { start: "2023-01-01", end: "2023-01-31" },
      description: "Test Description",
      imageContent: "Image Content",
    };

    expect(() => campaignCreateValidation.parse(validPayload)).not.toThrow();
  });

  it("should throw error if required fields in language are missing", () => {
    const invalidPayload = {
      language: { color: "", name: "" },
    };

    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow(BadRequestError);
    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow("[language color] Cannot be an empty string.");
  });

  it("should throw error for invalid date format in plannedDate", () => {
    const invalidPayload = {
      plannedDate: { start: "01-01-2023" },
    };

    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow(BadRequestError);
    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow("[plannedDate start] Must be in the format YYYY-MM-DD.");
  });

  it("should throw error for empty string in non-required field", () => {
    const invalidPayload = { where: "" };

    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow(BadRequestError);
    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow("[where] Cannot be an empty string");
  });

  it("should throw error if images array contains empty name or url", () => {
    const invalidPayload = {
      images: [{ name: "", url: "https://example.com/image1.png" }],
    };

    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow(BadRequestError);
    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow("[image name] Cannot be an empty string.");
  });

  it("should throw error if any field is of invalid type", () => {
    const invalidPayload = {
      company: 123,
    };

    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow(BadRequestError);
    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow("[company] Must be a string.");
  });

  it("should throw error if plannedDate contains invalid end date", () => {
    const invalidPayload = {
      plannedDate: { start: "2023-01-01", end: "2023-15-01" },
    };

    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow(BadRequestError);
    expect(() => campaignCreateValidation.parse(invalidPayload)).toThrow("[plannedDate end] Date must be valid.");
  });
});
