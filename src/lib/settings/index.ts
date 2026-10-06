import { db } from "@/db";
import { siteSettings, engineeringServices, manufacturingProducts } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import {
  HeroSlide,
  FacilityContactData,
  DEFAULT_HERO_SLIDES,
  DEFAULT_FACILITY_CONTACTS,
  WhyChooseUsData,
  DEFAULT_WHY_CHOOSE_US,
  AboutPageData,
  DEFAULT_ABOUT_PAGE_DATA,
  NavigationData,
  DEFAULT_ABOUT_NAV_ITEMS,
  DEFAULT_SERVICES_NAV_ITEMS,
  DEFAULT_MANUFACTURING_NAV_ITEMS,
  NavDropdownItem,
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

export async function getWhyChooseUs(): Promise<WhyChooseUsData> {
  try {
    const record = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "why_choose_us"))
      .limit(1);

    if (record[0]?.value && typeof record[0].value === "object") {
      return record[0].value as unknown as WhyChooseUsData;
    }
  } catch (e) {
    console.error("Error fetching why_choose_us setting:", e);
  }
  return DEFAULT_WHY_CHOOSE_US;
}

export async function getAboutContent(): Promise<AboutPageData> {
  try {
    const record = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "about_content"))
      .limit(1);

    if (record[0]?.value && typeof record[0].value === "object") {
      return record[0].value as unknown as AboutPageData;
    }
  } catch (e) {
    console.error("Error fetching about_content setting:", e);
  }
  return DEFAULT_ABOUT_PAGE_DATA;
}

export async function getNavigationData(): Promise<NavigationData> {
  let servicesItems: NavDropdownItem[] = DEFAULT_SERVICES_NAV_ITEMS;
  let manufacturingItems: NavDropdownItem[] = DEFAULT_MANUFACTURING_NAV_ITEMS;

  try {
    const [services, products] = await Promise.all([
      db
        .select({
          title: engineeringServices.title,
          slug: engineeringServices.slug,
          categoryBadge: engineeringServices.categoryBadge,
        })
        .from(engineeringServices)
        .orderBy(asc(engineeringServices.displayOrder)),
      db
        .select({
          title: manufacturingProducts.title,
          slug: manufacturingProducts.slug,
        })
        .from(manufacturingProducts)
        .where(eq(manufacturingProducts.isAvailable, true))
        .orderBy(asc(manufacturingProducts.displayOrder)),
    ]);

    if (services.length > 0) {
      servicesItems = services.map((s) => ({
        label: s.categoryBadge ? s.categoryBadge.split("&")[0].trim() : s.title,
        href: `/services#${s.slug}`,
      }));
    }

    if (products.length > 0) {
      manufacturingItems = products.map((p) => ({
        label: p.title,
        href: `/manufacturing#${p.slug}`,
      }));
    }
  } catch (e) {
    console.error("Error fetching dynamic navigation data, using defaults:", e);
  }

  return {
    aboutItems: DEFAULT_ABOUT_NAV_ITEMS,
    servicesItems,
    manufacturingItems,
  };
}


