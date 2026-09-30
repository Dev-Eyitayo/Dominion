import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { engineeringServices } from "@/db/schema";
import { sql, desc, asc, ilike } from "drizzle-orm";
import Pagination from "@/components/admin/Pagination";
import AdminSearchFilter from "@/components/admin/AdminSearchFilter";
import DeleteServiceButton from "./DeleteServiceButton";

interface ServicesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    q?: string;
  }>;
}

export default async function AdminServicesPage({ searchParams }: ServicesPageProps) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { page: pageParam, limit: limitParam, q: searchParam } = await searchParams;

  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(limitParam || "10", 10)));
  const offset = (page - 1) * limit;
  const searchQuery = (searchParam || "").trim();

  const conditions = [];

  if (searchQuery) {
    conditions.push(ilike(engineeringServices.title, `%${searchQuery}%`));
  }

  const whereClause = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;

  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(engineeringServices)
    .where(whereClause);

  const total = countResult[0]?.count || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const servicesList = await db
    .select()
    .from(engineeringServices)
    .where(whereClause)
    .orderBy(asc(engineeringServices.displayOrder), desc(engineeringServices.createdAt))
    .limit(limit)
    .offset(offset);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Engineering Services Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage practice capabilities, deliverables, and service profiles
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Debounced Search Bar */}
      <AdminSearchFilter
        placeholder="Search services by title or scope ..."
        defaultQuery={searchQuery}
      />

      {/* Modern Data Card Table */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden">
        {servicesList.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No services found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Category Badge</th>
                  <th className="py-3.5 px-4">Scope Items</th>
                  <th className="py-3.5 px-4 text-center">Order</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {servicesList.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 relative rounded-sm bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {service.featuredImageUrl ? (
                            <Image
                              src={service.featuredImageUrl}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-400">
                              N/A
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md text-sm">
                            {service.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            /{service.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200 text-[11px]">
                        {service.categoryBadge}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {Array.isArray(service.deliverables)
                        ? `${service.deliverables.length} Deliverables`
                        : "0 Items"}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-700">
                      {service.displayOrder}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="px-2.5 py-1 rounded-sm text-slate-700 hover:text-blue-600 hover:bg-slate-100 font-medium transition"
                        >
                          Edit
                        </Link>
                        <DeleteServiceButton id={service.id} title={service.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        <div className="px-4 border-t border-slate-200 bg-slate-50/50">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={total}
            pageSize={limit}
          />
        </div>
      </div>
    </div>
  );
}
