import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Darsin David J — Software Engineer",
  description:
    "Portfolio of Darsin David J, a Software Engineer and B.Tech graduate specializing in AI/ML based in Chennai. Experienced in full-stack development, machine learning, and hackathons.",
  keywords: [
    "Darsin David J",
    "software engineer",
    "AI ML",
    "portfolio",
    "SRMIST",
    "Chennai",
    "Tamil Nadu",
    "full stack",
    "machine learning",
  ],
  authors: [{ name: "Darsin David J", url: "https://darsindavid.com" }],
  openGraph: {
    title: "Darsin David J — Software Engineer",
    description: "Portfolio of Darsin David J. Software Engineer based in Chennai.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darsin David J — Software Engineer",
    description: "Software Engineer and AI/ML graduate based in Chennai.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-grotesk bg-bg text-offwhite antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}