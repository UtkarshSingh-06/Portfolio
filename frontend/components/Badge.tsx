import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  default:
    'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  primary: 'bg-primary-orange/10 text-primary-orange dark:text-secondary-platinum',
  success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  warning:
    'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  danger: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

