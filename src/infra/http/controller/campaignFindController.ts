import { type IRequest, parseResponse, StatusCode, BadRequestError } from "../../../node";
import type { CampaignFindService } from "../../../domain/useCase";

type RequestParams = {
  campaignId?: `${string}`;
};

export function campaignFindController(service: CampaignFindService) {
  return async (req: IRequest<RequestParams>) => {
    const { campaignId } = req.params;

    if (!campaignId || isNaN(+campaignId)) throw new BadRequestError("ID must be a valid number.");

    return parseResponse(await service.handle(+campaignId), StatusCode.OK);
  };
}
