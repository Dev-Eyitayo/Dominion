"use client";

import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import CustomServiceDropdown from "@/components/CustomServiceDropdown";
import { submitPublicInquiryAction } from "@/lib/inquiries/actions";

export default function ContactFormClient() {
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
    <div className="bg-white p-8 sm:p-10 border border-slate-200">
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
  );
}
