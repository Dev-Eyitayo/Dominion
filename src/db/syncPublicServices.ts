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
    title: "Engineering Design & Consultancy",
    slug: "engineering-design-consultancy",
    categoryBadge: "Core Services",
    summary:
      "Provide innovative, efficient, and sustainable engineering design solutions for diverse projects, focusing on client needs and environmental responsibility.",
    deliverables: [
      "Structural, civil, and MEP design documentation",
      "Feasibility studies and technical site assessments",
      "Engineering drawings, calculations, and BoQ preparation",
      "Statutory approvals and construction supervision",
    ],
    featuredImageUrl: "/images/team/team-engineers.jpg",
    displayOrder: 1,
  },
  {
    title: "Construction & Civil Engineering Services",
    slug: "construction-civil-engineering-services",
    categoryBadge: "Core Services",
    summary:
      "Specialize in building infrastructure designed to stand the test of time, ensuring structural integrity and long-term durability in all constructed projects.",
    deliverables: [
      "Residential, commercial, and industrial building construction",
      "Roads, drainage, culverts, and earthworks",
      "Reinforced concrete foundations and structural framing",
      "Renovation, retrofit, and civil maintenance works",
    ],
    featuredImageUrl: "/images/services/civil-works.jpg",
    displayOrder: 2,
  },
  {
    title: "Electrical Engineering Services",
    slug: "electrical-engineering-services",
    categoryBadge: "Core Services",
    summary:
      "Offer comprehensive solutions for power systems, installations, and maintenance, ensuring reliable and efficient electrical infrastructure for client facilities.",
    deliverables: [
      "HT/LT power distribution and substation installation",
      "Industrial cabling, switchgear, and panel works",
      "Earthing, surge protection, and load testing",
      "Preventive maintenance and electrical fault diagnosis",
    ],
    featuredImageUrl: "/images/services/electrical-work.jpg",
    displayOrder: 3,
  },
  {
    title: "Power & Solar Energy Solutions",
    slug: "power-solar-energy-solutions",
    categoryBadge: "Core Services",
    summary:
      "Deliver sustainable, renewable energy solutions with a primary focus on designing and implementing solar and other eco-friendly power systems for a greener future.",
    deliverables: [
      "Commercial and residential solar PV systems",
      "Battery energy storage and hybrid power systems",
      "Solar street lighting and mini-grid deployment",
      "Remote monitoring and energy performance audits",
    ],
    featuredImageUrl: "/images/services/solar-installation.jpg",
    displayOrder: 4,
  },
  {
    title: "Concrete & Precast",
    slug: "concrete-precast",
    categoryBadge: "Core Services",
    summary:
      "Manufacture high-quality concrete products, including poles, blocks, kerbs, and slabs, ensuring robust components are readily available for diverse construction projects.",
    deliverables: [
      "Reinforced concrete electric poles (LT & HT)",
      "Concrete blocks, kerbs, slabs, and stay blocks",
      "Drainage channels and custom precast moulds",
      "Supply, haulage, and on-site offloading",
    ],
    featuredImageUrl: "/images/precast/concrete-yard.jpg",
    displayOrder: 5,
  },
  {
    title: "Project Management",
    slug: "project-management",
    categoryBadge: "Core Services",
    summary:
      "Deliver efficient project planning, coordination, and execution from initiation to completion, ensuring projects are delivered on time, within budget, and to specified quality standards.",
    deliverables: [
      "Project planning, scheduling, and cost control",
      "Procurement and contractor coordination",
      "Site supervision and quality assurance",
      "Risk management and project reporting",
    ],
    featuredImageUrl: "/images/team/team-planning.jpg",
    displayOrder: 6,
  },
  {
    title: "Real Estate Development",
    slug: "real-estate-development",
    categoryBadge: "Core Services",
    summary:
      "Oversee the development of residential, commercial, and industrial properties, transforming potential sites into successful real estate projects that meet market demands.",
    deliverables: [
      "Residential, commercial, and industrial property development",
      "Site acquisition, feasibility, and master planning",
      "Design coordination and construction delivery",
      "Property handover and facility support",
    ],
    featuredImageUrl: "/images/projects/FB_IMG_1782363996414.jpg",
    displayOrder: 7,
  },
  {
    title: "Equipment Leasing & Services",
    slug: "equipment-leasing-services",
    categoryBadge: "Core Services",
    summary:
      "Provide a reliable range of equipment leasing and support services, offering clients access to essential tools and machinery for their projects without the burden of ownership.",
    deliverables: [
      "Heavy construction equipment leasing",
      "HIAB crane trucks and lifting services",
      "Compactors, mixers, and earthmoving machinery",
      "Operator support, maintenance, and logistics",
    ],
    featuredImageUrl: "/images/services/compactor-equipment.png",
    displayOrder: 8,
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
