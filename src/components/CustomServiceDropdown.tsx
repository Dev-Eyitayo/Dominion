"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

export interface ServiceOption {
  value: string;
  name: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    value: "Manufacturing & Precast Concrete",
    name: "Manufacturing & Precast Concrete",
  },
  {
    value: "Civil & Building Construction",
    name: "Civil & Building Construction",
  },
  {
    value: "Electrical Power Systems (High/Low Voltage)",
    name: "Electrical Power Systems (High/Low Voltage)",
  },
  {
    value: "Solar Renewable & IT Infrastructure",
    name: "Solar Renewable & IT Infrastructure",
  },
  {
    value: "Engineering Consultancy & BoQ",
    name: "Engineering Consultancy & BoQ",
  },
  {
    value: "Heavy Equipment Leasing",
    name: "Heavy Equipment Leasing",
  },
];

interface CustomServiceDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export default function CustomServiceDropdown({
  value,
  onChange,
  label = "SERVICE CATEGORY *",
  required = true,
}: CustomServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    SERVICE_OPTIONS.find((opt) => opt.value === value) || SERVICE_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-700 mb-2">
          {label}
        </label>
      )}

      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-slate-50 border text-left px-4 py-3 flex items-center justify-between transition-all duration-200 focus:outline-none ${
          isOpen
            ? "border-[#0F2B82] ring-2 ring-[#0F2B82]/10 bg-white"
            : "border-slate-300 hover:border-slate-400"
        }`}
      >
        <span className="font-semibold text-xs sm:text-sm text-slate-900 truncate pr-2">
          {selectedOption.name}
        </span>

        <ChevronDownIcon
          className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#0F2B82]" : ""
          }`}
        />
      </button>

      {/* Dropdown Options Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-xl z-50 max-h-64 overflow-y-auto divide-y divide-slate-100">
          {SERVICE_OPTIONS.map((option) => {
            const isSelected = option.value === selectedOption.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-2 ${
                  isSelected
                    ? "bg-blue-50 text-[#0F2B82] font-semibold"
                    : "hover:bg-slate-50 text-slate-800"
                }`}
              >
                <span className="truncate">{option.name}</span>
                {isSelected && (
                  <CheckIcon className="w-4 h-4 text-[#0F2B82] flex-shrink-0 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
