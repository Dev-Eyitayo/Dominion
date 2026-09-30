"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { projectSchema } from "@/lib/validations/project";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export interface ProjectActionResult {
  success: boolean;
  error?: string;
  projectId?: string;
}

export async function createProjectAction(
  formData: FormData
): Promise<ProjectActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as "civil" | "electrical" | "solar" | "manufacturing";
  const tag = formData.get("tag") as string;
  const location = formData.get("location") as string;
  const client = (formData.get("client") as string) || "";
  const summary = formData.get("summary") as string;
  const contentHtml = formData.get("contentHtml") as string;
  const contentJsonRaw = formData.get("contentJson") as string;
  const status = (formData.get("status") as "completed" | "ongoing" | "planned") || "completed";
  const isFeatured = formData.get("isFeatured") === "true";
  const displayOrder = Number(formData.get("displayOrder") || 0);

  let contentJson = null;
  try {
    if (contentJsonRaw) contentJson = JSON.parse(contentJsonRaw);
  } catch {}

  const validation = projectSchema.safeParse({
    title,
    slug,
    category,
    tag,
    location,
    client,
    summary,
    contentHtml,
    contentJson,
    status,
    isFeatured,
    displayOrder,
  });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Please check the form for errors.",
    };
  }

  // Check slug uniqueness
  const existing = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    return {
      success: false,
      error: "A project with this URL slug already exists. Please choose a unique slug.",
    };
  }

  // Handle Featured Image and Gallery Uploads
  const imageFile = formData.get("featuredImage") as File | null;
  const galleryFiles = formData.getAll("galleryFiles") as File[];
  const galleryCaptions = formData.getAll("galleryCaptions") as string[];

  const validGalleryFiles = galleryFiles.filter((f) => f && f.size > 0);

  if ((!imageFile || imageFile.size === 0) && validGalleryFiles.length === 0) {
    return {
      success: false,
      error: "Please select at least one photograph for this project.",
    };
  }

  try {
    let featuredUrl = "";
    let featuredPublicId = "";

    // Upload featured cover
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "dominion/projects");
      featuredUrl = uploadResult.url;
      featuredPublicId = uploadResult.publicId;
    }

    // Upload gallery photos
    const galleryImages: Array<{ url: string; publicId?: string; caption?: string }> = [];

    for (let i = 0; i < validGalleryFiles.length; i++) {
      const gFile = validGalleryFiles[i];
      const gResult = await uploadToCloudinary(gFile, "dominion/projects");
      const caption = galleryCaptions[i] || "";
      galleryImages.push({
        url: gResult.url,
        publicId: gResult.publicId,
        caption: caption.trim() || undefined,
      });
    }

    // If featured image wasn't provided separately, use the first gallery image
    if (!featuredUrl && galleryImages.length > 0) {
      featuredUrl = galleryImages[0].url;
      featuredPublicId = galleryImages[0].publicId || "";
    }

    const [newProject] = await db
      .insert(projects)
      .values({
        title,
        slug,
        category,
        tag,
        location,
        client: client || null,
        summary,
        contentHtml,
        contentJson,
        featuredImageUrl: featuredUrl,
        featuredImagePublicId: featuredPublicId,
        galleryImages,
        status,
        isFeatured,
        displayOrder,
      })
      .returning({ id: projects.id });

    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    return { success: true, projectId: newProject.id };
  } catch (err: unknown) {
    console.error("Create project error:", err);
    return {
      success: false,
      error: "We could not save the project. Please check the image files and try again.",
    };
  }
}

