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
      <div className="lg:hidden bg-[#070D1F] text-white border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="bg-white p-1 inline-block">
            <Image
              src="/logo.png"
              alt="Dominion"
              width={110}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <span className="bg-[#0F2B82] text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">
            CMS
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 text-slate-300 hover:text-white font-mono text-xs uppercase"
        >
          {mobileOpen ? "CLOSE [X]" : "MENU [=]"}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#070D1F] text-white border-r border-white/10 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="block bg-white p-2 mb-3">
              <Image
                src="/logo.png"
                alt="Dominion Integrated Electrical & Engineering Limited"
                width={160}
                height={40}
                className="h-8 w-auto object-contain mx-auto"
                priority
              />
            </Link>
            <div className="flex items-center justify-between">
              <span className="inline-block bg-[#0F2B82] text-white font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-bold border border-blue-400/20">
                OPERATIONS CMS
              </span>
              <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
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
                  className={`flex items-center justify-between px-4 py-3 transition-colors ${
                    active
                      ? "bg-[#0F2B82] text-white font-bold border-l-4 border-[#D99B26]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
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
        <div className="p-4 border-t border-white/10 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="block text-center py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-[11px] uppercase tracking-wider border border-white/10 transition-colors"
          >
            VIEW LIVE WEBSITE ↗
          </Link>

          {/* User Info */}
          <div className="p-3 bg-white/5 border border-white/5">
            <div className="text-xs font-bold text-white truncate">{admin.fullName}</div>
            <div className="text-[10px] font-mono text-slate-400 truncate">{admin.email}</div>
            <div className="text-[9px] font-mono text-[#D99B26] uppercase mt-1 font-bold">
              ROLE: {admin.role.replace("_", " ")}
            </div>
          </div>

          {/* Sign Out Form Action */}
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="w-full py-2.5 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              SIGN OUT
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
