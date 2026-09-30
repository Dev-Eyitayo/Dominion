"use server";

import { db } from "@/db";
import { rfqInquiries } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const inquiryInputSchema = z.object({
  clientName: z.string().min(2, "Please provide your name or organization").max(255),
  phone: z.string().min(6, "Please provide a valid contact phone number").max(50),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  serviceType: z.string().min(2, "Please select or describe a service category").max(150),
  location: z.string().min(2, "Please provide your project site location").max(255),
  scopeDetails: z.string().min(3, "Please describe the scope of works or requirements"),
});

export interface SubmitInquiryResult {
  success: boolean;
  error?: string;
  inquiryId?: string;
}

export async function submitPublicInquiryAction(
  data: z.infer<typeof inquiryInputSchema>
): Promise<SubmitInquiryResult> {
  const validation = inquiryInputSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Please fill all required fields correctly.",
    };
  }

  const { clientName, phone, email, serviceType, location, scopeDetails } = validation.data;

  try {
    const [newInquiry] = await db
      .insert(rfqInquiries)
      .values({
        clientName: clientName.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        serviceType: serviceType.trim(),
        location: location.trim(),
        scopeDetails: scopeDetails.trim(),
        status: "new",
      })
      .returning({ id: rfqInquiries.id });

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");

    return {
      success: true,
      inquiryId: newInquiry.id,
    };
  } catch (error) {
    console.error("Public inquiry submission error:", error);
    return {
      success: false,
      error: "Unable to submit your request at this time. Please call our engineering desk or try again.",
    };
  }
}
