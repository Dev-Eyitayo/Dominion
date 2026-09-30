import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { projects, manufacturingProducts, engineeringServices, rfqInquiries } from "@/db/schema";
import { sql, desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  let projectCount = 0;
  let manufacturingCount = 0;
  let servicesCount = 0;
  let totalInquiriesCount = 0;
  let newInquiriesCount = 0;
  let recentProjects: Array<typeof projects.$inferSelect> = [];
  let recentInquiries: Array<typeof rfqInquiries.$inferSelect> = [];

  try {
    const [pCount] = await db.select({ count: sql<number>`count(*)::int` }).from(projects);
    projectCount = pCount?.count ?? 0;

    const [mCount] = await db.select({ count: sql<number>`count(*)::int` }).from(manufacturingProducts);
    manufacturingCount = mCount?.count ?? 0;

    const [sCount] = await db.select({ count: sql<number>`count(*)::int` }).from(engineeringServices);
    servicesCount = sCount?.count ?? 0;

    const [iCount] = await db.select({ count: sql<number>`count(*)::int` }).from(rfqInquiries);
    totalInquiriesCount = iCount?.count ?? 0;

    const [newICount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(rfqInquiries)
      .where(eq(rfqInquiries.status, "new"));
    newInquiriesCount = newICount?.count ?? 0;

    recentProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(5);

    recentInquiries = await db
      .select()
      .from(rfqInquiries)
      .orderBy(desc(rfqInquiries.createdAt))
      .limit(5);
  } catch (e) {
    console.error("Dashboard database query error:", e);
  }

  const statCards = [
    {
      title: "Projects",
      count: projectCount,
      link: "/admin/projects",
      linkLabel: "Manage projects",
      iconBg: "bg-blue-50 text-blue-700 border border-blue-100",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Manufacturing Catalog",
      count: manufacturingCount,
      link: "/admin/manufacturing",
      linkLabel: "View catalog",
      iconBg: "bg-amber-50 text-amber-700 border border-amber-100",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: "Engineering Services",
      count: servicesCount,
      link: "/admin/services",
      linkLabel: "View services",
      iconBg: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Client RFQs & Leads",
      count: totalInquiriesCount,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} new` : undefined,
      link: "/admin/inquiries",
      linkLabel: "Review inbox",
      iconBg: "bg-indigo-50 text-indigo-700 border border-indigo-100",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-sm p-6 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {admin.fullName}
          </h2>
          <p className="text-xs text-slate-500 max-w-xl">
            Operations and content management portal for Dominion Integrated Electrical &amp; Engineering Limited.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Project</span>
          </Link>

          <Link
            href="/admin/manufacturing/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-sm p-5 border border-slate-200 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-sm ${stat.iconBg}`}>
                {stat.icon}
              </div>
              {stat.badge && (
                <span className="px-2 py-0.5 rounded-sm text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  {stat.badge}
                </span>
              )}
            </div>

            <div className="mt-5 space-y-1">
              <div className="text-3xl font-bold text-slate-900">
                {stat.count}
              </div>
              <div className="text-xs font-medium text-slate-500">
                {stat.title}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100">
              <Link
                href={stat.link}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between"
              >
                <span>{stat.linkLabel}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Projects & Inbound RFQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Projects Card */}
        <div className="bg-white rounded-sm border border-slate-200 flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Projects</h3>
              <p className="text-xs text-slate-500 mt-0.5">Latest infrastructure case studies</p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View all →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentProjects.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No projects added yet. Click &quot;Add New Project&quot; to create one.
              </div>
            ) : (
              recentProjects.map((p) => (
                <div key={p.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      <span className="capitalize font-medium text-slate-700">{p.category}</span>
                      {" • "}
                      <span>{p.location}</span>
                    </div>
                  </div>

                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="shrink-0 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent RFQs Card */}
        <div className="bg-white rounded-sm border border-slate-200 flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Inquiries</h3>
              <p className="text-xs text-slate-500 mt-0.5">Client RFQs and quote requests</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View inbox →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentInquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No inquiries received yet.
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {inq.clientName}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm ${
                          inq.status === "new"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : inq.status === "under_review"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : inq.status === "quoted"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {inq.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {inq.serviceType} • {inq.phone}
                    </div>
                  </div>

                  <Link
                    href="/admin/inquiries"
                    className="shrink-0 px-3 py-1.5 rounded-sm text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
                  >
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
