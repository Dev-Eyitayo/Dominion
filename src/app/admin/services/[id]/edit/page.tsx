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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Service: {service.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update scope deliverables, executive summary, and featured photo
          </p>
        </div>

        <Link
          href="/admin/services"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <span>← Back to Services</span>
        </Link>
      </div>

      <ServiceForm initialData={service} isEditing={true} />
    </div>
  );
}
