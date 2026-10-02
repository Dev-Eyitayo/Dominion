import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function NotFound() {
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
        <div className="text-6xl sm:text-8xl font-black text-[#0F2B82] mb-4">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-[#0F2B82] hover:bg-[#070D1F] text-white text-xs font-bold uppercase tracking-wider transition"
          >
            Go to Homepage
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider transition"
          >
            Contact Us
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
