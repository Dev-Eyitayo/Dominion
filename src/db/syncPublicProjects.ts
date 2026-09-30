import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

interface ProjectSeedData {
  title: string;
  slug: string;
  category: "civil" | "electrical" | "solar" | "manufacturing";
  tag: string;
  location: string;
  client: string;
  summary: string;
  contentHtml: string;
  featuredImageUrl: string;
  galleryImages: Array<{ url: string; caption?: string }>;
  status: "completed" | "ongoing" | "planned";
  isFeatured: boolean;
  displayOrder: number;
}

const publicProjects: ProjectSeedData[] = [
  {
    title: "Housing Estate Multi-Structure Development",
    slug: "housing-estate-multi-structure-development",
    category: "civil",
    tag: "CIVIL & BUILDING",
    location: "Oyo State, South-West Nigeria",
    client: "Private Residential Consortium",
    summary:
      "Large-scale estate civil blockwork, substructure raft foundation casting, reinforced concrete decking, and structural framing.",
    contentHtml: `
      <h2>Project Overview & Engineering Scope</h2>
      <p>Dominion Integrated Electrical & Engineering Limited was contracted as principal structural and civil engineering contractor for a multi-unit residential estate development in Oyo State. The project required comprehensive substructure and superstructure engineering across multiple residential blocks.</p>
      
      <h3>Key Engineering Deliverables</h3>
      <ul>
        <li>Geotechnical site investigation, excavation, and high-load raft foundation construction using Grade C35 structural concrete.</li>
        <li>Reinforced concrete columns, ring beams, and monolithic floor slab decking conforming to BS 8110 standards.</li>
        <li>Precision high-density sand-cement blockwork masonry and internal load-bearing partitions.</li>
        <li>Integrated plumbing risers, underground electrical conduits, and perimeter stormwater drainage canals.</li>
      </ul>

      <h3>Quality Assurance & Standards</h3>
      <p>All aggregate batching, slump testing, and 28-day concrete cube compressive strength tests were executed under strict quality control protocols, achieving zero structural non-conformance.</p>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782343190705.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782343190705.jpg",
        caption: "Substructure casting and structural column framing",
      },
      {
        url: "/images/projects/FB_IMG_1782363996414.jpg",
        caption: "Superstructure assembly and precast architectural work",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    title: "Highway Earthworks & Vibratory Compaction",
    slug: "highway-earthworks-vibratory-compaction",
    category: "civil",
    tag: "HIGHWAY & ROADS",
    location: "Regional Transport Corridor, South-West Nigeria",
    client: "State Ministry of Works & Infrastructure",
    summary:
      "Heavy soil stabilization, sub-base gravel leveling, and heavy-duty roller compaction operations.",
    contentHtml: `
      <h2>Earthworks & Sub-Base Engineering</h2>
      <p>Execution of heavy corridor earthmoving, cut-and-fill balancing, subgrade soil stabilization, and high-amplitude vibratory roller compaction along a critical regional highway arterial.</p>
      
      <h3>Technical Execution Stages</h3>
      <ul>
        <li>Clearing, topsoil stripping, and corridor grading with heavy motor graders and CAT bulldozers.</li>
        <li>Placement of approved lateritic sub-base fill material in compacted 150mm layers.</li>
        <li>Field dry density (FDD) testing and nuclear moisture-density gauge verification achieving >98% Modified AASHTO compaction.</li>
        <li>Precision cross-fall slope preparation for optimal highway surface drainage.</li>
      </ul>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782363598182.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782363598182.jpg",
        caption: "Vibratory compaction operations along the highway alignment",
      },
      {
        url: "/images/projects/FB_IMG_1782363608838.jpg",
        caption: "Sub-base gravel leveling prior to asphalt binder course",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    title: "Asphalt Highway Paving & Roadway Kerbing",
    slug: "asphalt-highway-paving-roadway-kerbing",
    category: "civil",
    tag: "ASPHALT & PAVING",
    location: "South-West Trunk Road Corridor",
    client: "Highway Development Authority",
    summary:
      "Bituminous asphalt wearing course application, shoulder grading, and precision precast kerb alignment.",
    contentHtml: `
      <h2>Pavement Construction & Kerb Alignment</h2>
      <p>Delivery of hot-mix asphalt concrete wearing course laying, bitumen prime coat spraying, and hydraulically pressed road kerb installation on an inter-city highway.</p>
      
      <h3>Engineering Scope</h3>
      <ul>
        <li>MC-30 bitumen emulsion tack coat spraying for inter-layer bonding.</li>
        <li>Continuous paving of 50mm dense asphaltic concrete wearing course using tracked Vogele asphalt pavers.</li>
        <li>Tandem steel-drum rolling and pneumatic tire finishing rolling achieving smooth ride quality (IRI < 2.0 m/km).</li>
        <li>Manufacture and line-and-level installation of heavy-duty precast concrete kerbs from our Oyo plant.</li>
      </ul>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782363608838.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782363608838.jpg",
        caption: "Asphalt wearing course compaction and roadway alignment",
      },
      {
        url: "/images/precast/concrete-yard.jpg",
        caption: "Precast kerbs and drainage modules batching",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 3,
  },
  {
    title: "33kV / 11kV Grid Pole Rigging & Line Stringing",
    slug: "33kv-11kv-grid-pole-rigging-line-stringing",
    category: "electrical",
    tag: "POWER DISTRIBUTION",
    location: "Distribution Network Hub, Oyo State",
    client: "Ibadan Electricity Distribution Company (IBEDC)",
    summary:
      "HIAB crane transport, positioning, and overhead conductor stringing for regional distribution networks.",
    contentHtml: `
      <h2>High-Voltage Power Distribution Grid Project</h2>
      <p>Turnkey overhead power line stringing, DisCo-compliant 10.0m HT pre-stressed concrete pole planting, cross-arm assembly, and surge protection integration.</p>
      
      <h3>Technical Execution Points</h3>
      <ul>
        <li>Planting of 10.0m HT concrete poles at 45-meter standard spans utilizing HIAB truck cranes.</li>
        <li>Installation of galvanized steel cross-arms, disc insulators, and pin insulators.</li>
        <li>Stringing, tensioning, and sagging of 150mm² All Aluminum Alloy Conductors (AAAC).</li>
        <li>Drop-out fuse isolators, 33kV lightning arresters, and deep-driven copper earthing rods (< 2 Ohms resistance).</li>
      </ul>
    `,
    featuredImageUrl: "/images/precast/pole-transport.jpg",
    galleryImages: [
      {
        url: "/images/precast/pole-transport.jpg",
        caption: "HIAB crane truck hoisting and transporting HT concrete poles",
      },
      {
        url: "/images/precast/electric-poles.jpg",
        caption: "Concrete poles lined up for quality inspection at depot",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 4,
  },
  {
    title: "Commercial Solar Street Lighting & Mini-Grids",
    slug: "commercial-solar-street-lighting-mini-grids",
    category: "solar",
    tag: "SOLAR & RENEWABLES",
    location: "Urban & Rural Municipal Schemes",
    client: "Ministry of Energy & Mineral Resources",
    summary:
      "Turnkey solar PV panel mounting, high-efficiency LED luminaires, lithium storage, and smart telemetry.",
    contentHtml: `
      <h2>Solar Photovoltaic Public Infrastructure</h2>
      <p>Design, structural pole fabrication, and commissioning of standalone high-lumen solar street lighting networks and institutional PV mini-grids across municipal corridors.</p>
      
      <h3>System Architecture</h3>
      <ul>
        <li>Tier-1 Monocrystalline solar panels with anti-reflective tempered glass.</li>
        <li>Grade-A Lithium Iron Phosphate (LiFePO4) battery packs with 6,000+ cycle life.</li>
        <li>MPPT intelligent solar charge controllers with auto dusk-to-dawn dimming profiles.</li>
        <li>High-lumen Philips luminaire chips delivering 160 lm/Watt luminous efficacy.</li>
      </ul>
    `,
    featuredImageUrl: "/images/services/solar-installation.jpg",
    galleryImages: [
      {
        url: "/images/services/solar-installation.jpg",
        caption: "Commercial solar array installation and telemetry setup",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 5,
  },
  {
    title: "High Tension (HT) & Low Tension (LT) Poles Production",
    slug: "ht-lt-concrete-electric-poles-production",
    category: "manufacturing",
    tag: "CONCRETE PRECAST",
    location: "Oyo–Ogbomoso Factory Plant, Oyo State",
    client: "DisCo & Infrastructure Contractors",
    summary:
      "Mass casting and curing of 8.5m, 10m, and 11m reinforced concrete electric poles matching DISCO specifications.",
    contentHtml: `
      <h2>Factory Precast Production Facility</h2>
      <p>Industrial manufacturing of DisCo-certified spun reinforced concrete electric poles engineered to endure high lateral wind loads and severe tropical weather.</p>
      
      <h3>Manufacturing & Testing Specifications</h3>
      <ul>
        <li>Pre-stressed high-tensile steel rebar tensioning beds for maximum flexural strength.</li>
        <li>Grade C40/50 dense vibrated concrete matrix with rapid curing.</li>
        <li>Standard working load compliance (HT poles: 450 kgf; LT poles: 300 kgf).</li>
        <li>Third-party destructive deflection and proof-load testing certified.</li>
      </ul>
    `,
    featuredImageUrl: "/images/precast/electric-poles.jpg",
    galleryImages: [
      {
        url: "/images/precast/electric-poles.jpg",
        caption: "Cured 10m HT concrete poles at the Oyo expressway yard",
      },
      {
        url: "/images/precast/pole-transport.jpg",
        caption: "Direct logistics dispatch via heavy crane transport",
      },
    ],
    status: "completed",
    isFeatured: false,
    displayOrder: 6,
  },
  {
    title: "Concrete Stay Blocks & Anchor Slabs",
    slug: "concrete-stay-blocks-anchor-slabs",
    category: "manufacturing",
    tag: "PRECAST ELEMENTS",
    location: "Manufacturing Yard, Oyo State",
    client: "Power Grid Contractors",
    summary:
      "Standardized high-density concrete stay blocks engineered with center guide holes for HT/LT stay wire support.",
    contentHtml: `
      <h2>High-Load Precast Foundation Anchors</h2>
      <p>Batching, vibration, and supply of standard DisCo-spec precast concrete stay blocks and anchor slabs for overhead transmission stability.</p>
      
      <h3>Product Features</h3>
      <ul>
        <li>High-density C30/37 concrete for subterranean durability.</li>
        <li>Reinforced with welded steel mesh preventing cracking under high tension pull loads.</li>
        <li>Hot-dip galvanized steel tie-rod sleeves and eye anchors.</li>
      </ul>
    `,
    featuredImageUrl: "/images/precast/stay-blocks.jpg",
    galleryImages: [
      {
        url: "/images/precast/stay-blocks.jpg",
        caption: "Precast concrete stay blocks stacked and ready for dispatch",
      },
    ],
    status: "completed",
    isFeatured: false,
    displayOrder: 7,
  },
  {
    title: "Precast Drainage Channels & Custom Moulds",
    slug: "precast-drainage-channels-custom-moulds",
    category: "manufacturing",
    tag: "HYDRAULIC PRECAST",
    location: "Precast Production Yard, Oyo State",
    client: "Highway & Urban Civil Works",
    summary:
      "Heavy-duty storm water drains, road median kerbs, and specialized precast architectural elements.",
    contentHtml: `
      <h2>Hydraulic Drainage & Road Median Products</h2>
      <p>Design, precision steel moulding, and hydraulic pressing of precast U-channels, box culvert rings, road median barriers, and drainage covers.</p>
      
      <h3>Product Attributes</h3>
      <ul>
        <li>Tongue-and-groove jointing system for accelerated on-site installation.</li>
        <li>High hydraulic flow efficiency reducing silt and sediment build-up.</li>
        <li>Heavy wheel-load carrying capacity (Class D400 rating for vehicular crossings).</li>
      </ul>
    `,
    featuredImageUrl: "/images/precast/concrete-yard.jpg",
    galleryImages: [
      {
        url: "/images/precast/concrete-yard.jpg",
        caption: "Precast production yard with drainage channel moulds",
      },
    ],
    status: "completed",
    isFeatured: false,
    displayOrder: 8,
  },
  {
    title: "Residential Electrification & Architectural Lighting",
    slug: "residential-electrification-architectural-lighting",
    category: "electrical",
    tag: "INTERNAL ELECTRICAL",
    location: "Estate Residences Scheme, Oyo State",
    client: "Luxury Real Estate Developer",
    summary:
      "Complete modern internal wiring, distribution boards, exterior architectural lighting, and surge protection.",
    contentHtml: `
      <h2>Turnkey Residential Power & Lighting Engineering</h2>
      <p>Comprehensive electrical engineering covering conduit piping, cable sizing, main distribution panel wiring, automated phase selectors, and exterior landscape lighting.</p>
      
      <h3>Scope of Works</h3>
      <ul>
        <li>Flame-retardant copper wiring conforming to NIS and IEE Wiring Regulations (18th Edition).</li>
        <li>Schneider/ABB miniature circuit breakers (MCBs) and residual current devices (RCDs).</li>
        <li>Surge protection devices (SPD) safeguarding sensitive electronics.</li>
        <li>Architectural facade uplighting, perimeter security floodlights, and smart switching.</li>
      </ul>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782363963623.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782363963623.jpg",
        caption: "Illuminated residential facade and perimeter electrical works",
      },
    ],
    status: "completed",
    isFeatured: false,
    displayOrder: 9,
  },
  {
    title: "Classical Villa Framework & Precast Columns",
    slug: "classical-villa-framework-precast-columns",
    category: "civil",
    tag: "STRUCTURAL RESIDENTIAL",
    location: "Private Development Scheme, South-West Nigeria",
    client: "Private Client",
    summary:
      "High-end residential construction featuring precast structural columns, stone architraves, and stepped roofing.",
    contentHtml: `
      <h2>High-End Architectural Civil Engineering</h2>
      <p>Engineering execution of a luxury residential villa utilizing bespoke precast concrete Doric columns, reinforced cantilevered balconies, and architectural parapet casting.</p>
      
      <h3>Technical Highlights</h3>
      <ul>
        <li>Precision custom formwork for curved structural lintels and stepped fascia boards.</li>
        <li>Self-compacting concrete (SCC) mix for flawless column surface finish.</li>
        <li>High-durability stone aggregate render resistant to atmospheric weathering.</li>
      </ul>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782363996414.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782363996414.jpg",
        caption: "Bespoke precast column installation and structural framework",
      },
      {
        url: "/images/projects/FB_IMG_1782343190705.jpg",
        caption: "Substructure raft casting and foundation alignment",
      },
    ],
    status: "completed",
    isFeatured: false,
    displayOrder: 10,
  },
];

async function syncProjects() {
  console.log("Connecting to database at:", connectionString);
  const sql = postgres(connectionString, { max: 1 });

  try {
    console.log("Clearing old projects in database...");
    await sql`DELETE FROM projects`;

    console.log(`Inserting ${publicProjects.length} authentic projects...`);
    for (const p of publicProjects) {
      await sql`
        INSERT INTO projects (
          title,
          slug,
          category,
          tag,
          location,
          client,
          summary,
          content_html,
          featured_image_url,
          gallery_images,
          status,
          is_featured,
          display_order
        ) VALUES (
          ${p.title},
          ${p.slug},
          ${p.category},
          ${p.tag},
          ${p.location},
          ${p.client},
          ${p.summary},
          ${p.contentHtml},
          ${p.featuredImageUrl},
          ${sql.json(p.galleryImages)},
          ${p.status},
          ${p.isFeatured},
          ${p.displayOrder}
        )
      `;
      console.log(`✓ Synchronized: "${p.title}" (${p.category})`);
    }

    console.log("\n=============================================");
    console.log(`🎉 ALL ${publicProjects.length} PROJECTS SYNCHRONIZED TO DATABASE!`);
    console.log("=============================================\n");
  } catch (error) {
    console.error("Project sync error:", error);
  } finally {
    await sql.end();
  }
}

syncProjects();
