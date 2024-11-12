import { DomainError, StatusCode } from "..";

/** Erro de interno do servidor. */
export class InternalServerError extends DomainError {
  constructor(message = "Internal Server Error") {
    super(message, StatusCode.InternalServerError);
  }
}
