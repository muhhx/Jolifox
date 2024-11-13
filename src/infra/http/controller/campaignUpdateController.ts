import { BadRequestError, type IRequest, parseResponse, StatusCode } from "../../../node";
import type { CampaignUpdateService } from "../../../domain/useCase";
import { campaignUpdateValidation } from "../../services/validation";

type RequestBody = {
  where?: string;
  images?: { name?: string; url?: string }[];
  company?: string;
  content?: string;
  campaign?: string;
  language?: { color?: string; name?: string };
  plannedDate?: { start?: string; end?: string };
  description?: string;
  imageContent?: string;
  cover?: string;
  icons?: string;
};

type RequestParams = {
  campaignId?: `${string}`;
};

export function campaignUpdateController(service: CampaignUpdateService) {
  return async (req: IRequest<RequestParams, RequestBody>) => {
    const { campaignId } = req.params;

    if (!campaignId || isNaN(+campaignId)) throw new BadRequestError("ID must be a valid number.");

    if (!req.body) throw new BadRequestError("Body is required.");

    const parsedBody = campaignUpdateValidation.parse(req.body);

    return parseResponse(await service.handle(+campaignId, parsedBody), StatusCode.OK);
  };
}
