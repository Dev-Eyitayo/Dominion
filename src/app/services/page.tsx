import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

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
    "engineering Bill of Quantities BoQ consultant"
  ],
};

export default function ServicesPage() {
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
          
          {/* 01: Civil & Building */}
          <div id="civil" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center -rotate-6 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">01</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                STRUCTURAL &amp; HEAVY CIVIL
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Civil Engineering &amp; Building Construction
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Dominion executes complex structural, commercial, and residential projects with strict adherence to British and Nigerian standard codes of practice. Our civil division integrates soil mechanics, structural analysis, and certified site management.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">Commercial &amp; Industrial Edifices</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Drainage Channels &amp; Culverts</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Road Pavements &amp; Kerbing</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Structural Renovation &amp; Retrofit</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                DISCUSS CIVIL TENDER
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B82] via-[#0F2B82]/30 to-[#D99B26] [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform -rotate-2 group-hover:-rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/projects/FB_IMG_1782343190705.jpg"
                    alt="Civil Construction Project"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 right-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  CIVIL DIVISION 01
                </div>
              </div>
            </div>
          </div>

          {/* 02: Electrical Power */}
          <div id="electrical" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-100 pt-24">
            <div className="lg:col-span-6 lg:order-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center rotate-3 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">02</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                HIGH &amp; LOW VOLTAGE GRID
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Electrical Power &amp; Substation Engineering
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Specialized high-voltage overhead distribution (11kV / 33kV), step-down transformer injection substations, industrial power cabling, switchgear installation, and rural electrification networks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">11kV &amp; 33kV HT Line Stringing</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Transformer Substation Mounting</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Industrial Switchgear &amp; Panels</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Earthing &amp; Surge Protection Systems</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                DISCUSS ELECTRICAL SCOPE
              </Link>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D99B26] via-[#0F2B82]/30 to-[#0F2B82] [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform rotate-2 group-hover:rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/precast/pole-transport.jpg"
                    alt="Electrical Power and HT Pole Erection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 left-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  GRID ENGINEERING 02
                </div>
              </div>
            </div>
          </div>

          {/* 03: Solar Renewable */}
          <div id="solar" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-100 pt-24">
            <div className="lg:col-span-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center -rotate-3 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">03</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                CLEAN ENERGY &amp; AUTOMATION
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Solar Renewable Energy &amp; IT Solutions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Custom engineered commercial solar mini-grids, battery energy storage systems (BESS), solar-powered highway street lighting schemes, and smart industrial automation networks designed to slash operational diesel expenses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">Commercial Solar Mini-Grids</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Highway Solar Street Lighting</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Industrial Lithium BESS Arrays</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Remote Telemetry &amp; Monitoring</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                REQUEST SOLAR QUOTE
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B82] via-[#0F2B82]/30 to-[#D99B26] [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform -rotate-2 group-hover:-rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/services/solar-installation.jpg"
                    alt="Commercial Solar Installation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 right-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  SOLAR RENEWABLE 03
                </div>
              </div>
            </div>
          </div>

          {/* 04: Consultancy & Equipment Leasing */}
          <div id="consultancy" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-100 pt-24">
            <div className="lg:col-span-6 lg:order-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center rotate-6 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">04</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                TECHNICAL ADVISORY &amp; MACHINERY
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Consultancy, BoQ &amp; Heavy Equipment Leasing
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Comprehensive Bill of Quantities (BoQ) drafting, feasibility studies, project management consultancy, and direct leasing of heavy road rollers, compactors, concrete batchers, and HIAB pole crane trucks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">Detailed BoQ &amp; Cost Estimation</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Vibratory Soil Compactors</div>
                <div className="p-3 bg-slate-50 border border-slate-200">HIAB Crane Trucks for Pole Delivery</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Technical Site Audits</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                LEASE MACHINERY / GET BOQ
              </Link>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D99B26] via-[#0F2B82]/30 to-[#0F2B82] [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform rotate-2 group-hover:rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/projects/FB_IMG_1782363598182.jpg"
                    alt="Heavy Compactor and Road Construction Equipment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 left-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  PLANT LEASING 04
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
