"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Building2,
  ExternalLink,
  Network,
  Shield,
  Smartphone,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projectFilters, projects } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, viewportOnce } from "@/lib/animations";

/* ── Per-project visual config ───────────────────────────── */
type BannerConfig = {
  gradient: string;       // Tailwind gradient classes
  iconBg: string;         // icon container bg
  iconColor: string;      // icon colour
  Icon: React.ElementType;
  dots: string;           // dot grid opacity class
  accent: string;         // floating pill accent
};

const BANNERS: Record<string, BannerConfig> = {
  "FraudShield AI — UPI Fraud Detection Platform": {
    gradient: "from-rose-950/70 via-red-900/40 to-zinc-900",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    Icon: Shield,
    dots: "opacity-[0.07]",
    accent: "bg-rose-500/20 text-rose-300",
  },
  "Enterprise AI Continuous Quality Control (CQC) Framework": {
    gradient: "from-violet-950/70 via-purple-900/40 to-zinc-900",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    Icon: Brain,
    dots: "opacity-[0.07]",
    accent: "bg-violet-500/20 text-violet-300",
  },
  "NetScope — Network Observability & Security": {
    gradient: "from-cyan-950/70 via-sky-900/40 to-zinc-900",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    Icon: Network,
    dots: "opacity-[0.07]",
    accent: "bg-cyan-500/20 text-cyan-300",
  },
  "Real Estate Booking System": {
    gradient: "from-emerald-950/70 via-green-900/40 to-zinc-900",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    Icon: Building2,
    dots: "opacity-[0.07]",
    accent: "bg-emerald-500/20 text-emerald-300",
  },
  "SubTracker Pro India (Hackforge)": {
    gradient: "from-amber-950/70 via-orange-900/40 to-zinc-900",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    Icon: Smartphone,
    dots: "opacity-[0.07]",
    accent: "bg-amber-500/20 text-amber-300",
  },
};

const DEFAULT_BANNER: BannerConfig = {
  gradient: "from-indigo-950/70 via-blue-900/40 to-zinc-900",
  iconBg: "bg-indigo-500/20",
  iconColor: "text-indigo-400",
  Icon: ArrowUpRight,
  dots: "opacity-[0.07]",
  accent: "bg-indigo-500/20 text-indigo-300",
};

function ProjectBanner({
  title,
  year,
  tags,
  githubUrl,
  liveUrl,
}: {
  title: string;
  year?: number;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}) {
  const cfg = BANNERS[title] ?? DEFAULT_BANNER;
  const { Icon } = cfg;
  // Show first 3 tags as floating pills inside the banner
  const pillTags = tags.slice(0, 3);

  return (
    <div
      className={`relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${cfg.gradient}`}
    >
      {/* Dot-grid pattern */}
      <svg
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full ${cfg.dots}`}
      >
        <defs>
          <pattern id={`dots-${title.slice(0, 8)}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${title.slice(0, 8)})`} />
      </svg>

      {/* Corner glow */}
      <div aria-hidden className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full blur-3xl opacity-30 bg-white/10" />

      {/* Center icon */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cfg.iconBg} backdrop-blur-sm mb-4 ring-1 ring-white/10`}>
        <Icon className={`h-7 w-7 ${cfg.iconColor}`} strokeWidth={1.5} />
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-wrap justify-center gap-1.5 px-4">
        {pillTags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${cfg.accent} ring-1 ring-white/10`}
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/50 ring-1 ring-white/10">
            +{tags.length - 3}
          </span>
        )}
      </div>

      {/* Year badge */}
      {year ? (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-zinc-900 shadow">
          {year}
        </span>
      ) : null}

      {/* Hover action buttons */}
      <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} source on GitHub`}
          onClick={(e) => e.stopPropagation()}
          className="rounded-full bg-white/90 p-2 text-zinc-900 shadow-lg transition hover:scale-110"
        >
          <FaGithub className="h-4 w-4" />
        </a>
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} live site`}
          onClick={(e) => e.stopPropagation()}
          className="rounded-full bg-white/90 p-2 text-zinc-900 shadow-lg transition hover:scale-110"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Bottom gradient fade into card body */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="Selected Projects"
        subtitle="Featured Work"
        description="A selection of recent work across AI, full-stack, and systems engineering. Each project blends measurable impact with clean architecture."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "text-white"
                  : "glass text-zinc-600 hover:text-foreground dark:text-zinc-400"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : null}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group glass relative overflow-hidden rounded-2xl p-1 transition hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <ProjectBanner
                title={project.title}
                year={project.year}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 translate-y-0 text-zinc-400 transition group-hover:-translate-y-1 group-hover:text-indigo-500" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/70 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 text-center text-zinc-500"
        >
          No projects match this filter yet.
        </motion.p>
      ) : null}
    </section>
  );
}
