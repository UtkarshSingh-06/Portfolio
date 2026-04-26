export type LeetcodeDay = { date: string; count: number; level: number };

export type LeetcodeSolved = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
};

export type LeetcodeCodingStats = {
  username: string;
  year: number;
  totalSubmissions: number;
  maxStreak: number;
  activeDays: number;
  solved: LeetcodeSolved;
  weeks: { days: LeetcodeDay[] }[];
  error?: string;
};

const REVALIDATE_SEC = 3600; // 1-hour cache on server-side fetches
const LC_GRAPHQL = "https://leetcode.com/graphql";

// Hardcoded fallback stats from your actual LeetCode profile.
// The GraphQL API often blocks server-side requests without a CSRF session cookie.
// These are used when the API is unavailable or returns no data.
// Update these manually whenever your stats change significantly.
const FALLBACK_SOLVED: LeetcodeSolved = {
  total: 170,
  easy: 88,
  medium: 53,
  hard: 29,
};

const FALLBACK_STATS = {
  totalSubmissions: 220,
  activeDays: 85,
  maxStreak: 44,
};

function parseLeetcodeUsernameFromProfileUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/u\/([^/]+)/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

function submissionLevel(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n <= 3) return 2;
  if (n <= 6) return 3;
  return 4;
}

function buildYearWeekGridFromCounts(year: number, counts: Map<string, number>): { days: LeetcodeDay[] }[] {
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

  const weeks: { days: LeetcodeDay[] }[] = [];
  let cur = new Date(start);
  while (cur <= end) {
    const weekDays: LeetcodeDay[] = [];
    for (let i = 0; i < 7; i++) {
      const iso = cur.toISOString().slice(0, 10);
      const c = counts.get(iso) ?? 0;
      weekDays.push({ date: iso, count: c, level: submissionLevel(c) });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push({ days: weekDays });
  }
  return weeks;
}

function streaksFromDaily(year: number, counts: Map<string, number>) {
  let total = 0;
  let activeDays = 0;
  let maxStreak = 0;
  let cur = 0;
  const dec31 = new Date(year, 11, 31);
  const d = new Date(year, 0, 1);
  while (d <= dec31) {
    const iso = d.toISOString().slice(0, 10);
    const n = counts.get(iso) ?? 0;
    total += n;
    if (n > 0) {
      activeDays += 1;
      cur += 1;
      maxStreak = Math.max(maxStreak, cur);
    } else {
      cur = 0;
    }
    d.setDate(d.getDate() + 1);
  }
  return { totalSubmissions: total, activeDays, maxStreak };
}

async function lcFetch<T>(body: unknown): Promise<T> {
  const res = await fetch(LC_GRAPHQL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      referer: "https://leetcode.com/",
      "user-agent": "PortfolioStats/1.0",
    },
    body: JSON.stringify(body),
    next: { revalidate: REVALIDATE_SEC },
  });
  if (!res.ok) {
    throw new Error(`LeetCode GraphQL HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function fetchLeetcodeCodingStats(leetcodeProfileUrl: string, year = 2026): Promise<LeetcodeCodingStats> {
  const username = parseLeetcodeUsernameFromProfileUrl(leetcodeProfileUrl);
  if (!username) {
    return {
      username: "",
      year,
      totalSubmissions: 0,
      maxStreak: 0,
      activeDays: 0,
      solved: { total: 0, easy: 0, medium: 0, hard: 0 },
      weeks: [],
      error: "Invalid LeetCode profile URL",
    };
  }

  const calendarQuery = {
    operationName: "userProfileCalendar",
    query: `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            submissionCalendar
            totalActiveDays
            streak
          }
        }
      }
    `,
    variables: { username, year },
  };

  const progressQuery = {
    operationName: "userSessionProgress",
    query: `
      query userSessionProgress($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum { difficulty count }
          }
        }
      }
    `,
    variables: { username },
  };

  // counts map keyed by ISO date (LeetCode returns Unix-second timestamps)
  const counts = new Map<string, number>();
  let apiError: string | undefined;
  let solved: LeetcodeSolved = { ...FALLBACK_SOLVED };
  let apiActiveDays: number | null = null;
  let apiMaxStreak: number | null = null;

  try {
    const calJson = await lcFetch<{
      data?: {
        matchedUser?: {
          userCalendar?: {
            submissionCalendar?: string;
            totalActiveDays?: number;
            streak?: number;
          };
        };
      };
      errors?: { message: string }[];
    }>(calendarQuery);

    if (calJson.errors?.length) {
      apiError = calJson.errors.map((e) => e.message).join("; ");
    } else {
      const cal = calJson.data?.matchedUser?.userCalendar;
      if (cal?.totalActiveDays) apiActiveDays = cal.totalActiveDays;
      if (cal?.streak) apiMaxStreak = cal.streak;
      const raw = cal?.submissionCalendar;
      if (raw) {
        const obj = JSON.parse(raw) as Record<string, number>;
        for (const [k, v] of Object.entries(obj)) {
          if (typeof v === "number") {
            // LeetCode stores Unix timestamps (seconds) as keys
            const ts = Number(k);
            const iso = Number.isNaN(ts)
              ? k // already ISO?
              : new Date(ts * 1000).toISOString().slice(0, 10);
            counts.set(iso, (counts.get(iso) ?? 0) + v);
          }
        }
      }
    }
  } catch (e) {
    apiError = e instanceof Error ? e.message : "LeetCode calendar fetch failed";
  }

  try {
    const progJson = await lcFetch<{
      data?: {
        matchedUser?: {
          submitStats?: {
            acSubmissionNum?: { difficulty: string; count: number }[];
          };
        };
      };
    }>(progressQuery);
    const rows = progJson.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
    const all = rows.find((r) => r.difficulty === "All");
    const easy = rows.find((r) => r.difficulty === "Easy");
    const medium = rows.find((r) => r.difficulty === "Medium");
    const hard = rows.find((r) => r.difficulty === "Hard");
    if (all) {
      solved = {
        total: all.count ?? FALLBACK_SOLVED.total,
        easy: easy?.count ?? FALLBACK_SOLVED.easy,
        medium: medium?.count ?? FALLBACK_SOLVED.medium,
        hard: hard?.count ?? FALLBACK_SOLVED.hard,
      };
    }
  } catch {
    /* use fallback */
  }

  const computed = streaksFromDaily(year, counts);
  const totalSubmissions = computed.totalSubmissions > 0 ? computed.totalSubmissions : FALLBACK_STATS.totalSubmissions;
  const activeDays = apiActiveDays ?? (computed.activeDays > 0 ? computed.activeDays : FALLBACK_STATS.activeDays);
  const maxStreak = apiMaxStreak ?? (computed.maxStreak > 0 ? computed.maxStreak : FALLBACK_STATS.maxStreak);

  return {
    username,
    year,
    totalSubmissions,
    maxStreak,
    activeDays,
    solved,
    weeks: buildYearWeekGridFromCounts(year, counts),
    error: apiError,
  };
}
