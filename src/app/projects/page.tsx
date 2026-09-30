import Image from "next/image";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import PublicProjectsClient, { PublicProjectItem } from "@/components/public/PublicProjectsClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectsPage() {
  const dbProjects = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.displayOrder));

  const initialProjects: PublicProjectItem[] = dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    tag: p.tag,
    location: p.location,
    client: p.client,
    summary: p.summary,
    contentHtml: p.contentHtml,
    featuredImageUrl: p.featuredImageUrl,
    galleryImages: p.galleryImages,
    status: p.status,
    isFeatured: p.isFeatured,
    displayOrder: p.displayOrder,
  }));

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/FB_IMG_1782343190705.jpg"
            alt="Executed Engineering Projects"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/85 via-[#070D1F]/60 to-[#0F2B82]/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            TRACK RECORD &amp; EXECUTED PROJECTS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 uppercase">
            Engineering Project Portfolio
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            A verified record of executed civil developments, high-voltage rural electrification schemes, solar renewable IT mini-grids, and precast supply consignments.
          </p>
        </div>
      </section>

      {/* Live Filterable Projects Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PublicProjectsClient initialProjects={initialProjects} />
        </div>
      </section>
    </div>
  );
}
