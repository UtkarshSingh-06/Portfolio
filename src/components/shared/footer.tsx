"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { SpotifyWidget } from "@/components/shared/spotify-widget";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Activity",   href: "#activity" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

const SOCIAL_BOXES = [
  { code: "GH", href: siteConfig.socialLinks.github,   label: "GitHub" },
  { code: "LI", href: siteConfig.socialLinks.linkedin, label: "LinkedIn" },
  { code: "LC", href: siteConfig.socialLinks.leetcode, label: "LeetCode" },
];

const DEV_THOUGHTS = [
  "> Infrastructure as code since before click-ops became embarrassing.",
  "> kubectl apply -f dreams.yaml — and hope the pod doesn't crash.",
  "> The best deployment is the one nobody notices.",
  "> Every bug is just an undocumented feature in production.",
  "> Terraform plan looked fine. Terraform apply had other plans.",
  "> docker build && docker pray",
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openTerminal() {
  window.dispatchEvent(new Event("portfolio:open-terminal"));
}

export function Footer() {
  const year = new Date().getFullYear();

  const [thought, setThought] = useState(DEV_THOUGHTS[0]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setThought(DEV_THOUGHTS[Math.floor(Math.random() * DEV_THOUGHTS.length)]);
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <footer className="relative border-t border-black/10 bg-slate-100 dark:border-white/10 dark:bg-[#07090d]">

      {/* ── Main grid ──────────────────────────────────── */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">

        {/* Col 1 – Identity */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-500/50 bg-cyan-500/10 font-pixel text-sm font-bold text-cyan-700 dark:text-cyan-400">
              US
            </div>
            <span className="font-pixel text-sm tracking-wider text-zinc-800 dark:text-zinc-100">
              UTKARSH SINGH
            </span>
          </div>

          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Full-Stack · Cloud &amp; DevOps Engineer · 3rd Year IT · MUJ ·
            Building fast, production-grade systems.
          </p>

          <div className="flex gap-2">
            {SOCIAL_BOXES.map(({ code, href, label }) => (
              <a
                key={code}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-14 items-center justify-center rounded border border-zinc-300 bg-white/60 font-pixel text-[10px] text-zinc-600 transition hover:border-cyan-500/60 hover:text-cyan-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:text-cyan-400"
              >
                {code}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 – Navigate */}
        <div>
          <p className="mb-4 font-pixel text-[10px] tracking-[0.25em] text-zinc-500">NAVIGATE</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => scrollToSection(href)}
                  className="group flex min-h-[44px] items-center gap-1 text-sm text-zinc-600 transition hover:text-cyan-700 dark:text-zinc-400 dark:hover:text-cyan-400"
                >
                  <span className="text-zinc-400 transition group-hover:text-cyan-600 dark:text-zinc-600 dark:group-hover:text-cyan-500">&gt;</span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 – Status */}
        <div className="flex flex-col gap-5">
          <p className="font-pixel text-[10px] tracking-[0.25em] text-zinc-500">STATUS</p>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="rounded border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 font-pixel text-[10px] tracking-wider text-emerald-700 dark:text-emerald-400">
              OPEN TO WORK
            </span>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Available for internships &amp; full-time roles.
          </p>
          <p className="text-xs text-zinc-500">
            Full Stack &nbsp;·&nbsp; Cloud &amp; DevOps &nbsp;·&nbsp; Backend
          </p>

          <SpotifyWidget />

          <div className="border-t border-black/5 pt-4 dark:border-white/5">
            <p className="mb-2 font-pixel text-[9px] tracking-[0.22em] text-zinc-500 dark:text-zinc-600">DEV THOUGHT</p>
            <p className="font-mono text-[11px] italic text-zinc-500">{thought}</p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div className="border-t border-black/5 dark:border-white/5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p className="font-pixel text-[9px] tracking-[0.18em] text-zinc-500 dark:text-zinc-600">
            © {year} UTKARSH SINGH · ALL RIGHTS RESERVED
          </p>

          <div className="flex items-center gap-2">
            <span className="font-pixel text-[9px] tracking-[0.15em] text-zinc-500 dark:text-zinc-600">
              BUILT WITH NEXT.JS
            </span>
            <span className="text-zinc-400 dark:text-zinc-700">·</span>
            <button
              onClick={() => {}}
              className="rounded border border-zinc-300/80 px-2 py-0.5 font-pixel text-[9px] tracking-[0.15em] text-zinc-500 transition hover:border-cyan-500/40 hover:text-cyan-700 dark:border-zinc-700/60 dark:hover:text-cyan-400"
              title="Keyboard shortcuts coming soon"
            >
              +SHORTCUTS
            </button>
            <span className="text-zinc-400 dark:text-zinc-700">·</span>
            <button
              onClick={openTerminal}
              className="rounded border border-zinc-300/80 px-2 py-0.5 font-pixel text-[9px] tracking-[0.15em] text-zinc-500 transition hover:border-cyan-500/40 hover:text-cyan-700 dark:border-zinc-700/60 dark:hover:text-cyan-400"
            >
              +TERMINAL
            </button>
          </div>
        </div>
      </div>

      {/* ── Floating shortcut hint bar — hidden on touch-only devices ── */}
      <div
        className={`pointer-events-none fixed bottom-24 left-1/2 z-50 hidden -translate-x-1/2 transition-opacity duration-700 md:block ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-md dark:border-zinc-700/70 dark:bg-zinc-900/90">
          <span className="font-pixel text-[9px] tracking-wider text-zinc-600 dark:text-zinc-400">Press</span>
          <kbd className="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-pixel text-[9px] text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200">
            ?
          </kbd>
          <span className="font-pixel text-[9px] tracking-wider text-zinc-600 dark:text-zinc-400">for shortcuts</span>
          <span className="font-pixel text-[9px] text-zinc-400 dark:text-zinc-600">·</span>
          <kbd
            className="cursor-pointer rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-pixel text-[9px] text-zinc-700 hover:border-cyan-500/60 hover:text-cyan-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:text-cyan-400"
            onClick={() => { setShowHint(false); openTerminal(); }}
            style={{ pointerEvents: "auto" }}
          >
            `
          </kbd>
          <span className="font-pixel text-[9px] tracking-wider text-zinc-600 dark:text-zinc-400">for terminal</span>
        </div>
      </div>

    </footer>
  );
}
