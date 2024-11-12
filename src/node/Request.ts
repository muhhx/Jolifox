import type { Request } from "express";

export interface IRequest<
  ReqParams = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<ReqParams, unknown, ReqBody, ReqQuery> {}
