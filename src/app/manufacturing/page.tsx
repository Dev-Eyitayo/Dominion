import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing & Precast Concrete Products Factory Oyo",
  description:
    "Buy high-tensile reinforced concrete electric poles (LT & HT 8.5m, 10m, 11m), stay blocks, anchor slabs, and road drainage kerbs direct from Dominion's manufacturing plant along Oyo–Ogbomoso Expressway. DisCo compliant with nationwide HIAB delivery.",
  keywords: [
    "concrete electric poles Oyo State",
    "buy electric poles Nigeria",
    "8.5m LT concrete poles price",
    "10m 11m HT concrete poles Oyo",
    "concrete poles manufacturer South West Nigeria",
    "precast stay blocks Oyo",
    "precast road kerbs and drainage slabs",
    "DisCo approved poles manufacturer",
    "concrete pole plant Oyo Ogbomoso expressway",
    "infrastructure manufacturing Nigeria"
  ],
};

export default function ManufacturingPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/precast/electric-poles.jpg"
            alt="Dominion Manufacturing Plant"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            HEAVY PRODUCTION YARD &amp; MOULDING PLANT
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Manufacturing &amp; Precast Concrete
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            High-load concrete electric poles (LT &amp; HT), anchor stay blocks, road kerbs, and bespoke moulds manufactured directly at our Oyo State production facility.
          </p>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* 01: Electric Poles */}
          <div id="poles" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center -rotate-6 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">01</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                OVERHEAD UTILITY INFRASTRUCTURE
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Concrete Electric Poles (LT &amp; HT)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Engineered with high-tensile steel reinforcing cages and precision machine vibration to eliminate voids. Designed to meet DisCo standards for Low Tension (LT) and High Tension (HT) overhead electrical grids.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200"><strong>8.5m LT Poles:</strong> 400V Distribution</div>
                <div className="p-3 bg-slate-50 border border-slate-200"><strong>10.0m HT Poles:</strong> 11kV Power Lines</div>
                <div className="p-3 bg-slate-50 border border-slate-200"><strong>11.0m HT Poles:</strong> 33kV Transmission</div>
                <div className="p-3 bg-slate-50 border border-slate-200"><strong>Reinforcement:</strong> Ribbed Rebar Cages</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                ORDER ELECTRIC POLES
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B82] via-[#0F2B82]/30 to-[#D99B26] [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform -rotate-2 group-hover:-rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/precast/electric-poles.jpg"
                    alt="Precast Concrete Electric Poles"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 right-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  PRECAST SPEC 01
                </div>
              </div>
            </div>
          </div>

          {/* 02: Stay Blocks */}
          <div id="blocks" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-100 pt-24">
            <div className="lg:col-span-6 lg:order-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center rotate-3 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">02</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                STRUCTURAL GROUND ANCHORAGE
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Precast Stay Blocks &amp; Anchor Slabs
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Heavy-density precast concrete stay blocks engineered to provide solid ground tension anchorage for overhead electrical line turns, terminal angle poles, and transformer substations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">High-Density Mix Design</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Anti-Corrosion Additives</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Guy Wire Anchor Eye Bolts</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Substation Foundation Pads</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                ORDER STAY BLOCKS
              </Link>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D99B26] via-[#0F2B82]/30 to-[#0F2B82] [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform rotate-2 group-hover:rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/precast/stay-blocks.jpg"
                    alt="Precast Stay Blocks"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 left-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  ANCHORAGE SPEC 02
                </div>
              </div>
            </div>
          </div>

          {/* 03: Kerbs & Drainage */}
          <div id="kerbs" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-100 pt-24">
            <div className="lg:col-span-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center -rotate-3 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">03</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                HIGHWAY &amp; URBAN DRAINAGE
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Road Kerbs, Slabs &amp; Drainage Channels
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Durable precast road kerbs, culvert cover slabs, and U-drain channels manufactured for estate roads, municipal corridors, and industrial access pavements with high impact resistance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">Standard Highway Kerbs</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Barrier &amp; Mountable Kerbs</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Heavy-Load Culvert Slabs</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Drainage Channels &amp; Moulds</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                ORDER ROAD KERBS
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B82] via-[#0F2B82]/30 to-[#D99B26] [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform -rotate-2 group-hover:-rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/precast/concrete-yard.jpg"
                    alt="Precast Drainage Channels and Kerbs Yard"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 right-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  DRAINAGE SPEC 03
                </div>
              </div>
            </div>
          </div>

          {/* 04: Custom Precasts & Logistics */}
          <div id="custom" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-100 pt-24">
            <div className="lg:col-span-6 lg:order-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center rotate-6 mb-6">
                <span className="font-mono text-sm font-bold text-slate-900">04</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-2">
                FLEET &amp; BESPOKE FABRICATION
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                HIAB Crane Logistics &amp; Custom Moulds
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                End-to-end transport dispatch with Dominion HIAB crane trucks for safe offloading, direct hole planting, modular sewer manholes, and bespoke architectural elements.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                <div className="p-3 bg-slate-50 border border-slate-200">HIAB Crane Trucks On-Site</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Bespoke Architectural Casts</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Direct Factory Dispatch</div>
                <div className="p-3 bg-slate-50 border border-slate-200">Bulk Contractor Pricing</div>
              </div>
              <Link href="/contact#quote" className="inline-block bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
                INQUIRE CUSTOM MOULDS
              </Link>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="relative group py-6 px-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D99B26] via-[#0F2B82]/30 to-[#0F2B82] [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform rotate-2 group-hover:rotate-1 scale-105" />
                <div className="relative h-[380px] sm:h-[420px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_100%,14%_100%)] shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src="/images/precast/pole-transport.jpg"
                    alt="Dominion HIAB Crane Truck Pole Logistics"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute -bottom-1 left-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg border border-[#D99B26]/30">
                  LOGISTICS SPEC 04
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
