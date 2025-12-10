import { Metadata } from 'next'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'

export const metadata: Metadata = {
  title: 'About | Utkarsh Singh',
  description: 'Learn more about Utkarsh Singh - Software Developer, AI & Cloud enthusiast.',
}

export default function AboutPage() {
  return (
    <>
      <About />
      <Skills />
      <Experience />
    </>
  )
}

