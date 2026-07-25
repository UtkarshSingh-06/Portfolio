"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Cloud,
  Database,
  Server,
  Shield,
  Sparkles,
} from "lucide-react";
import { certifications, experiences } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const AWS_BADGE_SRC = "/badges/aws-certified-solutions-architect-associate.png";

type CertVisual = {
  monogram: string;
  accent: string;
  glow: string;
  Icon: typeof Award;
  featured?: boolean;
};

const CERT_VISUALS: Record<string, CertVisual> = {
  "AWS Certified Solutions Architect – Associate (SAA-C03)": {
    monogram: "AWS",
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    glow: "bg-amber-400/15 text-amber-300 ring-amber-400/25",
    Icon: Cloud,
    featured: true,
  },
  "Data Structures and Algorithms": {
    monogram: "NPTEL",
    accent: "from-cyan-500/15 via-sky-500/5 to-transparent",
    glow: "bg-cyan-400/15 text-cyan-300 ring-cyan-400/20",
    Icon: Sparkles,
  },
  "Design and Analysis of Algorithms": {
    monogram: "NPTEL",
    accent: "from-indigo-500/15 via-violet-500/5 to-transparent",
    glow: "bg-indigo-400/15 text-indigo-300 ring-indigo-400/20",
    Icon: Sparkles,
  },
  "Database Programming with SQL": {
    monogram: "ORCL",
    accent: "from-rose-500/15 via-red-500/5 to-transparent",
    glow: "bg-rose-400/15 text-rose-300 ring-rose-400/20",
    Icon: Database,
  },
  "Red Hat System Administration I & II (RH124, RH134) — RHEL 9.3": {
    monogram: "RHEL",
    accent: "from-red-500/15 via-rose-500/5 to-transparent",
    glow: "bg-red-400/15 text-red-300 ring-red-400/20",
    Icon: Server,
  },
};

const DEFAULT_VISUAL: CertVisual = {
  monogram: "CERT",
  accent: "from-zinc-500/10 to-transparent",
  glow: "bg-zinc-400/10 text-zinc-300 ring-zinc-400/20",
  Icon: Award,
};

const NODE_POSITIONS = [
  "left-0 top-4",
  "right-0 top-4",
  "bottom-4 left-0",
  "bottom-4 right-0",
] as const;

