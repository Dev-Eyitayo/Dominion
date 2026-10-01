"use client";

import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function AboutSection() {
  const coreValues = [
    "Integrity & Safety First",
    "Engineering Excellence",
    "Technological Innovation",
    "Strict Quality Assurance",
    "Sustainable Infrastructure",
    "Client Satisfaction",
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 font-bold">
            ABOUT US
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column: Image (Second on mobile, Left on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden bg-slate-900 border-4 border-slate-100">
                <SafeImage
                  src="/images/team/team-engineers.jpg"
                  alt="Dominion Integrated Leadership & Field Engineers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F]/90 via-transparent to-transparent" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0F2B82] text-white flex items-center justify-center shrink-0">
                      <ShieldCheckIcon className="w-6 h-6 text-[#D99B26]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-900">CERTIFIED ENGINEERS</div>
                      <div className="text-[11px] text-slate-500">COREN Aligned • HSE Compliant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column: Narrative & Values (First on mobile, Right on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 uppercase">
              Welcome to Dominion Integrated Electrical &amp; Engineering Limited
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              <strong className="text-slate-900 font-semibold">Dominion Integrated Electrical &amp; Engineering Limited</strong> (RC: 1655029) was incorporated on the 4th of February 2020. As a multidisciplinary engineering and infrastructure development firm, we execute end-to-end solutions across civil engineering, building construction, electrical power engineering, renewable energy, and precision concrete &amp; precast manufacturing.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              Our unwavering commitment to quality, professionalism, innovation, and client satisfaction has positioned us as a trusted partner for both public sector tenders and private sector developments.
            </p>


            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 transition-colors"
              >
                LEARN MORE ABOUT DOMINION
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