export async function updateProjectAction(
  id: string,
  formData: FormData
): Promise<ProjectActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const existingProject = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  const current = existingProject[0];
  if (!current) {
    return { success: false, error: "The project you are trying to edit was not found." };
  }

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as "civil" | "electrical" | "solar" | "manufacturing";
  const tag = formData.get("tag") as string;
  const location = formData.get("location") as string;
  const client = (formData.get("client") as string) || "";
  const summary = formData.get("summary") as string;
  const contentHtml = formData.get("contentHtml") as string;
  const contentJsonRaw = formData.get("contentJson") as string;
  const status = (formData.get("status") as "completed" | "ongoing" | "planned") || "completed";
  const isFeatured = formData.get("isFeatured") === "true";
  const displayOrder = Number(formData.get("displayOrder") || 0);

  let contentJson = null;
  try {
    if (contentJsonRaw) contentJson = JSON.parse(contentJsonRaw);
  } catch {}

  const validation = projectSchema.safeParse({
    title,
    slug,
    category,
    tag,
    location,
    client,
    summary,
    contentHtml,
    contentJson,
    status,
    isFeatured,
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

  // Handle replacement featured cover image if provided
  const imageFile = formData.get("featuredImage") as File | null;
  if (imageFile && imageFile.size > 0) {
    try {
      if (current.featuredImagePublicId) {
        await deleteFromCloudinary(current.featuredImagePublicId);
      }
      const uploadResult = await uploadToCloudinary(imageFile, "dominion/projects");
      featuredImageUrl = uploadResult.url;
      featuredImagePublicId = uploadResult.publicId;
    } catch (err) {
      console.error("Image upload error during update:", err);
      return {
        success: false,
        error: "Failed to upload the new featured image. Please try again.",
      };
    }
  }

  // Handle retained existing gallery images
  const existingGalleryJson = formData.get("existingGallery") as string | null;
  let retainedGallery: Array<{ url: string; publicId?: string; caption?: string }> = [];
  try {
    if (existingGalleryJson) {
      retainedGallery = JSON.parse(existingGalleryJson);
    }
  } catch {}

  // Delete removed gallery images from storage
  const previousGallery = current.galleryImages || [];
  const retainedUrls = new Set(retainedGallery.map((g) => g.url));
  for (const prevImg of previousGallery) {
    if (!retainedUrls.has(prevImg.url) && prevImg.publicId) {
      await deleteFromCloudinary(prevImg.publicId);
    }
  }

  // Upload new gallery files
  const newGalleryFiles = formData.getAll("galleryFiles") as File[];
  const newGalleryCaptions = formData.getAll("galleryCaptions") as string[];
  const validNewGalleryFiles = newGalleryFiles.filter((f) => f && f.size > 0);

  const updatedGallery = [...retainedGallery];

  for (let i = 0; i < validNewGalleryFiles.length; i++) {
    const gFile = validNewGalleryFiles[i];
    try {
      const gResult = await uploadToCloudinary(gFile, "dominion/projects");
      const caption = newGalleryCaptions[i] || "";
      updatedGallery.push({
        url: gResult.url,
        publicId: gResult.publicId,
        caption: caption.trim() || undefined,
      });
    } catch (err) {
      console.error("Failed to upload a gallery image:", err);
    }
  }

  try {
    await db
      .update(projects)
      .set({
        title,
        slug,
        category,
        tag,
        location,
        client: client || null,
        summary,
        contentHtml,
        contentJson,
        featuredImageUrl,
        featuredImagePublicId,
        galleryImages: updatedGallery,
        status,
        isFeatured,
        displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}/edit`);
    revalidatePath("/admin");
    return { success: true, projectId: id };
  } catch (err: unknown) {
    console.error("Update project error:", err);
    return {
      success: false,
      error: "Could not update project details. Please try again.",
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ProjectActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  try {
    const existing = await db
      .select({
        publicId: projects.featuredImagePublicId,
        galleryImages: projects.galleryImages,
      })
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    const projectData = existing[0];
    if (projectData?.publicId) {
      await deleteFromCloudinary(projectData.publicId);
    }

    if (projectData?.galleryImages && Array.isArray(projectData.galleryImages)) {
      for (const img of projectData.galleryImages) {
        if (img.publicId) {
          await deleteFromCloudinary(img.publicId);
        }
      }
    }

    await db.delete(projects).where(eq(projects.id, id));

    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    console.error("Delete project error:", err);
    return { success: false, error: "Failed to delete the project. Please try again." };
  }
}
