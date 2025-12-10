'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import Card from './Card'
import Badge from './Badge'
import { projectsApi } from '@/lib/api'

interface Project {
  _id: string
  title: string
  description: string
  summary: string
  techStack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

const defaultProjects: Project[] = [
  {
    _id: '1',
    title: 'Stock Market Forecasting & Visualization Web App',
    description:
      'A comprehensive web application for stock market analysis and forecasting using machine learning algorithms.',
    summary:
      'Built a full-stack application that predicts stock prices using time series analysis and provides interactive visualizations. Features include real-time data fetching, historical analysis, and predictive modeling.',
    techStack: ['Python', 'React', 'Node.js', 'TensorFlow', 'MongoDB', 'Chart.js'],
    image: '/images/stock-app.jpg',
    githubUrl: 'https://github.com/UtkarshSingh-06/stock-forecasting',
    demoUrl: 'https://stock-forecast-demo.vercel.app',
    featured: true,
  },
  {
    _id: '2',
    title: 'Simple Paintball Plugin',
    description:
      'A Minecraft plugin that adds paintball functionality with custom game modes and team management.',
    summary:
      'Developed a feature-rich Minecraft plugin using Java and Bukkit API. Includes custom game mechanics, scoreboard integration, and configurable settings.',
    techStack: ['Java', 'Bukkit API', 'Maven', 'MySQL'],
    image: '/images/paintball-plugin.jpg',
    githubUrl: 'https://github.com/UtkarshSingh-06/paintball-plugin',
    featured: true,
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await projectsApi.getAll()
        if (response.data && response.data.length > 0) {
          setProjects(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        // Use default projects on error
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-accent-50 via-secondary-platinum to-primary-50 dark:from-accent-700 dark:via-accent-600 dark:to-accent-moss">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gradient-projects">
            Featured Projects
          </h2>
          <p className="text-center text-accent-600 dark:text-secondary-300 mb-12 max-w-2xl mx-auto">
            A selection of projects showcasing my skills in web development, AI,
            and cloud technologies.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange dark:border-secondary-platinum"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      {project.image && (
                        <div className="relative w-full h-48 bg-secondary-200 dark:bg-accent-600">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold mb-2 text-accent-moss dark:text-secondary-platinum">
                          {project.title}
                        </h3>
                        <p className="text-accent-600 dark:text-secondary-300 mb-4 flex-1">
                          {project.summary || project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="primary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-4 mt-auto">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-accent-moss dark:text-secondary-platinum hover:text-primary-orange dark:hover:text-secondary-platinum transition-colors"
                            >
                              <FiGithub className="w-5 h-5" />
                              Code
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-accent-moss dark:text-secondary-platinum hover:text-primary-orange dark:hover:text-secondary-platinum transition-colors"
                            >
                              <FiExternalLink className="w-5 h-5" />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

