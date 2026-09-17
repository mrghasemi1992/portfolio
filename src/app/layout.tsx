import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Reza Ghasemi",
  description: "Mohammad Reza Ghasemi — Frontend Engineer specializing in React & Next.js",
  openGraph: {
    type: "website",
    url: "https://mrghasemi1992.ir/",
    title: "Mohammad Reza Ghasemi",
    description: "Mohammad Reza Ghasemi — Frontend Engineer specializing in React & Next.js",
    images: [
      "https://ik.imagekit.io/mggo9dfob/Mohammad%20Reza/preview-meta-tag.png?updatedAt=1731681334431",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Reza Ghasemi",
    description: "Mohammad Reza Ghasemi — Frontend Engineer specializing in React & Next.js",
    images: [
      "https://ik.imagekit.io/mggo9dfob/Mohammad%20Reza/preview-meta-tag.png?updatedAt=1731681334431",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
