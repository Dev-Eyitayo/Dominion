import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProjectForm from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const projectList = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  const project = projectList[0];
  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Project: {project.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update project scope, deliverables, and gallery photos
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <span>← Back to Projects</span>
        </Link>
      </div>

      <ProjectForm initialData={project} isEditing={true} />
    </div>
  );
}
