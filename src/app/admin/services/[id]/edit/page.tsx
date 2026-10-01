import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { engineeringServices } from "@/db/schema";
import { eq } from "drizzle-orm";
import ServiceForm from "@/components/admin/ServiceForm";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const serviceList = await db
    .select()
    .from(engineeringServices)
    .where(eq(engineeringServices.id, id))
    .limit(1);

  const service = serviceList[0];
  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3.5">
        <Link
          href="/admin/services"
          className="mt-0.5 p-2 rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition shrink-0 group"
          title="Back to Services"
          aria-label="Back to Services"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Service: {service.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Update scope deliverables, executive summary, and featured photo
          </p>
        </div>
      </div>

      <ServiceForm initialData={service} isEditing={true} />
    </div>
  );
}
