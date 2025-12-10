import { Metadata } from 'next'
import Projects from '@/components/Projects'

export const metadata: Metadata = {
  title: 'Projects | Utkarsh Singh',
  description: 'Explore my portfolio of web applications, AI projects, and cloud-native solutions.',
}

export default function ProjectsPage() {
  return (
    <div className="container-custom section-padding">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        My Projects
      </h1>
      <Projects />
    </div>
  )
}

