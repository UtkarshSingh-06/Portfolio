import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { projects } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProjectPath } from "@/lib/seo/projects";
import { projectsIndexJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected full-stack, AI, cloud, and systems engineering projects by Utkarsh Singh — FraudShield AI, NetScope, CQC Framework, and more.",
  path: "/projects",
  keywords: [
    "Utkarsh Singh projects",
    "Full-Stack portfolio projects",
    "AI engineering projects",
    "FraudShield AI",
    "NetScope",
    "FastAPI projects",
  ],
});

export default function ProjectsIndexPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <JsonLd data={projectsIndexJsonLd()} />
      <Navbar />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects" },
          ]}
        />

        <header className="mb-12 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Featured Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Selected Projects
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Crawlable case pages for each featured build — architecture notes,
            stack, and links to source. Also listed on the{" "}
            <Link href="/#projects" className="text-cyan-400 underline-offset-4 hover:underline">
              homepage projects section
            </Link>
            .
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <article className="glass group flex h-full flex-col rounded-2xl p-6 transition hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="mb-3 flex justify-end">
                  <ArrowUpRight
                    className="h-5 w-5 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:text-indigo-400"
                    aria-hidden
                  />
                </div>
                <h2 className="text-xl font-semibold leading-snug">
                  <Link
                    href={getProjectPath(project.slug)}
                    className="hover:text-indigo-300"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={getProjectPath(project.slug)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    View project details
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200"
                  >
                    <FaGithub className="h-4 w-4" aria-hidden />
                    Source
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to homepage
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
