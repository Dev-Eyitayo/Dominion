"use client";

import { useState } from "react";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import CustomServiceDropdown from "@/components/CustomServiceDropdown";
import { submitPublicInquiryAction } from "@/lib/inquiries/actions";

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Manufacturing & Precast Concrete",
    location: "",
    message: "",
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
        scopeDetails: formData.message || "Standard consultation and engineering quote request",
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "Manufacturing & Precast Concrete",
          location: "",
          message: "",
        });
      } else {
        setErrorMessage(result.error || "Failed to submit request. Please try again.");
      }
    } catch {
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden bg-slate-900 border border-slate-200">
              <Image
                src="/images/team/team-planning.jpg"
                alt="Dominion Project Engineers Reviewing Engineering Blueprint"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md border border-slate-200">
                <div className="text-xs font-mono font-bold text-[#0F2B82] uppercase mb-1">
                  DIRECT ENGINEERING SUPPORT
                </div>
                <div className="text-sm font-extrabold text-slate-900 mb-3 uppercase">
                  Speak with a Project Lead
                </div>
                <div className="flex flex-col gap-2 text-xs font-mono text-slate-700">
                  <a href="tel:08101831076" className="flex items-center gap-2 hover:text-[#0F2B82] font-semibold">
                    <PhoneIcon className="w-4 h-4 text-[#D99B26]" />
                    08101831076 / 07067315948
                  </a>
                  <a href="mailto:dominionltd01@gmail.com" className="flex items-center gap-2 hover:text-[#0F2B82]">
                    <EnvelopeIcon className="w-4 h-4 text-[#D99B26]" />
                    dominionltd01@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Square Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-slate-200">
            <div className="mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F2B82] block mb-2">
                DIRECT PROJECT ESTIMATE
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
                Schedule a Consultation &amp; RFQ
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Fill out the engineering request form below for direct evaluation and formal proposal dispatch from our engineering desk.
              </p>
            </div>

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
                  We have received your project details. Our team will review your specifications and reach out to you shortly to discuss your quotation.
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
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention quantity of poles, building square meters, transformer kVA, or solar inverter capacity..."
                    className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0F2B82] hover:bg-[#070D1F] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors cursor-pointer"
                >
                  {isSubmitting ? "SENDING YOUR INQUIRY..." : "SUBMIT INQUIRY"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
