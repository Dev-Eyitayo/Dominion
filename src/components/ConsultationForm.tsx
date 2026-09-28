"use client";

import { useState } from "react";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import CustomServiceDropdown from "@/components/CustomServiceDropdown";

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Manufacturing & Precast Concrete",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waText = encodeURIComponent(
      `Hello Dominion Engineering, I would like to request an official consultation / quote:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || "Not provided"}\n*Service:* ${formData.service}\n*Location:* ${formData.location}\n*Scope/Details:* ${formData.message || "Standard scope"}`
    );
    window.open(`https://wa.me/2348101831076?text=${waText}`, "_blank");
    setSubmitted(true);
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
                Fill out the engineering request form below for direct WhatsApp dispatch or formal BoQ evaluation.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-green-50 border border-green-200 text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-900 mb-1">
                  Request Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-green-700">
                  Our engineering team has received your request and will follow up shortly.
                </p>
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
                      placeholder="Engr. / Alhaji / Chief"
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
                    PROJECT SCOPE &amp; SPECIFICATIONS
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention quantity of poles, building square meters, transformer kVA, or solar inverter capacity..."
                    className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0F2B82]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest py-4 transition-colors"
                >
                  SUBMIT INQUIRY VIA WHATSAPP DISPATCH
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
