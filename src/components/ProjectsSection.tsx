"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";

interface FeaturedProject {
  title: string;
  slug?: string;
  category: string;
  location: string;
  scope: string;
  image: string;
}

interface ProjectsSectionProps {
  initialProjects?: FeaturedProject[];
}

const defaultProjects: FeaturedProject[] = [
  {
    title: "Housing Estate Multi-Structure Development",
    slug: "housing-estate-multi-structure-development",
    category: "civil",
    location: "Oyo State",
    scope: "Substructure & Superstructure Concrete Blockwork",
    image: "/images/projects/FB_IMG_1782343190705.jpg",
  },
  {
    title: "Commercial Solar Street Lighting & Mini-Grids",
    slug: "commercial-solar-street-lighting-mini-grids",
    category: "electrical",
    location: "South-West Nigeria",
    scope: "Turnkey Photovoltaic & Battery Integration",
    image: "/images/services/solar-installation.jpg",
  },
  {
    title: "High Tension (HT) Electric Pole Batching",
    slug: "ht-lt-concrete-electric-poles-production",
    category: "precast",
    location: "Oyo–Ogbomoso Production Plant",
    scope: "Heavy Reinforced Concrete Electric Poles",
    image: "/images/precast/electric-poles.jpg",
  },
  {
    title: "Highway Earthworks & Compaction Operations",
    slug: "highway-earthworks-vibratory-compaction",
    category: "civil",
    location: "South-West Corridor",
    scope: "Heavy Road Base Vibratory Compaction & Grading",
    image: "/images/projects/FB_IMG_1782363598182.jpg",
  },
  {
    title: "Asphalt Highway Paving & Road Shoulders",
    slug: "asphalt-highway-paving-roadway-kerbing",
    category: "civil",
    location: "Regional Corridor",
    scope: "Bituminous Asphalt Surfacing & Kerbing",
    image: "/images/projects/FB_IMG_1782363608838.jpg",
  },
  {
    title: "33kV / 11kV Power Pole Delivery & Rigging",
    slug: "33kv-11kv-grid-pole-rigging-line-stringing",
    category: "electrical",
    location: "Distribution Network Hub",
    scope: "Crane Hoist Transport & Line Erection",
    image: "/images/precast/pole-transport.jpg",
  },
];

export default function ProjectsSection({ initialProjects = defaultProjects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "ALL WORKS" },
    { id: "civil", label: "CIVIL & BUILDING" },
    { id: "electrical", label: "ELECTRICAL & SOLAR" },
    { id: "precast", label: "CONCRETE & PRECAST" },
  ];

  const filteredProjects =
    activeTab === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-3">
              PORTFOLIO OF EXECUTION
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineering in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Browse our portfolio of completed and ongoing infrastructure developments across Nigeria.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wider transition-all border cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-[#0F2B82] text-white border-[#0F2B82]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#0F2B82] hover:text-[#0F2B82]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Link
              key={idx}
              href={project.slug ? `/projects/${project.slug}` : "/projects"}
              className="group relative bg-white border border-slate-200 hover:border-[#0F2B82] transition-colors flex flex-col h-[380px] overflow-hidden"
            >
              <div className="relative w-full h-[220px] overflow-hidden bg-slate-100">
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block px-3 py-1 bg-slate-900/90 text-[10px] font-mono uppercase tracking-wider text-[#D99B26] font-bold">
                    {project.location}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white group-hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#0F2B82] font-semibold mb-1">
                    {project.scope}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F2B82] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-900 font-bold">
                    SPECIFICATION VERIFIED
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0F2B82]">
                    VIEW →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-block px-8 py-3.5 bg-[#0F2B82] hover:bg-slate-900 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all border border-[#0F2B82]"
          >
            VIEW COMPLETE PROJECTS 
          </Link>
        </div>
      </div>
    </section>
  );
}
