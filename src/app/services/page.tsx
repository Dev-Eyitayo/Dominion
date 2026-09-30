import Image from "next/image";
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
  civil: "DISCUSS CIVIL TENDER",
  electrical: "DISCUSS ELECTRICAL SCOPE",
  solar: "REQUEST SOLAR QUOTE",
  consultancy: "LEASE MACHINERY / GET BOQ",
};

const CORNER_BADGE_MAP: Record<string, string> = {
  civil: "CIVIL DIVISION 01",
  electrical: "GRID ENGINEERING 02",
  solar: "SOLAR RENEWABLE 03",
  consultancy: "PLANT LEASING 04",
};

const ROTATION_CLASSES = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6"];

export default async function ServicesPage() {
  // Query services ordered by displayOrder
  const services = await db
    .select()
    .from(engineeringServices)
    .orderBy(asc(engineeringServices.displayOrder));

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
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
            CORE ENGINEERING PRACTICES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Integrated Multidisciplinary Services
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
            const deliverables = service.deliverables || [];

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
                      <Image
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
