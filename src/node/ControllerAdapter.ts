import type { IRequest, IResponse } from ".";

export type IControllerAdapter<T> = (req: IRequest) => Promise<IResponse<T>>;
