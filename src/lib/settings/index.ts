import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  HeroSlide,
  FacilityContactData,
  DEFAULT_HERO_SLIDES,
  DEFAULT_FACILITY_CONTACTS,
} from "./types";

export * from "./types";

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const record = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "hero_slides"))
      .limit(1);

    if (record[0]?.value && Array.isArray(record[0].value) && record[0].value.length > 0) {
      return record[0].value as HeroSlide[];
    }
  } catch (e) {
    console.error("Error fetching hero_slides setting:", e);
  }
  return DEFAULT_HERO_SLIDES;
}

export async function getFacilityContacts(): Promise<FacilityContactData> {
  try {
    const record = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "facility_contacts"))
      .limit(1);

    if (record[0]?.value && typeof record[0].value === "object") {
      return record[0].value as unknown as FacilityContactData;
    }
  } catch (e) {
    console.error("Error fetching facility_contacts setting:", e);
  }
  return DEFAULT_FACILITY_CONTACTS;
}
