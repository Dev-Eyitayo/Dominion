"use client";

import { useEffect, useState } from "react";

export default function StatsBar() {
  const [counts, setCounts] = useState({ y: 0, p: 0, d: 0, c: 0 });

  useEffect(() => {
    const duration = 1800;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - (1 - progress) * (1 - progress);

      setCounts({
        y: Math.floor(ease * 2020),
        p: Math.floor(ease * 10000),
        d: Math.floor(ease * 6),
        c: Math.floor(ease * 100),
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCounts({ y: 2020, p: 10000, d: 6, c: 100 });
      }
    };

    requestAnimationFrame(update);
  }, []);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {counts.y}
            </div>
            <div className="text-xs uppercase tracking-wider font-bold text-slate-700 mt-1">
              Year Incorporated
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              RC: 1655029
            </div>
          </div>

          <div className="pt-4 sm:pt-0 sm:pl-8">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {counts.p.toLocaleString()}+
            </div>
            <div className="text-xs uppercase tracking-wider font-bold text-slate-700 mt-1">
              Precast Units Produced
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Poles, Slabs &amp; Kerbs
            </div>
          </div>

          <div className="pt-4 sm:pt-0 sm:pl-8">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {counts.d}+
            </div>
            <div className="text-xs uppercase tracking-wider font-bold text-slate-700 mt-1">
              Engineering Disciplines
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Civil, Electrical, Solar
            </div>
          </div>

          <div className="pt-4 sm:pt-0 sm:pl-8">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {counts.c}%
            </div>
            <div className="text-xs uppercase tracking-wider font-bold text-slate-700 mt-1">
              Statutory Compliance
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              FIRS &amp; SMEDAN Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
