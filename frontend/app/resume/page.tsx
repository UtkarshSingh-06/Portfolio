import { Metadata } from 'next'
import Link from 'next/link'
import { FiDownload } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Resume | Utkarsh Singh',
  description: 'Download Utkarsh Singh\'s resume in PDF format.',
}

export default function ResumePage() {
  return (
    <div className="container-custom section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Resume
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Download my resume to learn more about my experience and skills.
        </p>
        <Link
          href="/resume.pdf"
          download
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiDownload className="w-5 h-5" />
          Download Resume (PDF)
        </Link>
        <div className="mt-12">
          <iframe
            src="/resume.pdf"
            className="w-full h-screen border border-gray-200 dark:border-gray-800 rounded-lg"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  )
}

