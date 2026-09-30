"use server";

import { db } from "@/db";
import { manufacturingProducts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { manufacturingProductSchema } from "@/lib/validations/manufacturing";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export interface ManufacturingActionResult {
  success: boolean;
  error?: string;
  productId?: string;
}

export async function createManufacturingProductAction(
  formData: FormData
): Promise<ManufacturingActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as "poles" | "blocks" | "kerbs" | "drainage" | "custom";
  const technicalSpecsRaw = (formData.get("technicalSpecs") as string) || "{}";
  const descriptionHtml = formData.get("descriptionHtml") as string;
  const descriptionJsonRaw = formData.get("descriptionJson") as string;
  const isAvailable = formData.get("isAvailable") === "true";
  const displayOrder = Number(formData.get("displayOrder") || 0);

  let technicalSpecs: Record<string, string> = {};
  try {
    technicalSpecs = JSON.parse(technicalSpecsRaw);
  } catch {}

  let descriptionJson = null;
  try {
    if (descriptionJsonRaw) descriptionJson = JSON.parse(descriptionJsonRaw);
  } catch {}

  const validation = manufacturingProductSchema.safeParse({
    title,
    slug,
    category,
    technicalSpecs,
    descriptionHtml,
    descriptionJson,
    isAvailable,
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
    .select({ id: manufacturingProducts.id })
    .from(manufacturingProducts)
    .where(eq(manufacturingProducts.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    return {
      success: false,
      error: "A product with this URL slug already exists. Please choose a unique slug.",
    };
  }

  const imageFile = formData.get("productImage") as File | null;
  if (!imageFile || imageFile.size === 0) {
    return {
      success: false,
      error: "Please select an image photo for this manufacturing product.",
    };
  }

  try {
    const uploadResult = await uploadToCloudinary(imageFile, "dominion/manufacturing");

    const [newProduct] = await db
      .insert(manufacturingProducts)
      .values({
        title,
        slug,
        category,
        technicalSpecs,
        descriptionHtml,
        descriptionJson,
        imageUrl: uploadResult.url,
        imagePublicId: uploadResult.publicId,
        isAvailable,
        displayOrder,
      })
      .returning({ id: manufacturingProducts.id });

    revalidatePath("/admin/manufacturing");
    revalidatePath("/admin");
    revalidatePath("/manufacturing");
    revalidatePath("/");
    return { success: true, productId: newProduct.id };
  } catch (err: unknown) {
    console.error("Create manufacturing product error:", err);
    return {
      success: false,
      error: "Could not save the product. Please try again.",
    };
  }
}

export async function updateManufacturingProductAction(
  id: string,
  formData: FormData
): Promise<ManufacturingActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const existingList = await db
    .select()
    .from(manufacturingProducts)
    .where(eq(manufacturingProducts.id, id))
    .limit(1);

  const current = existingList[0];
  if (!current) {
    return { success: false, error: "The product you are trying to edit was not found." };
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as "poles" | "blocks" | "kerbs" | "drainage" | "custom";
  const technicalSpecsRaw = (formData.get("technicalSpecs") as string) || "{}";
  const descriptionHtml = formData.get("descriptionHtml") as string;
  const descriptionJsonRaw = formData.get("descriptionJson") as string;
  const isAvailable = formData.get("isAvailable") === "true";
  const displayOrder = Number(formData.get("displayOrder") || 0);

  let technicalSpecs: Record<string, string> = {};
  try {
    technicalSpecs = JSON.parse(technicalSpecsRaw);
  } catch {}

  let descriptionJson = null;
  try {
    if (descriptionJsonRaw) descriptionJson = JSON.parse(descriptionJsonRaw);
  } catch {}

  const validation = manufacturingProductSchema.safeParse({
    title,
    slug,
    category,
    technicalSpecs,
    descriptionHtml,
    descriptionJson,
    isAvailable,
    displayOrder,
  });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Please check the form for errors.",
    };
  }

  let imageUrl = current.imageUrl;
  let imagePublicId = current.imagePublicId;

  const imageFile = formData.get("productImage") as File | null;
  if (imageFile && imageFile.size > 0) {
    try {
      if (current.imagePublicId) {
        await deleteFromCloudinary(current.imagePublicId);
      }
      const uploadResult = await uploadToCloudinary(imageFile, "dominion/manufacturing");
      imageUrl = uploadResult.url;
      imagePublicId = uploadResult.publicId;
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
      .update(manufacturingProducts)
      .set({
        title,
        slug,
        category,
        technicalSpecs,
        descriptionHtml,
        descriptionJson,
        imageUrl,
        imagePublicId,
        isAvailable,
        displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(manufacturingProducts.id, id));

    revalidatePath("/admin/manufacturing");
    revalidatePath(`/admin/manufacturing/${id}/edit`);
    revalidatePath("/admin");
    revalidatePath("/manufacturing");
    revalidatePath("/");
    return { success: true, productId: id };
  } catch (err: unknown) {
    console.error("Update manufacturing product error:", err);
    return {
      success: false,
      error: "Could not update product details. Please try again.",
    };
  }
}

export async function deleteManufacturingProductAction(
  id: string
): Promise<ManufacturingActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  try {
    const existing = await db
      .select({ publicId: manufacturingProducts.imagePublicId })
      .from(manufacturingProducts)
      .where(eq(manufacturingProducts.id, id))
      .limit(1);

    if (existing[0]?.publicId) {
      await deleteFromCloudinary(existing[0].publicId);
    }

    await db.delete(manufacturingProducts).where(eq(manufacturingProducts.id, id));

    revalidatePath("/admin/manufacturing");
    revalidatePath("/admin");
    revalidatePath("/manufacturing");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    console.error("Delete manufacturing product error:", err);
    return { success: false, error: "Failed to delete the product. Please try again." };
  }
}
