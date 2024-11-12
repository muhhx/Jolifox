import { ValidationError } from "../../../node";

interface IImagePayload {
  name: string;
  url: string;
}

export class Image {
  public readonly name: string;
  public readonly url: string;

  constructor(payload: IImagePayload) {
    this.validatePayload(payload);

    this.name = payload.name;
    this.url = payload.url;
  }

  private validatePayload(payload: IImagePayload): void {
    if (payload.url && payload.url.length > 2000) {
      throw new ValidationError("[Rule by Notion] Image URL cannot exceed 2000 characters.");
    }
    // Maybe validate the name as well (but it's not a `rich_text`);
  }
}

export type IImage = Omit<Image, "validatePayload">;
