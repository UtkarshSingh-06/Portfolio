"use client";

import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { skills } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillsMarquee } from "@/components/shared/skills-marquee";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

type IconComponent = React.ComponentType<{ className?: string }>;

const iconMap: Record<string, IconComponent> = {
  ...(FaIcons as unknown as Record<string, IconComponent>),
  ...(SiIcons as unknown as Record<string, IconComponent>),
};

const categories: { id: string; label: string; category: "frontend" | "backend" | "tools" }[] = [
  { id: "frontend", label: "Frontend", category: "frontend" },
  { id: "backend", label: "Backend", category: "backend" },
  { id: "tools", label: "Tools & Design", category: "tools" },
];

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="Skills & Tech Stack"
        subtitle="Capabilities"
        description="The tools and technologies I use daily to craft modern web experiences."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => {
          const items = skills.filter((s) => s.category === cat.category);
          if (items.length === 0) return null;
          return (
            <motion.div
              key={cat.id}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="glass rounded-2xl p-6"
            >
              <motion.h3
                variants={fadeUp}
                className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500"
              >
                {cat.label}
              </motion.h3>
              <div className="space-y-4">
                {items.map((skill) => {
                  const Icon = iconMap[skill.icon] ?? FaIcons.FaCode;
                  return (
                    <motion.div key={skill.name} variants={fadeUp}>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-5 w-5 text-indigo-500" />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-14">
        <SkillsMarquee />
      </div>
    </section>
  );
}
