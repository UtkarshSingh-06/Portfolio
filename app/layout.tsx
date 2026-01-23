import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                const theme = storedTheme || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
