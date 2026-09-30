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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Add Manufacturing Product
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Add concrete electric poles, kerbs, or stay blocks to the manufacturing catalog
          </p>
        </div>

        <Link
          href="/admin/manufacturing"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <span>← Back to Catalog</span>
        </Link>
      </div>

      <ManufacturingForm />
    </div>
  );
}
