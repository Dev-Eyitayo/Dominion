"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1 && totalItems <= pageSize) {
    return (
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-slate-200">
        <div>Showing {totalItems} total {totalItems === 1 ? "record" : "records"}</div>
        <div>Page 1 of 1</div>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("limit", newSize.toString());
    params.set("page", "1"); // Reset to page 1 on page size change
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate visible page numbers
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 font-mono text-xs">
      
      {/* Total Records Counter & Page Size Selector */}
      <div className="flex items-center gap-4 text-slate-600">
        <div>
          Showing <span className="font-bold text-slate-900">{totalItems > 0 ? startItem : 0}</span> to{" "}
          <span className="font-bold text-slate-900">{endItem}</span> of{" "}
          <span className="font-bold text-slate-900">{totalItems}</span> records
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="bg-white border border-slate-300 text-slate-800 px-2 py-1 focus:outline-none focus:border-[#0F2B82] rounded-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center space-x-1">
        {/* First & Prev */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage <= 1}
          className="px-2.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 transition-colors"
          title="First Page"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 transition-colors"
        >
          PREV
        </button>

        {/* Page Numbers */}
        {start > 1 && <span className="px-1 text-slate-400">...</span>}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1.5 border transition-colors ${
              p === currentPage
                ? "bg-[#0F2B82] border-[#0F2B82] text-white font-bold"
                : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800"
            }`}
          >
            {p}
          </button>
        ))}
        {end < totalPages && <span className="px-1 text-slate-400">...</span>}

        {/* Next & Last */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 transition-colors"
        >
          NEXT
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 transition-colors"
          title="Last Page"
        >
          »
        </button>
      </div>

    </div>
  );
}
