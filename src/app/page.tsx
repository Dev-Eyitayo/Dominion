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

export default function Home() {
  return (
    <>
      {/* Hero Banner with Zoom Carousel & Gradient Overlay */}
      <Hero />

      {/* Animated Stats & Trust Bar */}
      <StatsBar />

      {/* About Dominion Section */}
      <AboutSection />

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
      <TestimonialSection />

      {/* Request for Quote & Consultation Form */}
      <ConsultationForm />

      {/* Operational Bases & Facility Locations */}
      <MapLocationSection />
    </>
  );
}
