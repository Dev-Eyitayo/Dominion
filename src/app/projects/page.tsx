"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: "1",
      status: "completed",
      tag: "COMPLETED",
      title: "Housing Estate Multi-Structure Development",
      desc: "Large-scale estate civil blockwork, substructure raft foundation casting, reinforced concrete decking, and structural framing.",
      location: "OYO STATE, SOUTH-WEST NIGERIA",
      img: "/images/projects/FB_IMG_1782343190705.jpg",
    },
    {
      id: "2",
      status: "completed",
      tag: "COMPLETED",
      title: "Highway Earthworks & Vibratory Compaction",
      desc: "Heavy soil stabilization, sub-base gravel leveling, and heavy-duty roller compaction operations.",
      location: "REGIONAL TRANSPORT CORRIDOR",
      img: "/images/projects/FB_IMG_1782363598182.jpg",
    },
    {
      id: "3",
      status: "completed",
      tag: "COMPLETED",
      title: "Asphalt Highway Paving & Roadway Kerbing",
      desc: "Bituminous asphalt wearing course application, shoulder grading, and precision precast kerb alignment.",
      location: "SOUTH-WEST TRUNK ROAD",
      img: "/images/projects/FB_IMG_1782363608838.jpg",
    },
    {
      id: "4",
      status: "completed",
      tag: "COMPLETED",
      title: "33kV / 11kV Grid Pole Rigging & Line Stringing",
      desc: "HIAB crane transport, positioning, and overhead conductor stringing for regional distribution networks.",
      location: "DISTRIBUTION NETWORK HUB",
      img: "/images/precast/pole-transport.jpg",
    },
    {
      id: "5",
      status: "completed",
      tag: "COMPLETED",
      title: "Commercial Solar Street Lighting & Mini-Grids",
      desc: "Turnkey solar PV panel mounting, high-efficiency LED luminaires, lithium storage, and smart telemetry.",
      location: "URBAN & RURAL SCHEMES",
      img: "/images/services/solar-installation.jpg",
    },
    {
      id: "6",
      status: "completed",
      tag: "COMPLETED",
      title: "High Tension (HT) & Low Tension (LT) Poles",
      desc: "Mass casting and curing of 8.5m, 10m, and 11m reinforced concrete electric poles matching DISCO specifications.",
      location: "OYO–OGBOMOSO FACTORY PLANT",
      img: "/images/precast/electric-poles.jpg",
    },
    {
      id: "7",
      status: "completed",
      tag: "COMPLETED",
      title: "Concrete Stay Blocks & Anchor Slabs",
      desc: "Standardized high-density concrete stay blocks engineered with center guide holes for HT/LT stay wire support.",
      location: "MANUFACTURING YARD",
      img: "/images/precast/stay-blocks.jpg",
    },
    {
      id: "8",
      status: "completed",
      tag: "COMPLETED",
      title: "Precast Drainage Channels & Custom Moulds",
      desc: "Heavy-duty storm water drains, road median kerbs, and specialized precast architectural elements.",
      location: "PRECAST PRODUCTION YARD",
      img: "/images/precast/concrete-yard.jpg",
    },
    {
      id: "9",
      status: "completed",
      tag: "COMPLETED",
      title: "Residential Electrification & Architectural Lighting",
      desc: "Complete modern internal wiring, distribution boards, exterior architectural lighting, and surge protection.",
      location: "ESTATE RESIDENCES",
      img: "/images/projects/FB_IMG_1782363963623.jpg",
    },
    {
      id: "10",
      status: "completed",
      tag: "COMPLETED",
      title: "Classical Villa Framework & Precast Columns",
      desc: "High-end residential construction featuring precast structural columns, stone architraves, and stepped roofing.",
      location: "PRIVATE DEVELOPMENT",
      img: "/images/projects/FB_IMG_1782363996414.jpg",
    },
  ];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/FB_IMG_1782343190705.jpg"
            alt="Executed Projects"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            TRACK RECORD &amp; EXECUTED PROJECTS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Engineering Project Portfolio
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            A gallery of executed civil developments, high-voltage rural electrification schemes, solar renewable IT mini-grids, and precast supply consignments.
          </p>
        </div>
      </section>

      {/* Filterable Projects Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Status Filters: All, Completed, Ongoing */}
          <div className="flex flex-wrap items-center gap-2 mb-16 pb-6 border-b border-slate-200">
            {[
              { id: "all", label: "ALL PROJECTS" },
              { id: "completed", label: "COMPLETED PROJECTS" },
              { id: "ongoing", label: "ONGOING PROJECTS" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`font-mono text-xs uppercase tracking-widest px-6 py-3 transition-colors ${
                  activeFilter === f.id
                    ? "bg-[#0F2B82] text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid or Empty Ongoing State */}
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
                <div
                  key={item.id}
                  className="group bg-white border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300"
                >
                  <div className="h-60 overflow-hidden bg-slate-100 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 group-hover:bg-[#D99B26] text-slate-900 group-hover:text-slate-950 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 group-hover:text-slate-200 text-xs leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <div className="text-[11px] font-mono text-[#0F2B82] group-hover:text-[#D99B26] font-bold">
                      LOCATION: {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
