'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Joint Head of Curations',
    company: 'IEEE RAS, Manipal University Jaipur',
    period: 'Sept 2024 – May 2025',
    location: 'Jaipur, India',
    description: 'Led curation efforts for technical events and workshops, collaborating with cross-functional teams to organize large-scale events and manage content strategy.',
    achievements: [
      'Led curation efforts for technical events and workshops',
      'Collaborated with cross-functional teams to organize large-scale events',
      'Managed content strategy and technical documentation'
    ]
  },
  {
    title: 'Head of Sponsorships',
    company: 'CampusAdda, Manipal University Jaipur',
    period: 'Sept 2024 – May 2025',
    location: 'Jaipur, India',
    description: 'Managed sponsorship relationships and partnerships, developing proposals and coordinating with external stakeholders to secure funding for events.',
    achievements: [
      'Managed sponsorship relationships and partnerships',
      'Developed sponsorship proposals and presentations',
      'Coordinated with external stakeholders and vendors'
    ]
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
        >
          Experience
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-4 h-4 bg-gray-900 dark:bg-gray-100 rounded-full border-4 border-white dark:border-gray-900"></div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {exp.title}
                    </h3>
                    <div className="flex flex-col md:items-end gap-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {exp.description}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
