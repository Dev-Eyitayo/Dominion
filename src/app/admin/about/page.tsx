import { getAboutContent } from "@/lib/settings";
import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us Page | Admin Portal",
};

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const aboutContent = await getAboutContent();

  return <AboutClient initialData={aboutContent} />;
}
