'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TextCursorProps {
  text: string
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  loop?: boolean
}

export default function TextCursor({
  text,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  showCursor = true,
  loop = true,
}: TextCursorProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!text) return

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => {
            setIsDeleting(true)
          }, pauseDuration)
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setDisplayedText(text.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        } else {
          // Finished deleting
          setIsDeleting(false)
          if (!loop) {
            setDisplayedText(text)
            setCurrentIndex(text.length)
          }
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration, loop])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block ml-1"
          >
            |
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  )
}

