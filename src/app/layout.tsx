import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import PublicShell from "@/components/PublicShell";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dominionintegrated.com"),
  title: {
    default: "Dominion Integrated Electrical & Engineering Ltd | Precast Concrete & Infrastructure Leader",
    template: "%s | Dominion Integrated Electrical & Engineering Ltd",
  },
  description:
    "Dominion Integrated Electrical & Engineering Limited (RC: 1655029) is a leading Nigerian multidisciplinary engineering firm. Manufacturers of high-tensile concrete electric poles (LT/HT), stay blocks, and road kerbs at our Oyo plant. Specialists in 11kV/33kV power grids, civil construction, commercial solar mini-grids, and equipment leasing.",
  keywords: [
    // Brand & Corporate
    "Dominion Integrated Electrical and Engineering Limited",
    "Dominion Limited",
    "Dominion Engineering Oyo",
    "Dominion precast concrete plant",
    "RC 1655029",
    // Precast & Electric Poles (Local & National)
    "concrete electric poles manufacturer in Nigeria",
    "buy concrete poles in Oyo State",
    "electric pole price in Ibadan Oyo",
    "11kV 33kV high tension concrete poles price Nigeria",
    "8.5m low tension electric poles supplier",
    "10m 11m HT concrete poles South West Nigeria",
    "DisCo approved electric poles manufacturer",
    "precast concrete stay blocks and anchor slabs",
    "precast road kerbs and drainage channels Oyo",
    "concrete pole factory Oyo Ogbomoso expressway",
    // Electrical & Power Grid
    "electrical power contractors in Nigeria",
    "11kV 33kV line stringing and overhead distribution",
    "substation transformer installation contractor Nigeria",
    "rural electrification contractor Oyo State",
    "industrial switchgear and panels installation Nigeria",
    // Civil Engineering & Construction
    "civil engineering construction companies in Oyo State",
    "road construction and asphalt paving contractor South West Nigeria",
    "commercial building construction companies Oyo town",
    "culvert and drainage channel construction Nigeria",
    "soil compaction and earthworks services",
    // Solar & Renewable
    "commercial solar mini-grid installation Nigeria",
    "highway solar street lighting contractors Oyo",
    "industrial battery energy storage BESS Nigeria",
    "solar power companies in South West Nigeria",
    // Equipment Leasing & Local Services
    "HIAB crane truck leasing in Oyo State",
    "hire vibratory roller compactor Oyo Nigeria",
    "crane truck for electric pole transport and planting",
    "engineering Bill of Quantities BoQ preparation Nigeria",
    "COREN certified engineers in Oyo State"
  ],
  authors: [{ name: "Dominion Integrated Electrical & Engineering Limited" }],
  creator: "Dominion Integrated Electrical & Engineering Limited",
  publisher: "Dominion Integrated Electrical & Engineering Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://dominionintegrated.com",
    title: "Dominion Integrated Electrical & Engineering Limited",
    description:
      "Building Excellence, Powering the Future across Nigeria. Civil construction, high-voltage electrical lines, solar mini-grids, and precast concrete electric poles manufacturing.",
    siteName: "Dominion Integrated Electrical & Engineering Ltd",
    images: [
      {
        url: "/images/hero-construction.jpg",
        width: 1200,
        height: 630,
        alt: "Dominion Engineering Construction Site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominion Integrated Electrical & Engineering Limited",
    description: "Building Excellence, Powering the Future across Nigeria. Civil, Electrical, Solar & Precast Concrete Infrastructure.",
    images: ["/images/hero-construction.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Corporation", "GeneralContractor", "LocalBusiness"],
      "@id": "https://dominionintegrated.com/#organization",
      name: "Dominion Integrated Electrical & Engineering Limited",
      alternateName: ["Dominion Engineering", "Dominion Precast Plant Oyo"],
      url: "https://dominionintegrated.com",
      logo: "https://dominionintegrated.com/logo.png",
      image: "https://dominionintegrated.com/images/hero-construction.jpg",
      description: "Leading Nigerian multidisciplinary engineering and construction firm. Manufacturer of DisCo-certified concrete electric poles, stay blocks, and kerbs. Specialists in civil construction, 11kV/33kV power grids, solar mini-grids, and heavy equipment leasing.",
      foundingDate: "2020-02-04",
      identifier: {
        "@type": "PropertyValue",
        name: "Corporate Affairs Commission RC Number",
        value: "1655029"
      },
      taxID: "Tax Compliant (FIRS)",
      telephone: ["+2348101831076", "+2347067315948"],
      email: "dominionltd01@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road",
        addressLocality: "Oyo",
        addressRegion: "Oyo State",
        addressCountry: "NG"
      },
      location: [
        {
          "@type": "Place",
          name: "Administrative Headquarters",
          address: {
            "@type": "PostalAddress",
            streetAddress: "No. 24, Dominion Office, BCT Complex, Isokun, Oyo–Iseyin Road",
            addressLocality: "Oyo",
            addressRegion: "Oyo State",
            addressCountry: "NG"
          }
        },
        {
          "@type": "Place",
          name: "Precast Concrete Production Plant",
          address: {
            "@type": "PostalAddress",
            streetAddress: "No. 1, Dominion Building, EAUED Underpass Bridge, Olooro Road Junction, Oyo–Ogbomoso Expressway",
            addressLocality: "Oyo",
            addressRegion: "Oyo State",
            addressCountry: "NG"
          }
        }
      ],
      areaServed: [
        { "@type": "AdministrativeArea", name: "Oyo State" },
        { "@type": "City", name: "Oyo" },
        { "@type": "City", name: "Ibadan" },
        { "@type": "City", name: "Ogbomoso" },
        { "@type": "City", name: "Iseyin" },
        { "@type": "AdministrativeArea", name: "Osun State" },
        { "@type": "AdministrativeArea", name: "Kwara State" },
        { "@type": "AdministrativeArea", name: "Lagos State" },
        { "@type": "Country", name: "Nigeria" }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dominion Engineering & Manufacturing Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Precast Concrete Electric Poles (LT & HT)",
              description: "DisCo-approved 8.5m, 10m, and 11m concrete utility poles for 400V, 11kV, and 33kV overhead power lines."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Civil Engineering & Building Construction",
              description: "Commercial building construction, road asphalt paving, earthworks, culverts, and structural foundation casting."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "11kV & 33kV Power Grid & Substation Engineering",
              description: "High-voltage line stringing, step-down transformer injection substations, and rural electrification networks."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Commercial Solar Mini-Grids & IT Automation",
              description: "Solar PV mini-grids, highway solar street lighting, lithium battery storage BESS, and remote telemetry."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "HIAB Crane Truck & Machinery Leasing",
              description: "Direct leasing of HIAB pole crane trucks, vibratory soil compactors, and heavy road rollers in Oyo State."
            }
          }
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-[#0F2B82] selection:text-white">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
