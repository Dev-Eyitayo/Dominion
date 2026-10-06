"use server";

import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export interface TeamMemberActionResult {
  success: boolean;
  error?: string;
  memberId?: number;
}

export async function createTeamMemberAction(
  formData: FormData
): Promise<TeamMemberActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const name = (formData.get("name") as string)?.trim();
  const role = (formData.get("role") as string)?.trim();
  const division = (formData.get("division") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const displayOrder = Number(formData.get("displayOrder") || 0);
  const isActive = formData.get("isActive") === "true";
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = (formData.get("imageUrl") as string)?.trim();

  if (!name) {
    return { success: false, error: "Team member name is required." };
  }
  if (!role) {
    return { success: false, error: "Team member role or title is required." };
  }

  let imageUrl = existingImageUrl || "/images/team/team-engineers.jpg";
  let imagePublicId: string | null = null;

  if (imageFile && imageFile.size > 0) {
    try {
      const uploadRes = await uploadToCloudinary(imageFile, "team");
      if (uploadRes) {
        imageUrl = uploadRes.url;
        imagePublicId = uploadRes.publicId;
      }
    } catch (e: any) {
      return { success: false, error: "Photo upload failed: " + (e.message || "Unknown error") };
    }
  }

  try {
    const inserted = await db
      .insert(teamMembers)
      .values({
        name,
        role,
        division,
        bio,
        imageUrl,
        imagePublicId,
        displayOrder,
        isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ id: teamMembers.id });

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/admin/team");
    return { success: true, memberId: inserted[0]?.id };
  } catch (error: any) {
    console.error("Failed to create team member:", error);
    return { success: false, error: error.message || "Failed to create team member." };
  }
}

export async function updateTeamMemberAction(
  id: number,
  formData: FormData
): Promise<TeamMemberActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const name = (formData.get("name") as string)?.trim();
  const role = (formData.get("role") as string)?.trim();
  const division = (formData.get("division") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const displayOrder = Number(formData.get("displayOrder") || 0);
  const isActive = formData.get("isActive") === "true";
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = (formData.get("imageUrl") as string)?.trim();

  if (!name) {
    return { success: false, error: "Team member name is required." };
  }
  if (!role) {
    return { success: false, error: "Team member role or title is required." };
  }

  const currentMember = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, id))
    .limit(1);

  if (!currentMember.length) {
    return { success: false, error: "Team member not found." };
  }

  let imageUrl = existingImageUrl || currentMember[0].imageUrl;
  let imagePublicId = currentMember[0].imagePublicId;

  if (imageFile && imageFile.size > 0) {
    try {
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId);
      }
      const uploadRes = await uploadToCloudinary(imageFile, "team");
      if (uploadRes) {
        imageUrl = uploadRes.url;
        imagePublicId = uploadRes.publicId;
      }
    } catch (e: any) {
      return { success: false, error: "Photo upload failed: " + (e.message || "Unknown error") };
    }
  }

  try {
    await db
      .update(teamMembers)
      .set({
        name,
        role,
        division,
        bio,
        imageUrl,
        imagePublicId,
        displayOrder,
        isActive,
        updatedAt: new Date(),
      })
      .where(eq(teamMembers.id, id));

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/admin/team");
    return { success: true, memberId: id };
  } catch (error: any) {
    console.error("Failed to update team member:", error);
    return { success: false, error: error.message || "Failed to update team member." };
  }
}

export async function deleteTeamMemberAction(id: number): Promise<TeamMemberActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  try {
    const member = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, id))
      .limit(1);

    if (member.length && member[0].imagePublicId) {
      await deleteFromCloudinary(member[0].imagePublicId);
    }

    await db.delete(teamMembers).where(eq(teamMembers.id, id));

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete team member:", error);
    return { success: false, error: error.message || "Failed to delete team member." };
  }
}

export async function toggleTeamMemberStatusAction(
  id: number,
  newStatus: boolean
): Promise<TeamMemberActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  try {
    await db
      .update(teamMembers)
      .set({
        isActive: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(teamMembers.id, id));

    revalidatePath("/team");
    revalidatePath("/about");
    revalidatePath("/admin/team");
    return { success: true, memberId: id };
  } catch (error: any) {
    console.error("Failed to toggle status:", error);
    return { success: false, error: error.message || "Failed to update status." };
  }
}
