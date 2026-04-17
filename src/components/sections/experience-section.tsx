"use client";

import { motion } from "framer-motion";
import { Award, Briefcase } from "lucide-react";
import { certifications, experiences } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function ExperienceSection() {
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

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16"
      >
        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
            <Award className="h-4 w-4" />
          </span>
          <h3 className="text-2xl font-bold">Certifications</h3>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-2">
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass flex items-start gap-3 rounded-xl p-4"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                <Award className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium leading-snug text-foreground">{cert.title}</p>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
