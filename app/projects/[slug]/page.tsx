import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects'
import ProjectDetail from '@/components/ProjectDetail'
import Navbar from '@/components/Navbar'

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Utkarsh Singh`,
    description: project.shortDescription,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProjectDetail project={project} />
    </main>
  )
}
