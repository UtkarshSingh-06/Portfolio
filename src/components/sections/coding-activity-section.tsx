import { siteConfig } from "@/data/site";
import type { GithubCodingStats } from "@/lib/stats/github";
import type { LeetcodeCodingStats } from "@/lib/stats/leetcode";
import { SectionHeading } from "@/components/ui/section-heading";
import { CodingActivityPanels } from "@/components/sections/coding-activity-panels";

type Props = {
  github: GithubCodingStats;
  leetcode: LeetcodeCodingStats;
};

export function CodingActivitySection({ github, leetcode }: Props) {
  return (
    <section id="activity" className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="Coding activity"
        subtitle="GitHub × LeetCode"
        description="Year 2026 contribution-style calendars with daily-refreshed public stats — same energy as classic profile dashboards."
        align="center"
      />
      <CodingActivityPanels
        github={github}
        leetcode={leetcode}
        githubProfileUrl={siteConfig.socialLinks.github}
        leetcodeProfileUrl={siteConfig.socialLinks.leetcode}
      />
    </section>
  );
}
