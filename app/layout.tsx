import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Utkarsh Singh - Full Stack Developer & Cloud Enthusiast',
  description: 'Portfolio of Utkarsh Singh - Building scalable web apps and intelligent AI solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
