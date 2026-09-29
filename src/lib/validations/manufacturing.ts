import { z } from "zod";

export const manufacturingProductSchema = z.object({
  title: z
    .string()
    .min(3, "Please provide the product name (e.g. 10.0m HT Concrete Electric Pole)")
    .max(255, "Product title is too long")
    .trim(),
  slug: z
    .string()
    .min(3, "Please provide a valid URL slug (at least 3 characters)")
    .max(255, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "The slug should only have lowercase letters, numbers, and hyphens"
    )
    .trim(),
  category: z.enum(["poles", "blocks", "kerbs", "drainage", "custom"], {
    message: "Please select a product category",
  }),
  technicalSpecs: z.record(z.string(), z.string()).default({}),
  descriptionHtml: z
    .string()
    .min(10, "Please provide a detailed product description and engineering standard notes"),
  descriptionJson: z.any().optional(),
  isAvailable: z.boolean().default(true),
  displayOrder: z.coerce.number().int().default(0),
});

export type ManufacturingProductInput = z.infer<typeof manufacturingProductSchema>;
