"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { aboutHighlights, aboutStats, education, siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

const highlightIcons = [Rocket, Sparkles, Award, GraduationCap];

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="A bit about me"
        subtitle="Who I Am"
        description="I'm a B.Tech IT student at Manipal University Jaipur who loves building full-stack products and AI-powered systems. I enjoy turning complex problems into clean, scalable solutions."
      />

      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-6"
        >
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Based in{" "}
            <span className="font-semibold text-foreground">{siteConfig.location}</span>,
            I&apos;ve led development at CampusAdda (a production app with{" "}
            <span className="font-semibold text-foreground">10K+ daily active users</span>),
            contributed to open source through{" "}
            <span className="font-semibold text-foreground">GSSoC &apos;25</span>, and built
            AI-powered systems for fraud detection and automated QA.
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I work across the stack — from React/Next.js frontends to FastAPI and Node
            backends — and ship with AWS, Docker, and CI/CD in mind. Currently exploring AI
            engineering, system design, and open source.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4"
          >
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass rounded-xl p-4"
              >
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass flex items-start gap-4 rounded-xl p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 text-indigo-500 dark:text-indigo-300">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{education.degree}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {education.school} &middot; {education.period}
              </p>
              {education.honors ? (
                <p className="text-xs text-zinc-500">{education.honors}</p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-3"
        >
          {aboutHighlights.map((item, idx) => {
            const Icon = highlightIcons[idx % highlightIcons.length];
            return (
              <motion.div
                key={item}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass flex items-start gap-4 rounded-xl p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 text-indigo-500 dark:text-indigo-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{item}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
