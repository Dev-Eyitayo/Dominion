import { notFound } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const STATIC_PROJECTS = [
  {
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
      <h3>Key Engineering Deliverables</h3>
      <ul>
        <li>Geotechnical site investigation, excavation, and high-load raft foundation construction using Grade C35 structural concrete.</li>
        <li>Reinforced concrete columns, ring beams, and monolithic floor slab decking conforming to BS 8110 standards.</li>
        <li>Precision high-density sand-cement blockwork masonry and internal load-bearing partitions.</li>
        <li>Integrated plumbing risers, underground electrical conduits, and perimeter stormwater drainage canals.</li>
      </ul>
      <h3>Quality Assurance & Standards</h3>
      <p>All aggregate batching, slump testing, and 28-day concrete cube compressive strength tests were executed under strict quality control protocols, achieving zero structural non-conformance.</p>
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
  },
  {
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
      <h3>Technical Execution Stages</h3>
      <ul>
        <li>Clearing, topsoil stripping, and corridor grading with heavy motor graders and CAT bulldozers.</li>
        <li>Placement of approved lateritic sub-base fill material in compacted 150mm layers.</li>
        <li>Field dry density (FDD) testing and nuclear moisture-density gauge verification achieving >98% Modified AASHTO compaction.</li>
        <li>Precision cross-fall slope preparation for optimal highway surface drainage.</li>
      </ul>
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
  },
  {
    title: "Asphalt Highway Paving & Roadway Kerbing",
    slug: "asphalt-highway-paving-roadway-kerbing",
    category: "civil",
    tag: "ASPHALT & PAVING",
    location: "South-West Trunk Road Corridor",
    client: "Highway Development Authority",
    summary:
      "Bituminous asphalt wearing course application, shoulder grading, and precision precast kerb alignment.",
    contentHtml: `
      <h2>Pavement Construction & Kerb Alignment</h2>
      <p>Delivery of hot-mix asphalt concrete wearing course laying, bitumen prime coat spraying, and hydraulically pressed road kerb installation on an inter-city highway.</p>
    `,
    featuredImageUrl: "/images/projects/FB_IMG_1782363608838.jpg",
    galleryImages: [
      {
        url: "/images/projects/FB_IMG_1782363608838.jpg",
        caption: "Asphalt wearing course compaction and roadway alignment",
      },
    ],
    status: "completed",
    isFeatured: true,
  },
];

export async function generateStaticParams() {
  try {
    const allProjects = await db.select({ slug: projects.slug }).from(projects);
    if (allProjects.length > 0) {
      return allProjects.map((p) => ({ slug: p.slug }));
    }
  } catch (error) {
    console.error("generateStaticParams db error:", error);
  }
  return STATIC_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  let project: any = null;
  try {
    const projectList = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    project = projectList[0];
  } catch (error) {
    console.error("generateMetadata db error:", error);
  }

  if (!project) {
    project = STATIC_PROJECTS.find((p) => p.slug === slug);
  }

  if (!project) {
    return {
      title: "Project Not Found | Dominion Engineering",
    };
  }

  return {
    title: `${project.title} | Dominion Integrated Electrical & Engineering Limited`,
    description: project.summary,
  };
}

export default async function PublicProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let project: any = null;

  try {
    const projectList = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    project = projectList[0];
  } catch (error) {
    console.error("PublicProjectDetailPage db error:", error);
  }

  if (!project) {
    project = STATIC_PROJECTS.find((p) => p.slug === slug);
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Hero Header */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={project.featuredImageUrl}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F] via-[#070D1F]/80 to-[#0F2B82]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-amber-400 transition">
              Projects
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-bold truncate max-w-xs">{project.title}</span>
          </div>

          <div className="inline-block bg-[#0F2B82] text-white font-mono text-xs uppercase tracking-widest px-4 py-1.5 font-bold mb-4 border border-white/20">
            {project.tag}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 uppercase max-w-4xl">
            {project.title}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Main Content & Specs Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Scope & Description & Gallery */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Cover Image */}
              <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <SafeImage
                  src={project.featuredImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Rich Text Scope Description */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
                    Technical Scope &amp; Engineering Execution
                  </h2>
                </div>

                <div
                  className="tiptap-content text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
                  dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                />
              </div>

              {/* Multi-Photo Gallery Grid */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                      Site Photos &amp; Execution Gallery
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      High-resolution visual record of site operations and completed structures
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(project.galleryImages as Array<{ url: string; caption?: string }>).map((img, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 rounded-sm overflow-hidden flex flex-col"
                      >
                        <div className="relative aspect-4/3 w-full bg-slate-200">
                          <SafeImage
                            src={img.url}
                            alt={img.caption || `Gallery photo ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {img.caption && (
                          <div className="p-3 bg-white border-t border-slate-100">
                            <p className="text-xs text-slate-600 font-medium">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Project Metadata Sidebar */}
            <div className="space-y-8">
              {/* Project Details Card */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm space-y-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-3 font-mono">
                  Project Details
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Location</div>
                    <div className="text-slate-900 font-semibold mt-0.5">{project.location}</div>
                  </div>

                  {project.client && (
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Client / Authority</div>
                      <div className="text-slate-900 font-semibold mt-0.5">{project.client}</div>
                    </div>
                  )}

                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Sector Capability</div>
                    <div className="text-[#0F2B82] font-bold uppercase mt-0.5">{project.category}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Execution Status</div>
                    <div className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase mt-1">
                      {project.status}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Quality Standard</div>
                    <div className="text-slate-900 font-semibold mt-0.5">NIS / BS 8110 / DisCo Certified</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href="/contact#quote"
                    className="block w-full text-center bg-[#0F2B82] hover:bg-[#070D1F] text-white font-mono text-xs uppercase tracking-widest font-bold py-3 transition-colors"
                  >
                    Request Similar Proposal
                  </Link>
                </div>
              </div>

              {/* Direct Engineering Consultation CTA */}
              <div className="bg-[#070D1F] text-white p-6 rounded-sm border border-[#0F2B82]/40 space-y-4">
                <div className="inline-block bg-[#D99B26] text-slate-950 font-mono text-[10px] uppercase font-bold px-2 py-0.5">
                  DIRECT CONSULTATION
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                  Need Professional Engineering Execution?
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Our civil engineers, power specialists, and precast production plant are ready to mobilize for your site works.
                </p>
                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="text-slate-300">
                    Hotline: <span className="text-amber-400 font-bold">+234 803 400 0000</span>
                  </div>
                  <div className="text-slate-300">
                    Email: <span className="text-amber-400 font-bold">info@dominionltd.ng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
