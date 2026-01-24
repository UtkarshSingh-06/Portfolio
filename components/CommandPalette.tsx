'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/theme-provider'

interface Command {
  id: string
  name: string
  description: string
  icon: string
  action: () => void
  shortcut?: string
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const commands: Command[] = [
    {
      id: 'home',
      name: 'Home',
      description: 'Go to home page',
      icon: '🏠',
      action: () => {
        router.push('/')
        setIsOpen(false)
      },
    },
    {
      id: 'resume',
      name: 'Resume',
      description: 'View my resume',
      icon: '📄',
      action: () => {
        router.push('/resume')
        setIsOpen(false)
      },
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'View all projects',
      icon: '💼',
      action: () => {
        router.push('/#projects')
        setIsOpen(false)
      },
    },
    {
      id: 'about',
      name: 'About',
      description: 'Learn more about me',
      icon: '👤',
      action: () => {
        router.push('/#about')
        setIsOpen(false)
      },
    },
    {
      id: 'skills',
      name: 'Skills',
      description: 'View my skills and technologies',
      icon: '🛠️',
      action: () => {
        router.push('/#skills')
        setIsOpen(false)
      },
    },
    {
      id: 'experience',
      name: 'Experience',
      description: 'View my work experience',
      icon: '💼',
      action: () => {
        router.push('/#experience')
        setIsOpen(false)
      },
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Get in touch',
      icon: '📧',
      action: () => {
        router.push('/#contact')
        setIsOpen(false)
      },
    },
    {
      id: 'theme',
      name: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: theme === 'light' ? '🌙' : '☀️',
      action: () => {
        toggleTheme()
        setIsOpen(false)
      },
      shortcut: 'T',
    },
  ]

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(search.toLowerCase()) ||
    command.description.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setSearch('')
      }
    }

    const handleOpenCommandPalette = () => {
      setIsOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('openCommandPalette', handleOpenCommandPalette)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('openCommandPalette', handleOpenCommandPalette)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSelect = (command: Command) => {
    command.action()
    setSearch('')
    setSelectedIndex(0)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          handleSelect(filteredCommands[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      onClick={() => {
        setIsOpen(false)
        setSearch('')
      }}
    >
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false)
          setSearch('')
        }}
      />
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-amber-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-amber-200 dark:border-gray-700">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search for a command to run..."
            className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
            autoFocus
          />
          <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            <span>Ctrl</span>
            <span>K</span>
          </kbd>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  onClick={() => handleSelect(command)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-amber-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="text-xl">{command.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{command.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {command.description}
                    </div>
                  </div>
                  {command.shortcut && (
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      {command.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
