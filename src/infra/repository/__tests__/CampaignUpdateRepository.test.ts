import { CampaignUpdateRepository } from "../CampaignUpdateRepository";
import { Campaign } from "../../../domain/entity";
import { client } from "../../database/Notion";

jest.mock("../../database/Notion", () => ({ client: { updatePage: jest.fn() }}));

describe("CampaignUpdateRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call updatePage with converted campaign schema", async () => {
    const payload = {
      id: 1,
      description: "A campaign description",
      company: "Some Company",
      where: "Location",
      content: "Some content",
      campaign: "Campaign name",
      imageContent: "Image content",
      language: { name: "English", color: "blue" },
      cover: "https://example.com/cover.png",
      images: [{ name: "Image1", url: "https://example.com/image1.png" }],
    };
    const campaign = new Campaign(payload);
    const campaignUpdateRepository = new CampaignUpdateRepository();

    await campaignUpdateRepository.update("pageId", campaign);

    expect(client.updatePage).toHaveBeenCalledTimes(1);
    expect(client.updatePage).toHaveBeenCalledWith(
      expect.objectContaining({
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