export function ExperienceSection() {
  const primaryCerts = certifications.filter((c) => !c.academy);
  const academyCerts = certifications.filter((c) => c.academy);
  const featured = primaryCerts.find((c) => CERT_VISUALS[c.title]?.featured);
  const rest = primaryCerts.filter((c) => c !== featured);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="Experience"
        subtitle="Journey"
        description="The roles, teams, and communities I've had the privilege to build with."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-3xl"
      >
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-zinc-300 to-transparent dark:via-zinc-700 md:left-1/2" />

        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.article
              key={`${exp.company}-${exp.period}`}
              variants={fadeUp}
              className={`relative mb-10 md:grid md:grid-cols-2 md:gap-8 ${
                isEven ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div className={`pl-14 md:pl-0 ${isEven ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                <div className="glass inline-block rounded-2xl p-5 text-left">
                  <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    {exp.period}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{exp.role}</h3>
                  <p className="font-medium text-zinc-600 dark:text-zinc-300">
                    {exp.company}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="absolute left-0 top-4 md:left-1/2 md:-translate-x-1/2">
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-background"
                >
                  <Briefcase className="h-4 w-4" />
                </motion.span>
              </div>

              <div className="hidden md:block" />
            </motion.article>
          );
        })}
      </motion.div>

      {/* ── Certifications ─────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-24"
      >
        <motion.div variants={fadeUp} className="mb-5 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400">
            <span className="h-px w-8 bg-cyan-400/50" />
            Credential network
            <span className="h-px w-8 bg-cyan-400/50" />
          </span>
          <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Proof of <span className="gradient-text">continuous learning</span>
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
            One cloud specialization at the core, supported by foundations in
            algorithms, databases, and Linux systems.
          </p>
        </motion.div>

        {/* Desktop: connected credential constellation */}
        <div className="relative mx-auto hidden h-[420px] max-w-4xl md:block">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 420"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cert-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#22d3ee" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#f59e0b" stopOpacity="0.55" />
                <stop offset="1" stopColor="#818cf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {[
              [450, 210, 150, 70],
              [450, 210, 750, 70],
              [450, 210, 150, 350],
              [450, 210, 750, 350],
            ].map(([x1, y1, x2, y2], index) => (
              <motion.line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#cert-line)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1, delay: 0.15 + index * 0.12 }}
              />
            ))}
          </svg>

          {featured ? (
            <motion.article
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 z-10 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full border border-dashed border-amber-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_18px_4px_rgba(251,191,36,0.45)]" />
              </motion.div>
              <div aria-hidden className="absolute inset-2 rounded-full border border-cyan-400/15" />
              <div aria-hidden className="absolute inset-6 rounded-full bg-amber-400/15 blur-2xl" />

              <motion.a
                href={featured.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, rotate: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative flex flex-col items-center text-inherit no-underline outline-none"
                aria-label="Verify AWS Certified Solutions Architect – Associate on Credly (opens in a new tab)"
                title="View on Credly"
              >
                <span className="absolute -top-4 z-10 rounded-full border border-amber-400/30 bg-[#14120b] px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-amber-300">
                  Core credential
                </span>
                <Image
                  src={AWS_BADGE_SRC}
                  alt="AWS Certified Solutions Architect – Associate (SAA-C03) badge"
                  width={176}
                  height={176}
                  priority
                  className="h-44 w-44 drop-shadow-[0_0_28px_rgba(251,191,36,0.35)]"
                />
              </motion.a>
            </motion.article>
          ) : null}

          {rest.map((cert, index) => {
            const visual = CERT_VISUALS[cert.title] ?? DEFAULT_VISUAL;
            const { Icon } = visual;
            return (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group absolute w-[270px] ${NODE_POSITIONS[index]}`}
              >
                <div
                  className="relative overflow-hidden border border-zinc-800 bg-[#0a0d12]/90 p-4 backdrop-blur-md transition group-hover:border-cyan-400/30"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br opacity-70 ${visual.accent}`}
                  />
                  <div className="relative flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ${visual.glow}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-[8px] tracking-[0.22em] text-cyan-400/70">
                          NODE_0{index + 1}
                        </span>
                        <span className="h-px flex-1 bg-zinc-800" />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.35)]" />
                      </div>
                      <h4 className="text-sm font-semibold leading-snug text-zinc-100">
                        {cert.title}
                      </h4>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                        {visual.monogram} / {cert.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile: connected vertical signal path */}
        <div className="relative mt-10 space-y-3 pl-7 md:hidden">
          <div
            aria-hidden
            className="absolute bottom-5 left-[9px] top-5 w-px bg-gradient-to-b from-amber-400 via-cyan-400/60 to-indigo-500/20"
          />
          {primaryCerts.map((cert, index) => {
            const visual = CERT_VISUALS[cert.title] ?? DEFAULT_VISUAL;
            const { Icon } = visual;
            const isFeatured = cert === featured;
            return (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0d12]/90 p-4"
              >
                <span
                  aria-hidden
                  className={`absolute -left-[24px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#07090d] ${
                    isFeatured ? "bg-amber-400" : "bg-cyan-400"
                  }`}
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br opacity-70 ${visual.accent}`}
                />
                <div className="relative flex items-center gap-3">
                  {isFeatured ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Verify AWS badge on Credly (opens in a new tab)"
                      className="shrink-0 text-inherit no-underline outline-none"
                    >
                      <Image
                        src={AWS_BADGE_SRC}
                        alt="AWS Certified Solutions Architect – Associate badge"
                        width={44}
                        height={44}
                        className="h-11 w-11 drop-shadow-[0_0_10px_rgba(251,191,36,0.35)]"
                      />
                    </a>
                  ) : (
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ${visual.glow}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-cyan-400/70">
                      {isFeatured ? "Core credential" : `Credential 0${index + 1}`}
                    </span>
                    <h4 className="mt-1 text-sm font-semibold leading-snug text-zinc-100">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Quiet academy strip */}
        {academyCerts.length > 0 ? (
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 max-w-4xl border border-zinc-800/80 bg-[#0a0d12]/70 px-4 py-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">
                  Academy
                </span>
                <span className="h-px w-8 bg-zinc-700" aria-hidden />
                <span className="text-[11px] text-zinc-500">
                  Supporting coursework
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {academyCerts.map((cert) => (
                  <li key={cert.title}>
                    <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs text-zinc-300">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                      <span className="font-medium">{cert.title}</span>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                        {cert.issuer}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
