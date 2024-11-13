import { Client, isNotionClientError, isFullPage, APIErrorCode } from "@notionhq/client";
import { InternalServerError } from "../../../node";


/**
 * type Adapter = (...args: any[]) => any;
 * 
 * private async adapter(fn: Adapter, args: Parameters<Adapter>[0]) {
    try {
      const response = await fn(args);

      if (isFullPage(response)) return response;

      throw new Error("[NotionClient] Is not full page.");
    } catch (error) {
      if (isNotionClientError(error)) {
        if (error.code === APIErrorCode.ObjectNotFound) return null;

        // if (error.code === APIErrorCode.RateLimited) return null;
      }

      throw error;
    }
  }
 */

interface IPayload {
  apiKey: string;
  databaseId: string;
}

class NotionClient {
  private readonly client: Client;
  private readonly databaseId: string;

  constructor(payload: IPayload) {
    this.databaseId = payload.databaseId;
    this.client = new Client({ auth: payload.apiKey });
  }

  /**
   * Wrapper do método `_client.databases.query` que abstrai tratativas de erro, parsing e tipagem de retorno.
   * @param args Argumentos do Notion SDK para método especificado.
   * @returns Página do Notion especificada ou `null` caso inexistente.
   */
  public async queryDatabase(args: Omit<Parameters<typeof this.client.databases.query>[0], "database_id" | "auth">) {
    try {
        const result = await this.client.databases.query({
            database_id: this.databaseId,
            ...args
        });
  
        if (!result.results.length) return null;
  
        if (isFullPage(result.results[0])) return result.results[0];
  
        throw new InternalServerError("[NotionClient] Is not full page.");
      } catch (error) {
        //Error handler
        throw error;
      }
  }

  /**
   * Wrapper do método `_client.pages.create` que abstrai tratativas de erro, parsing e tipagem de retorno.
   * @param args Argumentos do Notion SDK para método especificado.
   * @returns Página do Notion criada.
   */
  public async createPage(args: Omit<Parameters<typeof this.client.pages.create>[0], "parent" | "auth">) {
    try {
      const result = await this.client.pages.create({ parent: { database_id: this.databaseId }, ...args });

      if (isFullPage(result)) return result;

      throw new InternalServerError("[NotionClient] Is not full page.");
    } catch (error) {
      //Error handler
      throw error;
    }
  }

  /**
   * Wrapper do método `_client.pages.update` que abstrai tratativas de erro, parsing e tipagem de retorno.
   * @param args Argumentos do Notion SDK para método especificado.
   * @returns Página do Notion criada.
   */
  public async deletePage(args: Omit<Parameters<typeof this.client.pages.update>[0], 'auth' | 'in_trash'>) {
    try {
      const result = await this.client.pages.update({ in_trash: true, ...args });

      if (isFullPage(result)) return result;

      throw new InternalServerError("[NotionClient] Is not full page.");
    } catch (error) {
      //Error handler
      throw error;
    }
  }

  /**
   * Wrapper do método `_client.pages.update` que abstrai tratativas de erro, parsing e tipagem de retorno.
   * @param args Argumentos do Notion SDK para método especificado.
   * @returns Página do Notion criada.
   */
  public async updatePage(args: Omit<Parameters<typeof this.client.pages.update>[0], 'auth' | 'in_trash'>) {
    try {
      const result = await this.client.pages.update(args);

      if (isFullPage(result)) return result;

      throw new InternalServerError("[NotionClient] Is not full page.");
    } catch (error) {
      //Error handler
      throw error;
    }
  }
}

/** Variável que será exportara para uso. */
let notionClient: NotionClient;

/**
 * Funçao que inicializa conexão em serviço Notion.
 * @param apiKey Chave da API do Notion.
 * @param databaseId Id do banco de dados do Notion.
 */
export async function initNotion(apiKey: string, databaseId: string) {
  try {
    notionClient = new NotionClient({ apiKey, databaseId });

    console.log("[NotionClient] Connection is successful!");
  } catch (error) {
    console.log("[NotionClient] It was not possible to connect.");
  }
}

export { notionClient as client };
