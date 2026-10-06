import Image from "next/image";
import { Metadata } from "next";
import { getTeamMembers } from "@/lib/team";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Our Engineering & Technical Leadership Team | Dominion",
  description:
    "Meet Dominion Integrated Electrical & Engineering Limited's licensed civil and structural engineers, electrical power consultants, project supervisors, and precast manufacturing leadership.",
  keywords: [
    "Dominion Engineering team",
    "COREN registered engineers Oyo State",
    "electrical contractors leadership Nigeria",
    "precast concrete technical supervisors",
  ],
};

export const revalidate = 60; // ISR 60s

export default async function TeamPage() {
  const members = await getTeamMembers(true);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Header Banner */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team/team-planning.jpg"
            alt="Dominion Engineering & Planning Cadre"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/90 via-[#070D1F]/75 to-[#0F2B82]/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            TECHNICAL CADRE &amp; LEADERSHIP
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Our Team
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Our multidisciplinary team unites seasoned chartered engineers, high-voltage electrical consultants, structural analysts, and certified quality assurance technicians dedicated to enduring infrastructure.
          </p>
        </div>
      </section>

      {/* Team Members List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
              DISCIPLINARY EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
              Experienced Professionals Driving Quality
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Combining decades of cumulative fieldwork across residential developments, high-voltage distribution networks, commercial solar farms, and mechanized precast yards.
            </p>
          </div>

          <div className="space-y-10">
            {members.map((member, idx) => (
              <div
                key={member.id}
                className="group bg-white border border-slate-200 hover:border-[#0F2B82] p-6 sm:p-8 transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  
                  {/* Left Side: Photo */}
                  <div className="md:col-span-4 lg:col-span-3">
                    <div className="relative aspect-[4/5] w-full bg-slate-900 overflow-hidden border-2 border-slate-100 group-hover:border-[#0F2B82]/30 transition-colors">
                      <Image
                        src={member.imageUrl || "/images/team/team-engineers.jpg"}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Right Side: Credentials & Bio */}
                  <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      {member.division && (
                        <span className="text-[11px] font-mono font-bold tracking-wider text-[#0F2B82] bg-blue-50/80 px-2.5 py-1 border border-blue-200 uppercase">
                          {member.division}
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400">
                        CADRE REF #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase group-hover:text-[#0F2B82] transition-colors">
                      {member.name}
                    </h3>

                    <div className="text-sm sm:text-base font-semibold text-[#D99B26] font-mono">
                      {member.role}
                    </div>

                    {member.bio && (
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                        {member.bio}
                      </p>
                    )}

                    <div className="pt-4 flex items-center gap-2">
                      <Link
                        href="/contact#quote"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F2B82] hover:text-[#D99B26] transition-colors"
                      >
                        <span>Collaborate on a Project</span>
                        <ChevronRightIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tight">Ready to Work with Our Engineers?</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Request a comprehensive technical proposal, structural assessment, or product supply quote today.
            </p>
          </div>
          <Link
            href="/contact#quote"
            className="inline-flex items-center gap-2 bg-[#D99B26] hover:bg-[#b8821f] text-slate-950 font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-colors shrink-0"
          >
            <span>Request Technical RFQ</span>
            <ChevronRightIcon className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
