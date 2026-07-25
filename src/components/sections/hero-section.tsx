"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { scrollToSection } from "@/lib/utils";

const heroRoles = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Cloud & DevOps Engineer",
  "Open Source Contributor",
  "Competitive Programmer",
];

const EXPLORE = [
  { n: "01", label: "About", href: "#about", hint: "Who I am" },
  { n: "02", label: "Projects", href: "#projects", hint: "What I've shipped" },
  { n: "03", label: "Experience", href: "#experience", hint: "Where I've worked" },
  { n: "04", label: "Contact", href: "#contact", hint: "Let's talk" },
] as const;

/** Keep primary CTAs in sync with the explore rail anchors */
const PROJECTS_HREF = EXPLORE[1].href;
const CONTACT_HREF = EXPLORE[3].href;

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
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6"
    >
      <div className="bg-grid absolute inset-0 -z-20 opacity-30" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_40%_at_15%_15%,rgba(34,211,238,0.07),transparent_55%)]"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-cyan-500/20 bg-cyan-500/[0.05] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200/85 sm:text-[11px]"
        >
          <span>SDE Intern @ SEM-B</span>
          <span className="text-cyan-700">·</span>
          <span>Manipal University Jaipur</span>
          <span className="text-cyan-700">·</span>
          <span>2023–2027</span>
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-7 max-w-[16ch] font-display text-[clamp(2.6rem,8vw,5.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-zinc-50"
        >
          Building{" "}
          <span className="gradient-text">scalable</span> cloud-native systems.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-lg font-medium text-zinc-500 sm:text-xl"
        >
          a <span className="font-semibold text-zinc-100">{typed}</span>
          <span className="caret ml-0.5 inline-block h-[0.9em] align-[-0.12em]" />
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          <span className="font-semibold text-zinc-100">{siteConfig.name}</span>
          {" — "}
          shipping production systems with Docker, Kubernetes, Terraform, and
          Jenkins.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center gap-2.5"
        >
          <button
            type="button"
            onClick={() => scrollToSection(PROJECTS_HREF)}
            className="group inline-flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-950 transition hover:bg-cyan-300"
          >
            Explore Work
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(CONTACT_HREF)}
            className="inline-flex items-center rounded-md bg-zinc-100 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-950 transition hover:bg-white"
          >
            Get In Touch
          </button>
          <a
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-50"
          >
            <FaGithub className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href={siteConfig.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-300 transition hover:border-sky-500/50 hover:bg-sky-500/15 hover:text-sky-200"
          >
            <FaLinkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href={siteConfig.socialLinks.leetcode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-amber-300/90 transition hover:border-amber-500/50 hover:bg-amber-500/15 hover:text-amber-200"
          >
            <SiLeetcode className="h-3.5 w-3.5" />
            LeetCode
          </a>
        </motion.div>

        {/* Explore rail — navigation, not repeated stats/skills */}
        <motion.nav
          variants={fadeUp}
          aria-label="Explore portfolio"
          className="mt-14 border-t border-zinc-800/80 pt-8"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
            Continue exploring
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {EXPLORE.map((item, i) => (
              <li
                key={item.href}
                className={
                  i < EXPLORE.length - 1
                    ? "lg:border-r lg:border-zinc-800/80 lg:pr-5 lg:mr-5"
                    : ""
                }
              >
                <button
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="group flex w-full flex-col items-start text-left transition"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-500/70 transition group-hover:text-cyan-300">
                    {item.n}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-200 transition group-hover:text-zinc-50">
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 text-xs text-zinc-500">
                    {item.hint}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      </motion.div>
    </section>
  );
}
