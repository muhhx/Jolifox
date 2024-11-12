import { DomainError, StatusCode } from "..";

/** Erro de recurso solicitado não encontrado. */
export class ResourceNotFoundError extends DomainError {
  constructor(message = "Not Found") {
    super(message, StatusCode.NotFound);
  }
}
