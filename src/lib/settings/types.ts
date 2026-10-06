export interface HeroSlide {
  img: string;
  imgPublicId?: string;
  mediaType?: "image" | "video";
  videoUrl?: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface FacilityContactData {
  headOffice: {
    tag: string;
    title: string;
    address: string;
    hotline1: string;
    hotline2: string;
    email: string;
    hours: string;
  };
  factory: {
    tag: string;
    title: string;
    address: string;
    yardDirect: string;
    operations: string;
    logistics: string;
  };
}

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    img: "/images/hero-construction.jpg",
    mediaType: "image",
    title: "Dominion Integrated Electrical &",
    highlight: "Engineering Limited",
    subtitle:
      "Delivering integrated civil construction, high-voltage electrical engineering, solar renewable IT solutions, and precision precast concrete manufacturing across Nigeria.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
  {
    img: "/images/services/solar-installation.jpg",
    mediaType: "image",
    title: "Sustainable Solar Energy &",
    highlight: "Power Grid Infrastructure.",
    subtitle:
      "Custom commercial solar mini-grids, highway solar street lighting schemes, and intelligent energy storage designed for resilience.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
  {
    img: "/images/precast/electric-poles.jpg",
    mediaType: "image",
    title: "High-Tensile Reinforced",
    highlight: "Concrete Precast Manufacturing.",
    subtitle:
      "High-load concrete electric poles (LT & HT), stay blocks, and custom road drainage products manufactured directly at our Oyo State production plant.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
];

export const DEFAULT_FACILITY_CONTACTS: FacilityContactData = {
  headOffice: {
    tag: "HEAD OFFICE",
    title: "Isokun Administrative Office",
    address: "No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road, Oyo State, Nigeria.",
    hotline1: "08101831076",
    hotline2: "07067315948",
    email: "dominionltd01@gmail.com",
    hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  },
  factory: {
    tag: "MANUFACTURING FACILITY",
    title: "Oyo–Ogbomoso Express Plant",
    address: "No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway, Oyo State.",
    yardDirect: "08101831076",
    operations: "High-Volume Pole & Block Batching",
    logistics: "HIAB & Flatbed Dispatch Bay",
  },
};

export interface WhyChooseUsPillar {
  num: string;
  title: string;
  desc: string;
}

export interface WhyChooseUsData {
  badge: string;
  title: string;
  subtitle: string;
  pillars: WhyChooseUsPillar[];
}

export const DEFAULT_WHY_CHOOSE_US: WhyChooseUsData = {
  badge: "THE DOMINION ADVANTAGE",
  title: "Why Choose Us",
  subtitle:
    "We combine technical ingenuity with proven operational discipline to deliver enduring infrastructure for government agencies, corporate institutions, and private developers.",
  pillars: [
    {
      num: "01",
      title: "Multidisciplinary Engineering Team",
      desc: "Licensed civil, structural, and electrical engineers working in synergy with certified project managers to ensure rigorous technical precision on every build.",
    },
    {
      num: "02",
      title: "Strict Quality Assurance (QA/QC)",
      desc: "All concrete batches, electrical schematics, and structural foundations undergo strict laboratory and field load testing before project deployment.",
    },
    {
      num: "03",
      title: "Certified Health, Safety & HSE Standard",
      desc: "Zero-compromise safety culture on active sites. We maintain full statutory compliance with NSITF, ITF, and standard occupational health protocols.",
    },
    {
      num: "04",
      title: "On-Budget & Timely Project Delivery",
      desc: "Transparent Bills of Quantities (BoQ), realistic milestones, and proactive supply chain management to eliminate contractor delays and unexpected costs.",
    },
  ],
};

export interface CoreValueItem {
  num: string;
  title: string;
  desc: string;
}

export interface AboutPageData {
  headerTag: string;
  headerTitle: string;
  headerSubtitle: string;
  bannerImageUrl?: string;
  bannerImagePublicId?: string;
  overviewTag: string;
  overviewHeading: string;
  overviewImageUrl?: string;
  overviewImagePublicId?: string;
  overviewParagraph1: string;
  overviewParagraph2: string;
  overviewParagraph3: string;
  visionTag: string;
  visionTitle: string;
  visionDesc: string;
  missionTag: string;
  missionTitle: string;
  missionDesc: string;
  coreValuesTag: string;
  coreValuesHeading: string;
  coreValues: CoreValueItem[];
}

export const DEFAULT_ABOUT_PAGE_DATA: AboutPageData = {
  headerTag: "COMPANY PROFILE & LEADERSHIP",
  headerTitle: "Building Excellence, Powering the Future",
  headerSubtitle:
    "Incorporated in February 2020 (RC: 1655029), Dominion Integrated Electrical & Engineering Limited has evolved into an integrated engineering and heavy concrete infrastructure powerhouse in Nigeria.",
  bannerImageUrl: "/images/hero-construction.jpg",
  overviewTag: "COMPANY OVERVIEW & HISTORY",
  overviewHeading: "Institutional Capability Driven by Engineering Rigour",
  overviewImageUrl: "/images/hero-construction.jpg",
  overviewParagraph1:
    "Dominion Integrated Electrical & Engineering Limited is a forward-thinking indigenous firm incorporated under the Corporate Affairs Commission on February 4, 2020.",
  overviewParagraph2:
    "From inception, our mandate has been delivering high-precision civil construction, high-voltage rural and urban electrical electrification, solar renewable IT solutions, and automated precast concrete pole manufacturing.",
  overviewParagraph3:
    "Headquartered in Oyo State with comprehensive logistics coverage across the South-West and nationwide, Dominion brings together chartered structural engineers, electrical consultants, and registered quantity surveyors.",
  visionTag: "OUR CORPORATE VISION",
  visionTitle: "Leading National Infrastructure Growth",
  visionDesc:
    "To become one of Nigeria's leading engineering and infrastructure development companies recognized for excellence, innovation, and sustainable engineering solutions that stand the test of time.",
  missionTag: "OUR CORPORATE MISSION",
  missionTitle: "Delivering Uncompromised Quality",
  missionDesc:
    "To deliver quality engineering, construction, electrical, renewable energy, and concrete production services that consistently exceed client expectations while maintaining the highest standards of safety, integrity, and professionalism.",
  coreValuesTag: "OPERATING PRINCIPLES",
  coreValuesHeading: "Our 8 Core Values",
  coreValues: [
    { num: "01", title: "Integrity", desc: "Honesty, transparent billing, and strict adherence to client specifications." },
    { num: "02", title: "Excellence", desc: "Uncompromising technical standards in design and physical execution." },
    { num: "03", title: "Innovation", desc: "Modern construction methods, smart mini-grids, and optimized precasting." },
    { num: "04", title: "Professionalism", desc: "COREN certified project management and disciplined site supervision." },
    { num: "05", title: "Safety First", desc: "Rigorous zero-incident safety protocols across active construction sites." },
    { num: "06", title: "Quality Control", desc: "Continuous cube crushing tests and premium British-standard rebar reinforcement." },
    { num: "07", title: "Sustainability", desc: "Pioneering clean renewable energy and environmentally conscious building." },
    { num: "08", title: "Client Satisfaction", desc: "Prompt milestones delivery and proactive technical post-commissioning support." },
  ],
};

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavigationData {
  aboutItems: NavDropdownItem[];
  servicesItems: NavDropdownItem[];
  manufacturingItems: NavDropdownItem[];
}

export const DEFAULT_ABOUT_NAV_ITEMS: NavDropdownItem[] = [
  { label: "Company Overview", href: "/about#overview" },
  { label: "Vision & Values", href: "/about#vision" },
  { label: "Our Team", href: "/team" },
  { label: "Quality & Safety", href: "/about#quality" },
];

export const DEFAULT_SERVICES_NAV_ITEMS: NavDropdownItem[] = [
  { label: "Civil & Building", href: "/services#civil" },
  { label: "Electrical & Power", href: "/services#electrical" },
  { label: "Solar & Renewable IT", href: "/services#solar" },
  { label: "Consultancy & BoQ", href: "/services#consultancy" },
  { label: "Equipment Leasing", href: "/services#leasing" },
];

export const DEFAULT_MANUFACTURING_NAV_ITEMS: NavDropdownItem[] = [
  { label: "Electric Poles (LT & HT)", href: "/manufacturing#poles" },
  { label: "Stay Blocks & Slabs", href: "/manufacturing#blocks" },
  { label: "Road Kerbs & Channels", href: "/manufacturing#kerbs" },
  { label: "Custom Precast Moulds", href: "/manufacturing#custom" },
];


