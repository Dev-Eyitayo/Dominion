"use server";

import { db } from "@/db";
import { siteSettings, HeroSlide, FacilityContactData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { uploadToCloudinary } from "@/lib/cloudinary";

export interface SettingsActionResult {
  success: boolean;
  error?: string;
}

export async function updateHeroSlidesAction(
  formData: FormData
): Promise<SettingsActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const slidesRaw = formData.get("slides") as string;
  if (!slidesRaw) {
    return { success: false, error: "No slide data provided." };
  }

  let slides: HeroSlide[] = [];
  try {
    slides = JSON.parse(slidesRaw);
  } catch {
    return { success: false, error: "Invalid slide format." };
  }

  if (slides.length === 0) {
    return { success: false, error: "At least one hero slide is required." };
  }

  // Handle image uploads for slides
  for (let i = 0; i < slides.length; i++) {
    const file = formData.get(`slideImage_${i}`) as File | null;
    if (file && file.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(file, "dominion/hero");
        slides[i].img = uploadResult.url;
        slides[i].imgPublicId = uploadResult.publicId;
      } catch (err) {
        console.error(`Error uploading image for slide ${i + 1}:`, err);
        return {
          success: false,
          error: `Could not upload image for slide ${i + 1}. Please try again.`,
        };
      }
    }
  }

  try {
    await db
      .insert(siteSettings)
      .values({
        key: "hero_slides",
        value: slides,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: slides,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating hero slides:", error);
    return { success: false, error: "Could not save hero slides. Please try again." };
  }
}

export async function updateFacilityContactsAction(
  data: FacilityContactData
): Promise<SettingsActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  if (!data.headOffice?.address || !data.headOffice?.hotline1 || !data.factory?.address) {
    return {
      success: false,
      error: "Please provide complete addresses and primary hotlines for both facilities.",
    };
  }

  try {
    await db
      .insert(siteSettings)
      .values({
        key: "facility_contacts",
        value: data,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: data,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/about");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating facility contacts:", error);
    return { success: false, error: "Could not save facility details. Please try again." };
  }
}
