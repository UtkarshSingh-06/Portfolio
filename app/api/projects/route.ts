import { NextResponse } from 'next/server'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'

// GET /api/projects - Get all projects
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const project = getProjectBySlug(slug)
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(project)
  }

  const projects = getAllProjects()
  return NextResponse.json(projects)
}
