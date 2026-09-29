"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "./password";
import { signSessionToken, verifySessionToken, AdminJWTPayload } from "./session";
import { loginSchema } from "@/lib/validations/auth";
import { COOKIE_NAME } from "./constants";
import type { AuthActionResult } from "./types";

export async function loginAdminAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  const validation = loginSchema.safeParse({
    email: emailRaw,
    password: passwordRaw,
  });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Please check your email and password.",
    };
  }

  const { email, password } = validation.data;

  try {
    const userList = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    const user = userList[0];
    if (!user) {
      return {
        success: false,
        error: "Incorrect email address or password. Please verify your credentials and try again.",
      };
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return {
        success: false,
        error: "Incorrect email address or password. Please verify your credentials and try again.",
      };
    }

    // Update last login timestamp
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date(), updatedAt: new Date() })
      .where(eq(adminUsers.id, user.id));

    // Sign secure JWT session token
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Login server error:", err);
    return {
      success: false,
      error: "Unable to sign you in right now. Please try again.",
    };
  }
}

export async function logoutAdminAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function getCurrentAdmin(): Promise<AdminJWTPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  return await verifySessionToken(sessionCookie.value);
}
