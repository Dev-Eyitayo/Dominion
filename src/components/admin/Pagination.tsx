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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 py-3">
        <div>
          Showing <span className="font-semibold text-slate-800">{totalItems}</span> total {totalItems === 1 ? "record" : "records"}
        </div>
        <div className="text-slate-400">Page 1 of 1</div>
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
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 text-xs">
      {/* Total records and page size selector */}
      <div className="flex items-center gap-3 text-slate-600">
        <div>
          Showing <span className="font-semibold text-slate-900">{totalItems > 0 ? startItem : 0}</span> to{" "}
          <span className="font-semibold text-slate-900">{endItem}</span> of{" "}
          <span className="font-semibold text-slate-900">{totalItems}</span> records
        </div>

        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
          <span className="text-slate-400 text-[11px]">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Subtle Page Navigation Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          Previous
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {start > 1 && <span className="px-1 text-slate-400">...</span>}
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`w-7 h-7 rounded text-xs font-medium transition cursor-pointer ${
                p === currentPage
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {p}
            </button>
          ))}
          {end < totalPages && <span className="px-1 text-slate-400">...</span>}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
