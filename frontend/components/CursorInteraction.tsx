'use client'

import { useEffect, useState } from 'react'
import { useMousePosition } from '@/lib/hooks/useMousePosition'

export default function CursorInteraction() {
  const { x, y } = useMousePosition()
  const [backgroundGradient, setBackgroundGradient] = useState('')

  useEffect(() => {
    if (!x || !y) return
    
    // Calculate gradient position based on cursor
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    
    // Normalize cursor position to -1 to 1 range
    const normalizedX = (x - centerX) / centerX
    const normalizedY = (y - centerY) / centerY
    
    // Color palette: Persian Orange (#CF8852), Platinum (#E8E7E3), Dark Moss (#525333)
    // Convert hex to RGB
    const persianOrange = { r: 207, g: 136, b: 82 }
    const platinum = { r: 232, g: 231, b: 227 }
    const darkMoss = { r: 82, g: 83, b: 51 }
    
    // Calculate color based on cursor position
    // More towards center = more moss, towards edges = more orange/platinum
    const distanceFromCenter = Math.sqrt(normalizedX ** 2 + normalizedY ** 2)
    const angle = Math.atan2(normalizedY, normalizedX)
    
    // Blend colors based on position
    let r, g, b
    
    if (distanceFromCenter < 0.3) {
      // Center area - use dark moss
      r = darkMoss.r
      g = darkMoss.g
      b = darkMoss.b
    } else if (distanceFromCenter < 0.7) {
      // Middle area - blend moss and orange
      const blend = (distanceFromCenter - 0.3) / 0.4
      r = Math.round(darkMoss.r + (persianOrange.r - darkMoss.r) * blend)
      g = Math.round(darkMoss.g + (persianOrange.g - darkMoss.g) * blend)
      b = Math.round(darkMoss.b + (persianOrange.b - darkMoss.b) * blend)
    } else {
      // Outer area - blend orange and platinum
      const blend = (distanceFromCenter - 0.7) / 0.3
      r = Math.round(persianOrange.r + (platinum.r - persianOrange.r) * blend)
      g = Math.round(persianOrange.g + (platinum.g - persianOrange.g) * blend)
      b = Math.round(persianOrange.b + (platinum.b - persianOrange.b) * blend)
    }
    
    // Create radial gradient from cursor position
    const gradientX = x
    const gradientY = y
    
    // Create smooth radial gradient effect
    setBackgroundGradient(
      `radial-gradient(circle 1000px at ${gradientX}px ${gradientY}px, rgba(${r}, ${g}, ${b}, 0.35) 0%, rgba(${r}, ${g}, ${b}, 0.15) 30%, rgba(${darkMoss.r}, ${darkMoss.g}, ${darkMoss.b}, 0.08) 60%, transparent 100%)`
    )
  }, [x, y])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      style={{
        background: backgroundGradient,
        opacity: x && y ? 1 : 0,
      }}
      aria-hidden="true"
    />
  )
}
