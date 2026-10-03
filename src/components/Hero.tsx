"use client";

import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { HeroSlide, DEFAULT_HERO_SLIDES } from "@/lib/settings/types";

interface HeroProps {
  slides?: HeroSlide[];
}

export default function Hero({ slides = DEFAULT_HERO_SLIDES }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlides = slides && slides.length > 0 ? slides : DEFAULT_HERO_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const activeIndex = Math.min(currentSlide, activeSlides.length - 1);
  const slide = activeSlides[activeIndex];

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Slide Images */}
      {activeSlides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 overflow-hidden ${
            idx === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`w-full h-full relative transition-transform duration-[7000ms] ease-out ${
              idx === activeIndex ? "scale-110" : "scale-100"
            }`}
          >
            <SafeImage
              src={s.img || "/images/hero-construction.jpg"}
              alt={s.title}
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
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            {slide.title} <br />
            <span className="text-[#D99B26]">{slide.highlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-10 max-w-2xl">
            {slide.subtitle}
          </p>

          {/* Buttons (Square, No Arrows) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              href={slide.ctaLink || "/contact#quote"}
              className="inline-flex items-center justify-center bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 border border-blue-400/40 transition-all"
            >
              {slide.ctaText || "SCHEDULE CONSULTATION"}
            </Link>

            <Link
              href="/manufacturing"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-7 py-4 backdrop-blur-md border border-white/20 transition-all"
            >
              EXPLORE MANUFACTURING
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
            }
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5 px-2">
            {activeSlides.map((_, i) => (
              <span
                key={i}
                className={`h-1 transition-all ${
                  i === activeIndex ? "w-6 bg-[#D99B26]" : "w-6 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
            }
            className="w-10 h-10 bg-[#0F2B82] hover:bg-[#13359e] text-white flex items-center justify-center border border-blue-400/30 transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
