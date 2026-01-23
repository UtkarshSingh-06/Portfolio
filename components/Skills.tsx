'use client'

import { motion } from 'framer-motion'

const skills = [
  // Languages
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'C', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'HTML', category: 'Languages' },
  { name: 'CSS', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  // MERN Stack
  { name: 'React', category: 'MERN Stack' },
  { name: 'Next.js', category: 'MERN Stack' },
  { name: 'JavaScript', category: 'MERN Stack' },
  { name: 'TypeScript', category: 'MERN Stack' },
  { name: 'Node.js', category: 'MERN Stack' },
  { name: 'Express.js', category: 'MERN Stack' },
  { name: 'MongoDB', category: 'MERN Stack' },
  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps' },
  { name: 'Microsoft Azure', category: 'Cloud & DevOps' },
  { name: 'Kubernetes', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'Ansible', category: 'Cloud & DevOps' },
  { name: 'Terraform', category: 'Cloud & DevOps' },
  { name: 'Linux', category: 'Cloud & DevOps' },
  { name: 'CI/CD', category: 'Cloud & DevOps' },
  { name: 'Deployment', category: 'Cloud & DevOps' },
  // Databases
  { name: 'MongoDB', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'MySQL', category: 'Databases' },
  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
]

export default function Skills() {
  const categories = Array.from(new Set(skills.map(skill => skill.category)))
  
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-amber-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-amber-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium border border-amber-200 dark:border-gray-600"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
