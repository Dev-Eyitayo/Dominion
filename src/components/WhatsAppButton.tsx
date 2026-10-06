"use client";

import { useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phoneNumber = "08101831076",
  defaultMessage = "Hello Dominion Integrated, I would like to make an inquiry regarding your engineering and infrastructure services.",
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Clean phone number: remove non-digit characters, replace leading 0 with 234 if Nigerian number
  const cleanNumber = (num: string) => {
    let digits = num.replace(/\D/g, "");
    if (digits.startsWith("0")) {
      digits = "234" + digits.slice(1);
    } else if (!digits.startsWith("234") && digits.length === 10) {
      digits = "234" + digits;
    }
    return digits;
  };

  const formattedPhone = cleanNumber(phoneNumber);
  const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      className="fixed bottom-22 right-8 z-50 flex items-center group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div
        className={`hidden sm:block absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap transition-all duration-200 border border-white/10 ${
          showTooltip
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span>Chat with us on WhatsApp</span>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-y-4 border-y-transparent border-l-4 border-l-slate-900" />
      </div>

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dominion on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1ebd5a] hover:scale-105 transition-all duration-300 border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.777.979-.953 1.18-.175.2-.351.226-.652.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.778-1.671-2.079-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.678-1.635-.929-2.241-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.51 0 1.48 1.079 2.91 1.229 3.11.15.2 2.124 3.243 5.145 4.547.719.311 1.28.497 1.718.636.722.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.703.25-1.306.175-1.43-.075-.125-.276-.2-.577-.35z" />
          <path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.115.549 4.103 1.512 5.829L.055 23.498l5.856-1.423A11.95 11.95 0 0012.004 24c6.627 0 12-5.373 12-12.004S18.631 0 12.004 0zm0 21.905c-1.85 0-3.585-.499-5.086-1.367l-.364-.21-3.483.847.854-3.396-.231-.378a9.88 9.88 0 01-1.588-5.397c0-5.467 4.437-9.905 9.905-9.905 5.467 0 9.905 4.438 9.905 9.905 0 5.468-4.438 9.905-9.905 9.905z" />
        </svg>
      </a>
    </div>
  );
}
