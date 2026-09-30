"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import CustomServiceDropdown from "@/components/CustomServiceDropdown";
import { submitPublicInquiryAction } from "@/lib/inquiries/actions";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Manufacturing & Precast Concrete",
    location: "",
    scope: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitPublicInquiryAction({
        clientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.service,
        location: formData.location,
        scopeDetails: formData.scope || "General contact inquiry and quotation request",
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "Manufacturing & Precast Concrete",
          location: "",
          scope: "",
        });
      } else {
        setErrorMessage(result.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                CORPORATE HEADQUARTERS
              </span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
                Isokun Administrative Office
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed mb-6">
                No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road, Oyo State, Nigeria.
              </p>
              <div className="p-6 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-2 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">Hours:</strong> Monday – Saturday: 8:00 AM – 6:00 PM</div>
                <div><strong className="text-slate-900 group-hover:text-white">Desk Line:</strong> 08101831076 / 07067315948</div>
                <div><strong className="text-slate-900 group-hover:text-white">Email:</strong> dominionltd01@gmail.com</div>
              </div>
            </div>

            {/* Facility 2: Plant */}
            <div className="group relative bg-white p-8 pt-14 sm:p-10 sm:pt-14 border border-slate-200 hover:bg-[#0F2B82] hover:border-[#0F2B82] transition-all duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#D99B26] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-950">02</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-blue-200 block mb-2">
                HEAVY PRECAST YARD
              </span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">
                Oyo–Ogbomoso Express Plant
              </h3>
              <p className="text-slate-600 group-hover:text-slate-200 text-sm leading-relaxed mb-6">
                No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway, Oyo State.
              </p>
              <div className="p-6 bg-slate-50 group-hover:bg-white/10 font-mono text-xs space-y-2 text-slate-800 group-hover:text-white">
                <div><strong className="text-slate-900 group-hover:text-white">Operations:</strong> High-Volume Batching &amp; Mould Curing</div>
                <div><strong className="text-slate-900 group-hover:text-white">Loading Fleet:</strong> HIAB &amp; Flatbed Dispatch Bay</div>
                <div><strong className="text-slate-900 group-hover:text-white">Yard Direct:</strong> 08101831076</div>
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
                  <div><strong>Hotline 1:</strong> 08101831076</div>
                  <div><strong>Hotline 2:</strong> 07067315948</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-slate-200">
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-800 text-xs font-mono leading-relaxed">
                  <div className="font-bold uppercase mb-0.5">Submission Error</div>
                  <div>{errorMessage}</div>
                </div>
              )}

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircleIcon className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-950 uppercase tracking-tight">
                    Thank You! We Have Received Your Request
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    We have received your project details. Our estimation team will review your requirements and reach out to you within 24 hours with your quotation.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-block px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs uppercase font-bold transition cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-700 mb-2">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Engr. / Alhaji / Chief / Company"
                        className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-700 mb-2">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="080... or +234..."
                        className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-700 mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@company.ng"
                        className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                      />
                    </div>
                    <div>
                      <CustomServiceDropdown
                        value={formData.service}
                        onChange={(service) => setFormData({ ...formData, service })}
                        label="SERVICE CATEGORY *"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-700 mb-2">
                      PROJECT LOCATION &amp; SITE ADDRESS *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Ibadan, Oyo, Osun, Lagos, Abuja..."
                      className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-700 mb-2">
                      PROJECT SCOPE &amp; SPECIFICATIONS *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      placeholder="Mention quantity of poles, building square meters, transformer kVA, or solar inverter capacity..."
                      className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0F2B82] hover:bg-[#070D1F] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? "SENDING YOUR REQUEST..." : "SUBMIT REQUEST"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
