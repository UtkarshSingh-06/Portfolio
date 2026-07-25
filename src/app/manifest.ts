import type { MetadataRoute } from "next";
import { getSiteUrl, siteSeo } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSeo.title,
    short_name: siteSeo.shortName,
    description: siteSeo.description,
    start_url: "/",
    display: "standalone",
    background_color: siteSeo.themeColor,
    theme_color: siteSeo.themeColor,
    lang: siteSeo.language,
    orientation: "portrait-primary",
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    id: getSiteUrl(),
  };
}
