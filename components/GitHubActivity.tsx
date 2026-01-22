'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Contribution {
  date: string
  count: number
  color: string
}

interface GitHubStats {
  username: string
  profile: {
    name: string
    bio: string
    avatar: string
    followers: number
    following: number
    publicRepos: number
    url?: string
  }
  stats: {
    totalRepos: number
    totalStars: number
    totalForks: number
    totalContributions: number
    commitContributions?: number
    issueContributions?: number
    prContributions?: number
    prReviewContributions?: number
  }
  contributions: Contribution[]
  repos: Array<{
    name: string
    description: string
    stars: number
    forks: number
    language: string
    url: string
    updated: string
  }>
}

// Contribution Graph Component
function ContributionGraph({ contributions }: { contributions: Contribution[] }) {
  if (!contributions || contributions.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400 py-8">
        <p className="mb-4">Unable to load contribution graph.</p>
        <p className="text-sm">
          Note: GitHub&apos;s contribution graph API may require authentication. Visit{' '}
          <Link
            href="https://github.com/UtkarshSingh-06"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub
          </Link>{' '}
          to view your contributions.
        </p>
      </div>
    )
  }

  // Process contributions - GitHub GraphQL API returns contributions already grouped by weeks
  // Each week has 7 days (Sunday to Saturday), some may be empty at year boundaries
  const weeks: Contribution[][] = []
  
  // Group contributions into weeks (7 days per week)
  // The API already returns them in week format, so we just need to group them
  for (let i = 0; i < contributions.length; i += 7) {
    const week = contributions.slice(i, i + 7)
    // Ensure each week has exactly 7 days (pad if needed)
    while (week.length < 7) {
      week.push({ date: '', count: 0, color: '#ebedf0' })
    }
    weeks.push(week)
  }

  // Get month labels - show month name for the first occurrence of each month
  const monthLabels: string[] = []
  const seenMonths = new Set<string>()
  
  weeks.forEach((week) => {
    // Find the first valid date in the week (skip empty padding days)
    const firstValidDay = week.find(day => day.date && day.date !== '')
    if (firstValidDay) {
      const date = new Date(firstValidDay.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`
      
      if (!seenMonths.has(monthKey)) {
        const month = date.toLocaleDateString('en-US', { month: 'short' })
        monthLabels.push(month)
        seenMonths.add(monthKey)
      } else {
        monthLabels.push('')
      }
    } else {
      monthLabels.push('')
    }
  })

  // Get contribution intensity color (fallback if color not provided)
  // Using GitHub's exact color scheme
  const getContributionColor = (count: number, providedColor?: string) => {
    if (providedColor) {
      return ''
    }
    // GitHub's exact colors
    if (count === 0) return ''
    if (count === 1) return ''
    if (count <= 3) return ''
    if (count <= 6) return ''
    return ''
  }
  
  const getContributionColorValue = (count: number, providedColor?: string) => {
    if (providedColor) {
      return providedColor
    }
    // GitHub's exact color scheme
    if (count === 0) return '#ebedf0'
    if (count === 1) return '#9be9a8'
    if (count <= 3) return '#40c463'
    if (count <= 6) return '#30a14e'
    return '#216e39'
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month Labels */}
        <div className="flex gap-1 mb-2" style={{ paddingLeft: '20px' }}>
          {monthLabels.map((month, weekIndex) => (
            <div
              key={weekIndex}
              className="text-xs text-gray-600 dark:text-gray-400"
              style={{ width: '13px', textAlign: 'left' }}
            >
              {month}
            </div>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="flex gap-1">
          {/* Day Labels */}
          <div className="flex flex-col gap-1 mr-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div
                key={day}
                className="text-xs text-gray-600 dark:text-gray-400"
                style={{ 
                  height: '13px', 
                  lineHeight: '13px', 
                  visibility: index % 2 === 0 ? 'visible' : 'hidden',
                  width: '20px'
                }}
              >
                {index % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>

          {/* Contribution Squares */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = week[dayIndex]
                  if (!day) {
                    return <div key={`empty-${dayIndex}`} className="w-3 h-3" />
                  }
                  const colorValue = getContributionColorValue(day.count, day.color)
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className="w-3 h-3 rounded hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all cursor-pointer"
                      title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString()}`}
                      style={{ backgroundColor: colorValue }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ebedf0' }}></div>
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#9be9a8' }}></div>
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#40c463' }}></div>
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#30a14e' }}></div>
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#216e39' }}></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchActivity = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      // Add cache-busting parameter and timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
      
      try {
        const response = await fetch(`/api/github/activity?t=${Date.now()}`, {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub activity: ${response.status}`)
        }
      const activityData = await response.json()
      
      // Check if response has error field (but still valid JSON)
      if (activityData.error) {
        console.warn('API returned error:', activityData.error)
        // Still set data if available, but show warning
        if (activityData.contributions && activityData.contributions.length > 0) {
          setData(activityData)
          setLastUpdated(new Date())
          setError(`Warning: ${activityData.error}`)
        } else {
          throw new Error(activityData.error)
        }
      } else {
        setData(activityData)
        setLastUpdated(new Date())
        setError(null)
      }
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.')
        }
        throw fetchError
      }
    } catch (err) {
      console.error('GitHub Activity fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load GitHub activity')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchActivity()

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchActivity(true)
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <section id="github-activity" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          >
            GitHub Activity
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <strong>{data?.username || 'UtkarshSingh-06'}</strong>&apos;s coding journey over the past year
          </p>
          <div className="text-gray-600 dark:text-gray-400">
            <p>Fetching your GitHub activity data</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section id="github-activity" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          >
            GitHub Activity
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <strong>{data?.username || 'UtkarshSingh-06'}</strong>&apos;s coding journey over the past year
          </p>
          <div className="text-gray-600 dark:text-gray-400">
            <p>{error || 'Unable to load GitHub activity'}</p>
            <Link
              href={`https://github.com/${data?.username || 'UtkarshSingh-06'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
            >
              View on GitHub →
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github-activity" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              GitHub Activity
            </h2>
            <button
              onClick={() => fetchActivity(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{data.username}</strong>&apos;s coding journey over the past year
            </p>
            <Link
              href={data.profile.url || `https://github.com/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          {/* Statistics */}
          <div className="mb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                <span>{data.stats.totalContributions.toLocaleString()} contributions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Repositories:</span>
                <span>{data.stats.totalRepos}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Stars:</span>
                <span>{data.stats.totalStars}</span>
              </div>
              {data.stats.commitContributions !== undefined && data.stats.commitContributions > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Commits:</span>
                  <span>{data.stats.commitContributions.toLocaleString()}</span>
                </div>
              )}
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Last updated: {lastUpdated.toLocaleString()}
              </div>
            )}
          </div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContributionGraph contributions={data.contributions} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
