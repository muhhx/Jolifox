import type { Campaign } from "../entity";

// Inversão de dependência gerada por contratos através das seguintes interfaces.

/** Repositório responsável pela persistência de uma Campaign no datasource. */
export interface ICampaignCreateRepository {
  /**
   * Converte objeto de domínio Campaign para schema esperado e persiste no datasource.
   *
   * @param campaign Objeto de domínio Campaign.
   */
  create(campaign: Campaign): Promise<void>;
}

/** Repositório responsável pela busca individual de uma Campaign no datasource. */
export interface ICampaignFindRepository {
  /**
   * Busca Campaign através do identificador.
   *
   * @param campaignId Identificador da entidade desejada.
   */
  findById(campaignId: number): Promise<Campaign | null>;
}

export interface ICampaignUpdateRepository {
  update(campaignId: string, payload: Campaign): Promise<void>;
}

export interface ICampaignDeleteRepository {
  delete(campaignId: string): Promise<void>;
}
