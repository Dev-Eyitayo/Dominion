import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import ManufacturingForm from "@/components/admin/ManufacturingForm";

export default async function NewManufacturingProductPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3.5">
        <Link
          href="/admin/manufacturing"
          className="mt-0.5 p-2 rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition shrink-0 group"
          title="Back to Catalog"
          aria-label="Back to Catalog"
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
            Add Manufacturing Product
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add concrete electric poles, kerbs, or stay blocks to the manufacturing catalog
          </p>
        </div>
      </div>

      <ManufacturingForm />
    </div>
  );
}
