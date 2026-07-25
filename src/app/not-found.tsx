import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you requested does not exist on Utkarsh Singh’s portfolio.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-4 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-zinc-400">
        That URL is not part of this portfolio. Head home or browse projects.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
        >
          Back to home
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold"
        >
          View projects
        </Link>
      </div>
    </main>
  );
}
