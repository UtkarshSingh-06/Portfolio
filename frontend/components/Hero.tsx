'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiDownload, FiMail, FiArrowDown } from 'react-icons/fi'
import SplitText from './animations/SplitText'
import BlurText from './animations/BlurText'
import TextCursor from './animations/TextCursor'

const roles = [
  'Software Developer',
  'AI & Cloud Enthusiast',
  'Web & App Developer',
  'Full-Stack Engineer',
]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 4000)

    return () => clearTimeout(timer)
  }, [currentRole])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-platinum via-secondary-50 to-secondary-100 dark:from-accent-moss dark:via-accent-600 dark:to-accent-700">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-orange/10 dark:bg-primary-orange/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-moss/10 dark:bg-accent-moss/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-accent-moss dark:text-secondary-platinum"
          >
            <SplitText delay={0.3}>
              Hi, I'm
            </SplitText>
            {' '}
            <span className="text-gradient-hero">
              <SplitText delay={0.5}>
                Utkarsh Singh
              </SplitText>
            </span>
            {' '}
            <span className="inline-block animate-wave">👋</span>
          </motion.h1>

          <BlurText
            delay={0.6}
            className="text-2xl md:text-4xl font-semibold mb-4 text-accent-moss dark:text-secondary-platinum min-h-[60px]"
          >
            <TextCursor
              text={roles[currentRole]}
              typingSpeed={100}
              deletingSpeed={50}
              pauseDuration={2000}
              loop={true}
            />
          </BlurText>

          <BlurText
            delay={0.8}
            className="text-lg md:text-xl text-accent-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto"
          >
            Building modern web apps, exploring AI, and deploying cloud-native
            projects.
          </BlurText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/resume.pdf"
              download
              className="btn-primary inline-flex items-center gap-2"
            >
              <FiDownload className="w-5 h-5" />
              Download Resume
            </Link>
            <button
              onClick={scrollToContact}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <FiMail className="w-5 h-5" />
              Contact Me
            </button>
            <Link
              href="/projects"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View Projects
              <FiArrowDown className="w-5 h-5 rotate-[-90deg]" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => {
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="animate-bounce text-accent-moss dark:text-secondary-platinum"
            aria-label="Scroll down"
          >
            <FiArrowDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          display: inline-block;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  )
}

