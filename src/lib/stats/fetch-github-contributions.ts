/**
 * GitHub contribution totals + calendar for a year.
 * Prefers official GraphQL (matches github.com profile) when GITHUB_TOKEN is set;
 * otherwise uses jogruber public API with no-store + sum fallback.
 */

export type GithubContribFetchResult = {
  total: number;
  days: Record<string, number>;
  maxStreak: number;
  source: "github-graphql" | "jogruber";
};

const TIMEOUT_MS = 7000;

function abortSignal() {
  return AbortSignal.timeout(TIMEOUT_MS);
}

export function maxStreakFromDays(year: number, days: Record<string, number>): number {
  let cur = 0;
  let best = 0;
  let d = new Date(`${year}-01-01T12:00:00Z`);
  const end = new Date(`${year}-12-31T12:00:00Z`);
  while (d <= end) {
    const iso = d.toISOString().slice(0, 10);
    const n = days[iso] ?? 0;
    if (n > 0) {
      cur += 1;
      best = Math.max(best, cur);
    } else {
      cur = 0;
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return best;
}

async function fetchGitHubContributionsGraphQL(
  username: string,
  year: number
): Promise<GithubContribFetchResult | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;
  const query = `query($login:String!,$from:DateTime!,$to:DateTime!){
    user(login:$login){
      contributionsCollection(from:$from,to:$to){
        contributionCalendar{
          totalContributions
          weeks{contributionDays{date contributionCount}}
        }
      }
    }
  }`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
      signal: abortSignal(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = await res.json() as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions?: number;
              weeks?: { contributionDays?: { date: string; contributionCount: number }[] }[];
            };
          };
        };
      };
      errors?: unknown;
    };
    if (body.errors || !body.data?.user?.contributionsCollection?.contributionCalendar) return null;
    const cal = body.data.user.contributionsCollection.contributionCalendar;
    const total = typeof cal.totalContributions === "number" ? cal.totalContributions : 0;
    const days: Record<string, number> = {};
    for (const w of cal.weeks ?? []) {
      for (const day of w.contributionDays ?? []) {
        if (day.contributionCount > 0) days[day.date] = day.contributionCount;
      }
    }
    return { total, days, maxStreak: maxStreakFromDays(year, days), source: "github-graphql" };
  } catch {
    return null;
  }
}

async function fetchGitHubContributionsJogruber(
  username: string,
  year: number
): Promise<GithubContribFetchResult | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}&_=${Date.now()}`,
      { signal: abortSignal(), cache: "no-store" }
    );
    if (!res.ok) return null;
    const d = await res.json() as {
      total?: Record<string, number>;
      contributions?: { date: string; count: number }[];
    };
    const apiTotal = d.total?.[String(year)] ?? 0;
    const days: Record<string, number> = {};
    let sumFromGrid = 0;
    for (const c of d.contributions ?? []) {
      if (!c.date.startsWith(String(year))) continue;
      sumFromGrid += c.count;
      if (c.count > 0) days[c.date] = c.count;
    }
    const total = Math.max(apiTotal, sumFromGrid);
    return { total, days, maxStreak: maxStreakFromDays(year, days), source: "jogruber" };
  } catch {
    return null;
  }
}

export async function fetchGithubYearContributions(
  username: string,
  year: number
): Promise<GithubContribFetchResult | null> {
  const gql = await fetchGitHubContributionsGraphQL(username, year);
  if (gql) return gql;
  return fetchGitHubContributionsJogruber(username, year);
}
