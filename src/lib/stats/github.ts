import { fetchGithubYearContributions } from "./fetch-github-contributions";

export type GithubDay = { date: string; count: number; level: number };

export type GithubCodingStats = {
  username: string;
  year: number;
  totalContributions: number;
  maxStreak: number;
  weeks: { days: GithubDay[] }[];
  followers: number | null;
  publicRepos: number | null;
  error?: string;
};

const REVALIDATE_SEC = 3600; // 1-hour cache (SSR); live client refresh uses /api/stats

function parseGithubUsernameFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] ?? null;
  } catch {
    return null;
  }
}

function maxContributionStreak(year: number, days: Map<string, GithubDay>): number {
  let cur = 0;
  let best = 0;
  const dec31 = new Date(year, 11, 31);
  const d = new Date(year, 0, 1);
  while (d <= dec31) {
    const iso = d.toISOString().slice(0, 10);
    const n = days.get(iso)?.count ?? 0;
    if (n > 0) {
      cur += 1;
      best = Math.max(best, cur);
    } else {
      cur = 0;
    }
    d.setDate(d.getDate() + 1);
  }
  return best;
}

function buildYearWeekGrid(year: number, days: Map<string, GithubDay>): { days: GithubDay[] }[] {
  const jan1 = new Date(year, 0, 1);
  const start = new Date(jan1);
  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1);
  }
  const dec31 = new Date(year, 11, 31);
  const end = new Date(dec31);
  while (end.getDay() !== 6) {
    end.setDate(end.getDate() + 1);
  }

  const weeks: { days: GithubDay[] }[] = [];
  let cur = new Date(start);
  while (cur <= end) {
    const weekDays: GithubDay[] = [];
    for (let i = 0; i < 7; i++) {
      const iso = cur.toISOString().slice(0, 10);
      weekDays.push(days.get(iso) ?? { date: iso, count: 0, level: 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push({ days: weekDays });
  }
  return weeks;
}

export async function fetchGithubCodingStats(githubProfileUrl: string, year = 2026): Promise<GithubCodingStats> {
  const username = parseGithubUsernameFromUrl(githubProfileUrl);
  if (!username) {
    return {
      username: "",
      year,
      totalContributions: 0,
      maxStreak: 0,
      weeks: [],
      followers: null,
      publicRepos: null,
      error: "Invalid GitHub profile URL",
    };
  }

  const map = new Map<string, GithubDay>();
  let total = 0;
  let err: string | undefined;

  try {
    const contrib = await fetchGithubYearContributions(username, year);
    if (!contrib) {
      err = "Could not load GitHub contributions";
    } else {
      total = contrib.total;
      for (const [date, count] of Object.entries(contrib.days)) {
        map.set(date, {
          date,
          count,
          level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4,
        });
      }
    }
  } catch {
    err = "Could not load GitHub contributions";
  }

  let followers: number | null = null;
  let publicRepos: number | null = null;
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: REVALIDATE_SEC },
    });
    if (res.ok) {
      const u = (await res.json()) as { followers?: number; public_repos?: number };
      followers = typeof u.followers === "number" ? u.followers : null;
      publicRepos = typeof u.public_repos === "number" ? u.public_repos : null;
    }
  } catch {
    /* optional */
  }

  return {
    username,
    year,
    totalContributions: total,
    maxStreak: maxContributionStreak(year, map),
    weeks: buildYearWeekGrid(year, map),
    followers,
    publicRepos,
    error: err,
  };
}
