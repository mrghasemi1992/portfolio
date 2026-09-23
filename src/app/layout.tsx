import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "lenis/dist/lenis.css";
import "./globals.css";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Mohammad Reza Ghasemi — Frontend Engineer building web interfaces with React and Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mrghasemi1992.ir"),
  title: "Mohammad Reza Ghasemi — Frontend Engineer",
  description,
  openGraph: {
    type: "website",
    url: "https://mrghasemi1992.ir/",
    title: "Mohammad Reza Ghasemi — Frontend Engineer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Reza Ghasemi — Frontend Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
