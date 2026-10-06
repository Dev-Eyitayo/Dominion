import { notFound } from "next/navigation";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import TeamForm from "../../TeamForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Team Member | Admin Portal",
};

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({ params }: EditPageProps) {
  const { id } = await params;
  const memberId = parseInt(id, 10);

  if (isNaN(memberId)) {
    notFound();
  }

  const result = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, memberId))
    .limit(1);

  if (!result.length) {
    notFound();
  }

  const member = result[0];

  return <TeamForm initialData={member} isEditing={true} />;
}
