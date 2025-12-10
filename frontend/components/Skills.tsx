'use client'

import { motion } from 'framer-motion'
import Badge from './Badge'

const skillCategories = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
  'Frameworks & Libraries': [
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'Tailwind CSS',
    'Framer Motion',
  ],
  'Web Dev': ['HTML5', 'CSS3', 'REST APIs', 'GraphQL', 'WebSocket'],
  Tools: [
    'Git',
    'Docker',
    'AWS',
    'MongoDB',
    'PostgreSQL',
    'VS Code',
    'Figma',
  ],
  'Soft Skills': [
    'Leadership',
    'Team Collaboration',
    'Problem Solving',
    'Communication',
    'Project Management',
  ],
}

export default function Skills() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-platinum to-secondary-100 dark:from-accent-700 dark:via-accent-600 dark:to-accent-moss">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient-skills">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-effect rounded-lg p-6 card-hover"
              >
                <h3 className="text-xl font-semibold mb-4 text-accent-moss dark:text-secondary-platinum">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

