"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projectFilters, projects } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        title="Selected Projects"
        subtitle="Featured Work"
        description="A selection of recent work across AI, full-stack, and systems engineering. Each project blends measurable impact with clean architecture."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "text-white"
                  : "glass text-zinc-600 hover:text-foreground dark:text-zinc-400"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : null}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group glass relative overflow-hidden rounded-2xl p-1 transition hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent opacity-60 transition group-hover:opacity-90" />
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                {project.year ? (
                  <span className="absolute left-3 top-3 z-20 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-900 shadow">
                    {project.year}
                  </span>
                ) : null}
                <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} source on GitHub`}
                    className="rounded-full bg-white/90 p-2 text-zinc-900 shadow-lg transition hover:scale-110"
                  >
                    <FaGithub className="h-4 w-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} live site`}
                    className="rounded-full bg-white/90 p-2 text-zinc-900 shadow-lg transition hover:scale-110"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <ArrowUpRight className="h-5 w-5 translate-y-0 text-zinc-400 transition group-hover:-translate-y-1 group-hover:text-indigo-500" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/70 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 text-center text-zinc-500"
        >
          No projects match this filter yet.
        </motion.p>
      ) : null}
    </section>
  );
}
