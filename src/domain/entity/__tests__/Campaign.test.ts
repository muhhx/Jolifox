import { ValidationError } from "../../../node";
import { Campaign } from "../Campaign";

describe("Campaign", () => {
  it("should create a Campaign instance with valid payload", () => {
    const payload = {
      id: 1,
      pageId: "page_123",
      description: "Campaign description",
      language: { color: "blue", name: "English" },
      icon: "✨",
      plannedDate: { start: new Date("2023-01-01") },
      images: [{ name: "image1", url: "https://example.com/image1.png" }],
    };

    const campaign = new Campaign(payload);
    expect(campaign).toBeInstanceOf(Campaign);
    expect(campaign.icon).toBe("✨");
  });

  it("should throw ValidationError if payload is empty", () => {
    expect(() => new Campaign({})).toThrow(ValidationError);
    expect(() => new Campaign({})).toThrow("[Rule by me] Campaign must contain at least one property.");
  });

  it("should throw ValidationError if language color is not allowed", () => {
    const payload = {
      language: { color: "invalid_color", name: "English" },
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign language color provided not allowed.");
  });

  it("should throw ValidationError if plannedDate end is before start", () => {
    const payload = {
      plannedDate: {
        start: new Date("2023-01-02"),
        end: new Date("2023-01-01"),
      },
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign plannedDate end date must come after the start date.");
  });

  it("should throw ValidationError if images array exceeds 100 items", () => {
    const payload = {
      images: Array(101).fill({
        name: "image",
        url: "https://example.com/image.png",
      }),
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign must have a maximum of 100 images.");
  });

  it("should throw ValidationError if any image URL exceeds 2000 characters", () => {
    const longUrl = "https://example.com/" + "a".repeat(2000);
    const payload = {
      images: [{ name: "long_url_image", url: longUrl }],
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Image URL cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if cover URL exceeds 2000 characters", () => {
    const longUrl = "https://example.com/" + "a".repeat(2000);
    const payload = {
      cover: longUrl,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign cover URL cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if icon is not allowed", () => {
    const payload = {
      icon: "❌",
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign icon provided is not allowed.");
  });

  it("should throw ValidationError if company text field exceeds 2000 characters", () => {
    const longText = "a".repeat(2001);
    const payload = {
      company: longText,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if campaign text field exceeds 2000 characters", () => {
    const longText = "a".repeat(2001);
    const payload = {
      campaign: longText,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if where text field exceeds 2000 characters", () => {
    const longText = "a".repeat(2001);
    const payload = {
      where: longText,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if description text field exceeds 2000 characters", () => {
    const longText = "a".repeat(2001);
    const payload = {
      description: longText,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if content text field exceeds 2000 characters", () => {
    const longText = "a".repeat(2001);
    const payload = {
      content: longText,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
  });

  it("should throw ValidationError if imageContent text field exceeds 2000 characters", () => {
    const longText = "a".repeat(2001);
    const payload = {
      imageContent: longText,
    };

    expect(() => new Campaign(payload)).toThrow(ValidationError);
    expect(() => new Campaign(payload)).toThrow("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
  });

  it("should use default icon if not provided in payload", () => {
    const payload = {
      id: 1,
      pageId: "page_123",
      language: { color: "blue", name: "English" },
    };

    const campaign = new Campaign(payload);
    expect(campaign.icon).toBe("✨");
  });
});
