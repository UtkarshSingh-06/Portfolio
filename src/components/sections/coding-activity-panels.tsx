"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { GithubCodingStats } from "@/lib/stats/github";
import type { LeetcodeCodingStats } from "@/lib/stats/leetcode";

type HeatDay = { date: string; count: number; level: number };

type Props = {
  github: GithubCodingStats;
  leetcode: LeetcodeCodingStats;
  githubProfileUrl: string;
  leetcodeProfileUrl: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabelForWeek(week: { days: { date: string }[] }): string | null {
  for (const d of week.days) {
    const dt = new Date(d.date + "T12:00:00Z");
    if (dt.getUTCDate() === 1) return MONTHS[dt.getUTCMonth()] ?? null;
  }
  return null;
}

function Cell({ day, palette }: { day: HeatDay; palette: "github" | "leetcode" }) {
  const l = day.level;
  // Light: visible greens/ambers on white; Dark: original deep tones
  const gh =
    l === 0 ? "bg-zinc-200 dark:bg-zinc-800/70" :
    l === 1 ? "bg-emerald-300 dark:bg-emerald-900" :
    l === 2 ? "bg-emerald-500 dark:bg-emerald-700" :
    l === 3 ? "bg-emerald-600 dark:bg-emerald-500" :
              "bg-emerald-700 dark:bg-emerald-300";
  const lc =
    l === 0 ? "bg-zinc-200 dark:bg-zinc-800/70" :
    l === 1 ? "bg-amber-200 dark:bg-amber-950" :
    l === 2 ? "bg-amber-400 dark:bg-amber-700" :
    l === 3 ? "bg-amber-500 dark:bg-amber-500" :
              "bg-amber-600 dark:bg-yellow-300";
  return (
    <span
      title={`${day.date}: ${day.count}`}
      className={`block aspect-square w-[10px] rounded-[2px] sm:w-[11px] ${palette === "github" ? gh : lc}`}
    />
  );
}

function Heatmap({ weeks, palette }: { weeks: { days: HeatDay[] }[]; palette: "github" | "leetcode" }) {
  if (weeks.length === 0) {
    return <p className="py-4 text-center text-xs text-zinc-500">No submission data for {new Date().getFullYear()}.</p>;
  }
  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      <div className="flex shrink-0 flex-col justify-between pt-5 pb-[2px] text-[8px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-600">
        <span />
        <span>Mon</span>
        <span />
        <span>Wed</span>
        <span />
        <span>Fri</span>
        <span />
      </div>
      <div className="flex min-w-0 gap-[3px]">
        {weeks.map((week, wi) => {
          const label = monthLabelForWeek(week);
          return (
            <div key={wi} className="flex flex-col items-center gap-1">
              <span className="h-3 text-[8px] font-medium text-zinc-500 dark:text-zinc-600">{label ?? ""}</span>
              <div className="grid grid-rows-7 gap-[3px]">
                {week.days.map((day, di) => (
                  <Cell key={`${wi}-${di}`} day={day} palette={palette} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatTile({ border, emoji, value, label }: { border: string; emoji: string; value: string; label: string }) {
  return (
    <div className={`rounded-xl border ${border} bg-white/60 px-3 py-3 dark:bg-black/40`}>
      <div className="mb-1.5 text-base leading-none">{emoji}</div>
      <div className="font-pixel text-base font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{value}</div>
      <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</div>
    </div>
  );
}

function DifficultyRow({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-14 rounded-md px-2 py-0.5 text-center text-[10px] font-semibold ${color}`}>{label}</span>
      <span className="font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-100">{solved}</span>
      <span className="text-[10px] text-zinc-500 dark:text-zinc-600">/ {total}</span>
    </div>
  );
}

// ── Live status badge ─────────────────────────────────────
function LiveBadge({ status, color }: { status: "loading" | "live" | "partial" | "cached"; color: "emerald" | "amber" }) {
  const c = color === "emerald"
    ? { ring: "bg-emerald-500", pill: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" }
    : { ring: "bg-amber-500",   pill: "bg-amber-500/15 text-amber-700 dark:text-amber-400" };
  if (status === "loading") return (
    <span className="flex items-center gap-1 text-[9px] text-zinc-400">
      <span className={`h-1.5 w-1.5 animate-ping rounded-full ${c.ring}`} />
      syncing…
    </span>
  );
  if (status === "live") return (
    <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wider ${c.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.ring}`} />LIVE
    </span>
  );
  if (status === "partial") return (
    <span className="flex items-center gap-1 rounded-full bg-sky-500/15 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-sky-600 dark:text-sky-400">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />PARTIAL
    </span>
  );
  return <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] text-zinc-400 dark:bg-zinc-800">CACHED</span>;
}

// ── Live-refresh helper ───────────────────────────────────
type ApiResponse = {
  leetcode: {
    solved: { total: number; easy: number; medium: number; hard: number } | null;
    calendar: Record<string, number>;
    totalSubmissions: number | null;
    activeDays: number | null;
    maxStreak: number | null;
  };
  github: {
    total: number | null;
    days: Record<string, number> | null;
    maxStreak: number | null;
    followers: number | null;
    publicRepos: number | null;
  };
};

function submissionLevel(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n <= 3) return 2;
  if (n <= 6) return 3;
  return 4;
}

function buildGrid(year: number, dayMap: Record<string, number>, palette: "github" | "leetcode") {
  const jan1 = new Date(year, 0, 1);
  const start = new Date(jan1);
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);
  const dec31 = new Date(year, 11, 31);
  const end = new Date(dec31);
  while (end.getDay() !== 6) end.setDate(end.getDate() + 1);

  const weeks: { days: HeatDay[] }[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    const weekDays: HeatDay[] = [];
    for (let i = 0; i < 7; i++) {
      const iso = cur.toISOString().slice(0, 10);
      const count = dayMap[iso] ?? 0;
      weekDays.push({ date: iso, count, level: palette === "leetcode" ? submissionLevel(count) : (count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4) });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push({ days: weekDays });
  }
  return weeks;
}

const REFRESH_MS = 5 * 60 * 1000; // 5 min — GitHub third-party cache can lag vs profile

export function CodingActivityPanels({ github: ghInit, leetcode: lcInit, githubProfileUrl, leetcodeProfileUrl }: Props) {
  const [github, setGithub] = useState(ghInit);
  const [leetcode, setLeetcode] = useState(lcInit);
  const [liveStatus, setLiveStatus] = useState<"loading" | "live" | "partial" | "cached">("loading");
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  const loadStats = useCallback(() => {
    fetch("/api/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: ApiResponse) => {
        const year = lcInit.year;

        // ── Update LeetCode ──────────────────────────────
        if (data.leetcode.solved) {
          const cal = data.leetcode.calendar ?? {};
          const weeks = buildGrid(year, cal, "leetcode");
          setLeetcode((prev) => ({
            ...prev,
            solved: data.leetcode.solved!,
            totalSubmissions: data.leetcode.totalSubmissions ?? prev.totalSubmissions,
            activeDays: data.leetcode.activeDays ?? prev.activeDays,
            maxStreak: data.leetcode.maxStreak ?? prev.maxStreak,
            weeks: weeks.length > 0 ? weeks : prev.weeks,
          }));
        }

        // ── Update GitHub ────────────────────────────────
        if (data.github.total !== null) {
          const ghDays = data.github.days ?? {};
          const weeks = buildGrid(year, ghDays, "github");
          setGithub((prev) => ({
            ...prev,
            totalContributions: data.github.total ?? prev.totalContributions,
            maxStreak: data.github.maxStreak ?? prev.maxStreak,
            followers: data.github.followers ?? prev.followers,
            publicRepos: data.github.publicRepos ?? prev.publicRepos,
            weeks: weeks.length > 0 ? weeks : prev.weeks,
          }));
        }

        setFetchedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        const gotSolved = Boolean(data.leetcode.solved);
        const gotGH = data.github.total !== null;
        setLiveStatus(gotSolved || gotGH ? (gotSolved ? "live" : "partial") : "cached");
      })
      .catch(() => setLiveStatus("cached"));
  }, [lcInit.year]);

  useEffect(() => {
    loadStats();
    const id = setInterval(loadStats, REFRESH_MS);
    return () => clearInterval(id);
  }, [loadStats]);

  const ghSlug = github.username.toUpperCase();
  const lcSlug = leetcode.username.toUpperCase();

  return (
    <>
    <div className="grid gap-6 lg:grid-cols-2">

      {/* ── GitHub ─────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-50 via-white/80 to-white/60 p-5 shadow-lg shadow-emerald-100/50 dark:from-emerald-950/30 dark:via-black/60 dark:to-black/80 dark:shadow-emerald-900/20">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="font-pixel text-[10px] tracking-[0.22em] text-zinc-500 dark:text-zinc-400">GITHUB</div>
            <div className="mt-1 font-pixel text-sm text-zinc-900 dark:text-zinc-100">{ghSlug}</div>
            <a href={githubProfileUrl} target="_blank" rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-700 hover:underline dark:text-emerald-400">
              {githubProfileUrl.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          {/* Year + live status stacked */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
              {github.year}
            </span>
            <LiveBadge status={liveStatus} color="emerald" />
          </div>
        </div>
        {github.error ? <p className="text-[10px] text-amber-600 dark:text-amber-400">{github.error}</p> : null}

        <div className="grid grid-cols-2 gap-2">
          <StatTile border="border-emerald-500/35" emoji="⚡" value={String(github.totalContributions)} label="Contributions" />
          <StatTile border="border-orange-500/35"  emoji="🔥" value={String(github.maxStreak)} label="Max streak" />
          <StatTile border="border-sky-500/35"     emoji="📦" value={github.publicRepos != null ? String(github.publicRepos) : "—"} label="Public repos" />
          <StatTile border="border-violet-500/35"  emoji="👤" value={github.followers != null ? String(github.followers) : "—"} label="Followers" />
        </div>

        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {github.totalContributions} contributions in {github.year}
          </div>
          <Heatmap weeks={github.weeks} palette="github" />
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[9px] text-zinc-500 dark:text-zinc-600">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {fetchedAt ? `Updated ${fetchedAt}` : "Loading…"}
              <button
                type="button"
                onClick={() => loadStats()}
                className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-semibold uppercase tracking-wider text-emerald-700 transition hover:bg-emerald-500/20 dark:text-emerald-400"
              >
                Refresh
              </button>
            </span>
            <span className="flex items-center gap-2">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className={`inline-block h-[10px] w-[10px] rounded-[2px] ${l === 0 ? "bg-zinc-200 dark:bg-zinc-800" : l === 1 ? "bg-emerald-300 dark:bg-emerald-900" : l === 2 ? "bg-emerald-500 dark:bg-emerald-700" : l === 3 ? "bg-emerald-600 dark:bg-emerald-500" : "bg-emerald-700 dark:bg-emerald-300"}`} />
              ))}
              More
            </span>
          </div>
        </div>
      </div>

      {/* ── LeetCode ───────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-50 via-white/80 to-white/60 p-5 shadow-lg shadow-amber-100/50 dark:from-amber-950/30 dark:via-black/60 dark:to-black/80 dark:shadow-amber-900/20">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="font-pixel text-[10px] tracking-[0.22em] text-zinc-500 dark:text-zinc-400">LEETCODE</div>
            <div className="mt-1 font-pixel text-sm text-zinc-900 dark:text-zinc-100">{lcSlug}</div>
            <a href={leetcodeProfileUrl} target="_blank" rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-700 hover:underline dark:text-amber-400">
              {leetcodeProfileUrl.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          {/* Year + live status stacked */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
              {leetcode.year}
            </span>
            <LiveBadge status={liveStatus} color="amber" />
          </div>
        </div>
        {leetcode.error ? <p className="text-[10px] text-amber-600 dark:text-amber-400">{leetcode.error}</p> : null}

        {/* Solved breakdown */}
        <div className="flex flex-wrap items-start gap-5 rounded-xl border border-black/8 bg-white/60 p-4 dark:border-white/5 dark:bg-black/30">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{leetcode.solved.total}</span>
            <span className="text-[10px] text-zinc-500">Solved</span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2">
            <DifficultyRow label="Easy" solved={leetcode.solved.easy}   total={940}  color="bg-teal-500/20 text-teal-700 dark:text-teal-300" />
            <DifficultyRow label="Med." solved={leetcode.solved.medium} total={2048} color="bg-amber-500/20 text-amber-700 dark:text-amber-300" />
            <DifficultyRow label="Hard" solved={leetcode.solved.hard}   total={927}  color="bg-rose-500/20 text-rose-700 dark:text-rose-300" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatTile border="border-amber-500/35"  emoji="⚡" value={String(leetcode.totalSubmissions)} label="Submissions" />
          <StatTile border="border-orange-500/35" emoji="🔥" value={String(leetcode.maxStreak)} label="Max streak" />
          <StatTile border="border-lime-500/35"   emoji="📅" value={String(leetcode.activeDays)} label="Active days" />
        </div>

        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {leetcode.totalSubmissions} submissions in {leetcode.year}
          </div>
          <Heatmap weeks={leetcode.weeks} palette="leetcode" />
          <div className="mt-1.5 flex items-center justify-between gap-2 text-[9px] text-zinc-500 dark:text-zinc-600">
            <span>
              {fetchedAt ? `Updated ${fetchedAt}` : "Loading…"}
            </span>
            <span className="flex items-center gap-2">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className={`inline-block h-[10px] w-[10px] rounded-[2px] ${l === 0 ? "bg-zinc-200 dark:bg-zinc-800" : l === 1 ? "bg-amber-200 dark:bg-amber-950" : l === 2 ? "bg-amber-400 dark:bg-amber-700" : l === 3 ? "bg-amber-500 dark:bg-amber-500" : "bg-amber-600 dark:bg-yellow-300"}`} />
              ))}
              More
            </span>
          </div>
        </div>
      </div>

    </div>
    <p className="mx-auto mt-2 max-w-2xl text-center text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-500">
      GitHub totals match your profile when <span className="font-mono text-zinc-600 dark:text-zinc-400">GITHUB_TOKEN</span> is set
      on the server (classic PAT with <span className="font-mono">read:user</span>). Otherwise a public contributions API is used and can lag slightly behind github.com.
    </p>
    </>
  );
}
