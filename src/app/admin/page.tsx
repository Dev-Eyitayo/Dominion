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

  // Database-level count queries (no in-memory array calculations)
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
    // Gracefully handle if tables are not seeded yet
  }

  return (
    <div className="space-y-8">
      {/* Page Heading & Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold mb-2">
            OPERATIONAL COMMAND CENTER
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            System Overview &amp; Control
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Logged in as <strong className="text-slate-800">{admin.fullName}</strong> ({admin.email})
          </p>
        </div>

        {/* Quick External Link */}
        <div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-[#0F2B82] hover:text-[#0F2B82] font-mono text-xs uppercase tracking-wider font-bold transition-colors"
          >
            PREVIEW PUBLIC WEBSITE
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Projects */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            <span>Portfolio Works</span>
            <span className="text-[#0F2B82] font-bold">PROJECTS</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {projectCount}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Managed in DB</span>
            <Link href="/admin/projects" className="text-[#0F2B82] font-bold hover:underline">
              MANAGE
            </Link>
          </div>
        </div>

        {/* Metric 2: Manufacturing Products */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            <span>Production Catalog</span>
            <span className="text-[#0F2B82] font-bold">PLANT</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {manufacturingCount}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Poles, Blocks, Kerbs</span>
            <Link href="/admin/manufacturing" className="text-[#0F2B82] font-bold hover:underline">
              MANAGE
            </Link>
          </div>
        </div>

        {/* Metric 3: Engineering Services */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            <span>Core Practices</span>
            <span className="text-[#0F2B82] font-bold">SERVICES</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {servicesCount}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Engineering Disciplines</span>
            <Link href="/admin/services" className="text-[#0F2B82] font-bold hover:underline">
              MANAGE
            </Link>
          </div>
        </div>

        {/* Metric 4: RFQs & Leads */}
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            <span>Inquiries &amp; RFQs</span>
            <span className="text-[#D99B26] font-bold">
              {newInquiriesCount > 0 ? `${newInquiriesCount} NEW` : "INBOX"}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {totalInquiriesCount}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Client Quotation Leads</span>
            <Link href="/admin/inquiries" className="text-[#0F2B82] font-bold hover:underline">
              VIEW INBOX
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Actions Strip */}
      <div className="bg-white border border-slate-200 p-6">
        <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-slate-700 mb-4">
          OPERATIONAL SHORTCUTS
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="px-5 py-3 bg-[#0F2B82] hover:bg-slate-900 text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
          >
            CREATE NEW PROJECT
          </Link>
          <Link
            href="/admin/manufacturing/new"
            className="px-5 py-3 bg-[#070D1F] hover:bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
          >
            ADD MANUFACTURING PRODUCT
          </Link>
          <Link
            href="/admin/services/new"
            className="px-5 py-3 bg-white border border-slate-300 hover:border-[#0F2B82] hover:text-[#0F2B82] text-slate-800 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
          >
            ADD ENGINEERING SERVICE
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-5 py-3 bg-white border border-slate-300 hover:border-[#0F2B82] hover:text-[#0F2B82] text-slate-800 font-mono text-xs uppercase tracking-widest font-bold transition-colors"
          >
            REVIEW INCOMING RFQS
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Projects & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Recent Projects */}
        <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-slate-900">
                RECENT PORTFOLIO ADDITIONS
              </h2>
              <Link href="/admin/projects" className="text-xs font-mono text-[#0F2B82] font-bold hover:underline">
                VIEW ALL
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-400">
                No projects registered in database yet. Click "CREATE NEW PROJECT" to start.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentProjects.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{p.title}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">
                        {p.category} • {p.location}
                      </div>
                    </div>
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="text-xs font-mono text-[#0F2B82] font-bold hover:underline"
                    >
                      EDIT
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Recent Inquiries */}
        <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-slate-900">
                RECENT RFQ QUOTATION REQUESTS
              </h2>
              <Link href="/admin/inquiries" className="text-xs font-mono text-[#0F2B82] font-bold hover:underline">
                VIEW ALL
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-400">
                No quotation requests in inbox yet. Incoming leads will show up here.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{inq.clientName}</div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {inq.serviceType} • {inq.phone}
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          inq.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "under_review"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {inq.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
