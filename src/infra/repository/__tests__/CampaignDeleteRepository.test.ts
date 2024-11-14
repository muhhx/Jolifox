import { CampaignDeleteRepository } from "../CampaignDeleteRepository";
import { client } from "../../database/Notion";

jest.mock("../../database/Notion", () => ({ client: { deletePage: jest.fn() }}));

describe("CampaignDeleteRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deletePage with the correct campaignId", async () => {
    const campaignId = "page_123";
    const repository = new CampaignDeleteRepository();

    await repository.delete(campaignId);

    expect(client.deletePage).toHaveBeenCalledTimes(1);
    expect(client.deletePage).toHaveBeenCalledWith({ page_id: campaignId });
  });
});
