import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email({ message: "Please enter a valid email address" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "Your password must be at least 6 characters long")
    .max(100, "Password is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
