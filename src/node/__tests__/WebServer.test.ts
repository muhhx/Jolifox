import request from "supertest";
import { WebServer } from "../WebServer"; // Adjust path if needed
import { StatusCode } from "../StatusCode";
import { DomainError } from "../DomainError";

describe("WebServer", () => {
  let server: WebServer;
  const port = 3001;

  beforeAll(() => {
    server = new WebServer();
  });

  it("should respond to /ping with 'pong'", async () => {
    const app = server["server"];
    const res = await request(app).get("/ping");
    expect(res.status).toBe(200);
    expect(res.text).toBe("pong");
  });

  it("should handle GET requests", async () => {
    const mockController = jest.fn().mockResolvedValue({
      result: { message: "GET response" },
      status: StatusCode.OK,
    });
    server.get("/test-get", mockController);

    const res = await request(server["server"]).get("/test-get");
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({ message: "GET response" });
    expect(mockController).toHaveBeenCalled();
  });

  it("should handle POST requests", async () => {
    const mockController = jest.fn().mockResolvedValue({
      result: { message: "POST response" },
      status: StatusCode.Created,
    });
    server.post("/test-post", mockController);

    const res = await request(server["server"])
      .post("/test-post")
      .send({ data: "test" });
    expect(res.status).toBe(StatusCode.Created);
    expect(res.body).toEqual({ message: "POST response" });
    expect(mockController).toHaveBeenCalled();
  });

  it("should handle PUT requests", async () => {
    const mockController = jest.fn().mockResolvedValue({
      result: { message: "PUT response" },
      status: StatusCode.OK,
    });
    server.put("/test-put", mockController);

    const res = await request(server["server"])
      .put("/test-put")
      .send({ data: "update" });
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({ message: "PUT response" });
    expect(mockController).toHaveBeenCalled();
  });

  it("should handle DELETE requests", async () => {
    const mockController = jest
      .fn()
      .mockResolvedValue({ result: null, status: StatusCode.NoContent });
    server.delete("/test-delete", mockController);

    const res = await request(server["server"]).delete("/test-delete");
    expect(res.status).toBe(StatusCode.NoContent);
    expect(mockController).toHaveBeenCalled();
  });

  it("should handle DomainError with custom status and message", async () => {
    const mockController = jest
      .fn()
      .mockRejectedValue(
        new DomainError("Domain error occurred", StatusCode.BadRequest)
      );
    server.get("/error-domain", mockController);

    const res = await request(server["server"]).get("/error-domain");
    expect(res.status).toBe(StatusCode.BadRequest);
    expect(res.body).toBe("Domain error occurred");
  });

  it("should handle non-DomainError errors with InternalServerError", async () => {
    const mockController = jest
      .fn()
      .mockRejectedValue(new Error("General error"));
    server.get("/error-general", mockController);

    const res = await request(server["server"]).get("/error-general");
    expect(res.status).toBe(StatusCode.InternalServerError);
    expect(res.body).toBe("Something went wrong in our server.");
  });

  it("should start server on the default port 3000 when no port is provided", async () => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    const defaultPort = 3000;
    const instance = server.start();

    await new Promise((resolve) => instance.on("listening", resolve));

    expect(spy).toHaveBeenCalledWith(`Rodando em ${defaultPort}...`);
    spy.mockRestore();

    await new Promise((resolve, reject) => {
      instance.close((err) => (err ? reject(err) : resolve(null)));
    });
  }, 10000);
});
