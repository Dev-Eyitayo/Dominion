import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAboutContent, CoreValueItem } from "@/lib/settings";
import { getTeamMembers, TeamMemberData } from "@/lib/team";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About Dominion | Corporate Profile, Engineering Team & Plant Capacity",
  description:
    "Incorporated in February 2020, Dominion Integrated Electrical & Engineering Limited operates state-of-the-art precast facilities and multidisciplinary engineering divisions across Nigeria.",
  keywords: [
    "Dominion Integrated Electrical & Engineering Limited",
    "engineering contractor corporate profile Nigeria",
    "precast production capacity South West Nigeria",
    "Dominion engineering team"
  ],
};

export const revalidate = 60; // ISR 60s

export default async function AboutPage() {
  const [content, team] = await Promise.all([
    getAboutContent(),
    getTeamMembers(true),
  ]);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Header Banner */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={content.bannerImageUrl || "/images/hero-construction.jpg"}
            alt="Dominion Projects"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            {content.headerTag || "COMPANY PROFILE & LEADERSHIP"}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            {content.headerTitle || "Building Excellence, Powering the Future"}
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            {content.headerSubtitle || "Incorporated in February 2020, Dominion Integrated Electrical & Engineering Limited has evolved into an integrated engineering and heavy concrete infrastructure powerhouse in Nigeria."}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section id="overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
                {content.overviewTag || "COMPANY OVERVIEW & HISTORY"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                {content.overviewHeading || "Institutional Capability Driven by Engineering Rigour"}
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  {content.overviewParagraph1}
                </p>
                <p>
                  {content.overviewParagraph2}
                </p>
                <p>
                  {content.overviewParagraph3}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative group py-6 px-4">
                {/* Architectural Blueprint Accent Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2B82] via-[#0F2B82]/30 to-[#D99B26] [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] opacity-25 group-hover:opacity-50 transition-all duration-500 transform rotate-2 group-hover:rotate-1 scale-105" />
                
                {/* Right-Angled Trapezoid Container */}
                <div className="relative h-[430px] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,86%_100%,0%_100%)] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 border-t-4 border-[#0F2B82] bg-slate-900">
                  <Image
                    src={content.overviewImageUrl || "/images/hero-construction.jpg"}
                    alt="Dominion Construction Project"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                
                {/* Technical Corner Badge */}
                <div className="absolute -bottom-1 right-8 bg-[#0F2B82] text-[#D99B26] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-[#D99B26]/30">
                  DOMINION SITE OPS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            
            {/* Vision */}
            <div className="group relative bg-white p-10 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] text-slate-900 group-hover:text-slate-950 font-mono font-bold text-xs flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                VIS
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] group-hover:text-[#D99B26] font-bold block mb-2">
                {content.visionTag || "OUR CORPORATE VISION"}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
                {content.visionTitle || "Leading National Infrastructure Growth"}
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed">
                {content.visionDesc}
              </p>
            </div>

            {/* Mission */}
            <div className="group relative bg-white p-10 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] text-slate-900 group-hover:text-slate-950 font-mono font-bold text-xs flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform">
                MIS
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] group-hover:text-[#D99B26] font-bold block mb-2">
                {content.missionTag || "OUR CORPORATE MISSION"}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
                {content.missionTitle || "Delivering Uncompromised Quality"}
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed">
                {content.missionDesc}
              </p>
            </div>

          </div>

          {/* 8 Core Values */}
          <div className="mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
              {content.coreValuesTag || "OPERATING PRINCIPLES"}
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              {content.coreValuesHeading || "Our 8 Core Values"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.coreValues.map((val: CoreValueItem) => (
              <div
                key={val.num}
                className="group bg-white p-8 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center font-mono font-bold text-xs text-slate-900 group-hover:text-slate-950 mb-6">
                  {val.num}
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-white mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
                HUMAN CAPITAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
                Our Team
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                Our engineering cadre features seasoned project managers, registered electrical consultants, site supervisors, and precision mould fabricators.
              </p>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 bg-[#0F2B82] hover:bg-[#070D1F] text-white font-bold text-xs uppercase tracking-widest px-5 py-3 transition-colors shrink-0"
            >
              <span>View Full Team</span>
              <ChevronRightIcon className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.slice(0, 2).map((member: TeamMemberData) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 p-6 group hover:border-[#0F2B82] transition-colors"
              >
                <div className="h-80 relative overflow-hidden bg-slate-100">
                  <Image
                    src={member.imageUrl || "/images/team/team-engineers.jpg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-6 pb-2">
                  {member.division && (
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-1">
                      {member.division}
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs font-semibold text-[#D99B26] font-mono mt-0.5">{member.role}</p>
                  {member.bio && (
                    <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
