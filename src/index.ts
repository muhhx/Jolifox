import { WebServer } from "./node";
import { initNotion } from "./infra/database/Notion";

import { CampaignCreateRepository, CampaignFindRepository, CampaignDeleteRepository, CampaignUpdateRepository } from "./infra/repository";
import { CampaignCreateService, CampaignFindService, CampaignDeleteService, CampaignUpdateService } from "./domain/Campaign/useCase";
import { campaignCreateController, campaignFindController, campaignDeleteController, campaignUpdateController } from "./infra/http/controller";

(async function bootstrap() {
  // Inicializa serviços de banco de dados e aguarda ficar pronto.
  await Promise.all([
    initNotion(
      process.env.NOTION_API_KEY ?? "localKey",
      process.env.NOTION_DATABASE_ID ?? "localId"
    ),
  ]);

  // Composition Root Pattern para inicialização de dependências.
  const webServer = new WebServer();
  const campaignFindService = new CampaignFindService(new CampaignFindRepository());
  const campaignCreateService = new CampaignCreateService(new CampaignCreateRepository());
  const campaignDeleteService = new CampaignDeleteService(new CampaignFindRepository(), new CampaignDeleteRepository());
  const campaignUpdateService = new CampaignUpdateService(new CampaignFindRepository(), new CampaignUpdateRepository());

  // Rotas HTTP. Poderia ter criado em outro diretório, porém, por simplicidade, preferi colocar aqui.
  webServer.post("/api/v1/campaign", campaignCreateController(campaignCreateService));
  webServer.get("/api/v1/campaign/:campaignId", campaignFindController(campaignFindService));
  webServer.put("/api/v1/campaign/:campaignId", campaignUpdateController(campaignUpdateService));
  webServer.delete("/api/v1/campaign/:campaignId", campaignDeleteController(campaignDeleteService));

  // Inicialização de serviço HTTP, gRPC, etc. No caso só temos HTTP (webServer).
  await Promise.all([
    webServer.start(+(process.env.HTTP_PORT ?? 3000)),
  ]);
})();
