'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
        >
          About Me
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-gray-700 dark:text-gray-300"
          >
            <p className="text-lg leading-relaxed">
              I'm a passionate Full Stack Developer and Cloud Enthusiast with a strong foundation in building 
              scalable web applications and intelligent AI solutions. I love turning complex problems into 
              simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-lg leading-relaxed">
              My expertise spans across modern web technologies including React, Next.js, Node.js, and Python, 
              with a special interest in AI and Deep Learning. I'm always eager to learn new technologies and 
              tackle challenging projects that push the boundaries of what's possible.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring cloud architectures, contributing to open-source 
              projects, or diving deep into the latest AI research papers.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center text-6xl font-bold text-white">
              US
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
