"use client";

import { skills } from "@/data/site";

type Variant = "default" | "slow";

type Props = {
  variant?: Variant;
  /** Optional override — defaults to every skill name from siteConfig. */
  items?: string[];
};

/**
 * Full-bleed horizontal marquee band showing skill names in uppercase,
 * separated by dots. Auto-scrolls forever and pauses on hover.
 *
 * The component renders two back-to-back copies of the track so the
 * CSS `translateX(-50%)` keyframe loops seamlessly regardless of item
 * widths (as long as both copies are identical).
 */
export function SkillsMarquee({ variant = "default", items }: Props) {
  const list = items ?? skills.map((s) => s.name);
  const animClass =
    variant === "slow" ? "animate-marquee-slow" : "animate-marquee";

  return (
    <div
      aria-hidden
      className="marquee-mask marquee-pause-hover relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-black/10 bg-slate-100 py-3.5 dark:border-white/5 dark:bg-[#0b1315]"
    >
      <div className={`${animClass} flex w-max whitespace-nowrap`}>
        <MarqueeTrack list={list} />
        <MarqueeTrack list={list} />
      </div>
    </div>
  );
}

function MarqueeTrack({ list }: { list: string[] }) {
  return (
    <ul className="flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300">
      {list.map((name, i) => (
        <li
          key={`${name}-${i}`}
          className="flex items-center gap-8 pr-8 sm:gap-10 sm:pr-10"
        >
          <span>{name}</span>
          <span aria-hidden className="text-zinc-400 dark:text-zinc-600">
            ·
          </span>
        </li>
      ))}
    </ul>
  );
}
