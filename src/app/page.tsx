import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PrecastSection from "@/components/PrecastSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import ConsultationForm from "@/components/ConsultationForm";
import MapLocationSection from "@/components/MapLocationSection";
import TestimonialSection from "@/components/TestimonialSection";
import { ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline";


export default function Home() {
  return (
    <>
      {/* Hero Banner with Zoom Carousel & Gradient Overlay */}
      <Hero />

      {/* Animated Stats & Trust Bar */}
      {/* <StatsBar /> */}

      {/* About Dominion Section */}
      <AboutSection />

      {/* Vision & Mission */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Our Vision */}
            <div className="flex flex-col items-center text-center px-4 sm:px-8 pb-10 md:pb-0">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[#D99B26] mb-4">
                <SparklesIcon className="w-7 h-7" />
              </div>
              <h3 className="text-[#0F2B82] font-bold text-xs sm:text-sm uppercase tracking-widest font-mono mb-3">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                To become one of Nigeria&apos;s foremost engineering and infrastructure development corporations recognized for excellence, innovation, and sustainable solutions.
              </p>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col items-center text-center px-4 sm:px-8 pt-10 md:pt-0">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[#D99B26] mb-4">
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h3 className="text-[#0F2B82] font-bold text-xs sm:text-sm uppercase tracking-widest font-mono mb-3">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                To deliver top-tier engineering, construction, electrical, renewable energy, and precast services that consistently exceed expectations while upholding safety, integrity, and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <ServicesSection />

      {/* Precast & Concrete Production Section */}
      {/* <PrecastSection /> */}

      {/* Why Choose Dominion Matrix */}
      <WhyChooseUs />

      {/* 5-Step Engineering Process Framework */}
      {/* <ProcessSection /> */}

      {/* Projects & Site Gallery */}
      {/* <ProjectsSection /> */}

      {/* Operational Commitment & Client Testimonials */}
      {/* <TestimonialSection /> */}

      {/* Request for Quote & Consultation Form */}
      <ConsultationForm />

      {/* Operational Bases & Facility Locations */}
      <MapLocationSection />
    </>
  );
}
