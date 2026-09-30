import { db } from "./index";
import { adminUsers } from "./schema";
import { hashPassword } from "../lib/auth/password";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export async function seedAdmin() {
  const adminName =
    process.env.ADMIN_INIT_NAME ||
    process.env.ADMIN_NAME ||
    "Dominion Super Admin";

  const adminEmail = (
    process.env.ADMIN_INIT_EMAIL ||
    process.env.ADMIN_EMAIL ||
    ""
  ).toLowerCase().trim();

  const adminPassword =
    process.env.ADMIN_INIT_PASSWORD ||
    process.env.ADMIN_PASSWORD ||
    "";

  if (!adminEmail || !adminPassword) {
    console.warn(
      "⚠️  ADMIN_INIT_EMAIL and/or ADMIN_INIT_PASSWORD are not set in environment (.env.local / .env)."
    );
    console.warn("👉 Please set them before running admin seed.");
    return;
  }

  console.log(`Checking if super admin exists for: ${adminEmail}...`);

  try {
    const existing = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, adminEmail))
      .limit(1);

    if (existing.length > 0) {
      console.log("Super Admin already exists in database.");
      return;
    }

    const passwordHash = await hashPassword(adminPassword);

    await db.insert(adminUsers).values({
      fullName: adminName,
      email: adminEmail,
      passwordHash,
      role: "super_admin",
    });

    console.log("Super Admin account successfully created from ENV!");
    console.log(`Email: ${adminEmail}`);
  } catch (error) {
    console.error("Error during admin seeding:", error);
  }
}

// Run directly if invoked from CLI
if (require.main === module) {
  seedAdmin().then(() => process.exit(0));
}
