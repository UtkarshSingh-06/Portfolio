/**
 * Central SEO / site URL helpers.
 * Prefer `NEXT_PUBLIC_SITE_URL` in production so canonicals and sitemaps stay absolute and correct.
 */

export const DEFAULT_SITE_URL = "https://utkarsh-singh.vercel.app";

/** Absolute origin with no trailing slash. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteSeo = {
  name: "Utkarsh Singh",
  shortName: "Utkarsh",
  title: "Utkarsh Singh — Full-Stack Developer & AI Enthusiast",
  titleTemplate: "%s · Utkarsh Singh",
  description:
    "Utkarsh Singh — Full-Stack Developer & AI Enthusiast. B.Tech IT at Manipal University Jaipur. Building production-grade full-stack products, AI systems, cloud/DevOps tooling, and open-source contributions.",
  locale: "en_IN",
  language: "en",
  themeColor: "#07090d",
  keywords: [
    "Utkarsh Singh",
    "Full-Stack Developer",
    "AI Engineer",
    "Cloud DevOps Engineer",
    "React Developer",
    "Next.js Portfolio",
    "FastAPI",
    "AWS Solutions Architect",
    "Docker",
    "Kubernetes",
    "Manipal University Jaipur",
    "Software Engineer Portfolio",
    "SDE Intern Samsung",
  ],
} as const;
