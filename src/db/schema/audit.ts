import { pgTable, uuid, varchar, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { adminUsers } from "./auth";

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => adminUsers.id, { onDelete: "set null" }),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    action: varchar("action", { length: 100 }).notNull(), // e.g. "CREATE_PROJECT", "UPDATE_MANUFACTURING", "DELETE_SERVICE"
    entity: varchar("entity", { length: 100 }).notNull(), // e.g. "projects", "manufacturing_products"
    entityId: varchar("entity_id", { length: 255 }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
    ipAddress: varchar("ip_address", { length: 45 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("audit_created_at_idx").on(table.createdAt),
    index("audit_entity_idx").on(table.entity),
  ]
);
