"use client";

import { useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="pt-8 px-6 max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-block">
          <SafeImage
            src="/logo.png"
            alt="Dominion Integrated Electrical & Engineering Limited"
            width={160}
            height={45}
            className="h-9 w-auto object-contain"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-6 py-16 text-center my-auto">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Something went wrong
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          We&apos;re having trouble loading this page right now. Please try refreshing, or head back to the home page.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-[#0F2B82] hover:bg-[#070D1F] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider transition"
          >
            Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-slate-500 border-t border-slate-200">
        <p>© {new Date().getFullYear()} Dominion Integrated Electrical &amp; Engineering Limited</p>
      </footer>
    </div>
  );
}
