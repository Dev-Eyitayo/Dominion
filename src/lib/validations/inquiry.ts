import { z } from "zod";

export const rfqInquirySchema = z.object({
  clientName: z
    .string()
    .min(2, "Please provide your full name or company name")
    .max(255)
    .trim(),
  phone: z
    .string()
    .min(7, "Please provide a valid phone number so we can reach you")
    .max(50)
    .trim(),
  email: z
    .string()
    .email({ message: "Please provide a valid email address" })
    .optional()
    .or(z.literal("")),
  serviceType: z
    .string()
    .min(2, "Please select the service or precast product you are inquiring about")
    .max(150)
    .trim(),
  location: z
    .string()
    .min(2, "Please specify your project site location or delivery state")
    .max(255)
    .trim(),
  scopeDetails: z
    .string()
    .min(10, "Please describe the scope of works or quantity needed (at least 10 characters)")
    .max(5000)
    .trim(),
});

export type RfqInquiryInput = z.infer<typeof rfqInquirySchema>;
