import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { sql, desc, eq, ilike } from "drizzle-orm";
import Pagination from "@/components/admin/Pagination";
import AdminSearchFilter from "@/components/admin/AdminSearchFilter";
import DeleteProjectButton from "./DeleteProjectButton";

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    q?: string;
  }>;
}

export default async function AdminProjectsPage({ searchParams }: ProjectsPageProps) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { page: pageParam, limit: limitParam, category: categoryParam, q: searchParam } =
    await searchParams;

  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(limitParam || "10", 10)));
  const offset = (page - 1) * limit;
  const activeCategory = categoryParam as
    | "civil"
    | "electrical"
    | "solar"
    | "manufacturing"
    | undefined;
  const searchQuery = (searchParam || "").trim();

  const conditions = [];

  if (
    activeCategory &&
    ["civil", "electrical", "solar", "manufacturing"].includes(activeCategory)
  ) {
    conditions.push(eq(projects.category, activeCategory));
  }

  if (searchQuery) {
    conditions.push(
      sql`(${ilike(projects.title, `%${searchQuery}%`)} OR ${ilike(
        projects.location,
        `%${searchQuery}%`
      )} OR ${ilike(projects.client || "", `%${searchQuery}%`)})`
    );
  }

  const whereClause = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;

  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(projects)
    .where(whereClause);

  const totalItems = countResult[0]?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const projectList = await db
    .select()
    .from(projects)
    .where(whereClause)
    .orderBy(desc(projects.createdAt))
    .limit(limit)
    .offset(offset);

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Civil & Building", value: "civil" },
    { label: "Electrical & Grid", value: "electrical" },
    { label: "Solar & Telecom", value: "solar" },
    { label: "Manufacturing", value: "manufacturing" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Projects Portfolio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your completed and ongoing engineering infrastructure projects
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Debounced Search and Category Filter Bar */}
      <AdminSearchFilter
        placeholder="Search projects by title, location, or client ..."
        categories={categories}
        defaultCategory={activeCategory || ""}
        defaultQuery={searchQuery}
      />

      {/* Modern Data Card Table */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden">
        {projectList.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No projects found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectList.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 relative rounded-sm bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {project.featuredImageUrl ? (
                            <Image
                              src={project.featuredImageUrl}
                              alt={project.title}
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
                            {project.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {project.location} {project.client ? `• Client: ${project.client}` : ""}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize font-medium text-slate-700 px-2.5 py-1 rounded-sm bg-slate-100 text-[11px]">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-sm font-medium text-[11px] capitalize ${
                          project.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : project.status === "ongoing"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {project.isFeatured ? (
                        <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-sm font-semibold text-[11px] border border-amber-200">
                          ★ Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="px-2.5 py-1 rounded-sm text-slate-700 hover:text-blue-600 hover:bg-slate-100 font-medium transition"
                        >
                          Edit
                        </Link>
                        <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
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
            totalItems={totalItems}
            pageSize={limit}
          />
        </div>
      </div>
    </div>
  );
}
