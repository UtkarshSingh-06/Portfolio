import type { MetadataRoute } from "next";
import { projects } from "@/data/site";
import { getProjectPath } from "@/lib/seo/projects";
import { getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/api/*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
