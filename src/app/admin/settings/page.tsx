import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { getHeroSlides, getFacilityContacts, getWhyChooseUs } from "@/lib/settings";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const [heroSlides, facilityContacts, whyChooseUs] = await Promise.all([
    getHeroSlides(),
    getFacilityContacts(),
    getWhyChooseUs(),
  ]);

  return (
    <SettingsClient
      initialHeroSlides={heroSlides}
      initialFacilityContacts={facilityContacts}
      initialWhyChooseUs={whyChooseUs}
    />
  );
}
