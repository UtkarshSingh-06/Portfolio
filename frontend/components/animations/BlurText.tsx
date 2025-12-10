'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BlurTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function BlurText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
}: BlurTextProps) {
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

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={
        isVisible
          ? {
              filter: 'blur(0px)',
              opacity: 1,
            }
          : { filter: 'blur(10px)', opacity: 0 }
      }
      transition={{
        delay: delay,
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
