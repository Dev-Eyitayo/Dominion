import { pgTable, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export interface HeroSlide {
  img: string;
  imgPublicId?: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface FacilityContactData {
  headOffice: {
    tag: string;
    title: string;
    address: string;
    hotline1: string;
    hotline2: string;
    email: string;
    hours: string;
  };
  factory: {
    tag: string;
    title: string;
    address: string;
    yardDirect: string;
    operations: string;
    logistics: string;
  };
}
