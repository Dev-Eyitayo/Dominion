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
import { ShieldCheckIcon, EyeIcon } from "@heroicons/react/24/outline";
import { getHeroSlides, getFacilityContacts, getWhyChooseUs, getAboutContent } from "@/lib/settings";
import { db } from "@/db";
import { engineeringServices } from "@/db/schema";
import { asc } from "drizzle-orm";

export const revalidate = 60; // ISR 60s

export default async function Home() {
  let dbServices: any[] = [];
  try {
    dbServices = await db
      .select()
      .from(engineeringServices)
      .orderBy(asc(engineeringServices.displayOrder));
  } catch (e) {
    console.error("Failed to load services on landing page, fallback to defaults", e);
  }

  const [heroSlides, facilityContacts, whyChooseUs, aboutContent] = await Promise.all([
    getHeroSlides(),
    getFacilityContacts(),
    getWhyChooseUs(),
    getAboutContent(),
  ]);

  return (
    <>
      {/* Hero Banner with Zoom Carousel & Gradient Overlay */}
      <Hero slides={heroSlides} />

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
                <EyeIcon className="w-7 h-7" />
              </div>
              <h3 className="text-[#0F2B82] font-bold text-xs sm:text-sm uppercase tracking-widest font-mono mb-3">
                {aboutContent.visionTag || "Our Vision"}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                {aboutContent.visionDesc || "To become one of Nigeria's foremost engineering and infrastructure development corporations recognized for excellence, innovation, and sustainable solutions."}
              </p>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col items-center text-center px-4 sm:px-8 pt-10 md:pt-0">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[#D99B26] mb-4">
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h3 className="text-[#0F2B82] font-bold text-xs sm:text-sm uppercase tracking-widest font-mono mb-3">
                {aboutContent.missionTag || "Our Mission"}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                {aboutContent.missionDesc || "To deliver top-tier engineering, construction, electrical, renewable energy, and precast services that consistently exceed expectations while upholding safety, integrity, and professionalism."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <ServicesSection services={dbServices.length > 0 ? dbServices : undefined} />

      {/* Precast & Concrete Production Section */}
      {/* <PrecastSection /> */}

      {/* Why Choose Dominion Matrix */}
      <WhyChooseUs data={whyChooseUs} />

      {/* 5-Step Engineering Process Framework */}
      {/* <ProcessSection /> */}

      {/* Projects & Site Gallery */}
      {/* <ProjectsSection /> */}

      {/* Operational Commitment & Client Testimonials */}
      {/* <TestimonialSection /> */}

      {/* Request for Quote & Consultation Form */}
      <ConsultationForm />

      {/* Operational Bases & Facility Locations */}
      <MapLocationSection facilityContacts={facilityContacts} />
    </>
  );
}
