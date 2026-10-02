import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/dominion_db";

async function resetDatabase() {
  console.log("\n=======================================================");
  console.log("🧹 DOMINION DATABASE RESET");
  console.log("=======================================================");
  console.log(`Connecting to: ${connectionString.replace(/:[^:@]*@/, ":****@")}\n`);

  const sql = postgres(connectionString, {
    max: 1,
    prepare: false,
    connect_timeout: 15,
  });

  try {
    console.log("Dropping and recreating public schema...");
    await sql.unsafe(`
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO public;
    `);
    console.log("✓ Database wiped clean successfully.");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

resetDatabase();
