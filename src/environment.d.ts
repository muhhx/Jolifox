// Declaração meramente documental para auto-complete e validação de variáveis de ambiente acessadas via process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Ambiente de execução da aplicação. */
      NODE_ENV?: "development" | "production";

      /** Porta para ouvir HTTP (3000 por padrão). */
      HTTP_PORT?: `${number}`;

      /** Configuração Notion */
      NOTION_API_KEY?: string;
      NOTION_DATABASE_ID?: string;
    }
  }
}

export {};
