import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as dotenv from "dotenv";
import { DEFAULT_HERO_SLIDES, DEFAULT_FACILITY_CONTACTS, DEFAULT_WHY_CHOOSE_US, DEFAULT_ABOUT_PAGE_DATA } from "../lib/settings/types";
import { DEFAULT_TEAM_MEMBERS } from "../lib/team/types";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

async function runSeed() {
  console.log("Connecting to database at:", connectionString.replace(/:[^:@]+@/, ":****@"));
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  try {
    // 1. Ensure site_settings table exists
    await client`
      CREATE TABLE IF NOT EXISTS "site_settings" (
        "key" varchar(100) PRIMARY KEY NOT NULL,
        "value" jsonb NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    // 2. Ensure team_members table exists
    await client`
      CREATE TABLE IF NOT EXISTS "team_members" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(255) NOT NULL,
        "role" varchar(255) NOT NULL,
        "division" varchar(255),
        "bio" text,
        "image_url" varchar(1024) NOT NULL,
        "image_public_id" varchar(255),
        "display_order" integer DEFAULT 0 NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    console.log("Verified database tables.");

    // 3. Seed site_settings (hero_slides, facility_contacts, why_choose_us, about_content)
    console.log("Seeding site settings...");
    
    await client`
      INSERT INTO "site_settings" ("key", "value", "updated_at")
      VALUES ('hero_slides', ${JSON.stringify(DEFAULT_HERO_SLIDES)}::jsonb, now())
      ON CONFLICT ("key") DO NOTHING;
    `;

    await client`
      INSERT INTO "site_settings" ("key", "value", "updated_at")
      VALUES ('facility_contacts', ${JSON.stringify(DEFAULT_FACILITY_CONTACTS)}::jsonb, now())
      ON CONFLICT ("key") DO NOTHING;
    `;

    await client`
      INSERT INTO "site_settings" ("key", "value", "updated_at")
      VALUES ('why_choose_us', ${JSON.stringify(DEFAULT_WHY_CHOOSE_US)}::jsonb, now())
      ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value", "updated_at" = now();
    `;

    await client`
      INSERT INTO "site_settings" ("key", "value", "updated_at")
      VALUES ('about_content', ${JSON.stringify(DEFAULT_ABOUT_PAGE_DATA)}::jsonb, now())
      ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value", "updated_at" = now();
    `;

    console.log("Site settings seeded.");

    // 4. Seed team_members if empty
    const existingTeam = await client`SELECT COUNT(*) FROM "team_members";`;
    const teamCount = Number(existingTeam[0].count);
    console.log(`Current team members count: ${teamCount}`);

    if (teamCount === 0) {
      console.log("Seeding default authentic team members...");
      for (const member of DEFAULT_TEAM_MEMBERS) {
        await client`
          INSERT INTO "team_members" (
            "name", "role", "division", "bio", "image_url", "image_public_id", "display_order", "is_active"
          ) VALUES (
            ${member.name},
            ${member.role},
            ${member.division || null},
            ${member.bio || null},
            ${member.imageUrl},
            ${member.imagePublicId || null},
            ${member.displayOrder},
            ${member.isActive}
          );
        `;
      }
      console.log("Team members seeded successfully.");
    }

    console.log("All migrations and seeds completed successfully!");
  } catch (error) {
    console.error("Error during seed execution:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSeed();
