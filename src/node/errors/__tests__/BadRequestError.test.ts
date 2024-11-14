import { BadRequestError } from "../BadRequestError";
import { StatusCode } from "../../StatusCode";
import { DomainError } from "../../DomainError";

describe("BadRequestError", () => {
  it("should create an instance of BadRequestError with default message and status code", () => {
    const error = new BadRequestError();

    expect(error).toBeInstanceOf(BadRequestError);
    expect(error.message).toBe("Bad Request");
    expect(error.statusCode).toBe(StatusCode.BadRequest);
  });

  it("should allow a custom error message", () => {
    const customMessage = "Custom error message";
    const error = new BadRequestError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(StatusCode.BadRequest);
  });

  it("should be an instance of DomainError", () => {
    const error = new BadRequestError();

    expect(error).toBeInstanceOf(DomainError);
  });
});
