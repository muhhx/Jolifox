import { StatusCode } from "./StatusCode";

/** Erro base que permite identificar quais erros são gerados internamente ou que vem de fora. */
export class DomainError extends Error {
  /**
   * @param message Mensagem de descrição do erro
   * @param statusCode Código HTTP do erro
   */
  constructor(
    message: string,
    public readonly statusCode = StatusCode.InternalServerError
  ) {
    super(message);
  }
}
