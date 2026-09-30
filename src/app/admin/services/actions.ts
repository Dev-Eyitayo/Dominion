"use server";

import { db } from "@/db";
import { engineeringServices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { engineeringServiceSchema } from "@/lib/validations/service";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export interface ServiceActionResult {
  success: boolean;
  error?: string;
  serviceId?: string;
}

export async function createServiceAction(
  formData: FormData
): Promise<ServiceActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const categoryBadge = formData.get("categoryBadge") as string;
  const summary = formData.get("summary") as string;
  const deliverablesRaw = (formData.get("deliverables") as string) || "[]";
  const displayOrder = Number(formData.get("displayOrder") || 0);

  let deliverables: string[] = [];
  try {
    deliverables = JSON.parse(deliverablesRaw);
  } catch {}

  const validation = engineeringServiceSchema.safeParse({
    title,
    slug,
    categoryBadge,
    summary,
    deliverables,
    displayOrder,
  });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Please check the form for errors.",
    };
  }

  // Check unique slug
  const existing = await db
    .select({ id: engineeringServices.id })
    .from(engineeringServices)
    .where(eq(engineeringServices.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    return {
      success: false,
      error: "A service with this URL slug already exists. Please choose a unique slug.",
    };
  }

  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile || imageFile.size === 0) {
    return {
      success: false,
      error: "Please select a featured image photo for this engineering service.",
    };
  }

  try {
    const uploadResult = await uploadToCloudinary(imageFile, "dominion/services");

    const [newService] = await db
      .insert(engineeringServices)
      .values({
        title,
        slug,
        categoryBadge,
        summary,
        deliverables,
        featuredImageUrl: uploadResult.url,
        featuredImagePublicId: uploadResult.publicId,
        displayOrder,
      })
      .returning({ id: engineeringServices.id });

    revalidatePath("/admin/services");
    revalidatePath("/admin");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, serviceId: newService.id };
  } catch (err: unknown) {
    console.error("Create service error:", err);
    return {
      success: false,
      error: "Could not save the service. Please try again.",
    };
  }
}

export async function updateServiceAction(
  id: string,
  formData: FormData
): Promise<ServiceActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const existingList = await db
    .select()
    .from(engineeringServices)
    .where(eq(engineeringServices.id, id))
    .limit(1);

  const current = existingList[0];
  if (!current) {
    return { success: false, error: "The service you are trying to edit was not found." };
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const categoryBadge = formData.get("categoryBadge") as string;
  const summary = formData.get("summary") as string;
  const deliverablesRaw = (formData.get("deliverables") as string) || "[]";
  const displayOrder = Number(formData.get("displayOrder") || 0);

  let deliverables: string[] = [];
  try {
    deliverables = JSON.parse(deliverablesRaw);
  } catch {}

  const validation = engineeringServiceSchema.safeParse({
    title,
    slug,
    categoryBadge,
    summary,
    deliverables,
    displayOrder,
  });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Please check the form for errors.",
    };
  }

  let featuredImageUrl = current.featuredImageUrl;
  let featuredImagePublicId = current.featuredImagePublicId;

  const imageFile = formData.get("featuredImage") as File | null;
  if (imageFile && imageFile.size > 0) {
    try {
      if (current.featuredImagePublicId) {
        await deleteFromCloudinary(current.featuredImagePublicId);
      }
      const uploadResult = await uploadToCloudinary(imageFile, "dominion/services");
      featuredImageUrl = uploadResult.url;
      featuredImagePublicId = uploadResult.publicId;
    } catch (err) {
      console.error("Image upload error during update:", err);
      return {
        success: false,
        error: "Failed to upload the new image. Please try again.",
      };
    }
  }

  try {
    await db
      .update(engineeringServices)
      .set({
        title,
        slug,
        categoryBadge,
        summary,
        deliverables,
        featuredImageUrl,
        featuredImagePublicId,
        displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(engineeringServices.id, id));

    revalidatePath("/admin/services");
    revalidatePath(`/admin/services/${id}/edit`);
    revalidatePath("/admin");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, serviceId: id };
  } catch (err: unknown) {
    console.error("Update service error:", err);
    return {
      success: false,
      error: "Could not update service details. Please try again.",
    };
  }
}

export async function deleteServiceAction(
  id: string
): Promise<ServiceActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  try {
    const existing = await db
      .select({ publicId: engineeringServices.featuredImagePublicId })
      .from(engineeringServices)
      .where(eq(engineeringServices.id, id))
      .limit(1);

    if (existing[0]?.publicId) {
      await deleteFromCloudinary(existing[0].publicId);
    }

    await db.delete(engineeringServices).where(eq(engineeringServices.id, id));

    revalidatePath("/admin/services");
    revalidatePath("/admin");
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Delete service error:", err);
    return { success: false, error: "Failed to delete the service. Please try again." };
  }
}
