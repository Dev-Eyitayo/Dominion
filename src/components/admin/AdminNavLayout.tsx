"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/lib/auth/actions";
import { AdminJWTPayload } from "@/lib/auth/session";

interface AdminNavProps {
  admin: AdminJWTPayload;
  children: React.ReactNode;
}

const mainNavItems = [
  {
    label: "Dashboard Overview",
    href: "/admin",
    exact: true,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Projects Portfolio",
    href: "/admin/projects",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Manufacturing & Precast",
    href: "/admin/manufacturing",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    label: "Engineering Capabilities",
    href: "/admin/services",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const inboundNavItems = [
  {
    label: "Client RFQs & Leads",
    href: "/admin/inquiries",
    exact: false,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function AdminNavLayout({ admin, children }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isItemActive = (item: { href: string; exact: boolean }) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Overview & Metrics";
    if (pathname.startsWith("/admin/projects")) return "Project Case Studies";
    if (pathname.startsWith("/admin/manufacturing")) return "Manufacturing Catalog";
    if (pathname.startsWith("/admin/services")) return "Engineering Services";
    if (pathname.startsWith("/admin/inquiries")) return "Client RFQs & Inbound Leads";
    return "Admin Portal";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row antialiased font-sans">
      {/* Mobile Sticky Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0B1536] border-b border-[#1A2855] px-5 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 -ml-2 rounded-sm text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="bg-white px-2.5 py-1.5 rounded-sm">
              <Image
                src="/logo.png"
                alt="Dominion Logo"
                width={95}
                height={22}
                className="h-5 w-auto object-contain"
              />
            </div>
            <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-sm border border-amber-400/20">
              CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            {admin.fullName ? admin.fullName.charAt(0).toUpperCase() : "A"}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop Fixed + Mobile Slide-over) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B1536] text-slate-300 border-r border-[#192750] flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header Section */}
          <div className="p-6 border-b border-[#1A2855] bg-[#080F28]">
            <div className="flex items-center justify-between">
              <Link
                href="/admin"
                className="block bg-white rounded-sm px-3.5 py-2.5 hover:bg-slate-100 transition shadow-2xs"
              >
                <Image
                  src="/logo.png"
                  alt="Dominion Integrated Electrical & Engineering"
                  width={140}
                  height={32}
                  className="h-7 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close navigation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="tracking-wide">RC: 1655029</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CMS Active
              </span>
            </div>
          </div>

          {/* Navigation Items with Generous Spacing */}
          <div className="px-4 py-6 flex-1 space-y-8">
            {/* Core Section */}
            <div>
              <div className="px-3 pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Core Directories
              </div>
              <nav className="space-y-1.5">
                {mainNavItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-sm text-xs font-medium transition-all ${
                        active
                          ? "bg-[#15234E] text-white font-semibold shadow-inner"
                          : "text-slate-300 hover:bg-[#121E43] hover:text-white"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-amber-400 rounded-r-xs" />
                      )}
                      <span className={active ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Inbound Leads Section */}
            <div>
              <div className="px-3 pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Inbound &amp; Communications
              </div>
              <nav className="space-y-1.5">
                {inboundNavItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-sm text-xs font-medium transition-all ${
                        active
                          ? "bg-[#15234E] text-white font-semibold shadow-inner"
                          : "text-slate-300 hover:bg-[#121E43] hover:text-white"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-amber-400 rounded-r-xs" />
                      )}
                      <span className={active ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer: User Details & Actions */}
          <div className="p-4 border-t border-[#1A2855] bg-[#070D22] space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-3.5 py-2 rounded-sm bg-[#121E43] hover:bg-[#1A2A5C] text-slate-200 text-xs font-medium border border-[#1E2F63] transition"
            >
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Website</span>
              </span>
              <span className="text-[10px] text-slate-400">↗</span>
            </Link>

            {/* Admin Profile Row */}
            <div className="flex items-center gap-3 p-2.5 rounded-sm bg-[#0E1838] border border-[#182650]">
              <div className="w-8 h-8 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-amber-400/30">
                {admin.fullName ? admin.fullName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate leading-tight">
                  {admin.fullName}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {admin.email}
                </div>
              </div>
            </div>

            {/* Sign Out Action */}
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-sm text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-500/10 border border-red-500/20 transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-white border-b border-slate-200 px-8 py-4 items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-slate-600 hover:text-blue-700 flex items-center gap-1 transition"
            >
              <span>View Public Portal ↗</span>
            </Link>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-8 h-8 rounded-sm bg-blue-700 text-white flex items-center justify-center font-bold text-xs ring-1 ring-slate-200">
                {admin.fullName ? admin.fullName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-none">{admin.fullName}</div>
                <div className="text-[10px] text-slate-500 mt-1 capitalize font-medium">
                  {admin.role.replace("_", " ")}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
