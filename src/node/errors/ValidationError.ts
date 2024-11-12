import { DomainError, StatusCode } from "..";

/** Erro de validação de valores de campos em uma requisição. */
export class ValidationError extends DomainError {
  constructor(message = "Validation Error") {
    super(message, StatusCode.UnprocessableEntity);
  }
}
