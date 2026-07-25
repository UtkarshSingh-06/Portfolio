import { HomeClientShell } from "@/components/home-client-shell";
import { CodingActivitySection } from "@/components/sections/coding-activity-section";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { homeJsonLdGraph } from "@/lib/seo/schema";
import { fetchGithubCodingStats } from "@/lib/stats/github";
import { fetchLeetcodeCodingStats } from "@/lib/stats/leetcode";

export const revalidate = 3600; // Revalidate every hour

export const metadata = buildMetadata({
  path: "/",
  type: "website",
});

export default async function Home() {
  const [github, leetcode] = await Promise.all([
    fetchGithubCodingStats(siteConfig.socialLinks.github, 2026),
    fetchLeetcodeCodingStats(siteConfig.socialLinks.leetcode, 2026),
  ]);

  return (
    <>
      <JsonLd data={homeJsonLdGraph()} />
      <HomeClientShell
        activitySlot={<CodingActivitySection github={github} leetcode={leetcode} />}
      />
    </>
  );
}
