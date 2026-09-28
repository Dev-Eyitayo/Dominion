"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-[#070D1F] text-white pt-20 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            {/* Col 1: Identity & Profile */}
            <div className="lg:col-span-4">
              <div className="bg-white inline-block p-1.5 mb-6">
                <Image
                  src="/logo.png"
                  alt="Dominion Integrated Electrical & Engineering Limited"
                  width={180}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Dominion Integrated Electrical &amp; Engineering Limited (RC: 1655029) is a multidisciplinary engineering and infrastructure development firm operating across Nigeria.
              </p>
              <div className="text-xs font-mono text-[#D99B26] space-y-1">
                <div>RC NUMBER: 1655029</div>
                <div>SMEDAN: SUID-9142-6143-5422-0697</div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D99B26] mb-6">
                  QUICK LINKS
                </h4>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      About Dominion
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-white transition-colors">
                      Core Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/manufacturing" className="hover:text-white transition-colors">
                      Manufacturing Plant
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="hover:text-white transition-colors">
                      Featured Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/compliance" className="hover:text-white transition-colors">
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D99B26] mb-6">
                  MANUFACTURING
                </h4>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li>
                    <Link href="/manufacturing#poles" className="hover:text-white transition-colors">
                      Electric Poles
                    </Link>
                  </li>
                  <li>
                    <Link href="/manufacturing#blocks" className="hover:text-white transition-colors">
                      Stay Blocks
                    </Link>
                  </li>
                  <li>
                    <Link href="/manufacturing#kerbs" className="hover:text-white transition-colors">
                      Road Kerbs &amp; Drainage
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Request Quote
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Col 3: Compliance & Bases */}
            <div className="lg:col-span-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D99B26] mb-6">
                YOU CAN REACH US AT
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  {/* <Link
                    href="/compliance"
                    className="text-white hover:text-[#D99B26] font-semibold underline underline-offset-4"
                  >
                    Compliance &amp; Prequalification Docs
                  </Link> */}
                </div>
                <div>
                  <strong className="text-white block mt-3">Admin Office:</strong>
                  No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road, Oyo State.
                </div>
                <div>
                  <strong className="text-white block">Precast Production Plant:</strong>
                  No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway, Oyo State.
                </div>
                <div className="pt-2 font-mono">
                  <div>Phone: 08101831076 / 07067315948</div>
                  <div>Email: dominionltd01@gmail.com</div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>© 2026 Dominion Integrated Electrical &amp; Engineering Limited. All rights reserved.</div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>Built with</span>
              <HeartIcon className="w-4 h-4 text-red-500 fill-current inline-block animate-pulse" />
              <span>by</span>
              <a
                href="https://eyitayo.online"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-[#D99B26] transition-colors"
              >
                Dev Eyitayo
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Dancing Back-To-Top Button (only shows when scrolled) */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#0F2B82] text-white flex items-center justify-center hover:bg-[#D99B26] hover:text-slate-950 transition-all duration-300 shadow-2xl animate-dance-float focus:outline-none ${
          showTopBtn
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <ChevronUpIcon className="w-5 h-5 stroke-[2.5]" />
      </button>
    </>
  );
}
