import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

interface ServiceSeedData {
  title: string;
  slug: string;
  categoryBadge: string;
  summary: string;
  deliverables: string[];
  featuredImageUrl: string;
  displayOrder: number;
}

const publicServices: ServiceSeedData[] = [
  {
    title: "Civil Engineering & Building Construction",
    slug: "civil",
    categoryBadge: "STRUCTURAL & HEAVY CIVIL",
    summary:
      "Dominion executes complex structural, commercial, and residential projects with strict adherence to British and Nigerian standard codes of practice. Our civil division integrates soil mechanics, structural analysis, and certified site management.",
    deliverables: [
      "Commercial & Industrial Edifices",
      "Drainage Channels & Culverts",
      "Road Pavements & Kerbing",
      "Structural Renovation & Retrofit",
    ],
    featuredImageUrl: "/images/projects/FB_IMG_1782343190705.jpg",
    displayOrder: 1,
  },
  {
    title: "Electrical Power & Substation Engineering",
    slug: "electrical",
    categoryBadge: "HIGH & LOW VOLTAGE GRID",
    summary:
      "Specialized high-voltage overhead distribution (11kV / 33kV), step-down transformer injection substations, industrial power cabling, switchgear installation, and rural electrification networks.",
    deliverables: [
      "11kV & 33kV HT Line Stringing",
      "Transformer Substation Mounting",
      "Industrial Switchgear & Panels",
      "Earthing & Surge Protection Systems",
    ],
    featuredImageUrl: "/images/precast/pole-transport.jpg",
    displayOrder: 2,
  },
  {
    title: "Solar Renewable Energy & IT Solutions",
    slug: "solar",
    categoryBadge: "CLEAN ENERGY & AUTOMATION",
    summary:
      "Custom engineered commercial solar mini-grids, battery energy storage systems (BESS), solar-powered highway street lighting schemes, and smart industrial automation networks designed to slash operational diesel expenses.",
    deliverables: [
      "Commercial Solar Mini-Grids",
      "Highway Solar Street Lighting",
      "Industrial Lithium BESS Arrays",
      "Remote Telemetry & Monitoring",
    ],
    featuredImageUrl: "/images/services/solar-installation.jpg",
    displayOrder: 3,
  },
  {
    title: "Consultancy, BoQ & Heavy Equipment Leasing",
    slug: "consultancy",
    categoryBadge: "TECHNICAL ADVISORY & MACHINERY",
    summary:
      "Comprehensive Bill of Quantities (BoQ) drafting, feasibility studies, project management consultancy, and direct leasing of heavy road rollers, compactors, concrete batchers, and HIAB pole crane trucks.",
    deliverables: [
      "Detailed BoQ & Cost Estimation",
      "Vibratory Soil Compactors",
      "HIAB Crane Trucks for Pole Delivery",
      "Technical Site Audits",
    ],
    featuredImageUrl: "/images/projects/FB_IMG_1782363598182.jpg",
    displayOrder: 4,
  },
];

async function syncServices() {
  console.log("Connecting to PostgreSQL database...");
  const sql = postgres(connectionString);

  try {
    console.log("Upserting engineering services into PostgreSQL...");

    for (const service of publicServices) {
      await sql`
        INSERT INTO engineering_services (
          title,
          slug,
          category_badge,
          summary,
          deliverables,
          featured_image_url,
          display_order,
          updated_at
        ) VALUES (
          ${service.title},
          ${service.slug},
          ${service.categoryBadge},
          ${service.summary},
          ${sql.json(service.deliverables)},
          ${service.featuredImageUrl},
          ${service.displayOrder},
          NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          category_badge = EXCLUDED.category_badge,
          summary = EXCLUDED.summary,
          deliverables = EXCLUDED.deliverables,
          featured_image_url = EXCLUDED.featured_image_url,
          display_order = EXCLUDED.display_order,
          updated_at = NOW();
      `;
      console.log(`✓ Synchronized service: ${service.title} (${service.slug})`);
    }

    const countRes = await sql`SELECT count(*) FROM engineering_services;`;
    console.log(`\n🎉 Success! Total engineering services in database: ${countRes[0].count}`);
  } catch (error) {
    console.error("❌ Error syncing engineering services:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

syncServices();
