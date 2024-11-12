import { WebServer } from "./node";
import { initNotion } from "./infra/database/Notion";

import { CampaignCreateRepository, CampaignFindRepository, CampaignDeleteRepository } from "./infra/repository";
import { CampaignCreateService, CampaignFindService, CampaignDeleteService } from "./domain/Campaign/useCase";

import { campaignCreateController, campaignFindController, campaignDeleteController } from "./infra/http/controller";

(async function bootstrap() {
  // Inicializa serviços de banco de dados e aguarda ficar pronto.
  await Promise.all([
    initNotion(
      process.env.NOTION_API_KEY ?? "localKey",
      process.env.NOTION_DATABASE_ID ?? "localId"
    ),
    // postgresInit()...
  ]);

  // Composition Root Pattern para inicialização de dependências.
  const webServer = new WebServer();
  const campaignCreateService = new CampaignCreateService(new CampaignCreateRepository());
  const campaignFindService = new CampaignFindService(new CampaignFindRepository());
  const campaignDeleteService = new CampaignDeleteService(new CampaignFindRepository(), new CampaignDeleteRepository());

  // Rotas HTTP. Poderia ter criado em outro diretório, porém, por simplicidade, preferi colocar aqui.
  webServer.post("/api/v1/campaign", campaignCreateController(campaignCreateService));
  webServer.get("/api/v1/campaign/:campaignId", campaignFindController(campaignFindService));
  webServer.delete("/api/v1/campaign/:campaignId", campaignDeleteController(campaignDeleteService));

  // Inicialização de serviço HTTP, gRPC, etc. No caso só temos HTTP (webServer).
  await Promise.all([
    webServer.start(+(process.env.HTTP_PORT ?? 3000)),
    // gRPC...
  ]);
})();
