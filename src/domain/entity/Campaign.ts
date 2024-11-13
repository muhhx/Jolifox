import { ValidationError } from "../../node";

interface ICampaignPayload {
  id?: number;
  pageId?: string;
  description?: string;
  imageContent?: string;
  company?: string;
  content?: string;
  language?: { color: string; name: string };
  icon?: string;
  where?: string;
  plannedDate?: { start: Date; end?: Date };
  cover?: string;
  images?: { name: string; url: string }[];
  campaign?: string;
  createdTime?: Date;
}

const allowedColors = ["blue", "brown", "default", "gray", "green", "orange", "pink", "purple", "red", "yellow"];

const allowedIcons = ["✨"];

export class Campaign {
  public readonly id?: number;
  public readonly pageId?: string;
  public readonly description?: string;
  public readonly imageContent?: string;
  public readonly company?: string;
  public readonly content?: string;
  public readonly language?: { color: string; name: string };
  public readonly icon?: string;
  public readonly where?: string;
  public readonly plannedDate?: { start: Date; end?: Date };
  public readonly cover?: string;
  public readonly images?: { name: string; url: string }[];
  public readonly campaign?: string;
  public readonly createdTime?: Date;

  constructor(payload: ICampaignPayload) {
    this.validatePayload(payload);

    this.id = payload.id;
    this.pageId = payload.pageId;
    this.description = payload.description;
    this.imageContent = payload.imageContent;
    this.company = payload.company;
    this.content = payload.content;
    this.language = payload.language;
    this.icon = payload.icon ?? `✨`; //Default icon for the application.
    this.where = payload.where;
    this.plannedDate = payload.plannedDate;
    this.cover = payload.cover;
    this.images = payload.images;
    this.campaign = payload.campaign;
    this.createdTime = payload.createdTime;
  }

  private validatePayload(payload: ICampaignPayload) {
    if (Object.keys(payload).length === 0) {
      throw new ValidationError("[Rule by me] Campaign must contain at least one property.");
    }

    if (payload.language && !allowedColors.includes(payload.language.color)) {
      throw new ValidationError("[Rule by Notion] Campaign language color provided not allowed.");
    }

    if (payload.plannedDate && payload.plannedDate.end && payload.plannedDate.end.getTime() < payload.plannedDate.start.getTime()) {
      throw new ValidationError("[Rule by Notion] Campaign plannedDate end date must come after the start date.");
    }

    if (payload.images && payload.images.length > 100) {
      throw new ValidationError("[Rule by Notion] Campaign must have a maximum of 100 images.");
    }

    payload.images?.forEach((image) => {
      if (image.url.length > 2000) throw new ValidationError("[Rule by Notion] Image URL cannot exceed 2000 characters.");
    });

    if (payload.cover && payload.cover.length > 2000) {
      throw new ValidationError("[Rule by Notion] Campaign cover URL cannot exceed 2000 characters.");
    }

    if (payload.icon && !allowedIcons.includes(payload.icon)) {
      throw new ValidationError("[Rule by Notion] Campaign icon provided is not allowed.");
    }

    if (
      (payload.company && payload.company.length > 2000) ||
      (payload.campaign && payload.campaign.length > 2000) ||
      (payload.where && payload.where.length > 2000) ||
      (payload.description && payload.description.length > 2000) ||
      (payload.content && payload.content.length > 2000) ||
      (payload.imageContent && payload.imageContent.length > 2000)
    ) {
      throw new ValidationError("[Rule by Notion] Campaign text fields cannot exceed 2000 characters.");
    }
  }
}
