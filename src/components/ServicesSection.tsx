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
    slug: "engineering-design-consultancy",
    categoryBadge: "Core Services",
    title: "Engineering Design & Consultancy",
    summary: "Provide innovative, efficient, and sustainable engineering design solutions for diverse projects, focusing on client needs and environmental responsibility.",
  },
  {
    slug: "construction-civil-engineering-services",
    categoryBadge: "Core Services",
    title: "Construction & Civil Engineering Services",
    summary: "Specialize in building infrastructure designed to stand the test of time, ensuring structural integrity and long-term durability in all constructed projects.",
  },
  {
    slug: "electrical-engineering-services",
    categoryBadge: "Core Services",
    title: "Electrical Engineering Services",
    summary: "Offer comprehensive solutions for power systems, installations, and maintenance, ensuring reliable and efficient electrical infrastructure for client facilities.",
  },
  {
    slug: "power-solar-energy-solutions",
    categoryBadge: "Core Services",
    title: "Power & Solar Energy Solutions",
    summary: "Deliver sustainable, renewable energy solutions with a primary focus on designing and implementing solar and other eco-friendly power systems for a greener future.",
  },
  {
    slug: "concrete-precast",
    categoryBadge: "Core Services",
    title: "Concrete & Precast",
    summary: "Manufacture high-quality concrete products, including poles, blocks, kerbs, and slabs, ensuring robust components are readily available for diverse construction projects.",
  },
  {
    slug: "project-management",
    categoryBadge: "Core Services",
    title: "Project Management",
    summary: "Deliver efficient project planning, coordination, and execution from initiation to completion, ensuring projects are delivered on time, within budget, and to specified quality standards.",
  },
  {
    slug: "real-estate-development",
    categoryBadge: "Core Services",
    title: "Real Estate Development",
    summary: "Oversee the development of residential, commercial, and industrial properties, transforming potential sites into successful real estate projects that meet market demands.",
  },
  {
    slug: "equipment-leasing-services",
    categoryBadge: "Core Services",
    title: "Equipment Leasing & Services",
    summary: "Provide a reliable range of equipment leasing and support services, offering clients access to essential tools and machinery for their projects without the burden of ownership.",
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
