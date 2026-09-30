"use server";

import { db } from "@/db";
import { rfqInquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { z } from "zod";

export interface InquiryActionResult {
  success: boolean;
  error?: string;
}

const statusUpdateSchema = z.object({
  id: z.string().uuid("Invalid inquiry ID"),
  status: z.enum(["new", "under_review", "quoted", "archived"]),
  adminNotes: z.string().optional(),
});

export async function updateInquiryStatusAction(
  id: string,
  status: "new" | "under_review" | "quoted" | "archived",
  adminNotes?: string
): Promise<InquiryActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const validation = statusUpdateSchema.safeParse({ id, status, adminNotes });
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Invalid status payload." };
  }

  try {
    await db
      .update(rfqInquiries)
      .set({
        status,
        adminNotes: adminNotes ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(rfqInquiries.id, id));

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    console.error("Update inquiry status error:", err);
    return { success: false, error: "Could not update inquiry status. Please try again." };
  }
}

export async function deleteInquiryAction(
  id: string
): Promise<InquiryActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  try {
    await db.delete(rfqInquiries).where(eq(rfqInquiries.id, id));

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    console.error("Delete inquiry error:", err);
    return { success: false, error: "Failed to delete the inquiry record. Please try again." };
  }
}
