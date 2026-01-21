'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Utkarsh Singh
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#experience"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
