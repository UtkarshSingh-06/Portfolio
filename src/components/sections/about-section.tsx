"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { aboutHighlights, aboutStats, education } from "@/data/site";
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
        description="I'm a 3rd-year Information Technology student at Manipal University Jaipur, building fast, scalable full-stack applications and real-world AI systems."
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
            I&apos;m a 3rd-year Information Technology student at Manipal University Jaipur,
            building fast, scalable full-stack applications and real-world AI systems.
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            My focus is on backend engineering and cloud-native development — working with
            Node.js, FastAPI, and modern DevOps tools like Docker, Kubernetes, and Terraform
            to design and deploy production-ready systems on AWS.
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I&apos;ve made 1300+ commits on GitHub and solved 200+ problems on LeetCode,
            consistently improving my problem-solving and engineering skills.
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            I enjoy solving complex problems, designing scalable architectures, and
            continuously exploring AI engineering, system design, and high-performance
            distributed systems.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-wrap gap-3 pt-1"
          >
            {["Open to Internships", "Available for Projects"].map((item) => (
              <motion.span
                key={item}
                variants={fadeUp}
                className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300"
              >
                {item}
              </motion.span>
            ))}
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
      </div>
    </section>
  );
}
