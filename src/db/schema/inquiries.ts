import { pgTable, uuid, varchar, text, timestamp, pgEnum, index } from "drizzle-orm/pg-core";

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "under_review",
  "quoted",
  "archived",
]);

export const rfqInquiries = pgTable(
  "rfq_inquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientName: varchar("client_name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    email: varchar("email", { length: 255 }),
    serviceType: varchar("service_type", { length: 150 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    scopeDetails: text("scope_details").notNull(),
    status: inquiryStatusEnum("status").default("new").notNull(),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("inquiries_status_idx").on(table.status),
    index("inquiries_created_at_idx").on(table.createdAt),
  ]
);
