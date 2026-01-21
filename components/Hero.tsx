'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-gray-100"
        >
          Utkarsh Singh
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium mb-4 text-gray-600 dark:text-gray-400"
        >
          Full Stack Developer & Cloud Enthusiast
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-500 dark:text-gray-500 mb-12 max-w-2xl mx-auto"
        >
          Building scalable web apps and intelligent AI solutions
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/resume.pdf"
            target="_blank"
            className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200"
          >
            Resume
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
          >
            Contact
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
