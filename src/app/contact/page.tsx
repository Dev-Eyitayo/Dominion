import Image from "next/image";
import ContactFormClient from "@/components/public/ContactFormClient";
import { getFacilityContacts, DEFAULT_FACILITY_CONTACTS } from "@/lib/settings";

export const revalidate = 60; // ISR 60s

export default async function ContactPage() {
  const facilityContacts = await getFacilityContacts().catch(() => DEFAULT_FACILITY_CONTACTS);
  const headOffice = facilityContacts.headOffice || DEFAULT_FACILITY_CONTACTS.headOffice;
  const factory = facilityContacts.factory || DEFAULT_FACILITY_CONTACTS.factory;

  const phoneText = headOffice.hotline2
    ? `${headOffice.hotline1} / ${headOffice.hotline2}`
    : headOffice.hotline1;

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/precast/concrete-yard.jpg"
            alt="Dominion Production Yard"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            DIRECT ENGAGEMENT &amp; QUOTATIONS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Let&apos;s Discuss Your Next Project
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Reach our project management desk for site surveys, bill of quantities (BoQ) evaluations, and precast concrete logistics across Nigeria.
          </p>
        </div>
      </section>

      {/* Operational Facilities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
              PHYSICAL FACILITIES
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Our Operational Offices &amp; Yard
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Facility 1: Admin */}
            <div className="group relative bg-white p-8 pt-14 sm:p-10 sm:pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">01</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
                {headOffice.tag || "CORPORATE HEADQUARTERS"}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
                {headOffice.title}
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed mb-6">
                {headOffice.address}
              </p>
              <div className="p-6 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-2 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">Hours:</strong> {headOffice.hours}</div>
                <div>
                  <strong className="text-slate-900 group-hover:text-white">Desk Line:</strong>{" "}
                  <a href={`tel:${headOffice.hotline1}`} className="hover:underline">
                    {phoneText}
                  </a>
                </div>
                <div>
                  <strong className="text-slate-900 group-hover:text-white">Email:</strong>{" "}
                  <a href={`mailto:${headOffice.email}`} className="hover:underline">
                    {headOffice.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Facility 2: Plant */}
            <div className="group relative bg-white p-8 pt-14 sm:p-10 sm:pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">02</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
                {factory.tag || "HEAVY PRECAST YARD"}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
                {factory.title}
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed mb-6">
                {factory.address}
              </p>
              <div className="p-6 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-2 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">Operations:</strong> {factory.operations}</div>
                <div><strong className="text-slate-900 group-hover:text-white">Loading Fleet:</strong> {factory.logistics}</div>
                <div>
                  <strong className="text-slate-900 group-hover:text-white">Yard Direct:</strong>{" "}
                  <a href={`tel:${factory.yardDirect}`} className="hover:underline">
                    {factory.yardDirect}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Form Section */}
      <section id="quote" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
                DIRECT PROJECT ESTIMATE
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-6">
                Request Official Quotation
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Complete the form to submit your project specifications directly to our engineering desk. You will receive an official Bill of Quantities (BoQ) and proposal within 24 business hours.
              </p>

              <div className="p-6 bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
                <div className="text-[#0F2B82] font-bold uppercase tracking-wider">
                  RESPONSE GUARANTEE
                </div>
                <p className="text-slate-600">
                  Commercial proposals and standard precast rate cards are dispatched within 24 business hours following technical scope review.
                </p>
                <div className="text-slate-900 pt-2 border-t border-slate-200">
                  <div>
                    <strong>Hotline 1:</strong>{" "}
                    <a href={`tel:${headOffice.hotline1}`} className="hover:underline">
                      {headOffice.hotline1}
                    </a>
                  </div>
                  {headOffice.hotline2 && (
                    <div>
                      <strong>Hotline 2:</strong>{" "}
                      <a href={`tel:${headOffice.hotline2}`} className="hover:underline">
                        {headOffice.hotline2}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactFormClient />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
