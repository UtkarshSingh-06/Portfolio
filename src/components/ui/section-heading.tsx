"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function SectionHeading({
  title,
  subtitle,
  description,
  align = "left",
}: {
  title: string;
  subtitle: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-14 max-w-3xl space-y-3 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        {align === "center" ? (
          <span className="mx-auto h-px w-8 bg-gradient-to-r from-indigo-500 to-cyan-400" />
        ) : null}
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-300">
          {subtitle}
        </span>
        {align === "center" ? (
          <span className="mx-auto h-px w-8 bg-gradient-to-r from-cyan-400 to-indigo-500" />
        ) : null}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="text-4xl font-bold leading-tight md:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
