import { ReactNode } from "react";
import { getCurrentAdmin } from "@/lib/auth/actions";
import AdminNavLayout from "@/components/admin/AdminNavLayout";
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

  // If unauthenticated (e.g. login page), render without admin shell
  if (!admin) {
    return <>{children}</>;
  }

  // If authenticated, render full CMS shell with responsive layout & navigation
  return <AdminNavLayout admin={admin}>{children}</AdminNavLayout>;
}
