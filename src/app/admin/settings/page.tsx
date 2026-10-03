import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { getHeroSlides, getFacilityContacts } from "@/lib/settings";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const [heroSlides, facilityContacts] = await Promise.all([
    getHeroSlides(),
    getFacilityContacts(),
  ]);

  return (
    <SettingsClient
      initialHeroSlides={heroSlides}
      initialFacilityContacts={facilityContacts}
    />
  );
}
