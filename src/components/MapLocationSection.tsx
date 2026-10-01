"use client";

import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

export default function MapLocationSection() {
  return (
    <section id="contact" className="relative bg-white overflow-hidden py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
            PHYSICAL FACILITIES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Our Operational Offices &amp; Production Plant
          </h2>
        </div>

        {/* Dual Facility Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Admin Office */}
          <div className="group relative bg-white p-8 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-300">
              <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">01</span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
              HEAD OFFICE
            </span>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
              Isokun Administrative Office
            </h3>
            <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed mb-6">
              No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road, Oyo State, Nigeria.
            </p>
            <div className="p-6 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-2 text-slate-800 group-hover:text-white">
              <div><strong className="text-slate-900 group-hover:text-white">Desk Line:</strong> 08101831076 / 07067315948</div>
              <div><strong className="text-slate-900 group-hover:text-white">Email:</strong> dominionltd01@gmail.com</div>
              <div><strong className="text-slate-900 group-hover:text-white">Hours:</strong> Mon – Sat: 8:00 AM – 6:00 PM</div>
            </div>
          </div>

          {/* Precast Factory */}
          <div className="group relative bg-white p-8 pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">02</span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
              MANUFACTURING FACILITY
            </span>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
              Oyo–Ogbomoso Express Plant
            </h3>
            <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed mb-6">
              No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway, Oyo State.
            </p>
            <div className="p-6 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-2 text-slate-800 group-hover:text-white">
              <div><strong className="text-slate-900 group-hover:text-white">Yard Direct:</strong> 08101831076</div>
              <div><strong className="text-slate-900 group-hover:text-white">Operations:</strong> High-Volume Pole &amp; Block Batching</div>
              <div><strong className="text-slate-900 group-hover:text-white">Logistics:</strong> HIAB &amp; Flatbed Dispatch Bay</div>
            </div>
          </div>

        </div>

        {/* Embedded Map */}
        <div className="relative w-full h-[400px] border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126280.97541295988!2d3.864319455323214!3d7.842777414841961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103777d13e3ce013%3A0x6b447477c7198bb6!2sOyo%2C%20Oyo%20State!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dominion Integrated Electrical & Engineering Limited Location"
          />
        </div>

      </div>
    </section>
  );
}
