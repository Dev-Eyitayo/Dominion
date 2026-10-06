"use client";

import Link from "next/link";

export interface ServiceItemProp {
  id?: string | number;
  slug?: string;
  title: string;
  categoryBadge?: string | null;
  summary?: string | null;
  desc?: string;
  href?: string;
}

interface ServicesSectionProps {
  services?: ServiceItemProp[];
}

const DEFAULT_SERVICES: ServiceItemProp[] = [
  {
    slug: "civil",
    categoryBadge: "CIVIL & STRUCTURES",
    title: "Construction & Civil Engineering",
    summary: "Commercial multi-storey construction, raft and deep foundation engineering, and arterial stormwater drainage channels engineered to exact load specifications.",
  },
  {
    slug: "electrical",
    categoryBadge: "POWER & TRANSMISSION",
    title: "Electrical Engineering Services",
    summary: "High Voltage (HT) and Low Voltage (LT) grid distribution, 33kV/11kV substation erection, industrial cable networking, switchgear installation, and precision load testing.",
  },
  {
    slug: "solar",
    categoryBadge: "RENEWABLE & IT",
    title: "Solar Power & IT Solutions",
    summary: "Turnkey commercial solar mini-grids, highway solar street lighting installations, smart lithium storage integration, and remote automated power monitoring systems.",
  },
  {
    slug: "consultancy",
    categoryBadge: "CONSULTANCY & BOQ",
    title: "Engineering Consultancy",
    summary: "Detailed structural engineering calculations, architectural plans, transparent Bills of Quantities (BoQ), statutory compliance guidance, and project supervision.",
  },
  {
    slug: "leasing",
    categoryBadge: "PLANT & MACHINERY",
    title: "Equipment Leasing Services",
    summary: "Heavy construction equipment for contractor lease including plate compactors, poker vibrators, concrete batching mixers, earth-moving machinery, and lifting cranes.",
  },
  {
    slug: "manufacturing",
    categoryBadge: "INFRASTRUCTURE MANUFACTURING",
    title: "Manufacturing & Precast Hub",
    summary: "High-tensile vibrated electric poles (LT & HT), road kerbs, drainage channels, and stay blocks manufactured at our dedicated Oyo State production facility.",
    href: "/manufacturing",
  },
];

const ROTATIONS = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6", "-rotate-4", "rotate-4"];

export default function ServicesSection({ services = DEFAULT_SERVICES }: ServicesSectionProps) {
  const displayServices = services && services.length > 0 ? services : DEFAULT_SERVICES;

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] mb-3">
              CORE BUSINESS PILLARS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
              Our Services
            </h2>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayServices.map((item, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const badge = item.categoryBadge || "ENGINEERING SCOPE";
            const desc = item.summary || item.desc || "";
            const href = item.href || (item.slug === "manufacturing" ? "/manufacturing" : `/services#${item.slug}`);
            const btnText = `EXPLORE ${badge.split("&")[0].trim()} SCOPE`;
            const rotation = ROTATIONS[idx % ROTATIONS.length];

            return (
              <div
                key={item.slug || item.id || idx}
                className="group relative bg-white hover:bg-[#0F2B82] p-8 pt-12 border border-slate-200 hover:border-[#0F2B82] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Circular Floating Badge */}
                <div
                  className={`absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] text-slate-900 group-hover:text-slate-950 font-mono font-bold text-xs flex items-center justify-center transform ${rotation} group-hover:rotate-0 transition-transform`}
                >
                  {num}
                </div>

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#D99B26] mb-2 font-bold">
                    {badge}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-white transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 group-hover:text-slate-200 transition-colors leading-relaxed mb-8">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 group-hover:border-white/15">
                  <Link
                    href={href}
                    className="inline-block text-xs font-bold uppercase tracking-widest text-[#0F2B82] group-hover:text-[#D99B26] transition-colors"
                  >
                    {btnText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
