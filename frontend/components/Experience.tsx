'use client'

import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import Card from './Card'

const experiences = [
  {
    title: 'Joint Head of Curations',
    company: 'IEEE RAS, Manipal University Jaipur',
    location: 'Jaipur, India',
    period: 'Sept 2024 – May 2025',
    description: [
      'Led curation efforts for technical events and workshops',
      'Collaborated with cross-functional teams to organize large-scale events',
      'Managed content strategy and technical documentation',
    ],
  },
  {
    title: 'Head of Sponsorships',
    company: 'CampusAdda, Manipal University Jaipur',
    location: 'Jaipur, India',
    period: 'Sept 2024 – May 2025',
    description: [
      'Managed sponsorship relationships and partnerships',
      'Developed sponsorship proposals and presentations',
      'Coordinated with external stakeholders and vendors',
    ],
  },
]

export default function Experience() {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary-platinum via-secondary-50 to-primary-50 dark:from-accent-moss dark:via-accent-600 dark:to-accent-700">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient-experience">
            Experience
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-accent-moss dark:text-secondary-platinum mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xl text-primary-orange dark:text-secondary-platinum mb-2">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-accent-600 dark:text-secondary-300">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-accent-moss dark:text-secondary-platinum">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

