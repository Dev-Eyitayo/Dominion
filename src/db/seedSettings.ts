import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

const defaultHeroSlides = [
  {
    img: "/images/hero-construction.jpg",
    title: "Dominion Integrated Electrical &",
    highlight: "Engineering Limited",
    subtitle:
      "Delivering integrated civil construction, high-voltage electrical engineering, solar renewable IT solutions, and precision precast concrete manufacturing across Nigeria.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
  {
    img: "/images/services/solar-installation.jpg",
    title: "Sustainable Solar Energy &",
    highlight: "Power Grid Infrastructure.",
    subtitle:
      "Custom commercial solar mini-grids, highway solar street lighting schemes, and intelligent energy storage designed for resilience.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
  {
    img: "/images/precast/electric-poles.jpg",
    title: "High-Tensile Reinforced",
    highlight: "Concrete Precast Manufacturing.",
    subtitle:
      "High-load concrete electric poles (LT & HT), stay blocks, and custom road drainage products manufactured directly at our Oyo State production plant.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
];

const defaultFacilityContacts = {
  headOffice: {
    tag: "HEAD OFFICE",
    title: "Isokun Administrative Office",
    address: "No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road, Oyo State, Nigeria.",
    hotline1: "08101831076",
    hotline2: "07067315948",
    email: "dominionltd01@gmail.com",
    hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  },
  factory: {
    tag: "MANUFACTURING FACILITY",
    title: "Oyo–Ogbomoso Express Plant",
    address: "No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway, Oyo State.",
    yardDirect: "08101831076",
    operations: "High-Volume Pole & Block Batching",
    logistics: "HIAB & Flatbed Dispatch Bay",
  },
};

async function seedSettings() {
  console.log("Connecting to PostgreSQL...");
  const sql = postgres(connectionString);

  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `;
    console.log("✓ Verified site_settings table exists.");

    // Seed hero_slides
    await sql`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES ('hero_slides', ${sql.json(defaultHeroSlides)}, NOW())
      ON CONFLICT (key) DO NOTHING;
    `;
    console.log("✓ Verified hero_slides setting in DB.");

    // Seed facility_contacts
    await sql`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES ('facility_contacts', ${sql.json(defaultFacilityContacts)}, NOW())
      ON CONFLICT (key) DO NOTHING;
    `;
    console.log("✓ Verified facility_contacts setting in DB.");

    console.log("🎉 Site settings successfully seeded!");
  } catch (err) {
    console.error("❌ Error seeding site settings:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seedSettings();
