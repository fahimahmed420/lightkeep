import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { DemoBadge } from "@/components/DemoBadge";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT"], variable: "--font-fraunces", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Lightkeep · Uptime monitoring and status pages", template: "%s · Lightkeep" },
  description: site.description,
  robots: { index: false, follow: false },
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export const viewport: Viewport = { themeColor: "#fbfaf7" };

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <DemoBadge />
        <Reveal />
      </body>
    </html>
  );
}
