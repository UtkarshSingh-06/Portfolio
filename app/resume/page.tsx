'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import CommandPalette from '@/components/CommandPalette'
import { motion } from 'framer-motion'

export default function ResumePage() {
  useEffect(() => {
    document.title = 'Resume - Utkarsh Singh'
  }, [])

  return (
    <>
      <CommandPalette />
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-24 px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Resume
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                My resume.
              </p>

              {/* Resume Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700 p-8 shadow-sm">
                <div className="space-y-8">
                  {/* Resume Embed/Viewer */}
                  <div className="w-full aspect-[8.5/11] bg-gray-50 dark:bg-gray-900 rounded-lg border border-amber-200 dark:border-gray-700 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Resume PDF
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          Click below to view or download
                        </p>
                      </div>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-gray-100 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Resume
                      </a>
                    </div>
                  </div>

                  {/* Alternative: Iframe embed (uncomment if you have a resume PDF) */}
                  {/* 
                  <iframe
                    src="/resume.pdf"
                    className="w-full aspect-[8.5/11] border border-amber-200 dark:border-gray-700 rounded-lg"
                    title="Resume"
                  />
                  */}
                </div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 text-center text-sm text-gray-500 dark:text-gray-500"
              >
                <p>
                  Design & Developed by <strong className="text-gray-700 dark:text-gray-300">Utkarsh Singh</strong>
                </p>
                <p className="mt-1">© {new Date().getFullYear()}. All rights reserved.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
