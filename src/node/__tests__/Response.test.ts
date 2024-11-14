import { StatusCode } from "../StatusCode";
import { parseResponse, ResponseObject } from "../Response";

describe("ResponseObject", () => {
  it("should initialize with given result and status", () => {
    const result = { message: "Success" };
    const status = StatusCode.OK;
    const response = new ResponseObject(result, status);

    expect(response.result).toEqual(result);
    expect(response.status).toBe(status);
  });

  it("should update status code with statusCode method", () => {
    const result = { message: "Initial" };
    const initialStatus = StatusCode.OK;
    const newStatus = StatusCode.Created;
    const response = new ResponseObject(result, initialStatus);

    response.statusCode(newStatus);

    expect(response.status).toBe(newStatus);
  });

  it("should allow chaining by returning itself from statusCode method", () => {
    const result = { message: "Chaining test" };
    const status = StatusCode.OK;
    const response = new ResponseObject(result, status);

    const returnedValue = response.statusCode(StatusCode.NoContent);

    expect(returnedValue).toBe(response); // Check for chaining capability
    expect(returnedValue.status).toBe(StatusCode.NoContent); // Check status update
  });
});

describe("parseResponse function", () => {
  it("should return a ResponseObject with given result and status", () => {
    const result = { message: "Parsed response" };
    const status = StatusCode.Created;
    const response = parseResponse(result, status);

    expect(response.result).toEqual(result);
    expect(response.status).toBe(status);
  });
});
