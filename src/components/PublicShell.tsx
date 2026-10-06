"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NavigationData } from "@/lib/settings/types";

export default function PublicShell({
  children,
  navigationData,
}: {
  children: React.ReactNode;
  navigationData?: NavigationData;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header navigationData={navigationData} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
