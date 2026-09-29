import { ReactNode } from "react";
import { getCurrentAdmin } from "@/lib/auth/actions";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Dominion Integrated Electrical & Engineering Ltd",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getCurrentAdmin();

  // If unauthenticated, render children (e.g. login page)
  if (!admin) {
    return <>{children}</>;
  }

  // If authenticated, render full CMS shell with dedicated sidebar & no footer
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex">
      {/* Dedicated Left Navigation Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
