import type { Campaign } from "../entity";

// Inversão de dependência gerada por contratos através das seguintes interfaces.

/** Repositório responsável pela persistência de um Campaign no datasource. */
export interface ICampaignCreateRepository {
  /**
   * Converte objeto de domínio Campaign para schema esperado e persiste no datasource.
   *
   * @param campaign Objeto de domínio Campaign.
   */
  create(campaign: Campaign): Promise<void>;
}

/** Repositório responsável pela busca individual de um Campaign no datasource. */
export interface ICampaignFindRepository {
  /**
   * Busca Campaign através do identificador e converte par objeto de domínio. Retorna null caso não exista.
   *
   * @param campaignId Identificador da entidade desejada.
   */
  findById(campaignId: number): Promise<Campaign | null>;
}

/** Repositório responsável por atualizar um Campaign no datasource. */
export interface ICampaignUpdateRepository {
  /**
   * Converte objeto de domínio Campaign para schema esperado e atualiza no datasource.
   *
   * @param campaignId Identificador da entidade desejada.
   * @param payload Objeto de domínio Campaign.
   */
  update(campaignId: string, payload: Campaign): Promise<void>;
}

/** Repositório responsável por deletar um Campaign no datasource. */
export interface ICampaignDeleteRepository {
  /**
   * Deleta Campaign através do identificador.
   *
   * @param campaignId Identificador da entidade desejada.
   */
  delete(campaignId: string): Promise<void>;
}
