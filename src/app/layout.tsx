import type { Metadata } from "next";
import { Inter, Press_Start_2P, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://utkarsh-singh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Utkarsh Singh — Full-Stack Developer & AI Enthusiast",
    template: "%s · Utkarsh Singh",
  },
  description:
    "Utkarsh Singh — Full-Stack Developer & AI Enthusiast. B.Tech IT at Manipal University Jaipur. Building production-grade full-stack products, AI systems, and contributing to open source.",
  keywords: [
    "Utkarsh Singh",
    "Full-Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js",
    "FastAPI",
    "AWS",
    "Docker",
    "Manipal University Jaipur",
    "Portfolio",
  ],
  authors: [{ name: "Utkarsh Singh" }],
  creator: "Utkarsh Singh",
  openGraph: {
    title: "Utkarsh Singh — Full-Stack Developer & AI Enthusiast",
    description:
      "Full-Stack Developer & AI Enthusiast. B.Tech IT @ MUJ. Building AI-powered systems, full-stack apps, and contributing to open source.",
    url: siteUrl,
    siteName: "Utkarsh Singh",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Singh — Full-Stack Developer & AI Enthusiast",
    description:
      "Full-Stack Developer & AI Enthusiast. B.Tech IT @ MUJ. Building AI-powered systems, full-stack apps, and contributing to open source.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${pressStart.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
