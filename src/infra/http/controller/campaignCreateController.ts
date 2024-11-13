import type { CampaignCreateService } from "../../../domain/Campaign/useCase";
import { BadRequestError, type IRequest, parseResponse, StatusCode } from "../../../node";
import { campaignCreateValidation } from "../../services/validation";

type RequestBody = {
  where?: string;
  images?: { name?: string; url?: string }[];
  company?: string;
  content?: string;
  campaign?: string;
  language?: {
    color?: string;
    name?: string;
  };
  plannedDate?: {
    start?: string;
    end?: string;
  };
  description?: string;
  imageContent?: string;
};

export function campaignCreateController(service: CampaignCreateService) {
  return async (req: IRequest<unknown, RequestBody>) => {
    if (!req.body) throw new BadRequestError("Body is required.");

    const parsedBody = campaignCreateValidation.parse(req.body);

    return parseResponse(await service.handle(parsedBody), StatusCode.Created);
  };
}
