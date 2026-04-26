"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar as CalendarIcon,
  Check,
  Clock,
  Copy,
  Mail,
  Moon,
  Phone,
  Sun,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site";
import { activeHoursIST, weeklyAvailability } from "@/data/availability";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const IST_TIMEZONE = "Asia/Kolkata";

type Status = "active" | "sleeping";

function useISTClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

function istHour(date: Date): number {
  // 24-hour numeric hour in IST
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hour12: false,
    timeZone: IST_TIMEZONE,
  }).formatToParts(date);
  const h = parts.find((p) => p.type === "hour")?.value ?? "0";
  return Number(h) % 24;
}

function istDayKey(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: IST_TIMEZONE,
  })
    .format(date)
    .toLowerCase();
}

function formatISTTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: IST_TIMEZONE,
  }).format(date);
}

function formatISTDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: IST_TIMEZONE,
  }).format(date);
}

function getStatus(date: Date | null): Status {
  if (!date) return "active";
  const h = istHour(date);
  return h >= activeHoursIST.start && h < activeHoursIST.end ? "active" : "sleeping";
}

const githubHandle = siteConfig.socialLinks.github.replace(/^https?:\/\//, "");
const linkedinHandle = siteConfig.socialLinks.linkedin.replace(/^https?:\/\//, "");
const leetcodeHandle = siteConfig.socialLinks.leetcode
  .replace(/^https?:\/\/(www\.)?leetcode\.com\//, "")
  .replace(/\/$/, "");

const contactCards = [
  {
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.socialLinks.email,
    icon: Mail,
    accent: "from-indigo-500/20 to-indigo-500/5 text-indigo-300",
    external: false,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
    icon: Phone,
    accent: "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-300",
    external: false,
  },
  {
    label: "GitHub",
    value: githubHandle,
    href: siteConfig.socialLinks.github,
    icon: FaGithub,
    accent: "from-zinc-400/20 to-zinc-400/5 text-zinc-600 dark:text-zinc-200",
    external: true,
  },
  {
    label: "LinkedIn",
    value: linkedinHandle,
    href: siteConfig.socialLinks.linkedin,
    icon: FaLinkedin,
    accent: "from-sky-500/20 to-sky-500/5 text-sky-300",
    external: true,
  },
  {
    label: "LeetCode",
    value: leetcodeHandle,
    href: siteConfig.socialLinks.leetcode,
    icon: SiLeetcode,
    accent: "from-amber-500/20 to-amber-500/5 text-amber-300",
    external: true,
  },
] as const;

const bookCallUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  siteConfig.email
)}&su=${encodeURIComponent("Let's schedule a call")}&body=${encodeURIComponent(
  "Hi Utkarsh,\n\nI'd love to book a quick call. Here are a couple of time slots that work for me:\n\n1.\n2.\n\nThanks!"
)}`;

export function ContactSection() {
  const now = useISTClock();
  const [copied, setCopied] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const timeString = now ? formatISTTime(now) : "--:--:-- --";
  const dayString = now ? formatISTDate(now) : "---";
  const status: Status = getStatus(now);
  const todayKey = now ? istDayKey(now) : "";

  const weeklyWithToday = useMemo(
    () =>
      weeklyAvailability.map((day) => ({
        ...day,
        isToday: day.key === todayKey,
      })),
    [todayKey]
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — fallback: open mail app.
      window.location.href = siteConfig.socialLinks.email;
    }
  }

  // Keyboard shortcut: press "?" to toggle shortcut card
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (isTyping) return;

      if (event.key === "?") {
        event.preventDefault();
        setShowShortcuts((s) => !s);
      } else if (event.key === "Escape") {
        setShowShortcuts(false);
      } else if (showShortcuts) {
        if (event.key.toLowerCase() === "c") {
          event.preventDefault();
          copyEmail();
        } else if (event.key.toLowerCase() === "m") {
          window.location.href = siteConfig.socialLinks.email;
        } else if (event.key.toLowerCase() === "g") {
          window.open(siteConfig.socialLinks.github, "_blank");
        } else if (event.key.toLowerCase() === "l") {
          window.open(siteConfig.socialLinks.linkedin, "_blank");
        } else if (event.key.toLowerCase() === "k") {
          window.open(siteConfig.socialLinks.leetcode, "_blank");
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showShortcuts]);

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 py-24">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.22),transparent_70%)]"
      />

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-10 max-w-3xl"
      >
        <motion.div
          variants={fadeUp}
          className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400"
        >
          <span className="h-px w-8 bg-cyan-500/60" />
          Get in touch
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Let&apos;s{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text italic text-transparent">
            connect
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base"
        >
          Whether it&apos;s a full-time role, summer internship, freelance
          engagement, open-source collaboration, or just a conversation about
          tech — reach out and I&apos;ll get back fast.
        </motion.p>
      </motion.div>

      {/* Primary email row */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]"
      >
        <div className="glass group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-black/10 p-4 dark:border-white/10 sm:p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Primary Email
          </div>
          <div className="mt-1 truncate text-base font-medium sm:text-lg">
            {siteConfig.email}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition group-hover:opacity-100"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={copyEmail}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="inline-flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Email
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          href={siteConfig.socialLinks.email}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-black/5 px-5 py-3 text-sm font-semibold text-zinc-800 backdrop-blur transition hover:border-cyan-400/40 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:text-cyan-300"
        >
          Open Mail App
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </motion.div>

      {/* Contact card grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {contactCards.map((card) => {
          const Icon = card.icon;
          const isSpanning = card.label === "LeetCode";
          return (
            <motion.a
              key={card.label}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noreferrer" : undefined}
              className={`glass group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-black/10 p-4 transition hover:border-cyan-400/40 dark:border-white/10 ${
                isSpanning ? "lg:col-span-1" : ""
              }`}
            >
              <span
                className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${card.accent}`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {card.label}
                </span>
                <span className="block truncate text-sm font-medium">
                  {card.value}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 flex-none opacity-0 transition group-hover:opacity-100" />
            </motion.a>
          );
        })}
      </motion.div>

      {/* Availability + clock panel */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="glass-strong relative overflow-hidden rounded-3xl border border-black/10 p-5 dark:border-white/10 sm:p-6"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(6,182,212,0.08),transparent_40%),linear-gradient(315deg,rgba(20,184,166,0.08),transparent_40%)]"
        />

        {/* Clock row */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/30">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
              <Clock className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="font-mono text-lg font-semibold tabular-nums tracking-tight">
                {timeString}
              </div>
              <div className="text-[11px] text-zinc-500">
                {dayString} · IST (UTC+5:30) · {siteConfig.location}
              </div>
            </div>
          </div>

          <StatusPill status={status} />
        </div>

        {/* Availability header */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/15 text-teal-700 dark:text-teal-300">
              <CalendarIcon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="text-base font-semibold">Availability</div>
              <div className="text-[11px] text-zinc-500">
                IST (UTC+5:30) · Open to calls
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open
          </span>
        </div>

        {/* Weekly grid */}
        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
          {weeklyWithToday.map((day) => (
            <div
              key={day.key}
              className={`rounded-xl border p-2 transition ${
                day.isToday
                  ? "border-cyan-400/50 bg-cyan-400/10"
                  : "border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]"
              }`}
            >
              <div
                className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  day.isToday ? "text-cyan-700 dark:text-cyan-300" : "text-zinc-500"
                }`}
              >
                {day.label}
              </div>
              <div className="flex flex-col items-stretch gap-1.5">
                {day.slots.length === 0 ? (
                  <span className="text-xs text-zinc-600">—</span>
                ) : (
                  day.slots.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-md border border-black/10 bg-white/70 px-1.5 py-1 font-mono text-[10px] tabular-nums text-zinc-700 transition hover:border-cyan-400/40 hover:text-cyan-700 dark:border-white/5 dark:bg-black/30 dark:text-zinc-200 dark:hover:text-cyan-300 sm:text-[11px]"
                    >
                      {slot}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Book a call */}
        <motion.a
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          href={bookCallUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 py-3 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-400/20 dark:text-cyan-300"
        >
          Book a call
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </motion.div>

      {/* Shortcuts footer */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[11px] text-zinc-500 backdrop-blur dark:border-white/10 dark:bg-white/5">
          Press{" "}
          <button
            onClick={() => setShowShortcuts((s) => !s)}
            className="rounded transition hover:text-cyan-400"
            aria-expanded={showShortcuts}
            aria-controls="shortcut-panel"
          >
            <Kbd>?</Kbd>
          </button>{" "}
          for shortcuts ·{" "}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("portfolio:open-terminal"));
              }
            }}
            className="rounded transition hover:text-cyan-400"
            aria-label="Open terminal"
          >
            <Kbd>`</Kbd>
          </button>{" "}
          for terminal
        </div>
      </div>

      {/* Shortcut overlay */}
      <AnimatePresence>
        {showShortcuts ? (
          <motion.div
            id="shortcut-panel"
            role="dialog"
            aria-label="Keyboard shortcuts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 bottom-8 z-50 mx-auto w-[min(92vw,420px)] rounded-2xl border border-black/10 bg-white/95 p-4 text-sm text-zinc-900 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-black/80 dark:text-zinc-100"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
                Shortcuts
              </div>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                aria-label="Close shortcuts"
              >
                esc
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-2">
              <ShortcutRow k="C" label="Copy email" />
              <ShortcutRow k="M" label="Open mail app" />
              <ShortcutRow k="G" label="Open GitHub" />
              <ShortcutRow k="L" label="Open LinkedIn" />
              <ShortcutRow k="K" label="Open LeetCode" />
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function StatusPill({ status }: { status: Status }) {
  if (status === "sleeping") {
    return (
      <div className="flex flex-col items-end">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
          <Moon className="h-3 w-3" />
          Sleeping
        </span>
        <span className="mt-1 text-[10px] text-zinc-500">
          Replies next morning
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end">
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
        <Sun className="h-3 w-3" />
        Active
      </span>
      <span className="mt-1 text-[10px] text-zinc-500">
        Usually replies within hours
      </span>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[20px] items-center justify-center rounded-md border border-black/15 bg-black/10 px-1.5 font-mono text-[10px] text-zinc-700 dark:border-white/15 dark:bg-white/10 dark:text-zinc-200">
      {children}
    </kbd>
  );
}

function ShortcutRow({ k, label }: { k: string; label: string }) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-black/8 bg-black/[0.03] px-3 py-2 dark:border-white/5 dark:bg-white/[0.03]">
      <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
      <Kbd>{k}</Kbd>
    </li>
  );
}
