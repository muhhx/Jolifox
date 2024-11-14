import { CampaignFindRepository } from "../CampaignFindRepository";
import { client } from "../../database/Notion";
import { InternalServerError } from "../../../node";
import { Campaign } from "../../../domain/entity";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

jest.mock("../../database/Notion", () => ({ client: { queryDatabase: jest.fn() } }));

describe("CampaignFindRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return Campaign object when campaign is found", async () => {
    const mockCampaign = {
      id: "page_123",
      created_time: "2023-01-01T00:00:00Z",
      properties: {
        ID: { type: "unique_id", unique_id: { number: 1 } },
        Campaign: { type: "rich_text", rich_text: [{ plain_text: "Test Campaign" }] },
        Company: { type: "title", title: [{ plain_text: "Test Company" }] },
        Description: { type: "rich_text", rich_text: [{ plain_text: "Description content" }] },
        Where: { type: "rich_text", rich_text: [{ plain_text: "Location" }] },
        Content: { type: "rich_text", rich_text: [{ plain_text: "Content" }] },
        "image content": { type: "rich_text", rich_text: [{ plain_text: "Image content" }] },
        PlannedDate: { type: "date", date: { start: "2023-05-05", end: "2023-05-05" } },
        Language: { type: "select", select: { name: "English", color: "blue" } },
        Image: { type: "files", files: [{ type: "external", name: "Image1", external: { url: "https://example.com/image1.png" } }] },
      },
    };
    const repository = new CampaignFindRepository();

    (client.queryDatabase as jest.Mock).mockResolvedValue(mockCampaign);

    const result = await repository.findById(1);

    expect(result).toBeInstanceOf(Campaign);
    expect(result?.campaign).toBe("Test Campaign");
    expect(result?.company).toBe("Test Company");
    expect(result?.description).toBe("Description content");
    expect(result?.where).toBe("Location");
    expect(result?.content).toBe("Content");
    expect(result?.imageContent).toBe("Image content");
    // expect(result?.plannedDate?.start.toISOString()).toBe("2023-05-05T00:00:00.000Z");
    // expect(result?.plannedDate?.end?.toISOString()).toBe("2023-05-05T00:00:00.000Z");
    expect(result?.language).toEqual({ name: "English", color: "blue" });
    expect(result?.images).toEqual([{ name: "Image1", url: "https://example.com/image1.png" }]);
  });

  it("should return null if campaign is not found", async () => {
    const repository = new CampaignFindRepository();

    (client.queryDatabase as jest.Mock).mockResolvedValue(null);

    const result = await repository.findById(1);

    expect(result).toBeNull();
  });

  test("should throw InternalServerError if schema is invalid", async () => {
    const invalidCampaign = {
      id: "page_123",
      created_time: "2023-01-01T00:00:00Z",
      properties: {
        ID: { type: "unique_id", unique_id: { number: 1 } },
        Campaign: { type: "rich_text", rich_text: [{ plain_text: "Test Campaign" }] },
        Company: { type: "title", title: [{ plain_text: "Test Company" }] },
        Description: { type: "rich_text", rich_text: [{ plain_text: "Description content" }] },
        Where: { type: "rich_text", rich_text: [{ plain_text: "Location" }] },
        Content: { type: "invaid", rich_text: [{ plain_text: "Content" }] },
        "image content": { type: "rich_text", rich_text: [{ plain_text: "Image content" }] },
        PlannedDate: { type: "date", date: { start: "2023-05-05", end: "2023-05-05" } },
        Language: { type: "select", select: { name: "English", color: "blue" } },
        Image: { type: "files", files: [{ type: "external", name: "Image1", external: { url: "https://example.com/image1.png" } }] },
      },
    };
    const repository = new CampaignFindRepository();

    (client.queryDatabase as jest.Mock).mockResolvedValue(invalidCampaign);

    await expect(repository.findById(1)).rejects.toThrow(InternalServerError);
    await expect(repository.findById(1)).rejects.toThrow("Invalid database schema.");
  });
});
