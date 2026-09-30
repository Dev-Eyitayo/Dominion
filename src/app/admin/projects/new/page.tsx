import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Add New Project
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create an infrastructure project case study with photos and technical scope
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <span>← Back to Projects</span>
        </Link>
      </div>

      <ProjectForm />
    </div>
  );
}
