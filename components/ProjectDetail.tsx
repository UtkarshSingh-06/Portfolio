'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/lib/projects'

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
  'Express': '🚂',
  'Stripe': '💳',
  'DynamoDB': '📊',
  'Lambda': 'λ',
  'CloudWatch': '👁️',
  'OpenCV': '👁',
  'NumPy': '🔢',
  'JWT': '🔐',
  'Prometheus': '📈',
  'Grafana': '📊',
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${
              project.statusColor === 'green' ? 'bg-green-500' : 
              project.statusColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              project.statusColor === 'green' ? 'text-green-600 dark:text-green-400' : 
              project.statusColor === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {project.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <span className="font-medium">Timeline:</span> {project.timeline}
            </div>
            <div>
              <span className="font-medium">Role:</span> {project.role}
            </div>
            <div>
              <span className="font-medium">Team:</span> {project.team}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Live Demo
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Source Code
              </Link>
            )}
          </div>

          {/* Technology Stack */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                >
                  {techIcons[tech] && (
                    <span className="text-base">{techIcons[tech]}</span>
                  )}
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
      </div>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Overview */}
          {project.overview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {project.overview}
              </p>
            </motion.div>
          )}

          {/* Full Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {project.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </motion.div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Key Challenges */}
          {project.keyChallenges && project.keyChallenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Key Challenges
              </h2>
              <ul className="space-y-3">
                {project.keyChallenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-orange-500 dark:text-orange-400 mt-1">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Technical Implementation */}
          {project.technicalImplementation && project.technicalImplementation.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Technical Implementation
              </h2>
              <ul className="space-y-3">
                {project.technicalImplementation.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Key Learnings */}
          {project.keyLearnings && project.keyLearnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Key Learnings
              </h2>
              <ul className="space-y-3">
                {project.keyLearnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Impact */}
          {project.impact && project.impact.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Impact
              </h2>
              <ul className="space-y-3">
                {project.impact.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </section>

      {/* Back to Projects */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Projects</span>
        </Link>
      </div>
    </div>
  )
}
