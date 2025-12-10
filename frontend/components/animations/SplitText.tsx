'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SplitTextProps {
  children: string | ReactNode
  className?: string
  delay?: number
  duration?: number
}

// Helper function to extract text content from ReactNode
function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).trim()
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('').trim()
  }
  if (node && typeof node === 'object') {
    if ('props' in node && node.props) {
      return getTextContent(node.props.children)
    }
  }
  return ''
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // Extract text content from children
  const textContent = getTextContent(children)
  
  if (!textContent) {
    return <span className={className}>{children}</span>
  }
  
  const words = textContent.split(' ').filter(word => word.length > 0)

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                delay: delay + (wordIndex * 0.05 + charIndex * 0.02),
                duration: duration,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  )
}
