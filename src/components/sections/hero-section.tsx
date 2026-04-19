"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { scrollToSection } from "@/lib/utils";

const heroRoles = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Cloud & DevOps Engineer",
  "Open Source Contributor",
];

function useTyped(words: string[], typeSpeed = 70, deleteSpeed = 40, hold = 1400) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const delay = deleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), hold);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }
      setText((prev) =>
        deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, hold]);

  return text;
}

export function HeroSection() {
  const typed = useTyped(heroRoles);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-20"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />

      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr]"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="space-y-7">
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500"
          >
            <span>3rd Year IT</span>
            <span aria-hidden className="text-zinc-700">·</span>
            <span>Manipal University Jaipur</span>
            <span aria-hidden className="text-zinc-700">·</span>
            <span className="text-zinc-400">2023–2027</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Open to work
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="-mt-3 text-lg font-medium text-zinc-500 dark:text-zinc-400 sm:text-xl md:text-2xl"
          >
            a{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              {typed}
            </span>
            <span className="caret h-[0.9em] align-[-0.12em]" />
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-400"
          >
            <span className="gradient-text font-semibold">
              AWS Certified Solutions Architect – Associate
            </span>{" "}
            ·{" "}
            <span className="gradient-text font-semibold">1300+ commits</span>{" "}
            · Building and automating cloud-native apps using Docker,
            Kubernetes, Terraform, Jenkins.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection("#projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-indigo-500/20 transition hover:scale-[1.03] hover:shadow-indigo-500/40"
            >
              {siteConfig.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 px-6 py-3 text-sm font-semibold transition hover:border-indigo-400 hover:text-indigo-500 dark:border-zinc-700"
            >
              {siteConfig.ctaSecondary}
            </button>
            {siteConfig.resumeUrl ? (
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-zinc-600 transition hover:text-foreground dark:text-zinc-400"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            ) : null}
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">Follow</span>
            <div className="h-px w-10 bg-zinc-300 dark:bg-zinc-700" />
            {[
              { href: siteConfig.socialLinks.github, icon: FaGithub, label: "GitHub" },
              { href: siteConfig.socialLinks.linkedin, icon: FaLinkedin, label: "LinkedIn" },
              { href: siteConfig.socialLinks.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass rounded-full p-2.5 transition hover:-translate-y-1 hover:text-indigo-500"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative mx-auto aspect-square w-full max-w-sm md:max-w-md"
        >
          <motion.div
            className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-3xl dark:opacity-60"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <div className="glass-strong relative h-full w-full overflow-hidden rounded-[2rem] p-6">
            <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-500">utkarsh.tsx</span>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-300">
{`const me = {
  name: "${siteConfig.name}",
  role: "${siteConfig.shortRole}",
  edu: "B.Tech IT @ MUJ",
  focus: ["React", "Next.js", "AI"],
  location: "${siteConfig.location}",
  open_to_work: true,
};`}
              </pre>
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-green-500/15 px-2.5 py-1 font-medium text-green-600 dark:text-green-400">
                  ● Online
                </span>
                <span className="text-zinc-600 dark:text-zinc-500">{siteConfig.location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-zinc-500"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
