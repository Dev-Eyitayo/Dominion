import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth/actions";
import { db } from "@/db";
import { rfqInquiries } from "@/db/schema";
import { sql, desc, eq, ilike } from "drizzle-orm";
import Pagination from "@/components/admin/Pagination";
import AdminSearchFilter from "@/components/admin/AdminSearchFilter";
import InquiryRowActions from "./InquiryRowActions";

interface InquiriesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    q?: string;
  }>;
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { page: pageParam, limit: limitParam, status: statusParam, q: searchParam } =
    await searchParams;

  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(limitParam || "10", 10)));
  const offset = (page - 1) * limit;
  const activeStatus = statusParam as "new" | "under_review" | "quoted" | "archived" | undefined;
  const searchQuery = (searchParam || "").trim();

  const conditions = [];

  if (activeStatus && ["new", "under_review", "quoted", "archived"].includes(activeStatus)) {
    conditions.push(eq(rfqInquiries.status, activeStatus));
  }

  if (searchQuery) {
    conditions.push(
      sql`(${ilike(rfqInquiries.clientName, `%${searchQuery}%`)} OR ${ilike(
        rfqInquiries.phone,
        `%${searchQuery}%`
      )} OR ${ilike(rfqInquiries.location, `%${searchQuery}%`)})`
    );
  }

  const whereClause = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;

  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(rfqInquiries)
    .where(whereClause);

  const total = countResult[0]?.count || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const newCountResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(rfqInquiries)
    .where(eq(rfqInquiries.status, "new"));
  const newCount = newCountResult[0]?.count || 0;

  const inquiriesList = await db
    .select()
    .from(rfqInquiries)
    .where(whereClause)
    .orderBy(desc(rfqInquiries.createdAt))
    .limit(limit)
    .offset(offset);

  const statuses = [
    { label: "All Inquiries", value: "" },
    { label: `New (${newCount})`, value: "new" },
    { label: "Under Review", value: "under_review" },
    { label: "Quoted", value: "quoted" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Client RFQs &amp; Project Inquiries
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming quote requests, call clients, and dispatch WhatsApp responses
          </p>
        </div>
      </div>

      {/* Tabs and Filter Bar */}
      <div className="bg-white rounded-sm p-4 border border-slate-200 space-y-4">
        {/* Status Filter Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {statuses.map((tab) => {
            const isActive = (!activeStatus && tab.value === "") || activeStatus === tab.value;
            return (
              <Link
                key={tab.value}
                href={`/admin/inquiries?${new URLSearchParams({
                  ...(tab.value ? { status: tab.value } : {}),
                  ...(searchQuery ? { q: searchQuery } : {}),
                }).toString()}`}
                className={`text-xs font-semibold px-3 py-1.5 rounded-sm transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Search Input Form */}
        <AdminSearchFilter
          placeholder="Search by client name, phone number, or site location..." 
          defaultQuery={searchQuery}
        />
      </div>

      {/* Modern Inquiries Table */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden">
        {inquiriesList.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No inquiries found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Service Requested</th>
                  <th className="py-3.5 px-4">Site Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiriesList.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 text-sm">{inquiry.clientName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{inquiry.phone}</div>
                      {inquiry.email && (
                        <div className="text-[11px] text-slate-500">{inquiry.email}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-blue-700">
                      {inquiry.serviceType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {inquiry.location}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-sm font-medium text-[11px] capitalize ${
                          inquiry.status === "new"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : inquiry.status === "under_review"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : inquiry.status === "quoted"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {inquiry.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <InquiryRowActions inquiry={inquiry} />
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
