"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/lib/auth/actions";
import { AdminJWTPayload } from "@/lib/auth/session";

interface AdminSidebarProps {
  admin: AdminJWTPayload;
}

export default function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", exact: true },
    { label: "Projects", href: "/admin/projects", exact: false },
    { label: "Manufacturing", href: "/admin/manufacturing", exact: false },
    { label: "Services", href: "/admin/services", exact: false },
    { label: "RFQs & Leads", href: "/admin/inquiries", exact: false },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white text-slate-900 border-b border-slate-200 px-4 h-[76px] flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Dominion"
              width={130}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="bg-blue-50 text-blue-900 border border-blue-200 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold rounded-sm">
            CMS
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 text-slate-600 hover:text-slate-900 font-mono text-xs uppercase"
        >
          {mobileOpen ? "CLOSE [X]" : "MENU [=]"}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-[76px] px-5 border-b border-slate-200 bg-white flex items-center justify-between">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Dominion Integrated Electrical & Engineering Limited"
                width={150}
                height={36}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
            <div className="flex flex-col items-end text-right">
              <span className="text-[11px] font-mono font-bold text-slate-700 tracking-tight">
                RC: 1655029
              </span>
              <span className="text-[9px] font-mono text-emerald-600 font-semibold">ONLINE</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1 font-mono text-xs uppercase tracking-wider">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-sm transition-colors ${
                    active
                      ? "bg-[#0F2B82] text-white font-bold border-l-4 border-[#D99B26]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="text-[10px] text-[#D99B26]">●</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: User Profile, Public Link & Sign Out */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50/60">
          <div className="flex items-center justify-between gap-2 p-2 rounded-sm bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0F2B82] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {admin.fullName ? admin.fullName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate leading-tight">
                  {admin.fullName}
                </div>
                <div className="text-[10px] text-slate-500 capitalize truncate mt-0.5 font-medium">
                  {admin.role.replace("_", " ")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <Link
                href="/"
                target="_blank"
                title="View Live Website"
                aria-label="View Live Website"
                className="p-1.5 rounded-sm text-slate-400 hover:text-blue-700 hover:bg-slate-100 transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="p-1.5 rounded-sm text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
