import { ValidationError } from "../ValidationError";
import { StatusCode } from "../../StatusCode";

describe("ValidationError", () => {
  it("should create an error with default message and status code", () => {
    const error = new ValidationError();

    expect(error.message).toBe("Validation Error");
    expect(error.statusCode).toBe(StatusCode.UnprocessableEntity);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it("should create an error with a custom message and status code", () => {
    const customMessage = "Custom validation error message";
    const error = new ValidationError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(StatusCode.UnprocessableEntity);
  });
});
