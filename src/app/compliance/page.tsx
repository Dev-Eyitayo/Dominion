import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statutory Compliance, CAC (RC: 1655029) & Tender Prequalification",
  description:
    "Verify Dominion Integrated Electrical & Engineering Limited statutory credentials: CAC incorporation certificate (RC: 1655029), SMEDAN accreditation (SUID-9142-6143-5422-0697), FIRS tax compliance, COREN practicing engineers, and HSE zero-incident safety policies.",
  keywords: [
    "Dominion Engineering RC 1655029",
    "SMEDAN certificate SUID-9142-6143-5422-0697",
    "engineering company tender prequalification Nigeria",
    "FIRS tax compliant contractor Oyo",
    "COREN practicing firm Nigeria",
    "HSE safety policy construction Nigeria"
  ],
};

export default function CompliancePage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team/team-planning.jpg"
            alt="Compliance & Governance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            STATUTORY VERIFICATION &amp; GOVERNANCE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Corporate Compliance &amp; Prequalification
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            Dominion Integrated Electrical &amp; Engineering Limited operates under complete regulatory registration with statutory authorities across the Federal Republic of Nigeria.
          </p>
        </div>
      </section>

      {/* Statutory Credentials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
              LEGAL INCORPORATION &amp; LICENSES
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Verified Institutional Standing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: CAC */}
            <div className="group relative bg-white p-8 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">01</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
                FEDERAL REGISTRATION
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4">
                CAC Incorporation
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Incorporated under the Companies and Allied Matters Act 1990 by the Corporate Affairs Commission of Nigeria.
              </p>
              <div className="p-4 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-1 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">RC Number:</strong> 1655029</div>
                <div><strong className="text-slate-900 group-hover:text-white">Date:</strong> February 4, 2020</div>
                <div><strong className="text-slate-900 group-hover:text-white">Jurisdiction:</strong> Federal Republic of Nigeria</div>
              </div>
            </div>

            {/* Card 2: SMEDAN */}
            <div className="group relative bg-white p-8 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">02</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
                ENTERPRISE ACCREDITATION
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4">
                SMEDAN Certification
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Officially registered with the Small and Medium Enterprises Development Agency of Nigeria under verified unique enterprise ID.
              </p>
              <div className="p-4 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-1 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">SUID:</strong> SUID-9142-6143-5422-0697</div>
                <div><strong className="text-slate-900 group-hover:text-white">Sector:</strong> Engineering &amp; Construction</div>
                <div><strong className="text-slate-900 group-hover:text-white">Status:</strong> Active / Verified</div>
              </div>
            </div>

            {/* Card 3: FIRS */}
            <div className="group relative bg-white p-8 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">03</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
                FISCAL COMPLIANCE
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4">
                FIRS &amp; Tax Status
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Fully compliant with the Federal Inland Revenue Service (FIRS) with valid Tax Clearance Certificates and current TIN registration.
              </p>
              <div className="p-4 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-1 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">TCC Status:</strong> Up-to-date</div>
                <div><strong className="text-slate-900 group-hover:text-white">VAT &amp; WHT:</strong> Remitted</div>
                <div><strong className="text-slate-900 group-hover:text-white">Audit Standard:</strong> IFRS Compliant</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HSE & Operational Policies */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
              HEALTH, SAFETY &amp; ENVIRONMENT (HSE)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
              Zero-Compromise Site Standards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Our HSE policy mandates comprehensive protective systems, hazard mitigation plans, and environmental stewardship across all precast plants and active civil construction sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-8 bg-white border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center font-mono font-bold text-xs text-slate-900 group-hover:text-slate-950 mb-6">
                HSE
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-white mb-2">Mandatory PPE Protocol</h4>
              <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed">
                Strict enforcement of helmets, high-visibility apparel, steel-toe footwear, and safety harnesses on all live sites and plants.
              </p>
            </div>

            <div className="group p-8 bg-white border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center font-mono font-bold text-xs text-slate-900 group-hover:text-slate-950 mb-6">
                ENV
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-white mb-2">Environmental Remediation</h4>
              <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed">
                Responsible concrete slurry management, regulated aggregate storage, and zero hazardous runoff into local soil and waterways.
              </p>
            </div>

            <div className="group p-8 bg-white border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center font-mono font-bold text-xs text-slate-900 group-hover:text-slate-950 mb-6">
                QA
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-white mb-2">Crush &amp; Tensile Testing</h4>
              <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed">
                Standard 7-day, 14-day, and 28-day concrete cube compressive strength tests documented for all precast batches.
              </p>
            </div>

            <div className="group p-8 bg-white border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center font-mono font-bold text-xs text-slate-900 group-hover:text-slate-950 mb-6">
                LAW
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-white mb-2">Statutory Workmen Comp</h4>
              <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed">
                Full compliance with NSITF workplace injury provisions and comprehensive third-party contractor liability insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tender & Prequalification Gateway */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white p-10 sm:p-16 border border-slate-800">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D99B26] block mb-2">
                CORPORATE PROCUREMENT &amp; TENDERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4">
                Request Complete Prequalification Dossier
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                For institutional clients, government ministries, departments, and multinational agencies requiring verified statutory documentation, audited financial reports, and equipment fleet asset registers for tender bidding.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/contact#quote" className="bg-[#D99B26] hover:bg-[#F5B041] text-slate-950 text-xs font-bold uppercase tracking-widest px-8 py-4 text-center transition-colors">
                  REQUEST PREQUALIFICATION DOSSIER
                </Link>
                <a href="tel:08101831076" className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 text-center border border-white/20 transition-colors font-mono">
                  CALL CORPORATE DESK: 08101831076
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
