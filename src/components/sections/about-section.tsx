"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "@/lib/animations";

/* ── Compact info rows (right card) ───────────────────── */
type InfoRow = {
  label: string;
  value: string;
  sub?: string;
  color: string;
  emoji: string;
};

const INFO_ROWS: InfoRow[] = [
  {
    label: "EDUCATION",
    emoji: "🎓",
    value: "B.Tech IT · 3rd Year",
    sub: "MUJ · 2023–2027",
    color: "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    label: "LOCATION",
    emoji: "📍",
    value: "Jaipur, Rajasthan",
    sub: "India",
    color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  },
  {
    label: "FOCUS",
    emoji: "⚡",
    value: "Full-Stack · Cloud & DevOps",
    sub: "Node.js · Docker · AWS · Kubernetes",
    color: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    label: "CERTIFIED",
    emoji: "🏆",
    value: "AWS SAA-C03",
    sub: "Solutions Architect – Associate",
    color: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    label: "OPEN SOURCE",
    emoji: "🌟",
    value: "GSSoC '25 Contributor",
    sub: "Production-grade PRs & reviews",
    color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
];

const STATUS_PILLS = [
  {
    label: "Open to Internships",
    color: "border-cyan-400/40 bg-cyan-400/10 text-cyan-700 dark:text-cyan-300",
  },
  {
    label: "Available for Projects",
    color: "border-violet-400/40 bg-violet-400/10 text-violet-700 dark:text-violet-300",
  },
  {
    label: "AWS Certified",
    color: "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="A bit about me"
        subtitle="About Me"
        description="3rd-year IT student at MUJ — building fast, scalable systems and real-world AI products."
      />

      <div className="grid items-start gap-10 md:grid-cols-[1.15fr_0.85fr]">

        {/* ── Left: bio text ─────────────────────────── */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-5"
        >
          <p className="text-lg font-semibold leading-relaxed text-zinc-800 dark:text-zinc-200">
            My focus is on{" "}
            <span className="text-cyan-700 dark:text-cyan-400">backend engineering</span> and{" "}
            <span className="text-violet-700 dark:text-violet-400">cloud-native development</span>.
          </p>

          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I work with <span className="font-medium text-zinc-800 dark:text-zinc-200">Node.js</span>,{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">FastAPI</span>, and modern DevOps
            tools like <span className="font-medium text-zinc-800 dark:text-zinc-200">Docker</span>,{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Kubernetes</span>, and{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Terraform</span> to design and
            deploy production-ready systems on AWS.
          </p>

          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I&apos;ve made <span className="font-semibold text-zinc-800 dark:text-zinc-200">1300+ commits</span> on
            GitHub and solved <span className="font-semibold text-zinc-800 dark:text-zinc-200">200+ problems</span> on
            LeetCode, consistently improving my problem-solving and engineering skills.
          </p>

          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I enjoy solving complex problems, designing scalable architectures, and continuously
            exploring <span className="font-medium text-zinc-800 dark:text-zinc-200">AI engineering</span>,{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">system design</span>, and
            high-performance distributed systems.
          </p>

          {/* Status pills */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-wrap gap-2.5 pt-2"
          >
            {STATUS_PILLS.map(({ label, color }) => (
              <motion.span
                key={label}
                variants={fadeUp}
                className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium ${color}`}
              >
                {label}
              </motion.span>
            ))}
          </motion.div>

          {/* Hire CTA */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="pt-1">
            <a
              href={siteConfig.gmailCompose}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-500/20 hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              ✉ Hire Me
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: compact info card ────────────────── */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-[#0c0f14]/80 dark:shadow-black/40">
            {/* Card header */}
            <div className="border-b border-black/5 px-5 py-4 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-500/40 bg-cyan-500/10 font-pixel text-[9px] font-bold text-cyan-700 dark:text-cyan-400">
                  US
                </span>
                <div>
                  <p className="font-pixel text-[10px] tracking-wider text-zinc-900 dark:text-zinc-100">UTKARSH SINGH</p>
                  <p className="text-[10px] text-zinc-500">utkarsh.yash@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex items-start gap-3 px-5 py-3.5">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-sm ${row.color}`}>
                    {row.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="font-pixel text-[8px] tracking-[0.18em] text-zinc-500 dark:text-zinc-600">{row.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{row.value}</p>
                    {row.sub ? <p className="text-[11px] text-zinc-500">{row.sub}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
