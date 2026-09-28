"use client";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Collaborate & Plan",
      desc: "Comprehensive site inspection, soil analysis, client briefing, and conceptual engineering feasibility.",
    },
    {
      num: "02",
      title: "Design & Schematics",
      desc: "Detailed architectural drawings, structural engineering load models, and electrical schematics.",
    },
    {
      num: "03",
      title: "Costing & Compliance",
      desc: "Transparent BoQ generation, procurement logistics, statutory approvals, and HSE work plan authorization.",
    },
    {
      num: "04",
      title: "Construction & QC",
      desc: "Execution by certified engineers, utilization of high-grade precast components, and rigorous continuous QA/QC.",
    },
    {
      num: "05",
      title: "Testing & Handover",
      desc: "High-voltage load testing, final structural sign-off, client walkthrough, and formal project commissioning.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 font-bold mb-4">
            ENGINEERING WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
            Structured 5-Step Delivery Framework
          </h2>
        </div>

        {/* 5-Column Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border border-slate-200 hover:border-[#0F2B82] hover:bg-[#0F2B82] group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl font-black font-mono tracking-tighter text-slate-300 group-hover:text-[#D99B26] transition-colors mb-4">
                  {step.num}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed transition-colors">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-white/20 text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#D99B26] transition-colors uppercase tracking-widest">
                STAGE {step.num}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
