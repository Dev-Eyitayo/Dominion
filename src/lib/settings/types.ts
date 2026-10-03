export interface HeroSlide {
  img: string;
  imgPublicId?: string;
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
    title: "Dominion Integrated Electrical &",
    highlight: "Engineering Limited",
    subtitle:
      "Delivering integrated civil construction, high-voltage electrical engineering, solar renewable IT solutions, and precision precast concrete manufacturing across Nigeria.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
  {
    img: "/images/services/solar-installation.jpg",
    title: "Sustainable Solar Energy &",
    highlight: "Power Grid Infrastructure.",
    subtitle:
      "Custom commercial solar mini-grids, highway solar street lighting schemes, and intelligent energy storage designed for resilience.",
    ctaText: "SCHEDULE CONSULTATION",
    ctaLink: "/contact#quote",
  },
  {
    img: "/images/precast/electric-poles.jpg",
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
