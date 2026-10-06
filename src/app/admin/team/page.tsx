import { getTeamMembers } from "@/lib/team";
import TeamClient from "./TeamClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Members | Admin Portal",
};

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const members = await getTeamMembers(false);

  return <TeamClient initialMembers={members} />;
}
