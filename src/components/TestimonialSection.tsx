"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function TestimonialSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const testimonials = [
    {
      quote:
        "Dominion Integrated executed our commercial facility electrical installation and high-tension connection with remarkable technical precision. Their adherence to safety protocols and strict delivery timelines set them apart.",
      author: "Chief Engr. A. Adeleke",
      role: "Director of Infrastructure Development",
      org: "Commercial Property Consortium, Ibadan",
    },
    {
      quote:
        "The reinforced precast electric poles supplied from Dominion's Oyo plant met all engineering load stress requirements. We were particularly impressed by their batch consistency and swift on-site haulage.",
      author: "Engr. O. Babatunde",
      role: "Project Site Coordinator",
      org: "Rural Electrification Scheme",
    },
    {
      quote:
        "From foundation concrete work to complete solar street lighting integration, Dominion proved to be an indispensable engineering partner. Transparent BoQs and zero hidden costs.",
      author: "Alhaji R. Sanusi",
      role: "Managing Director",
      org: "Sanusi Estates & Construction",
    },
  ];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[#070D1F] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story & Metric Highlights */}
        <div className="mb-20 pb-16 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="inline-block text-xs font-mono uppercase tracking-widest text-[#D99B26] font-bold mb-2">
                OPERATIONAL COMMITMENT
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                Our Standard of Execution
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Dominion operates with a relentless dedication to engineering integrity. We eliminate costly project overruns by combining advanced engineering design, in-house precast manufacturing, and strict HSE oversight.
              </p>
            </div>
          </div>

          {/* 3 Metric Cards (Flat, Square) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-white/5 border border-white/10">
              <div className="text-2xl font-extrabold text-[#D99B26] font-mono mb-1">
                On Budget
              </div>
              <p className="text-xs text-slate-300">
                Transparent BoQs executed with strict cost control and zero hidden variations.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <div className="text-2xl font-extrabold text-blue-400 font-mono mb-1">
                On Program
              </div>
              <p className="text-xs text-slate-300">
                Rigorous Gantt scheduling ensuring all milestones and handovers complete on time.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10">
              <div className="text-2xl font-extrabold text-emerald-400 font-mono mb-1">
                Exceed Standards
              </div>
              <p className="text-xs text-slate-300">
                Every structure and precast element exceeds national building and safety codes.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D99B26]">
              CLIENT TESTIMONIALS
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 bg-[#0F2B82] hover:bg-[#13359e] text-white flex items-center justify-center border border-blue-400/30 transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-white/5 border border-white/10">
            <blockquote className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed mb-6">
              &ldquo;{testimonials[currentIdx].quote}&rdquo;
            </blockquote>
            <div className="font-mono text-xs text-slate-300">
              <strong className="text-white block text-sm font-bold">
                {testimonials[currentIdx].author}
              </strong>
              <span>
                {testimonials[currentIdx].role} — {testimonials[currentIdx].org}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
