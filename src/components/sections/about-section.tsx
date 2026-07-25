"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Download,
  GraduationCap,
  Mail,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { certifications, siteConfig } from "@/data/site";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn, navigateToSection } from "@/lib/utils";

const AWS_BADGE_SRC = "/badges/aws-certified-solutions-architect-associate.png";

const awsCert = certifications.find((c) =>
  c.title.includes("AWS Certified Solutions Architect")
);

const ROLE_LINE = ["Software Engineer", "Full-Stack", "AI", "Cloud"] as const;

const TECH_BADGES = [
  "FastAPI",
  "React",
  "AWS",
  "Docker",
  "Kubernetes",
  "AI",
] as const;

type CredCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  label?: string;
};

function CredCard({ children, className, href, label }: CredCardProps) {
  const classes = cn(
    "glass group relative block rounded-xl border border-zinc-800/90 bg-[#0a0d12]/75 p-3.5 transition duration-300",
    "hover:-translate-y-0.5 hover:border-cyan-500/25 hover:shadow-[0_12px_40px_-18px_rgba(34,211,238,0.35)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(classes, "text-inherit no-underline")}
      >
        {children}
      </a>
    );
  }

  return <article className={classes}>{children}</article>;
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative mx-auto max-w-6xl px-4 py-20 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-64 max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.07),transparent_70%)]"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
      >
        {/* ── Left: primary narrative ──────────────────── */}
        <motion.header variants={fadeUp} className="space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-400/90">
              About me
            </p>

            <h2
              id="about-heading"
              className="text-4xl font-black tracking-tight text-zinc-50 sm:text-5xl"
            >
              {siteConfig.name}
            </h2>

            <p
              className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] text-zinc-400"
              aria-label="Roles"
            >
              {ROLE_LINE.map((role, i) => (
                <span key={role} className="inline-flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden className="text-zinc-600">
                      |
                    </span>
                  ) : null}
                  <span className="text-zinc-300">{role}</span>
                </span>
              ))}
            </p>
          </div>

          <h3 className="max-w-xl text-xl font-semibold leading-snug tracking-tight text-zinc-100 sm:text-2xl">
            I ship products that connect{" "}
            <span className="text-cyan-300">APIs</span>,{" "}
            <span className="gradient-text">AI workflows</span>, and{" "}
            <span className="text-amber-300">AWS infrastructure</span> — the kind
            recruiters can demo, not just describe.
          </h3>

          <div className="max-w-xl space-y-3 text-[15px] leading-relaxed text-zinc-400">
            <p>
              I care about clear problem framing, pragmatic architecture, and
              shipping systems that stay reliable as they scale.
            </p>
            <p>
              Recent work spans UPI fraud detection, eBPF observability, and
              enterprise ML quality control — backed by a foundation of{" "}
              <span className="font-medium text-zinc-200">2000+</span> GitHub
              commits and{" "}
              <span className="font-medium text-zinc-200">400+</span> LeetCode
              problems solved.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {siteConfig.resumeUrl ? (
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              >
                <Download className="h-4 w-4" aria-hidden />
                View Resume
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => navigateToSection("#contact")}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Me
            </button>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              <FaGithub className="h-4 w-4" aria-hidden />
              GitHub
            </a>
          </div>

          <ul
            className="flex flex-wrap gap-2 pt-1"
            aria-label="Core technologies"
          >
            {TECH_BADGES.map((tech) => (
              <li key={tech}>
                <span className="inline-flex rounded-md border border-zinc-700/80 bg-zinc-900/50 px-2.5 py-1 font-mono text-[11px] tracking-wide text-zinc-400 transition hover:border-cyan-500/30 hover:text-cyan-200">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </motion.header>

        {/* ── Right: credibility rail ──────────────────── */}
        <motion.aside
          variants={fadeUp}
          aria-label="Credentials and highlights"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
        >
          {/* AWS — compact, not dominant */}
          <CredCard
            href={awsCert?.credentialUrl}
            label="Verify AWS Certified Solutions Architect – Associate on Credly"
            className="sm:col-span-2 xl:col-span-2"
          >
            <div className="flex items-center gap-3">
              <Image
                src={AWS_BADGE_SRC}
                alt="AWS Certified Solutions Architect – Associate badge"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-400/80">
                  Credential
                </p>
                <h3 className="mt-0.5 text-sm font-semibold leading-snug text-zinc-100">
                  AWS Solutions Architect — Associate
                </h3>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  SAA-C03 · Verified on Credly
                </p>
              </div>
            </div>
          </CredCard>

          {/* Samsung intern */}
          <CredCard className="sm:col-span-2 xl:col-span-2">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-500/25 bg-blue-500/10 text-blue-300">
                <Briefcase className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Experience
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-zinc-100">
                  SDE Intern · Samsung Electro-Mechanics
                </h3>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  SEM-B · Bangalore · Jun 2026 – Present
                </p>
              </div>
            </div>
          </CredCard>

          <CredCard
            href={siteConfig.socialLinks.github}
            label="Open GitHub profile"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                GitHub
              </p>
              <FaGithub className="h-3.5 w-3.5 text-zinc-600" aria-hidden />
            </div>
            <p className="mt-1.5 text-2xl font-black tracking-tight text-zinc-50">
              2000<span className="text-cyan-400">+</span>
            </p>
            <p className="text-[11px] text-zinc-500">commits · active repos</p>
          </CredCard>

          <CredCard
            href={siteConfig.socialLinks.leetcode}
            label="Open LeetCode profile"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                LeetCode
              </p>
              <SiLeetcode className="h-3.5 w-3.5 text-zinc-600" aria-hidden />
            </div>
            <p className="mt-1.5 text-2xl font-black tracking-tight text-zinc-50">
              400<span className="text-amber-400">+</span>
            </p>
            <p className="text-[11px] text-zinc-500">problems solved</p>
          </CredCard>

          <CredCard>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Open source
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-zinc-100">
                  GSSoC &apos;25
                </h3>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Production PRs &amp; reviews
                </p>
              </div>
            </div>
          </CredCard>

          <CredCard>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-500/25 bg-indigo-500/10 text-indigo-300">
                <GraduationCap
                  className="h-3.5 w-3.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Education
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-zinc-100">
                  B.Tech IT · MUJ
                </h3>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  4th Year · 2023–2027
                </p>
              </div>
            </div>
          </CredCard>
        </motion.aside>
      </motion.div>
    </section>
  );
}
