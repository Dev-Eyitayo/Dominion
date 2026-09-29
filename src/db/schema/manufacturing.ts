import { pgTable, uuid, varchar, text, timestamp, pgEnum, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";

export const manufacturingCategoryEnum = pgEnum("manufacturing_category", [
  "poles",
  "blocks",
  "kerbs",
  "drainage",
  "custom",
]);

export const manufacturingProducts = pgTable(
  "manufacturing_products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(), // e.g. "10.0m High Tension (HT) Concrete Pole"
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    category: manufacturingCategoryEnum("category").notNull(),
    technicalSpecs: jsonb("technical_specs").$type<Record<string, string>>().default({}), // e.g. { "Length": "10m", "Concrete Grade": "C40/50" }
    descriptionHtml: text("description_html").notNull(),
    descriptionJson: jsonb("description_json"),
    imageUrl: varchar("image_url", { length: 500 }).notNull(),
    imagePublicId: varchar("image_public_id", { length: 255 }),
    galleryUrls: jsonb("gallery_urls").$type<
      Array<{ url: string; publicId?: string; caption?: string }>
    >().default([]),
    isAvailable: boolean("is_available").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("manufacturing_category_idx").on(table.category),
    index("manufacturing_is_available_idx").on(table.isAvailable),
    index("manufacturing_display_order_idx").on(table.displayOrder),
  ]
);
