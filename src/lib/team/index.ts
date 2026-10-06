import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { TeamMemberData, DEFAULT_TEAM_MEMBERS } from "./types";

export * from "./types";

export async function getTeamMembers(onlyActive = true): Promise<TeamMemberData[]> {
  try {
    const query = db
      .select()
      .from(teamMembers);

    const members = onlyActive
      ? await query.where(eq(teamMembers.isActive, true)).orderBy(asc(teamMembers.displayOrder), asc(teamMembers.id))
      : await query.orderBy(asc(teamMembers.displayOrder), asc(teamMembers.id));

    if (members && members.length > 0) {
      return members as TeamMemberData[];
    }
  } catch (e) {
    console.error("Error querying team_members table:", e);
  }
  return DEFAULT_TEAM_MEMBERS;
}
