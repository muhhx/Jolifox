import { DomainError, StatusCode } from "..";

/** Erro de requisição mal formada. */
export class BadRequestError extends DomainError {
  constructor(message = "Bad Request") {
    super(message, StatusCode.BadRequest);
  }
}
