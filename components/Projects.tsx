'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

// Technology icons mapping
const techIcons: { [key: string]: string } = {
  'React': '⚛️',
  'Next.js': '▲',
  'TypeScript': 'TS',
  'Node.js': '🟢',
  'Python': '🐍',
  'TensorFlow': '🧠',
  'PyTorch': '🔥',
  'AWS': '☁️',
  'MongoDB': '🍃',
  'PostgreSQL': '🐘',
  'Docker': '🐳',
  'Kubernetes': '☸️',
  'Socket.io': '🔌',
  'Redis': '📦',
  'FastAPI': '⚡',
  'Nginx': '🌐',
}

// Get projects from the data file
const projects = getAllProjects()

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            My projects and work across different technologies and domains.
          </p>
          <div className="h-px bg-gray-200 dark:bg-gray-800 mb-6"></div>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            All Projects ({projects.length} projects)
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-amber-200 dark:border-gray-700 overflow-hidden hover:border-amber-300 dark:hover:border-gray-600 transition-all duration-300 h-full flex flex-col cursor-pointer shadow-sm hover:shadow-md">
                {/* Project Screenshot/Image */}
                <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                  {/* Placeholder for actual screenshot - replace with Image component when you have images */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2 opacity-30">
                        {project.technologies[0] && techIcons[project.technologies[0]]}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-600">Project Screenshot</p>
                    </div>
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title with Link Icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-gray-400 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed flex-grow">
                    {project.shortDescription}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2.5">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300 border border-amber-200 dark:border-gray-600"
                        >
                          {techIcons[tech] && (
                            <span className="text-xs leading-none">{techIcons[tech]}</span>
                          )}
                          <span className="font-medium">{tech}</span>
                        </div>
                      ))}
                      {project.technologies.length > 3 && (
                        <div className="flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300 font-medium">
                          +{project.technologies.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status and View Details */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200 dark:border-gray-700 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        project.statusColor === 'green' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-xs font-medium ${
                        project.statusColor === 'green' ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
