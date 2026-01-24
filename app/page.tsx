'use client'

import Navbar from '@/components/Navbar'
import CommandPalette from '@/components/CommandPalette'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import GitHubActivity from '@/components/GitHubActivity'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <CommandPalette />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubActivity />
        <Contact />
      </main>
    </>
  )
}
