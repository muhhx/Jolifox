import { StatusCode } from "./StatusCode";

export interface IResponse<T> {
  result: T;
  status: StatusCode;
}

class ResponseObject<T> implements IResponse<T> {
  constructor(public result: T, public status: StatusCode) {}

  /**
   * Define o código (HTTP) do retorno da requisição.
   * @param status Código do retorno
   */
  statusCode(status: StatusCode): this {
    this.status = status;
    return this;
  }
}

/**
 * Função que formata resposta para o padrão esperado.
 * @param result Resultado da camada de serviço.
 * @param status StatusCode da operação.
 * @returns
 */
export function parseResponse<T>(result: T, status: StatusCode): IResponse<T> {
  return new ResponseObject(result, status);
}
