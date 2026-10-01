"use client";

import { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export interface PublicProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  tag: string;
  location: string;
  client?: string | null;
  summary: string;
  contentHtml: string;
  featuredImageUrl: string;
  galleryImages?: Array<{ url: string; caption?: string }> | null;
  status: string;
  isFeatured: boolean;
  displayOrder: number;
}

interface PublicProjectsClientProps {
  initialProjects: PublicProjectItem[];
}

export default function PublicProjectsClient({ initialProjects }: PublicProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = initialProjects.filter((p) => {
    const matchesStatus = activeFilter === "all" ? true : p.status === activeFilter;
    const matchesCategory = categoryFilter === "all" ? true : p.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const categoryOptions = [
    { id: "all", label: "ALL CAPABILITIES" },
    { id: "civil", label: "CIVIL & ROADS" },
    { id: "electrical", label: "GRID & POWER" },
    { id: "solar", label: "SOLAR & TELEMETRY" },
    { id: "manufacturing", label: "PRECAST CONCRETE" },
  ];

  return (
    <div className="bg-white">
      {/* Filters Bar: Status & Category */}
      <div className="space-y-6 mb-16 pb-6 border-b border-slate-200">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "ALL STATUSES" },
            { id: "completed", label: "COMPLETED WORKS" },
            { id: "ongoing", label: "ACTIVE / IN-PROGRESS" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 transition-colors cursor-pointer ${
                activeFilter === f.id
                  ? "bg-[#0F2B82] text-white font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold mr-2">
            Sector Filter:
          </span>
          {categoryOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 border transition-all cursor-pointer ${
                categoryFilter === c.id
                  ? "border-[#0F2B82] bg-[#0F2B82]/5 text-[#0F2B82] font-bold"
                  : "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 p-10 sm:p-16 text-center max-w-3xl mx-auto my-8">
          <div className="inline-block bg-[#0F2B82] text-[#D99B26] font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-6">
            ACTIVE CAPACITY &amp; MOBILIZATION
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-4">
            We Are Open to Taking on New Projects
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our engineering teams, specialized machinery fleet, and concrete precast production lines are primed for immediate deployment across Nigeria. Let&apos;s collaborate on your upcoming civil, power, solar, or infrastructure project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact#quote"
              className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors"
            >
              CONTACT US FOR YOUR PROJECT
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors"
            >
              REQUEST A QUOTE
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/projects/${item.slug}`}
              className="group bg-white border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Featured Photo Banner */}
                <div className="h-60 overflow-hidden bg-slate-100 relative">
                  <SafeImage
                    src={item.featuredImageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 group-hover:bg-[#D99B26] text-slate-900 group-hover:text-slate-950 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-xs">
                    {item.tag}
                  </div>
                  {item.galleryImages && item.galleryImages.length > 0 && (
                    <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white font-mono text-[10px] px-2 py-0.5 font-semibold">
                      +{item.galleryImages.length} Photos
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 group-hover:text-slate-200 text-xs leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between">
                <div className="text-[11px] font-mono text-[#0F2B82] group-hover:text-[#D99B26] font-bold truncate max-w-[200px]">
                  {item.location}
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                  CASE STUDY →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
