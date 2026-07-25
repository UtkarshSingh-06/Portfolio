import { projects, type Project } from "@/data/site";

export function getProjectPath(slug: string): string {
  return `/projects/${slug}`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
