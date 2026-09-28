"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function PrecastSection() {
  const products = [
    {
      name: "Concrete Electric Poles (LT & HT)",
      desc: "Vibrated high-strength reinforced concrete poles for low tension (LT) and high tension (HT) overhead electrical distribution.",
      specs: "8.5m, 10m, 11m & Custom Dimensions",
      image: "/images/precast/electric-poles.jpg",
    },
    {
      name: "Precast Stay Blocks & Anchor Slabs",
      desc: "Engineered foundation anchor blocks ensuring rigid structural tension support for utility poles and transmission towers.",
      specs: "High Load Resistance • Anti-Corrosive",
      image: "/images/precast/stay-blocks.jpg",
    },
    {
      name: "Road Kerbs & Drainage Covers",
      desc: "Precision cast kerbs, culvert slabs, and interlocking stormwater drainage covers built for highway and estate road networks.",
      specs: "Standard Highway & Custom Profiles",
      image: "/images/precast/concrete-yard.jpg",
    },
    {
      name: "Manhole Rings & Custom Precasts",
      desc: "Modular manhole access rings, covers, and tailored precast structural components fabricated to client architectural specifications.",
      specs: "Bespoke Moulding • Fleet Dispatch",
      image: "/images/precast/pole-transport.jpg",
    },
  ];

  return (
    <section id="precast" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 font-bold mb-4">
              CONCRETE &amp; PRECAST PRODUCTION
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
              Engineered for Durability. <br className="hidden sm:inline" />
              Manufactured with Precision.
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-sm sm:text-base leading-relaxed">
            Operating from our dedicated manufacturing plant along the Oyo–Ogbomoso Expressway, Dominion produces high-grade precast solutions meeting strict national infrastructure standards.
          </p>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-[#0F2B82] transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-[11px] font-mono text-white bg-black/50 px-2.5 py-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#D99B26]" />
                  <span>Quality Tested Batch</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F2B82] transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-mono text-slate-500">
                    <strong className="text-slate-700">Specs:</strong> {item.specs}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Spotlight Banner */}
        <div className="bg-[#070D1F] text-white p-8 sm:p-12 lg:p-14 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D99B26] block mb-2">
                DIRECT FROM FACTORY YARD
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3">
                Precast Production Plant &amp; HIAB Dispatch Logistics
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Located at No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway. Direct contractor loading and nationwide flatbed transport.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/manufacturing"
                  className="bg-[#D99B26] hover:bg-[#F5B041] text-slate-950 text-xs font-bold uppercase tracking-widest px-6 py-3.5 transition-colors"
                >
                  VIEW FULL CATALOG
                </Link>
                <Link
                  href="/contact#quote"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 border border-white/20 transition-colors"
                >
                  REQUEST FACTORY RATE CARD
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 border border-white/20 p-2 bg-slate-900 h-52 relative">
              <Image
                src="/images/precast/pole-transport.jpg"
                alt="Pole Transport Logistics"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
