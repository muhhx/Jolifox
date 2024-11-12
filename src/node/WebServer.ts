import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";

import type { IControllerAdapter } from "./ControllerAdapter";
import { InternalServerError } from "./errors";
import { DomainError } from "./DomainError";

/**
 * Simple web server abstraction based on express
 */
export class WebServer {
  private server: express.Application;
  private router: express.Router;

  constructor() {
    this.server = express();
    this.router = express.Router();

    this.server.use(cors({ origin: "*" }));
    this.server.use(express.json());
    this.server.use(this.router);
    this.router.use("/ping", (_, res) => res.send("pong"));
    this.server.use(WebServer.errorHandler);
  }

  /**
   * Adiciona uma rota GET.
   * @param path Caminho para servir.
   * @param controller Função controller genérico.
   */
  get<T>(path: string, controller: IControllerAdapter<T>) {
    return this.router.get(path, WebServer.adaptController(controller));
  }

  /**
   * Adiciona uma rota POST.
   * @param path Caminho para servir.
   * @param controller Função controller genérico.
   */
  post<T>(path: string, controller: IControllerAdapter<T>) {
    return this.router.post(path, WebServer.adaptController(controller));
  }

  /**
   * Inicia o servidor web (HTTP) com as configurações realizadas.
   * @param port Porta para ouvir
   */
  start(port = 3000) {
    return this.server.listen(port, () => console.log(`Rodando em ${port}...`));
  }

  /**
   * Middleware de tratamento de erros no express.
   */
  private static errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (error instanceof DomainError) {
      if (error?.message === undefined) return res.sendStatus(error.statusCode);
      return res.status(error.statusCode).json(error.message);
    }
    const internalServerError = new InternalServerError(
      "Something went wrong in our server."
    );
    return res
      .status(internalServerError.statusCode)
      .json(internalServerError.message);
  }

  /**
   * Cria uma função que adequa para express a partir de uma função de controller genérica, padronizando Request, Response e catching erros de qualquer camada.
   * @param controller Função genérica de controller.
   * @returns Controller express.
   */
  private static adaptController<T>(controller: IControllerAdapter<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { result, status } = await controller(req);
        if (!result) return res.sendStatus(status);
        return res.status(status).json(result);
      } catch (error) {
        next(error);
      }
    };
  }
}
