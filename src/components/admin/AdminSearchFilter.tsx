"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CategoryOption {
  label: string;
  value: string;
}

interface AdminSearchFilterProps {
  placeholder?: string;
  categories?: CategoryOption[];
  categoryParamName?: string;
  defaultCategory?: string;
  defaultQuery?: string;
  debounceMs?: number;
}

export default function AdminSearchFilter({
  placeholder = "Search as you type...",
  categories,
  categoryParamName = "category",
  defaultCategory = "",
  defaultQuery = "",
  debounceMs = 350,
}: AdminSearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(defaultQuery);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // Sync state if searchParams change externally (e.g. back button)
  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    const currentCat = searchParams.get(categoryParamName) || "";
    setQuery(currentQ);
    setSelectedCategory(currentCat);
  }, [searchParams, categoryParamName]);

  const updateUrlParams = useCallback(
    (newQuery: string, newCategory?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      const trimmedQuery = newQuery.trim();
      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      } else {
        params.delete("q");
      }

      const catToUse = newCategory !== undefined ? newCategory : selectedCategory;
      if (catToUse) {
        params.set(categoryParamName, catToUse);
      } else {
        params.delete(categoryParamName);
      }

      // Reset to page 1 whenever filter/search changes
      params.delete("page");

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.replace(targetUrl, { scroll: false });
      });
    },
    [pathname, router, searchParams, categoryParamName, selectedCategory]
  );

  // Debounced search on query change
  useEffect(() => {
    const currentParamQ = searchParams.get("q") || "";
    if (query === currentParamQ) return;

    const timer = setTimeout(() => {
      updateUrlParams(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, updateUrlParams, searchParams]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    updateUrlParams(query, newCat);
  };

  const handleClear = () => {
    setQuery("");
    updateUrlParams("", selectedCategory);
  };

  const handleResetAll = () => {
    setQuery("");
    setSelectedCategory("");
    updateUrlParams("", "");
  };

  const hasActiveFilters = Boolean(query.trim() || selectedCategory);

  return (
    <div className="bg-white rounded-sm p-4 border border-slate-200">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search Input with Debounce */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {isPending ? (
              <svg
                className="animate-spin h-4 w-4 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Optional Category Selector Dropdown */}
        {categories && categories.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-700 font-medium focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset All Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetAll}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-sm text-xs font-medium transition cursor-pointer shrink-0"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
