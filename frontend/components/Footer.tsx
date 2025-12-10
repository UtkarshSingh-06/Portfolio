import Link from 'next/link'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/UtkarshSingh-06',
    icon: FiGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/utkarsh-singh06',
    icon: FiLinkedin,
  },
  {
    name: 'Email',
    href: 'mailto:utkarsh.yash77@gmail.com',
    icon: FiMail,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Utkarsh Singh. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-moss dark:text-secondary-platinum hover:text-primary-orange dark:hover:text-secondary-platinum transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

