import type { CampaignDeleteService } from "../../../domain/Campaign/useCase";
import { type IRequest, parseResponse, StatusCode, BadRequestError } from "../../../node";

type RequestParams = {
  campaignId?: `${string}`;
};

export function campaignDeleteController(service: CampaignDeleteService) {
  return async (req: IRequest<RequestParams>) => {
    const { campaignId } = req.params;

    if (!campaignId || isNaN(+campaignId)) throw new BadRequestError("ID must be a valid number.");

    return parseResponse(await service.handle(+campaignId), StatusCode.NoContent);
  };
}
