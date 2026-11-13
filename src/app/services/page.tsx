import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { Metadata } from "next";
import { db } from "@/db";
import { engineeringServices } from "@/db/schema";
import { asc } from "drizzle-orm";

export const revalidate = 60; // ISR 60 seconds

export const metadata: Metadata = {
  title: "Civil Construction, Power Grid & Solar Engineering Services Oyo",
  description:
    "Comprehensive engineering solutions across Nigeria: Civil & building construction, 11kV/33kV overhead power line stringing, commercial solar mini-grids, heavy equipment leasing (HIAB cranes & compactors), and BoQ consultancy.",
  keywords: [
    "civil engineering contractor Oyo State",
    "11kV 33kV power line contractor Nigeria",
    "substation transformer installation South West",
    "commercial solar mini grid installers Nigeria",
    "highway solar street lighting Oyo",
    "HIAB crane truck leasing Oyo",
    "compactor roller hire Oyo State",
    "engineering Bill of Quantities BoQ consultant",
  ],
};

const BUTTON_LABEL_MAP: Record<string, string> = {
  "engineering-design-consultancy": "BOOK A DESIGN CONSULTATION",
  "construction-civil-engineering-services": "DISCUSS CIVIL TENDER",
  "electrical-engineering-services": "DISCUSS ELECTRICAL SCOPE",
  "power-solar-energy-solutions": "REQUEST SOLAR QUOTE",
  "concrete-precast": "REQUEST PRECAST QUOTE",
  "project-management": "ENGAGE PROJECT MANAGER",
  "real-estate-development": "DISCUSS PROPERTY DEVELOPMENT",
  "equipment-leasing-services": "LEASE EQUIPMENT",
};

const CORNER_BADGE_MAP: Record<string, string> = {
  "engineering-design-consultancy": "DESIGN & CONSULTANCY 01",
  "construction-civil-engineering-services": "CIVIL DIVISION 02",
  "electrical-engineering-services": "GRID ENGINEERING 03",
  "power-solar-energy-solutions": "SOLAR RENEWABLE 04",
  "concrete-precast": "PRECAST PRODUCTION 05",
  "project-management": "PROJECT DELIVERY 06",
  "real-estate-development": "REAL ESTATE 07",
  "equipment-leasing-services": "PLANT LEASING 08",
};

const ROTATION_CLASSES = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6"];

const DEFAULT_SERVICES = [
  {
    id: "default-1",
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
    id: "default-2",
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
    id: "default-3",
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
    id: "default-4",
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
    id: "default-5",
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
    id: "default-6",
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
    id: "default-7",
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
    id: "default-8",
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

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    services = await db
      .select()
      .from(engineeringServices)
      .orderBy(asc(engineeringServices.displayOrder));
  } catch (error) {
    console.error("ServicesPage database query failed, using static fallback:", error);
  }

  if (services.length === 0) {
    services = DEFAULT_SERVICES;
  }

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="/images/projects/FB_IMG_1782343190705.jpg"
            alt="Engineering Services"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            OUR CORE AREAS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Multidisciplinary Services
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            From foundation civil earthworks and high-voltage grid substations to commercial solar mini-grids, precision precasting, and equipment leasing.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const numberBadge = String(idx + 1).padStart(2, "0");
            const rotationClass = ROTATION_CLASSES[idx % ROTATION_CLASSES.length];
            const buttonLabel =
              BUTTON_LABEL_MAP[service.slug] || "DISCUSS ENGINEERING SCOPE";
            const cornerBadge =
              CORNER_BADGE_MAP[service.slug] || `DIVISION SPEC ${numberBadge}`;
            const deliverables = (service.deliverables || []) as string[];

            return (
              <div
                key={service.id}
                id={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  idx > 0 ? "border-t border-slate-100 pt-24" : ""
                }`}
              >
                {/* Content Column */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                  <div
                    className={`w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center ${rotationClass} mb-6`}
                  >
                    <span className="font-mono text-sm font-bold text-slate-900">
                      {numberBadge}
                    </span>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                    {service.categoryBadge}
                  </span>

                  <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                    {service.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {/* 4-Cell Deliverables Grid */}
                  {deliverables.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                      {deliverables.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="p-3 bg-slate-50 border border-slate-200"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/contact#quote"
                    className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors"
                  >
                    {buttonLabel}
                  </Link>
                </div>

                {/* Polygonal Image Showcase Column */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="relative group py-6 px-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${
                        isEven
                          ? "from-[#0F2B82] via-[#0F2B82]/30 to-[#D99B26] [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] -rotate-2 group-hover:-rotate-1"
                          : "from-[#D99B26] via-[#0F2B82]/30 to-[#0F2B82] [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] rotate-2 group-hover:rotate-1"
                      } opacity-25 group-hover:opacity-50 transition-all duration-500 transform scale-105`}
                    />

                    <div
                      className={`relative h-[380px] sm:h-[420px] overflow-hidden ${
                        isEven
                          ? "[clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] rotate-2"
                          : "[clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] -rotate-2"
                      } shadow-2xl transform group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900`}
                    >
                      <SafeImage
                        src={service.featuredImageUrl || "/images/projects/FB_IMG_1782343190705.jpg"}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    </div>

                    <div
                      className={`absolute -bottom-1 ${
                        isEven ? "right-8" : "left-8"
                      } bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30`}
                    >
                      {cornerBadge}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
