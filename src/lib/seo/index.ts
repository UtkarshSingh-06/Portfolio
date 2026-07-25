/**
 * SEO utilities — site URL helpers, metadata builders, Schema.org JSON-LD, and project slug helpers.
 *
 * Usage overview:
 * - `site.ts` — absolute URLs from `NEXT_PUBLIC_SITE_URL`
 * - `metadata.ts` — `buildMetadata()` / `buildVerification()` for App Router `metadata` exports
 * - `schema.ts` — JSON-LD graphs for Person, WebSite, projects, breadcrumbs
 * - `projects.ts` — slug ↔ path helpers for `/projects/[slug]`
 * - `og-image.tsx` — shared Open Graph / Twitter image renderer
 */
export { absoluteUrl, getSiteUrl, siteSeo } from "@/lib/seo/site";
export { buildMetadata, buildVerification } from "@/lib/seo/metadata";
export {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectPath,
} from "@/lib/seo/projects";
