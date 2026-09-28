"use client";

import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: "civil",
      num: "01",
      badge: "CIVIL & STRUCTURES",
      title: "Construction & Civil Engineering",
      desc: "Commercial multi-storey construction, raft and deep foundation engineering, and arterial stormwater drainage channels engineered to exact load specifications.",
      href: "/services#civil",
      btn: "EXPLORE CIVIL SCOPE",
      rotate: "-rotate-6",
    },
    {
      id: "electrical",
      num: "02",
      badge: "POWER & TRANSMISSION",
      title: "Electrical Engineering Services",
      desc: "High Voltage (HT) and Low Voltage (LT) grid distribution, 33kV/11kV substation erection, industrial cable networking, switchgear installation, and precision load testing.",
      href: "/services#electrical",
      btn: "EXPLORE ELECTRICAL SCOPE",
      rotate: "rotate-3",
    },
    {
      id: "solar",
      num: "03",
      badge: "RENEWABLE & IT",
      title: "Solar Power & IT Solutions",
      desc: "Turnkey commercial solar mini-grids, highway solar street lighting installations, smart lithium storage integration, and remote automated power monitoring systems.",
      href: "/services#solar",
      btn: "EXPLORE SOLAR SCOPE",
      rotate: "-rotate-3",
    },
    {
      id: "consultancy",
      num: "04",
      badge: "CONSULTANCY & BOQ",
      title: "Engineering Consultancy",
      desc: "Detailed structural engineering calculations, architectural plans, transparent Bills of Quantities (BoQ), statutory compliance guidance, and project supervision.",
      href: "/services#consultancy",
      btn: "EXPLORE CONSULTANCY",
      rotate: "rotate-6",
    },
    {
      id: "leasing",
      num: "05",
      badge: "PLANT & MACHINERY",
      title: "Equipment Leasing Services",
      desc: "Heavy construction equipment for contractor lease including plate compactors, poker vibrators, concrete batching mixers, earth-moving machinery, and lifting cranes.",
      href: "/services#leasing",
      btn: "EXPLORE PLANT HIRE",
      rotate: "-rotate-4",
    },
    {
      id: "manufacturing",
      num: "06",
      badge: "INFRASTRUCTURE MANUFACTURING",
      title: "Manufacturing & Precast Hub",
      desc: "High-tensile vibrated electric poles (LT & HT), road kerbs, drainage channels, and stay blocks manufactured at our dedicated Oyo State production facility.",
      href: "/manufacturing",
      btn: "EXPLORE MANUFACTURING",
      rotate: "rotate-4",
    },
  ];

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
              Integrated Engineering Services
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-sm leading-relaxed">
            Full-lifecycle civil construction, high-voltage electrification, smart solar mini-grids, and equipment leasing handled by licensed engineers.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white hover:bg-[#0F2B82] p-8 pt-12 border border-slate-200 hover:border-[#0F2B82] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Circular Floating Badge */}
              <div
                className={`absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] text-slate-900 group-hover:text-slate-950 font-mono font-bold text-xs flex items-center justify-center transform ${item.rotate} group-hover:rotate-0 transition-transform`}
              >
                {item.num}
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#D99B26] mb-2 font-bold">
                  {item.badge}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-white transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-200 transition-colors leading-relaxed mb-8">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 group-hover:border-white/15">
                <Link
                  href={item.href}
                  className="inline-block text-xs font-bold uppercase tracking-widest text-[#0F2B82] group-hover:text-[#D99B26] transition-colors"
                >
                  {item.btn}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
