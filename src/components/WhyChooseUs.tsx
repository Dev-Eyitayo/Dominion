"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";

export default function WhyChooseUs() {
  const pillars = [
    {
      num: "01",
      title: "Multidisciplinary Engineering Team",
      desc: "Licensed civil, structural, and electrical engineers working in synergy with certified project managers to ensure rigorous technical precision on every build.",
    },
    {
      num: "02",
      title: "Strict Quality Assurance (QA/QC)",
      desc: "All concrete batches, electrical schematics, and structural foundations undergo strict laboratory and field load testing before project deployment.",
    },
    {
      num: "03",
      title: "Certified Health, Safety & HSE Standard",
      desc: "Zero-compromise safety culture on active sites. We maintain full statutory compliance with NSITF, ITF, and standard occupational health protocols.",
    },
    {
      num: "04",
      title: "On-Budget & Timely Project Delivery",
      desc: "Transparent Bills of Quantities (BoQ), realistic milestones, and proactive supply chain management to eliminate contractor delays and unexpected costs.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 font-bold mb-4">
            THE DOMINION ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            Why Choose Dominion Integrated
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            We combine technical ingenuity with proven operational discipline to deliver enduring infrastructure for government agencies, corporate institutions, and private developers.
          </p>
        </div>

        {/* 2x2 Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
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
