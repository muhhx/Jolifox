import { CampaignCreateRepository } from "../CampaignCreateRepository";
import { Campaign } from "../../../domain/entity";
import { client } from "../../database/Notion";

jest.mock("../../database/Notion", () => ({ client: { createPage: jest.fn() }}));

describe("CampaignCreateRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call createPage with converted campaign schema", async () => {
    const payload = {
      id: 1,
      description: "A campaign description",
      company: "Some Company",
      where: "Location",
      content: "Some content",
      campaign: "Campaign name",
      imageContent: "Image content",
      language: { name: "English", color: "blue" },
      icon: "✨",
      cover: "https://example.com/cover.png",
      images: [{ name: "Image1", url: "https://example.com/image1.png" }],
    };
    const campaign = new Campaign(payload);
    const campaignCreateRepository = new CampaignCreateRepository();

    await campaignCreateRepository.create(campaign);

    expect(client.createPage).toHaveBeenCalledTimes(1);
    expect(client.createPage).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: { emoji: "✨" },
        cover: { external: { url: "https://example.com/cover.png" } },
        properties: {
          Description: { rich_text: [{ text: { content: "A campaign description" } }] },
          Company: { title: [{ text: { content: "Some Company" } }] },
          Where: { rich_text: [{ text: { content: "Location" } }] },
          Content: { rich_text: [{ text: { content: "Some content" } }] },
          Campaign: { rich_text: [{ text: { content: "Campaign name" } }] },
          "image content": { rich_text: [{ text: { content: "Image content" } }] },
          Language: {
            select: {
              name: "English",
              color: "blue",
            },
          },
          Image: {
            files: [
              {
                name: "Image1",
                external: { url: "https://example.com/image1.png" },
              },
            ],
          },
        },
      })
    );
  });
});
