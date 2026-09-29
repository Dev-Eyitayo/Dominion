import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "dominion_enterprise_jwt_secure_secret_key_2026_x89f72b1";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface AdminJWTPayload {
  userId: string;
  email: string;
  fullName: string;
  role: "super_admin" | "editor";
}

const SESSION_EXPIRY = "7d"; // 7 days session

export async function signSessionToken(payload: AdminJWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<AdminJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as AdminJWTPayload;
  } catch {
    return null;
  }
}
