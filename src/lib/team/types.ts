export interface TeamMemberData {
  id: number;
  name: string;
  role: string;
  division?: string | null;
  bio?: string | null;
  imageUrl: string;
  imagePublicId?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const DEFAULT_TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: 1,
    name: "Engr. Dominion Executive Leadership",
    role: "Managing Director & Principal Infrastructure Consultant",
    division: "EXECUTIVE MANAGEMENT",
    bio: "Over 15 years of distinguished engineering practice directing high-voltage grid electrification, civil structures, and heavy concrete manufacturing. Spearheading Dominion's strategic development across Nigeria.",
    imageUrl: "/images/team/team-engineers.jpg",
    imagePublicId: null,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Civil & Structural Engineering Cadre",
    role: "Lead Project Engineers & Site Superintendents",
    division: "CIVIL & STRUCTURAL DIVISION",
    bio: "Licensed engineers and experienced foremen overseeing geotechnical site analysis, structural integrity audits, reinforced concrete casting, and arterial stormwater drainage channels.",
    imageUrl: "/images/team/team-engineers.jpg",
    imagePublicId: null,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "Electrical & Renewable Power Unit",
    role: "Design, Substation & Solar Project Consultants",
    division: "ELECTRICAL & POWER DIVISION",
    bio: "Specializing in 33kV/11kV substation layout design, CAD electrical computations, commercial solar mini-grid installations, and transparent Bills of Quantities (BoQ).",
    imageUrl: "/images/team/team-planning.jpg",
    imagePublicId: null,
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    name: "Precast Plant QA/QC Team",
    role: "Factory Supervisors & Batching Technicians",
    division: "MANUFACTURING & QUALITY CONTROL",
    bio: "Managing continuous concrete cube crushing tests, high-tensile rebar reinforcement alignment, and automated vibration moulding for electric poles and stay blocks.",
    imageUrl: "/images/precast/pole-transport.jpg",
    imagePublicId: null,
    displayOrder: 4,
    isActive: true,
  },
];
