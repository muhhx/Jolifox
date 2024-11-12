import { ValidationError } from "../../../node";

interface IPlannedDatePayload {
  start: Date;
  end?: Date;
}

export class PlannedDate {
  public readonly start: Date;
  public readonly end?: Date;

  constructor(payload: IPlannedDatePayload) {
    this.validatePayload(payload);

    this.start = payload.start;
    this.end = payload.end;
  }

  private validatePayload(payload: IPlannedDatePayload): void {
    if (payload.end && payload.end.getTime() < payload.start.getTime()) {
      throw new ValidationError("[Rule by Notion] PlannedDate end date must come after the start date.");
    }
  }
}

export type IPlannedDate = Omit<PlannedDate, "validatePayload">;
