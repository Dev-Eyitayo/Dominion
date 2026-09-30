"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileManufacturingOpen, setMobileManufacturingOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-md border-b border-slate-200 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center py-0">
            <Image
              src="/logo.png"
              alt="Dominion Integrated Electrical & Engineering Limited"
              width={260}
              height={85}
              className="h-14 sm:h-12 lg:h-11 w-auto max-w-[220px] sm:max-w-none object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-xs uppercase tracking-widest font-bold py-1 relative transition-colors ${
                isActive("/")
                  ? "text-[#0F2B82] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#0F2B82]"
                  : "text-slate-700 hover:text-[#0F2B82]"
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative group py-2">
              <Link
                href="/about"
                className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold py-1 relative transition-colors ${
                  isActive("/about")
                    ? "text-[#0F2B82] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#0F2B82]"
                    : "text-slate-700 hover:text-[#0F2B82]"
                }`}
              >
                <span>About Us</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${isActive("/about") ? "text-[#0F2B82]" : "text-slate-400 group-hover:text-[#0F2B82]"}`} />
              </Link>
              <div className="absolute top-full left-0 w-52 bg-white border border-slate-200 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/about#overview" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Company Overview
                </Link>
                <Link href="/about#vision" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Vision & Values
                </Link>
                <Link href="/about#team" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Leadership & Team
                </Link>
                <Link href="/about#quality" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Quality & Safety
                </Link>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold py-1 relative transition-colors ${
                  isActive("/services")
                    ? "text-[#0F2B82] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#0F2B82]"
                    : "text-slate-700 hover:text-[#0F2B82]"
                }`}
              >
                <span>Services</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${isActive("/services") ? "text-[#0F2B82]" : "text-slate-400 group-hover:text-[#0F2B82]"}`} />
              </Link>
              <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/services#civil" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Civil & Building
                </Link>
                <Link href="/services#electrical" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Electrical & Power
                </Link>
                <Link href="/services#solar" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Solar & Renewable IT
                </Link>
                <Link href="/services#consultancy" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Consultancy & BoQ
                </Link>
                <Link href="/services#leasing" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Equipment Leasing
                </Link>
              </div>
            </div>

            {/* Manufacturing Dropdown */}
            <div className="relative group py-2">
              <Link
                href="/manufacturing"
                className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold py-1 relative transition-colors ${
                  isActive("/manufacturing")
                    ? "text-[#0F2B82] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#0F2B82]"
                    : "text-slate-700 hover:text-[#0F2B82]"
                }`}
              >
                <span>Manufacturing</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${isActive("/manufacturing") ? "text-[#0F2B82]" : "text-slate-400 group-hover:text-[#0F2B82]"}`} />
              </Link>
              <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/manufacturing#poles" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Electric Poles (LT & HT)
                </Link>
                <Link href="/manufacturing#blocks" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Stay Blocks & Slabs
                </Link>
                <Link href="/manufacturing#kerbs" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Road Kerbs & Channels
                </Link>
                <Link href="/manufacturing#custom" className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0F2B82]">
                  Custom Precast Moulds
                </Link>
              </div>
            </div>

            <Link
              href="/projects"
              className={`text-xs uppercase tracking-widest font-bold py-1 relative transition-colors ${
                isActive("/projects")
                  ? "text-[#0F2B82] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#0F2B82]"
                  : "text-slate-700 hover:text-[#0F2B82]"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className={`text-xs uppercase tracking-widest font-bold py-1 relative transition-colors ${
                isActive("/contact")
                  ? "text-[#0F2B82] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#0F2B82]"
                  : "text-slate-700 hover:text-[#0F2B82]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact#quote"
              className="bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors"
            >
              REQUEST A QUOTE
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#0F2B82] focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 transition-transform duration-200 rotate-90" />
            ) : (
              <Bars3Icon className="w-6 h-6 transition-transform duration-200" />
            )}
          </button>

        </div>
      </div>

      {/* Sleek Animated Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "max-h-[85vh] overflow-y-auto opacity-100 border-b border-slate-200 shadow-xl" : "max-h-0 opacity-0 border-b-0 shadow-none"
        } bg-white/98 backdrop-blur-md`}
      >
        <div
          className={`px-4 sm:px-6 py-6 space-y-2 transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          {/* Home */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-xs uppercase tracking-widest font-bold px-3 py-2.5 rounded transition-colors ${
              isActive("/")
                ? "bg-blue-50 text-[#0F2B82] border-l-4 border-[#0F2B82] font-extrabold"
                : "text-slate-800 hover:text-[#0F2B82] hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          {/* About Us (with dropdown submenu) */}
          <div>
            <div className={`flex items-center justify-between rounded transition-colors ${
              isActive("/about") ? "bg-blue-50 text-[#0F2B82] border-l-4 border-[#0F2B82]" : "text-slate-800 hover:bg-slate-50"
            }`}>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-xs uppercase tracking-widest font-bold px-3 py-2.5"
              >
                About Us
              </Link>
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="p-2.5 text-slate-500 hover:text-[#0F2B82] focus:outline-none"
                aria-label="Toggle About submenu"
              >
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180 text-[#0F2B82]" : ""}`} />
              </button>
            </div>
            {mobileAboutOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#0F2B82]/20 ml-3 my-1">
                <Link
                  href="/about#overview"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Company Overview
                </Link>
                <Link
                  href="/about#vision"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Vision & Values
                </Link>
                <Link
                  href="/about#team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Leadership & Team
                </Link>
                <Link
                  href="/about#quality"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Quality & Safety
                </Link>
              </div>
            )}
          </div>

          {/* Services (with dropdown submenu) */}
          <div>
            <div className={`flex items-center justify-between rounded transition-colors ${
              isActive("/services") ? "bg-blue-50 text-[#0F2B82] border-l-4 border-[#0F2B82]" : "text-slate-800 hover:bg-slate-50"
            }`}>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-xs uppercase tracking-widest font-bold px-3 py-2.5"
              >
                Services
              </Link>
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="p-2.5 text-slate-500 hover:text-[#0F2B82] focus:outline-none"
                aria-label="Toggle Services submenu"
              >
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180 text-[#0F2B82]" : ""}`} />
              </button>
            </div>
            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#0F2B82]/20 ml-3 my-1">
                <Link
                  href="/services#civil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Civil & Building
                </Link>
                <Link
                  href="/services#electrical"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Electrical & Power
                </Link>
                <Link
                  href="/services#solar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Solar & Renewable IT
                </Link>
                <Link
                  href="/services#consultancy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Consultancy & BoQ
                </Link>
                <Link
                  href="/services#leasing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Equipment Leasing
                </Link>
              </div>
            )}
          </div>

          {/* Manufacturing (with dropdown submenu) */}
          <div>
            <div className={`flex items-center justify-between rounded transition-colors ${
              isActive("/manufacturing") ? "bg-blue-50 text-[#0F2B82] border-l-4 border-[#0F2B82]" : "text-slate-800 hover:bg-slate-50"
            }`}>
              <Link
                href="/manufacturing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-xs uppercase tracking-widest font-bold px-3 py-2.5"
              >
                Manufacturing
              </Link>
              <button
                type="button"
                onClick={() => setMobileManufacturingOpen(!mobileManufacturingOpen)}
                className="p-2.5 text-slate-500 hover:text-[#0F2B82] focus:outline-none"
                aria-label="Toggle Manufacturing submenu"
              >
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${mobileManufacturingOpen ? "rotate-180 text-[#0F2B82]" : ""}`} />
              </button>
            </div>
            {mobileManufacturingOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#0F2B82]/20 ml-3 my-1">
                <Link
                  href="/manufacturing#poles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Electric Poles (LT & HT)
                </Link>
                <Link
                  href="/manufacturing#blocks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Stay Blocks & Slabs
                </Link>
                <Link
                  href="/manufacturing#kerbs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Road Kerbs & Channels
                </Link>
                <Link
                  href="/manufacturing#custom"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-slate-600 hover:text-[#0F2B82] py-2 px-2.5 rounded hover:bg-slate-50"
                >
                  Custom Precast Moulds
                </Link>
              </div>
            )}
          </div>

          {/* Projects */}
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-xs uppercase tracking-widest font-bold px-3 py-2.5 rounded transition-colors ${
              isActive("/projects")
                ? "bg-blue-50 text-[#0F2B82] border-l-4 border-[#0F2B82] font-extrabold"
                : "text-slate-800 hover:text-[#0F2B82] hover:bg-slate-50"
            }`}
          >
            Projects
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-xs uppercase tracking-widest font-bold px-3 py-2.5 rounded transition-colors ${
              isActive("/contact")
                ? "bg-blue-50 text-[#0F2B82] border-l-4 border-[#0F2B82] font-extrabold"
                : "text-slate-800 hover:text-[#0F2B82] hover:bg-slate-50"
            }`}
          >
            Contact
          </Link>

          <div className="pt-3">
            <Link
              href="/contact#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[#0F2B82] hover:bg-[#13359e] text-white text-xs font-bold uppercase tracking-widest py-3 transition-colors"
            >
              REQUEST A QUOTE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
