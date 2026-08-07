import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/providers/LenisProvider";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { getSiteContent, EMPTY_SITE_CONTENT } from "@/services/siteContent";
import { safeFetch } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eduveyn.com").replace(/\/$/, "");
const SITE_NAME = "Eduveyn";
const SITE_DESCRIPTION =
  "Personalized online tutoring connecting students with verified, expert tutors across Maths, Science, English, Arabic, Coding, and Commerce. Book a free demo class today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eduveyn — Personalized Online Tutoring for Every Student",
    template: "%s | Eduveyn",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "online tutoring",
    "online tutor",
    "personalized tutoring",
    "online tuition",
    "find a tutor",
    "maths tutor online",
    "science tutor online",
    "english tutor online",
    "coding tutor for kids",
    "become a tutor",
    "Eduveyn",
  ],
  authors: [{ name: "Eduveyn" }],
  creator: "Eduveyn",
  publisher: "Eduveyn",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon-512.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: "Eduveyn — Personalized Online Tutoring for Every Student",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Eduveyn",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Eduveyn — Personalized Online Tutoring for Every Student",
    description: SITE_DESCRIPTION,
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await safeFetch(async () => (await getSiteContent()).data, EMPTY_SITE_CONTENT);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    description: SITE_DESCRIPTION,
    ...(siteContent.contact.email && { email: siteContent.contact.email }),
    ...(siteContent.contact.phone && { telephone: siteContent.contact.phone }),
    sameAs: Object.values(siteContent.contact.social).filter(Boolean),
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer contact={siteContent.contact} />
          <FloatingWhatsApp whatsapp={siteContent.contact.whatsapp} />
        </LenisProvider>
      </body>
    </html>
  );
}
