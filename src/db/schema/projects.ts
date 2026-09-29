import { pgTable, uuid, varchar, text, timestamp, pgEnum, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";

export const projectCategoryEnum = pgEnum("project_category", [
  "civil",
  "electrical",
  "solar",
  "manufacturing",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "completed",
  "ongoing",
  "planned",
]);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    category: projectCategoryEnum("category").notNull(),
    tag: varchar("tag", { length: 100 }).notNull(), // e.g., "CIVIL & BUILDING", "HIGHWAY & ROADS"
    location: varchar("location", { length: 255 }).notNull(),
    client: varchar("client", { length: 255 }), // e.g., "Federal Ministry of Works", "Private Developer"
    summary: text("summary").notNull(), // Short excerpt for cards/metadata
    contentHtml: text("content_html").notNull(), // Full rich text HTML
    contentJson: jsonb("content_json"), // TipTap AST JSON for lossless editing
    featuredImageUrl: varchar("featured_image_url", { length: 500 }).notNull(),
    featuredImagePublicId: varchar("featured_image_public_id", { length: 255 }),
    galleryImages: jsonb("gallery_images").$type<
      Array<{ url: string; publicId?: string; caption?: string }>
    >().default([]),
    status: projectStatusEnum("status").default("completed").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("projects_category_idx").on(table.category),
    index("projects_is_featured_idx").on(table.isFeatured),
    index("projects_created_at_idx").on(table.createdAt),
    index("projects_display_order_idx").on(table.displayOrder),
  ]
);
