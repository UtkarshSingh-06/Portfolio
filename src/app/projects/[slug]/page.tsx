import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { projects } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectPath,
} from "@/lib/seo/projects";
import { projectPageJsonLd } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "The requested project could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.description,
    path: getProjectPath(project.slug),
    image: project.image,
    imageAlt: project.imageAlt,
    type: "article",
    keywords: [
      project.title,
      "Utkarsh Singh",
      ...project.tags,
      "portfolio project",
    ],
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <JsonLd data={projectPageJsonLd(project)} />
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.title },
          ]}
        />

        <article>
          <header className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                <FaGithub className="h-4 w-4" aria-hidden />
                View source on GitHub
              </a>
              {project.liveUrl !== project.githubUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold transition hover:border-cyan-500 hover:text-cyan-400"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Live demo
                </a>
              ) : null}
            </div>
          </header>

          <figure className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
              unoptimized={project.image.endsWith(".svg")}
            />
            <figcaption className="sr-only">{project.imageAlt}</figcaption>
          </figure>

          <section className="mt-10 space-y-4" aria-labelledby="stack-heading">
            <h2 id="stack-heading" className="text-2xl font-semibold">
              Tech stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 space-y-4" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-semibold">
              Overview
            </h2>
            <p className="leading-relaxed text-zinc-400">
              {project.seoDescription ?? project.description}
            </p>
            <p className="leading-relaxed text-zinc-400">
              This project is part of{" "}
              <Link href="/" className="text-cyan-400 underline-offset-4 hover:underline">
                Utkarsh Singh&apos;s portfolio
              </Link>
              . Explore more builds on the{" "}
              <Link
                href="/projects"
                className="text-cyan-400 underline-offset-4 hover:underline"
              >
                projects index
              </Link>{" "}
              or jump back to the{" "}
              <Link
                href="/#projects"
                className="text-cyan-400 underline-offset-4 hover:underline"
              >
                featured work section
              </Link>
              .
            </p>
          </section>
        </article>

        {related.length > 0 ? (
          <aside className="mt-16 border-t border-zinc-800 pt-10" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-6 text-2xl font-semibold">
              Related projects
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={getProjectPath(item.slug)}
                    className="glass block rounded-xl p-4 transition hover:border-cyan-500/40"
                  >
                    <span className="text-sm font-semibold leading-snug text-zinc-100">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <p className="mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All projects
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
