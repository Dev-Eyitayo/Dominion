"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { AboutPageData } from "@/lib/settings/types";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export interface AboutActionResult {
  success: boolean;
  error?: string;
  data?: AboutPageData;
}

export async function updateAboutContentAction(
  formData: FormData
): Promise<AboutActionResult> {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return { success: false, error: "Your session has expired. Please sign in again." };
    }

    const contentRaw = formData.get("content") as string;
    if (!contentRaw) {
      return { success: false, error: "Missing content payload." };
    }

    let data: AboutPageData;
    try {
      data = JSON.parse(contentRaw);
    } catch {
      return { success: false, error: "Invalid content format." };
    }

    // Handle banner image upload
    const bannerFile = formData.get("bannerImage") as File | null;
    if (bannerFile && bannerFile.size > 0) {
      try {
        if (data.bannerImagePublicId) {
          await deleteFromCloudinary(data.bannerImagePublicId);
        }
        const uploadRes = await uploadToCloudinary(bannerFile, "dominion/about");
        data.bannerImageUrl = uploadRes.url;
        data.bannerImagePublicId = uploadRes.publicId;
      } catch (err: any) {
        return { success: false, error: "Failed to upload banner photo: " + (err.message || "") };
      }
    }

    // Handle overview image upload
    const overviewFile = formData.get("overviewImage") as File | null;
    if (overviewFile && overviewFile.size > 0) {
      try {
        if (data.overviewImagePublicId) {
          await deleteFromCloudinary(data.overviewImagePublicId);
        }
        const uploadRes = await uploadToCloudinary(overviewFile, "dominion/about");
        data.overviewImageUrl = uploadRes.url;
        data.overviewImagePublicId = uploadRes.publicId;
      } catch (err: any) {
        return { success: false, error: "Failed to upload overview photo: " + (err.message || "") };
      }
    }

    await db
      .insert(siteSettings)
      .values({
        key: "about_content",
        value: data as any,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: data as any,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/about");
    revalidatePath("/");
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed to update about content:", error);
    return { success: false, error: error.message || "Failed to save about page changes." };
  }
}
