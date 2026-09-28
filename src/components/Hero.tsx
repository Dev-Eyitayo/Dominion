"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "/images/hero-construction.jpg",
      title: "Dominion Integrated Electrical &",
      highlight: "Engineering Limited",
      subtitle:
        "Delivering integrated civil construction, high-voltage electrical engineering, solar renewable IT solutions, and precision precast concrete manufacturing across Nigeria.",
    },
    {
      img: "/images/services/solar-installation.jpg",
      title: "Sustainable Solar Energy &",
      highlight: "Power Grid Infrastructure.",
      subtitle:
        "Custom commercial solar mini-grids, highway solar street lighting schemes, and intelligent energy storage designed for resilience.",
    },
    {
      img: "/images/precast/electric-poles.jpg",
      title: "High-Tensile Reinforced",
      highlight: "Concrete Precast Manufacturing.",
      subtitle:
        "High-load concrete electric poles (LT & HT), stay blocks, and custom road drainage products manufactured directly at our Oyo State production plant.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Slide Images */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 overflow-hidden ${
            idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`w-full h-full relative transition-transform duration-[7000ms] ease-out ${
              idx === currentSlide ? "scale-110" : "scale-100"
            }`}
          >
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={idx === 0}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/15" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          
          {/* Registration Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 border-l-2 border-[#D99B26] text-xs font-mono text-white backdrop-blur-md mb-6">
            <span className="font-bold text-[#D99B26]">RC: 1655029</span>
            <span className="text-white/40">|</span>
            <span>DOMINION INTEGRATED ELECTRICAL &amp; ENGINEERING LTD</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            {slides[currentSlide].title} <br />
            <span className="text-[#D99B26]">{slides[currentSlide].highlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-10 max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>

          {/* Buttons (Square, No Arrows) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              href="/contact#quote"
              className="inline-flex items-center justify-center bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 border border-blue-400/40 transition-all"
            >
              SCHEDULE CONSULTATION
            </Link>

            <Link
              href="/manufacturing"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-7 py-4 backdrop-blur-md border border-white/20 transition-all"
            >
              EXPLORE MANUFACTURING
            </Link>
          </div>

          {/* Trust Specifications */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 text-slate-200 text-xs font-mono">
            <div>
              <span className="block text-[#D99B26] font-bold">SMEDAN REG</span>
              <span>SUID-9142-6143-5422</span>
            </div>
            <div>
              <span className="block text-[#D99B26] font-bold">FIRS TAX</span>
              <span>Tax Compliant</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[#D99B26] font-bold">HSE STANDARD</span>
              <span>Zero Incident Policy</span>
            </div>
          </div>

        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5 px-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1 transition-all ${
                i === currentSlide ? "w-6 bg-[#D99B26]" : "w-6 bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 bg-[#0F2B82] hover:bg-[#13359e] text-white flex items-center justify-center border border-blue-400/30 transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
