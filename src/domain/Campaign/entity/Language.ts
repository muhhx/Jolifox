import { ValidationError } from "../../../node";

interface ILanguagePayload {
  color: string;
  name: string;
}

const allowedColors = [
  "blue",
  "brown",
  "default",
  "gray",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "yellow",
];

export class Language {
  public readonly color: string;
  public readonly name: string;

  constructor(payload: ILanguagePayload) {
    this.validatePayload(payload);

    this.color = payload.color;
    this.name = payload.name;
  }

  private validatePayload(payload: ILanguagePayload): void {
    if (!allowedColors.includes(payload.color)) {
      throw new ValidationError("[Rule by Notion] Language color provided not allowed.");
    }
    // Estabelece limite de 50 caracteres. (Rule by me)
    // Limita allowed languange options. (Rule by me)
  }
}

export type ILanguage = Omit<Language, "validatePayload">;
