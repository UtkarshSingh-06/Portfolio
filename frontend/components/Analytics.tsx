'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return

    // Initialize Google Analytics
    if (!window.gtag) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', gaId)
    }
  }, [gaId])

  useEffect(() => {
    if (!gaId || !window.gtag) return
    window.gtag('config', gaId, {
      page_path: pathname,
    })
  }, [pathname, gaId])

  return null
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

