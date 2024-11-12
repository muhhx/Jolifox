import { z } from "zod";
import { BadRequestError } from "../../../node";

class CreateCampaignValidation {
  private readonly schema = z.object({
    where: z
      .string({ invalid_type_error: "[where] Must be a string." })
      .optional()
      .refine((value) => value === undefined || value.trim() !== "", {
        message: "[where] Cannot be an empty string",
      }),
    images: z
      .array(
        z.object({
          name: z
            .string({
              required_error: "[image name] Is required.",
              invalid_type_error: "[image name] Must be a string.",
            })
            .refine((value) => value === undefined || value.trim() !== "", {
              message: "[image name] Cannot be an empty string.",
            }),
          url: z
            .string({
              required_error: "[image url] Is required.",
              invalid_type_error: "[image url] Must be a string.",
            })
            .refine((value) => value === undefined || value.trim() !== "", {
              message: "[image url] Cannot be an empty string",
            }),
        })
      )
      .optional(),
    company: z
      .string({ invalid_type_error: "[company] Must be a string." })
      .optional()
      .refine((value) => value === undefined || value.trim() !== "", {
        message: "[company] Cannot be an empty string",
      }),
    content: z
      .string({ invalid_type_error: "[content] Must be a string." })
      .optional()
      .refine((value) => value === undefined || value.trim() !== "", {
        message: "[content] Cannot be an empty string",
      }),
    campaign: z
      .string({ invalid_type_error: "[campaign] Must be a string." })
      .optional()
      .refine((value) => value === undefined || value.trim() !== "", {
        message: "[campaign] Cannot be an empty string",
      }),
    language: z
      .object({
        color: z
          .string({
            required_error: "[language color] Is required.",
            invalid_type_error: "[language color] Must be a string.",
          })
          .refine((value) => value === undefined || value.trim() !== "", {
            message: "[language color] Cannot be an empty string.",
          }),
        name: z
          .string({
            required_error: "[language name] Is required.",
            invalid_type_error: "[language name] Must be a string.",
          })
          .refine((value) => value === undefined || value.trim() !== "", {
            message: "[language name] Cannot be an empty string",
          }),
      })
      .optional(),
    plannedDate: z
      .object({
        start: z
          .string({
            required_error: "[plannedDate start] Is required.",
            invalid_type_error: "[plannedDate start] Must be a string.",
          })
          .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "[plannedDate start] Must be in the format YYYY-MM-DD."
          )
          .refine((dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
          }, "[plannedDate start] Date must be valid.")
          .transform((dateString) => new Date(dateString)),
        end: z
          .string({
            invalid_type_error: "[plannedDate end] Must be a string.",
          })
          .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "[plannedDate end] Must be in the format YYYY-MM-DD."
          )
          .refine((dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
          }, "[plannedDate end] Date must be valid.")
          .transform((dateString) => new Date(dateString))
          .optional(),
      })
      .optional(),
    description: z
      .string({ invalid_type_error: "[description] Must be a string." })
      .optional()
      .refine((value) => value === undefined || value.trim() !== "", {
        message: "[description] Cannot be an empty string.",
      }),
    imageContent: z
      .string({ invalid_type_error: "[imageContent] Must be a string." })
      .optional()
      .refine((value) => value === undefined || value.trim() !== "", {
        message: "[imageContent] Cannot be an empty string.",
      }),
  });

  parse(body: unknown) {
    const parsed = this.schema.safeParse(body);

    if (!parsed.success) {
      const errorMessage = parsed.error.errors.map((err) => err.message)[0];
      throw new BadRequestError(errorMessage);
    }

    return parsed.data;
  }
}

export const createCampaignValidation = new CreateCampaignValidation();
