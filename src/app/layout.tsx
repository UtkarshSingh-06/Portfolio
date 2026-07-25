import type { Metadata, Viewport } from "next";
import { Inter, Press_Start_2P, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { SkipToContent } from "@/components/seo/skip-to-content";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { buildMetadata, buildVerification } from "@/lib/seo/metadata";
import { getSiteUrl, siteSeo } from "@/lib/seo/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
  preload: false, // decorative / infrequent — avoid competing with LCP fonts
});

const base = buildMetadata({ path: "/" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...base,
  title: {
    default: siteSeo.title,
    template: siteSeo.titleTemplate,
  },
  applicationName: siteSeo.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: buildVerification(),
  other: {
    "msapplication-TileColor": siteSeo.themeColor,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: siteSeo.themeColor },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteSeo.language}
      suppressHydrationWarning
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${pressStart.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <SkipToContent />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
