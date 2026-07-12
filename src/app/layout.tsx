import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Eduweyn — Knowledge is the Vein of Growth",
  description: "Expert online tutors for Maths, Science, English, Arabic, Coding, and Commerce. Book a free demo class today.",
  icons: {
    icon: "/icon-512.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await safeFetch(async () => (await getSiteContent()).data, EMPTY_SITE_CONTENT);

  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer contact={siteContent.contact} />
          <FloatingWhatsApp />
        </LenisProvider>
      </body>
    </html>
  );
}
