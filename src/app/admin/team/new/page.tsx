import TeamForm from "../TeamForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Team Member | Admin Portal",
};

export default function NewTeamMemberPage() {
  return <TeamForm isEditing={false} />;
}
