import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Please give this project a clear title (at least 3 characters)")
    .max(255, "Project title must be under 255 characters")
    .trim(),
  slug: z
    .string()
    .min(3, "Please provide a valid URL slug (at least 3 characters)")
    .max(255, "Slug must be under 255 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "The slug should only have lowercase letters, numbers, and hyphens (e.g. oyo-road-construction)"
    )
    .trim(),
  category: z.enum(["civil", "electrical", "solar", "manufacturing"], {
    message: "Please pick one of the engineering categories",
  }),
  tag: z
    .string()
    .min(2, "Please add a category tag (e.g. HIGHWAY & ROADS or SUBSTATION)")
    .max(100, "Tag is too long")
    .trim(),
  location: z
    .string()
    .min(2, "Please specify where this project is located (e.g. Oyo State, Nigeria)")
    .max(255, "Location text is too long")
    .trim(),
  client: z.string().max(255).optional().or(z.literal("")),
  summary: z
    .string()
    .min(10, "Please provide a short summary for project overview cards (at least 10 characters)")
    .max(1000, "Summary cannot exceed 1000 characters")
    .trim(),
  contentHtml: z
    .string()
    .min(10, "Please write a detailed description of the project works using the editor"),
  contentJson: z.any().optional(),
  status: z.enum(["completed", "ongoing", "planned"]).default("completed"),
  isFeatured: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
