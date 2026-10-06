import { WhyChooseUsData, DEFAULT_WHY_CHOOSE_US } from "@/lib/settings/types";

interface WhyChooseUsProps {
  data?: WhyChooseUsData;
}

export default function WhyChooseUs({ data = DEFAULT_WHY_CHOOSE_US }: WhyChooseUsProps) {
  const currentData = data || DEFAULT_WHY_CHOOSE_US;
  const pillars = currentData.pillars && currentData.pillars.length > 0
    ? currentData.pillars
    : DEFAULT_WHY_CHOOSE_US.pillars;

  return (
    <section id="why-us" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 font-bold mb-4">
            {currentData.badge || "THE DOMINION ADVANTAGE"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            {currentData.title || "Why Choose Us"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            {currentData.subtitle || "We combine technical ingenuity with proven operational discipline to deliver enduring infrastructure for government agencies, corporate institutions, and private developers."}
          </p>
        </div>

        {/* 2x2 Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.num || idx}
              className="p-8 bg-white border border-slate-200 hover:border-[#0F2B82] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 text-[#0F2B82] flex items-center justify-center font-mono font-bold text-xs mb-4">
                {pillar.num}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
