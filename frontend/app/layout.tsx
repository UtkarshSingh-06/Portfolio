import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@/components/Analytics'
import CursorInteraction from '@/components/CursorInteraction'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Utkarsh Singh | Software Developer & AI Enthusiast',
  description: 'Personal portfolio of Utkarsh Singh - Software Developer, AI & Cloud enthusiast. Building modern web apps, exploring AI, and deploying cloud-native projects.',
  keywords: ['Utkarsh Singh', 'Software Developer', 'AI Enthusiast', 'Web Developer', 'Portfolio'],
  authors: [{ name: 'Utkarsh Singh' }],
  creator: 'Utkarsh Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://utkarshsingh.dev',
    title: 'Utkarsh Singh | Software Developer & AI Enthusiast',
    description: 'Personal portfolio of Utkarsh Singh - Software Developer, AI & Cloud enthusiast.',
    siteName: 'Utkarsh Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utkarsh Singh | Software Developer & AI Enthusiast',
    description: 'Personal portfolio of Utkarsh Singh - Software Developer, AI & Cloud enthusiast.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-secondary-platinum dark:bg-accent-moss transition-colors duration-300 relative">
            <CursorInteraction />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-black focus:text-white focus:rounded-md"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="relative z-10">{children}</main>
            <Footer />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

