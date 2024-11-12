import type { IImage, ILanguage, IPlannedDate } from ".";
import { ValidationError } from "../../../node";

interface ICampaignPayload {
  id?: number;
  pageId?: string;
  description?: string;
  imageContent?: string;
  company?: string;
  content?: string;
  language?: ILanguage;
  icon?: string;
  where?: string;
  plannedDate?: IPlannedDate;
  cover?: string;
  images?: IImage[];
  campaign?: string;
  createdTime?: Date;
}

export class Campaign {
  public readonly id?: number;
  public readonly pageId?: string;
  public readonly description?: string;
  public readonly imageContent?: string;
  public readonly company?: string;
  public readonly content?: string;
  public readonly language?: ILanguage;
  public readonly icon?: string;
  public readonly where?: string;
  public readonly plannedDate?: IPlannedDate;
  public readonly cover?: string;
  public readonly images?: IImage[];
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
    this.icon = payload.icon;
    this.where = payload.where;
    this.plannedDate = payload.plannedDate;
    this.cover = payload.cover;
    this.images = payload.images;
    this.campaign = payload.campaign;
    this.createdTime = payload.createdTime;
  }

  private validatePayload(payload: ICampaignPayload): void {
    if (Object.keys(payload).length === 0) {
      throw new ValidationError("[Rule by me] Campaign must contain at least one property.");
    }

    if (payload.images && payload.images.length > 100) {
      throw new ValidationError("[Rule by Notion] Campaign must have a maximum of 100 images.");
    }

    if (payload.icon && payload.icon.length > 2000) {
      throw new ValidationError("[Rule by Notion] Campaign cover URL cannot exceed 2000 characters.");
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

export type ICampaign = Omit<Campaign, "validatePalyload">;
