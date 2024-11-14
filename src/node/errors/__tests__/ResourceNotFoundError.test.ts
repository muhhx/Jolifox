import { ResourceNotFoundError } from "../ResourceNotFoundError";
import { StatusCode } from "../../StatusCode";

describe("ResourceNotFoundError", () => {
  it("should create an error with default message and status code", () => {
    const error = new ResourceNotFoundError();

    expect(error.message).toBe("Not Found");
    expect(error.statusCode).toBe(StatusCode.NotFound);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should create an error with a custom message and status code", () => {
    const customMessage = "Custom resource not found message";
    const error = new ResourceNotFoundError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(StatusCode.NotFound);
  });
});
