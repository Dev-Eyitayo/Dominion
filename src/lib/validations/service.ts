import { z } from "zod";

export const engineeringServiceSchema = z.object({
  title: z
    .string()
    .min(3, "Please give this engineering service a name")
    .max(255, "Title is too long")
    .trim(),
  slug: z
    .string()
    .min(3, "Please enter a valid URL slug (at least 3 characters)")
    .max(255, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "The slug should only contain lowercase letters, numbers, and hyphens"
    )
    .trim(),
  categoryBadge: z
    .string()
    .min(2, "Please provide a category badge (e.g. HIGH & LOW VOLTAGE GRID)")
    .max(100)
    .trim(),
  summary: z
    .string()
    .min(10, "Please provide an executive summary for this service")
    .trim(),
  deliverables: z.array(z.string().min(1)).default([]),
  displayOrder: z.coerce.number().int().default(0),
});

export type EngineeringServiceInput = z.infer<typeof engineeringServiceSchema>;
