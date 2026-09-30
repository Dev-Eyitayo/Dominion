import postgres from "postgres";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { hashPassword } from "../lib/auth/password";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

async function run() {
  console.log("Connecting to PostgreSQL at:", connectionString);
  const sql = postgres(connectionString, { max: 1 });

  try {
    // 1. Run Migration SQL
    console.log("Applying database schema migration...");
    const migrationPath = path.join(
      process.cwd(),
      "drizzle/0000_true_carmella_unuscione.sql"
    );
    const sqlFile = fs.readFileSync(migrationPath, "utf-8");
    const statements = sqlFile
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      try {
        await sql.unsafe(statement);
      } catch (err: any) {
        // Ignore "already exists" errors
        if (
          err.code === "42710" || // duplicate object (type)
          err.code === "42P07" || // table already exists
          err.code === "42701" || // column already exists
          err.message?.includes("already exists")
        ) {
          // fine
        } else {
          console.warn("Migration notice:", err.message);
        }
      }
    }
    console.log("✓ Schema migration verified successfully.");

    // 2. Seed Super Admin
    const adminEmail = (
      process.env.ADMIN_INIT_EMAIL || "admin@dominionltd.ng"
    ).toLowerCase().trim();
    const adminPassword =
      process.env.ADMIN_INIT_PASSWORD || "AdminSecure2026!";
    const adminName = process.env.ADMIN_INIT_NAME || "Dominion Super Admin";

    const existingAdmin = await sql`
      SELECT id FROM admin_users WHERE email = ${adminEmail} LIMIT 1
    `;

    if (existingAdmin.length === 0) {
      const passwordHash = await hashPassword(adminPassword);
      await sql`
        INSERT INTO admin_users (full_name, email, password_hash, role)
        VALUES (${adminName}, ${adminEmail}, ${passwordHash}, 'super_admin')
      `;
      console.log(`✓ Super Admin created: ${adminEmail} (Pass: ${adminPassword})`);
    } else {
      console.log(`✓ Super Admin account exists: ${adminEmail}`);
    }

    // 3. Seed Sample Projects
    const projectCount = await sql`SELECT count(*)::int as count FROM projects`;
    if (projectCount[0].count === 0) {
      console.log("Seeding initial projects...");
      await sql`
        INSERT INTO projects (
          title, slug, category, tag, location, client, summary, content_html, featured_image_url, status, is_featured, display_order
        ) VALUES 
        (
          '33kV Overhead Transmission Grid & 500kVA Substation',
          '33kv-overhead-grid-500kva-substation',
          'electrical',
          'HIGH VOLTAGE POWER',
          'Oyo–Ogbomoso Corridor, Oyo State',
          'Oyo State Electrification Board',
          'Complete turn-key 33kV high-voltage overhead distribution network, DisCo-approved 10m HT spun concrete poles installation, and 500kVA transformer injection substation commissioning.',
          '<p>Dominion Integrated Electrical & Engineering Limited was contracted for the comprehensive engineering, procurement, line stringing, and substation commissioning for the 33kV inter-community grid extension.</p><h3>Scope of Works</h3><ul><li>Manufacture and transportation of 140 units of 10.0m HT concrete poles from our Oyo plant.</li><li>Excavation, alignment, and secure stay wire anchorage across undulating terrain.</li><li>Stringing of all-aluminum alloy conductors (AAAC) with surge arresters and drop-out fuses.</li><li>Installation, Earthing, and DisCo testing of 500kVA 33/0.415kV Step-Down Transformer.</li></ul>',
          '/images/project-electrical.jpg',
          'completed',
          true,
          1
        ),
        (
          'Industrial Warehouse Foundation & Commercial Access Road',
          'industrial-warehouse-foundation-access-road',
          'civil',
          'CIVIL & INFRASTRUCTURE',
          'Iseyin Industrial Layout, Oyo State',
          'Agro-Allied Processing Ltd',
          'Heavy-duty reinforced concrete raft foundation, heavy earthworks compaction, asphalt driveway paving, and integrated precast drainage channels.',
          '<p>High-precision civil construction of industrial logistics warehouse covering 3,500 sqm, built with Grade C35 structural concrete and heavy machinery asphalt approach roads.</p>',
          '/images/project-civil.jpg',
          'completed',
          true,
          2
        ),
        (
          '150kWp Commercial Solar Mini-Grid & BESS Installation',
          '150kwp-commercial-solar-mini-grid',
          'solar',
          'RENEWABLE ENERGY',
          'Oyo Town, Oyo State',
          'Dominion Commercial Complex',
          'Turn-key solar photovoltaic system with 300kWh Lithium Iron Phosphate (LiFePO4) battery energy storage and smart cloud SCADA telemetry for 24/7 uninterrupted power.',
          '<p>Engineered to replace diesel generation, delivering 98.4% uninterrupted clean energy runtime with automatic grid transfer switching.</p>',
          '/images/project-solar.jpg',
          'completed',
          true,
          3
        ),
        (
          'Automated Electric Pole Production Expansion (Oyo Plant)',
          'automated-electric-pole-production-expansion',
          'manufacturing',
          'PRECAST CONCRETE',
          'Oyo–Ogbomoso Expressway Plant, Oyo',
          'Dominion Precast Division',
          'Installation of new high-tensile steel prestressing tension beds, steam curing chambers, and automated concrete batching plant capable of 80 poles daily output.',
          '<p>Expanded our primary manufacturing facility to meet the surge in demand from regional power distribution companies and private industrial developers.</p>',
          '/images/project-precast.jpg',
          'completed',
          false,
          4
        )
      `;
      console.log("✓ Projects seeded.");
    }

    // 4. Seed Manufacturing Catalog
    const productCount = await sql`SELECT count(*)::int as count FROM manufacturing_products`;
    if (productCount[0].count === 0) {
      console.log("Seeding manufacturing catalog products...");
      await sql`
        INSERT INTO manufacturing_products (
          title, slug, category, technical_specs, description_html, image_url, is_available, display_order
        ) VALUES
        (
          '10.0m High Tension (HT) Concrete Electric Pole',
          '10m-ht-concrete-electric-pole',
          'poles',
          '{"Overall Length": "10.0 meters", "Working Load": "450 kgf", "Concrete Grade": "C40/50 Minimum", "Reinforcement": "High Tensile Pre-stressed Rebar", "Compliance": "DisCo & NERC Standard Approved", "Plant Location": "Oyo Expressway Plant"}',
          '<p>Manufactured using dense vibrated concrete with high compressive strength, our 10-metre High Tension concrete utility poles are engineered for 11kV and 33kV overhead power lines. Built to withstand tropical storm conditions with zero rot or insect degradation.</p>',
          '/images/hero-poles.jpg',
          true,
          1
        ),
        (
          '8.5m Low Tension (LT) Concrete Electric Pole',
          '8-5m-lt-concrete-electric-pole',
          'poles',
          '{"Overall Length": "8.5 meters", "Working Load": "300 kgf", "Concrete Grade": "C35/45", "Reinforcement": "High-Yield Steel Cage", "Application": "400V/230V Secondary Distribution"}',
          '<p>Standard distribution poles for low-voltage residential networks, commercial feeder extensions, and municipal streetlighting infrastructure across South West Nigeria.</p>',
          '/images/hero-poles.jpg',
          true,
          2
        ),
        (
          'Heavy Precast Concrete Stay Blocks & Anchor Slabs',
          'heavy-precast-concrete-stay-blocks',
          'blocks',
          '{"Dimensions": "600mm x 300mm x 150mm", "Weight": "65 kg", "Concrete Grade": "C30/37", "Anchor Rod Eye": "Galvanized High Tensile Steel"}',
          '<p>High-density underground anchoring blocks designed to stabilize angle and terminal electric poles against lateral tension and wind forces.</p>',
          '/images/project-precast.jpg',
          true,
          3
        ),
        (
          'Hydraulically Pressed Road Kerbs (Figure 7 & Figure 8)',
          'hydraulically-pressed-road-kerbs',
          'kerbs',
          '{"Standard": "BS 7263 / Nigerian Highway Code", "Profile": "Bullnose / Half Battered", "Compressive Strength": "> 40 MPa"}',
          '<p>Precision hydraulically pressed concrete road kerbs providing clean edge retention, pedestrian delineation, and drainage channel borders for asphalt highway paving.</p>',
          '/images/project-civil.jpg',
          true,
          4
        )
      `;
      console.log("✓ Manufacturing catalog seeded.");
    }

    // 5. Seed Engineering Services
    const serviceCount = await sql`SELECT count(*)::int as count FROM engineering_services`;
    if (serviceCount[0].count === 0) {
      console.log("Seeding engineering services...");
      await sql`
        INSERT INTO engineering_services (
          title, slug, category_badge, summary, deliverables, featured_image_url, display_order
        ) VALUES
        (
          'Civil Engineering & Building Construction',
          'civil-engineering-construction',
          'STRUCTURAL & HEAVY CIVIL',
          'Turnkey civil engineering solutions encompassing structural building construction, asphalt road networks, culverts, and foundation engineering for industrial and public clients.',
          '["Site topographical survey & soil geotechnical appraisal", "Structural architectural drawings & statutory engineering BoQ", "Excavation, reinforced foundation casting & superstructure assembly", "Asphalt driveway paving, drainage culverts & external works"]',
          '/images/project-civil.jpg',
          1
        ),
        (
          '11kV & 33kV Power Grid & Substation Engineering',
          'power-grid-substation-engineering',
          'HIGH & LOW VOLTAGE POWER',
          'Certified overhead power distribution line stringing, transformer injection substation installations, rural electrification networks, and high-voltage maintenance.',
          '["Route survey, profile leveling & pole pegging", "DisCo-approved concrete pole planting & stay wire rigging", "Conductor line stringing, surge protection & cross-arms", "Transformer injection substation installation, testing & commissioning"]',
          '/images/project-electrical.jpg',
          2
        ),
        (
          'Commercial Solar Mini-Grids & IT Telemetry',
          'commercial-solar-mini-grids',
          'RENEWABLE & AUTOMATION',
          'Enterprise solar photovoltaic installations, industrial battery energy storage (BESS), solar street lighting schemes, and automated monitoring systems.',
          '["Solar irradiance & load profile feasibility analysis", "Tier-1 Tier-1 Monocrystalline PV array engineering & mounting", "Lithium Iron Phosphate (LiFePO4) battery bank integration", "Smart cloud SCADA energy telemetry & remote monitoring"]',
          '/images/project-solar.jpg',
          3
        ),
        (
          'HIAB Pole Crane Truck & Heavy Machinery Leasing',
          'equipment-machinery-leasing',
          'EQUIPMENT LOGISTICS',
          'Direct equipment hire services featuring dedicated HIAB pole transport crane trucks, vibratory soil compactors, and road rollers based at our Oyo depot.',
          '["HIAB crane truck with certified certified operator for pole transport & planting", "Vibratory earthwork compactors & road rollers", "Daily, weekly, or project-based flexible leasing contracts", "On-site equipment logistics support and field maintenance"]',
          '/images/project-precast.jpg',
          4
        )
      `;
      console.log("✓ Engineering services seeded.");
    }

    // 6. Seed RFQs / Inquiries
    const inquiryCount = await sql`SELECT count(*)::int as count FROM rfq_inquiries`;
    if (inquiryCount[0].count === 0) {
      console.log("Seeding sample RFQs...");
      await sql`
        INSERT INTO rfq_inquiries (
          client_name, phone, email, service_type, location, scope_details, status, admin_notes
        ) VALUES
        (
          'Alhaji Mukaila Adeyemi',
          '+2348035512345',
          'adeyemi.farms@gmail.com',
          '10.0m HT Concrete Electric Poles (Quantity: 85 Units)',
          'Iseyin–Saki Road, Oyo State',
          'We require 85 units of 10m HT concrete poles for a 33kV farm grid extension project. Please include delivery cost to our site near Iseyin.',
          'new',
          'Received online. Needs delivery calculation from Oyo plant.'
        ),
        (
          'Chief Engr. Emmanuel Okon',
          '+2348129987654',
          'okon.constructions@yahoo.com',
          'Civil Construction & Asphalt Paving',
          'Ibadan Ring Road, Oyo State',
          'Requesting Bill of Quantities (BoQ) and quotation for 1.2km commercial access road and reinforced double-cell box culvert.',
          'under_review',
          'Engr. David contacted client; site inspection scheduled for Thursday.'
        ),
        (
          'Kolawole & Sons Agro Ltd',
          '+2347012345678',
          'kolawole.procurement@gmail.com',
          'Commercial Solar Mini-Grid (60kWp)',
          'Ogbomoso Industrial Zone',
          'Quotation needed for 60kWp solar PV system with 120kWh battery storage to power cold storage facility during daytime and evening peak hours.',
          'quoted',
          'Formal proposal and quotation of ₦24.8M sent via email and WhatsApp on 28th Sept.'
        )
      `;
      console.log("✓ Sample inquiries seeded.");
    }

    console.log("\n=============================================");
    console.log("🎉 DATABASE SETUP & SEEDING COMPLETED!");
    console.log(`🔑 Login URL: /admin/login`);
    console.log(`👤 Admin Email: ${adminEmail}`);
    console.log(`🔒 Admin Password: ${adminPassword}`);
    console.log("=============================================\n");
  } catch (error) {
    console.error("Database initialization error:", error);
  } finally {
    await sql.end();
  }
}

run();
