import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

interface ManufacturingSeedData {
  title: string;
  slug: string;
  category: "poles" | "blocks" | "kerbs" | "drainage" | "custom";
  technicalSpecs: Record<string, string>;
  descriptionHtml: string;
  imageUrl: string;
  isAvailable: boolean;
  displayOrder: number;
}

const publicProducts: ManufacturingSeedData[] = [
  {
    title: "Concrete Electric Poles (LT & HT)",
    slug: "concrete-electric-poles-lt-ht",
    category: "poles",
    technicalSpecs: {
      "8.5m LT Poles": "400V Distribution",
      "10.0m HT Poles": "11kV Power Lines",
      "11.0m HT Poles": "33kV Transmission",
      "Reinforcement": "Ribbed Rebar Cages",
    },
    descriptionHtml:
      "<p>Engineered with high-tensile steel reinforcing cages and precision machine vibration to eliminate voids. Designed to meet DisCo standards for Low Tension (LT) and High Tension (HT) overhead electrical grids.</p>",
    imageUrl: "/images/precast/electric-poles.jpg",
    isAvailable: true,
    displayOrder: 1,
  },
  {
    title: "Precast Stay Blocks & Anchor Slabs",
    slug: "precast-stay-blocks-anchor-slabs",
    category: "blocks",
    technicalSpecs: {
      "High-Density Mix": "C35/C40 Concrete Grade",
      "Durability": "Anti-Corrosion Additives",
      "Anchor System": "Guy Wire Anchor Eye Bolts",
      "Applications": "Substation Foundation Pads",
    },
    descriptionHtml:
      "<p>Heavy-density precast concrete stay blocks engineered to provide solid ground tension anchorage for overhead electrical line turns, terminal angle poles, and transformer substations.</p>",
    imageUrl: "/images/precast/stay-blocks.jpg",
    isAvailable: true,
    displayOrder: 2,
  },
  {
    title: "Road Kerbs, Slabs & Drainage Channels",
    slug: "road-kerbs-slabs-drainage-channels",
    category: "kerbs",
    technicalSpecs: {
      "Highway Kerbs": "Standard 500x300mm Profile",
      "Traffic Protection": "Barrier & Mountable Kerbs",
      "Culvert Covers": "Heavy-Load Reinforced Slabs",
      "Drainage Moulds": "Stormwater U-Channels",
    },
    descriptionHtml:
      "<p>Durable precast road kerbs, culvert cover slabs, and U-drain channels manufactured for estate roads, municipal corridors, and industrial access pavements with high impact resistance.</p>",
    imageUrl: "/images/precast/concrete-yard.jpg",
    isAvailable: true,
    displayOrder: 3,
  },
  {
    title: "HIAB Crane Logistics & Custom Moulds",
    slug: "hiab-crane-logistics-custom-moulds",
    category: "custom",
    technicalSpecs: {
      "Fleet Operations": "HIAB Crane Trucks On-Site",
      "Custom Fabrication": "Bespoke Architectural Casts",
      "Supply Chain": "Direct Factory Dispatch",
      "Commercial Terms": "Bulk Contractor Pricing",
    },
    descriptionHtml:
      "<p>End-to-end transport dispatch with Dominion HIAB crane trucks for safe offloading, direct hole planting, modular sewer manholes, and bespoke architectural elements.</p>",
    imageUrl: "/images/precast/pole-transport.jpg",
    isAvailable: true,
    displayOrder: 4,
  },
];

async function syncManufacturing() {
  console.log("Connecting to PostgreSQL database...");
  const sql = postgres(connectionString);

  try {
    console.log("Upserting manufacturing catalog products into PostgreSQL...");

    for (const prod of publicProducts) {
      await sql`
        INSERT INTO manufacturing_products (
          title,
          slug,
          category,
          technical_specs,
          description_html,
          image_url,
          is_available,
          display_order,
          updated_at
        ) VALUES (
          ${prod.title},
          ${prod.slug},
          ${prod.category},
          ${sql.json(prod.technicalSpecs)},
          ${prod.descriptionHtml},
          ${prod.imageUrl},
          ${prod.isAvailable},
          ${prod.displayOrder},
          NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          technical_specs = EXCLUDED.technical_specs,
          description_html = EXCLUDED.description_html,
          image_url = EXCLUDED.image_url,
          is_available = EXCLUDED.is_available,
          display_order = EXCLUDED.display_order,
          updated_at = NOW();
      `;
      console.log(`✓ Synchronized product: ${prod.title} (${prod.category})`);
    }

    const countRes = await sql`SELECT count(*) FROM manufacturing_products;`;
    console.log(`\n🎉 Success! Total manufacturing products in database: ${countRes[0].count}`);
  } catch (error) {
    console.error("❌ Error syncing manufacturing products:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

syncManufacturing();
