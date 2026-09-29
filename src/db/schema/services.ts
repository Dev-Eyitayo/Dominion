import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, index } from "drizzle-orm/pg-core";

export const engineeringServices = pgTable(
  "engineering_services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(), // e.g. "Civil Engineering & Building Construction"
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    categoryBadge: varchar("category_badge", { length: 100 }).notNull(), // e.g. "STRUCTURAL & HEAVY CIVIL"
    summary: text("summary").notNull(),
    deliverables: jsonb("deliverables").$type<string[]>().default([]),
    featuredImageUrl: varchar("featured_image_url", { length: 500 }).notNull(),
    featuredImagePublicId: varchar("featured_image_public_id", { length: 255 }),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("services_display_order_idx").on(table.displayOrder),
  ]
);
