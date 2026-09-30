import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { manufacturingProducts } from "@/db/schema";
import { eq } from "drizzle-orm";
import ManufacturingForm from "@/components/admin/ManufacturingForm";

interface EditManufacturingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditManufacturingPage({ params }: EditManufacturingPageProps) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const productList = await db
    .select()
    .from(manufacturingProducts)
    .where(eq(manufacturingProducts.id, id))
    .limit(1);

  const product = productList[0];
  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Product: {product.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update technical specs, compressive strength, load rating, and photos
          </p>
        </div>

        <Link
          href="/admin/manufacturing"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <span>← Back to Catalog</span>
        </Link>
      </div>

      <ManufacturingForm initialData={product} isEditing={true} />
    </div>
  );
}
