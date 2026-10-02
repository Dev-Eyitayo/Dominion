import SafeImage from "@/components/SafeImage";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import PublicProjectsClient, { PublicProjectItem } from "@/components/public/PublicProjectsClient";

export const revalidate = 60; // Revalidate every 60 seconds

const DEFAULT_PROJECTS: PublicProjectItem[] = [
  {
    id: "default-proj-1",
    title: "Housing Estate Multi-Structure Development",
    slug: "housing-estate-multi-structure-development",
    category: "civil",
    tag: "CIVIL & BUILDING",
    location: "Oyo State, South-West Nigeria",
    client: "Private Residential Consortium",
    summary:
      "Large-scale estate civil blockwork, substructure raft foundation casting, reinforced concrete decking, and structural framing.",
    contentHtml: `
      <h2>Project Overview & Engineering Scope</h2>
      <p>Dominion Integrated Electrical & Engineering Limited was contracted as principal structural and civil engineering contractor for a multi-unit residential estate development in Oyo State. The project required comprehensive substructure and superstructure engineering across multiple residential blocks.</p>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782343190705.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782343190705.jpg",
        caption: "Substructure casting and structural column framing",
      },
      {
        url: "/images/projects/FB_IMG_1782363996414.jpg",
        caption: "Superstructure assembly and precast architectural work",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: "default-proj-2",
    title: "Highway Earthworks & Vibratory Compaction",
    slug: "highway-earthworks-vibratory-compaction",
    category: "civil",
    tag: "HIGHWAY & ROADS",
    location: "Regional Transport Corridor, South-West Nigeria",
    client: "State Ministry of Works & Infrastructure",
    summary:
      "Heavy soil stabilization, sub-base gravel leveling, and heavy-duty roller compaction operations.",
    contentHtml: `
      <h2>Earthworks & Sub-Base Engineering</h2>
      <p>Execution of heavy corridor earthmoving, cut-and-fill balancing, subgrade soil stabilization, and high-amplitude vibratory roller compaction along a critical regional highway arterial.</p>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782363598182.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782363598182.jpg",
        caption: "Vibratory compaction operations along the highway alignment",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    id: "default-proj-3",
    title: "Commercial Solar Street Lighting & Mini-Grids",
    slug: "commercial-solar-street-lighting-mini-grids",
    category: "solar",
    tag: "SOLAR & RENEWABLES",
    location: "Urban & Rural Municipal Schemes",
    client: "Ministry of Energy & Mineral Resources",
    summary:
      "Turnkey solar PV panel mounting, high-efficiency LED luminaires, lithium storage, and smart telemetry.",
    contentHtml: `
      <h2>Solar Photovoltaic Public Infrastructure</h2>
      <p>Design, structural pole fabrication, and commissioning of standalone high-lumen solar street lighting networks and institutional PV mini-grids across municipal corridors.</p>
    `,
    featuredImageUrl: "/images/services/solar-installation.jpg",
    galleryImages: [
      {
        url: "/images/services/solar-installation.jpg",
        caption: "Commercial solar array installation and telemetry setup",
      },
    ],
    status: "completed",
    isFeatured: true,
    displayOrder: 3,
  },
];

export default async function ProjectsPage() {
  let dbProjects: any[] = [];
  try {
    dbProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(asc(projects.displayOrder));
  } catch (error) {
    console.error("ProjectsPage database query failed, using static fallback:", error);
  }

  const initialProjects: PublicProjectItem[] =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
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
        }))
      : DEFAULT_PROJECTS;

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Page Hero with Background Image & Gradient Overlay */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <SafeImage
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
