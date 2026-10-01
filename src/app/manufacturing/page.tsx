import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { Metadata } from "next";
import { db } from "@/db";
import { manufacturingProducts } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const revalidate = 60; // ISR 60 seconds

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
    "infrastructure manufacturing Nigeria",
  ],
};

const CATEGORY_TAG_MAP: Record<string, string> = {
  poles: "OVERHEAD UTILITY INFRASTRUCTURE",
  blocks: "STRUCTURAL GROUND ANCHORAGE",
  kerbs: "HIGHWAY & URBAN DRAINAGE",
  drainage: "HIGHWAY & URBAN DRAINAGE",
  custom: "FLEET & BESPOKE FABRICATION",
};

const BUTTON_LABEL_MAP: Record<string, string> = {
  poles: "ORDER ELECTRIC POLES",
  blocks: "ORDER STAY BLOCKS",
  kerbs: "ORDER ROAD KERBS",
  drainage: "ORDER DRAINAGE KERBS",
  custom: "INQUIRE CUSTOM MOULDS",
};

const ROTATION_CLASSES = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6"];

export default async function ManufacturingPage() {
  // Query active products ordered by displayOrder
  const products = await db
    .select()
    .from(manufacturingProducts)
    .where(eq(manufacturingProducts.isAvailable, true))
    .orderBy(asc(manufacturingProducts.displayOrder));

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <SafeImage
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
          {products.map((product, idx) => {
            const isEven = idx % 2 === 0;
            const numberBadge = String(idx + 1).padStart(2, "0");
            const rotationClass = ROTATION_CLASSES[idx % ROTATION_CLASSES.length];
            const overheadTag =
              CATEGORY_TAG_MAP[product.category] || "PRECAST CONCRETE MANUFACTURING";
            const buttonLabel =
              BUTTON_LABEL_MAP[product.category] || "REQUEST QUOTATION";
            const cornerBadge = `PRECAST SPEC ${numberBadge}`;
            const specsEntries = Object.entries(product.technicalSpecs || {});

            return (
              <div
                key={product.id}
                id={product.category}
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
                    {overheadTag}
                  </span>

                  <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                    {product.title}
                  </h2>

                  <div
                    className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />

                  {/* Technical Specs 4-Cell Grid */}
                  {specsEntries.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-800 mb-8">
                      {specsEntries.map(([specKey, specVal], specIdx) => (
                        <div
                          key={specIdx}
                          className="p-3 bg-slate-50 border border-slate-200"
                        >
                          <strong>{specKey}:</strong> {specVal}
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
                      <SafeImage
                        src={product.imageUrl || "/images/precast/electric-poles.jpg"}
                        alt={product.title}
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
