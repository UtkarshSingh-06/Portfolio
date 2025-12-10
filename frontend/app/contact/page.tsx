import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: true,
})

export const metadata: Metadata = {
  title: 'Contact | Utkarsh Singh',
  description: 'Get in touch with Utkarsh Singh for collaborations, opportunities, or just to say hello.',
}

export default function ContactPage() {
  return (
    <div className="container-custom section-padding">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Get In Touch
      </h1>
      <Contact />
    </div>
  )
}

