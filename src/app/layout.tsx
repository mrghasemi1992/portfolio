import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import SmoothScroll from "@/components/SmoothScroll";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mrghasemi1992.ir"),
  title: "Mohammad Reza Ghasemi",
  description:
    "Mohammad Reza Ghasemi — Frontend Engineer specializing in React & Next.js",
  openGraph: {
    type: "website",
    url: "https://mrghasemi1992.ir/",
    title: "Mohammad Reza Ghasemi",
    description:
      "Mohammad Reza Ghasemi — Frontend Engineer specializing in React & Next.js",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Reza Ghasemi",
    description:
      "Mohammad Reza Ghasemi — Frontend Engineer specializing in React & Next.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
