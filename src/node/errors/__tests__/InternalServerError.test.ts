import { InternalServerError } from "../InternalServerError";
import { StatusCode } from "../../StatusCode";
import { DomainError } from "../../DomainError";

describe("InternalServerError", () => {
  it("should create an instance of InternalServerError with default message and status code", () => {
    const error = new InternalServerError();

    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe("Internal Server Error");
    expect(error.statusCode).toBe(StatusCode.InternalServerError);
  });

  it("should allow a custom error message", () => {
    const customMessage = "Custom internal error message";
    const error = new InternalServerError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(StatusCode.InternalServerError);
  });

  it("should be an instance of DomainError", () => {
    const error = new InternalServerError();
    
    expect(error).toBeInstanceOf(DomainError);
  });
});
