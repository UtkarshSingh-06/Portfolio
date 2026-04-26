import { NextResponse } from "next/server";
import { fetchGithubYearContributions } from "@/lib/stats/fetch-github-contributions";

export const dynamic = "force-dynamic";

const LC_USERNAME = "Utkarsh-Singh06";
const GH_USERNAME = "UtkarshSingh-06";
const TIMEOUT_MS = 7000;

function abortSignal() {
  return AbortSignal.timeout(TIMEOUT_MS);
}

// ── LeetCode: try direct GraphQL first (no cold-start), then proxy ──
async function fetchLeetCodeSolvedGraphQL(): Promise<{
  total: number; easy: number; medium: number; hard: number;
} | null> {
  const query = {
    operationName: "userSessionProgress",
    query: `query userSessionProgress($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum { difficulty count }
        }
      }
    }`,
    variables: { username: LC_USERNAME },
  };
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://leetcode.com",
        "Referer": "https://leetcode.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
      },
      body: JSON.stringify(query),
      signal: abortSignal(),
    });
    if (!res.ok) return null;
    const data = await res.json() as {
      data?: { matchedUser?: { submitStats?: { acSubmissionNum?: { difficulty: string; count: number }[] } } };
    };
    const rows = data?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
    const all    = rows.find(r => r.difficulty === "All");
    const easy   = rows.find(r => r.difficulty === "Easy");
    const medium = rows.find(r => r.difficulty === "Medium");
    const hard   = rows.find(r => r.difficulty === "Hard");
    if (!all || all.count === 0) return null;
    return {
      total:  all.count,
      easy:   easy?.count  ?? 0,
      medium: medium?.count ?? 0,
      hard:   hard?.count   ?? 0,
    };
  } catch {
    return null;
  }
}

async function fetchLeetCodeSolvedProxy(): Promise<{
  total: number; easy: number; medium: number; hard: number;
} | null> {
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${LC_USERNAME}`,
      { signal: abortSignal() }
    );
    if (!res.ok) return null;
    const d = await res.json() as {
      totalSolved?: number; easySolved?: number; mediumSolved?: number; hardSolved?: number;
    };
    if (!d.totalSolved) return null;
    return {
      total:  d.totalSolved,
      easy:   d.easySolved  ?? 0,
      medium: d.mediumSolved ?? 0,
      hard:   d.hardSolved   ?? 0,
    };
  } catch {
    return null;
  }
}

async function fetchLeetCodeCalendarGraphQL(): Promise<Record<string, number>> {
  const query = {
    operationName: "userProfileCalendar",
    query: `query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          submissionCalendar
        }
      }
    }`,
    variables: { username: LC_USERNAME, year: new Date().getFullYear() },
  };
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://leetcode.com",
        "Referer": "https://leetcode.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
      },
      body: JSON.stringify(query),
      signal: abortSignal(),
    });
    if (!res.ok) return {};
    const data = await res.json() as {
      data?: { matchedUser?: { userCalendar?: { submissionCalendar?: string } } };
    };
    const raw = data?.data?.matchedUser?.userCalendar?.submissionCalendar;
    if (!raw) return {};
    const obj = JSON.parse(raw) as Record<string, number>;
    const result: Record<string, number> = {};
    for (const [k, v] of Object.entries(obj)) {
      const ts = Number(k);
      const iso = Number.isNaN(ts) ? k : new Date(ts * 1000).toISOString().slice(0, 10);
      result[iso] = (result[iso] ?? 0) + Number(v);
    }
    return result;
  } catch {
    return {};
  }
}

async function fetchLeetCodeCalendarProxy(): Promise<Record<string, number>> {
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${LC_USERNAME}/calendar`,
      { signal: abortSignal() }
    );
    if (!res.ok) return {};
    const d = await res.json() as { submissionCalendar?: string | Record<string, number> };
    const raw = d.submissionCalendar;
    if (!raw) return {};
    const obj: Record<string, number> =
      typeof raw === "string" ? JSON.parse(raw) : raw;
    const result: Record<string, number> = {};
    for (const [k, v] of Object.entries(obj)) {
      const ts = Number(k);
      const iso = Number.isNaN(ts) ? k : new Date(ts * 1000).toISOString().slice(0, 10);
      result[iso] = (result[iso] ?? 0) + Number(v);
    }
    return result;
  } catch {
    return {};
  }
}

// ── GitHub ────────────────────────────────────────────────
async function fetchGitHubContributions(year: number) {
  return fetchGithubYearContributions(GH_USERNAME, year);
}

async function fetchGitHubProfile() {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${GH_USERNAME}`, {
      headers,
      signal: abortSignal(),
      cache: "no-store",
    });
    if (!res.ok) return { followers: null, publicRepos: null };
    const u = await res.json() as { followers?: number; public_repos?: number };
    return {
      followers:   typeof u.followers    === "number" ? u.followers    : null,
      publicRepos: typeof u.public_repos === "number" ? u.public_repos : null,
    };
  } catch {
    return { followers: null, publicRepos: null };
  }
}

export async function GET() {
  const year = 2026;

  // Run all fetches in parallel — GraphQL and proxy for LC compete, first wins
  const [
    lcSolvedGQL, lcSolvedProxy,
    lcCalGQL,    lcCalProxy,
    ghContribs,  ghProfile,
  ] = await Promise.all([
    fetchLeetCodeSolvedGraphQL(),
    fetchLeetCodeSolvedProxy(),
    fetchLeetCodeCalendarGraphQL(),
    fetchLeetCodeCalendarProxy(),
    fetchGitHubContributions(year),
    fetchGitHubProfile(),
  ]);

  // Prefer GraphQL (direct, no cold start), fall back to proxy
  const lcSolved = lcSolvedGQL ?? lcSolvedProxy;
  const lcCal    = Object.keys(lcCalGQL).length > 0 ? lcCalGQL : lcCalProxy;

  // Compute submission stats from calendar
  let lcSubmissions = 0, lcActiveDays = 0, lcMaxStreak = 0, lcCurStreak = 0;
  if (Object.keys(lcCal).length > 0) {
    let d = new Date(`${year}-01-01T12:00:00Z`);
    const end = new Date(`${year}-12-31T12:00:00Z`);
    while (d <= end) {
      const iso = d.toISOString().slice(0, 10);
      const n = lcCal[iso] ?? 0;
      lcSubmissions += n;
      if (n > 0) { lcActiveDays++; lcCurStreak++; lcMaxStreak = Math.max(lcMaxStreak, lcCurStreak); }
      else { lcCurStreak = 0; }
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }

  return NextResponse.json({
    leetcode: {
      solved:           lcSolved,
      calendar:         lcCal,
      totalSubmissions: lcSubmissions || null,
      activeDays:       lcActiveDays  || null,
      maxStreak:        lcMaxStreak   || null,
      source:           lcSolvedGQL ? "graphql" : lcSolvedProxy ? "proxy" : "none",
    },
    github: {
      total:       ghContribs?.total ?? null,
      days:        ghContribs?.days  ?? null,
      maxStreak:   ghContribs?.maxStreak ?? null,
      followers:   ghProfile.followers,
      publicRepos: ghProfile.publicRepos,
    },
    fetchedAt: new Date().toISOString(),
  });
}
