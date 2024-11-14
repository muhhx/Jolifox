import { DomainError } from "../DomainError";
import { StatusCode } from "../StatusCode";

describe("DomainError", () => {
  it("should initialize with provided message and default statusCode", () => {
    const errorMessage = "An internal error occurred.";
    const error = new DomainError(errorMessage);

    expect(error.message).toBe(errorMessage);
    expect(error.statusCode).toBe(StatusCode.InternalServerError);
  });

  it("should initialize with provided message and custom statusCode", () => {
    const errorMessage = "A bad request error occurred.";
    const customStatusCode = StatusCode.BadRequest;
    const error = new DomainError(errorMessage, customStatusCode);

    expect(error.message).toBe(errorMessage);
    expect(error.statusCode).toBe(customStatusCode);
  });

  it("should be an instance of Error", () => {
    const error = new DomainError("An error occurred");
    expect(error).toBeInstanceOf(Error);
  });
});
