import { NextResponse } from 'next/server'

// GitHub username - update this with your GitHub username
const GITHUB_USERNAME = 'UtkarshSingh-06'

// GitHub GraphQL query to get contribution calendar
// Note: Dates are passed as variables, not string replacement
const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`

// Helper function to generate dates for the past year
function getDateRange() {
  const toDate = new Date()
  const fromDate = new Date()
  fromDate.setFullYear(fromDate.getFullYear() - 1)
  
  return {
    fromDate: fromDate.toISOString(),
    toDate: toDate.toISOString(),
  }
}

// Helper function to generate contribution data from commits
async function generateContributionsFromCommits(repos: any[], username: string) {
  const contributions: Map<string, number> = new Map()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  
  // Get commits from top repositories
  const topRepos = repos.slice(0, 20) // Limit to avoid rate limits
  
  for (const repo of topRepos) {
    try {
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&since=${oneYearAgo.toISOString()}&per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      )
      
      if (commitsResponse.ok) {
        const commits = await commitsResponse.json()
        commits.forEach((commit: any) => {
          if (commit.commit?.author?.date) {
            const date = new Date(commit.commit.author.date).toISOString().split('T')[0]
            contributions.set(date, (contributions.get(date) || 0) + 1)
          }
        })
      }
    } catch (error) {
      // Continue with other repos if one fails
      continue
    }
  }
  
  return contributions
}

export async function GET(request: Request) {
  let user: any = null
  let repos: any[] = []
  
  try {
    // Fetch user data and repos from REST API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
    
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          signal: controller.signal,
        }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          signal: controller.signal,
        }),
      ])
      
      clearTimeout(timeoutId)

      if (!userResponse.ok || !reposResponse.ok) {
        const errorText = await userResponse.text().catch(() => 'Unknown error')
        console.error('GitHub API error:', userResponse.status, errorText)
        throw new Error(`GitHub API returned ${userResponse.status}`)
      }

      user = await userResponse.json()
      repos = await reposResponse.json()
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      if (fetchError.name === 'AbortError') {
        console.error('Request timeout')
        throw new Error('Request timeout - GitHub API took too long to respond')
      }
      throw fetchError
    }
    
    // Ensure we have user and repos data
    if (!user || !repos) {
      throw new Error('Failed to fetch user or repository data')
    }

    // Fetch contribution calendar from GraphQL API
    // Note: GitHub GraphQL API requires authentication for contribution data
    let contributionData = null
    let contributions: Array<{ date: string; count: number; color: string }> = []
    let totalContributions = 0
    
    const { fromDate, toDate } = getDateRange()
    
    try {
      const token = process.env.GITHUB_TOKEN?.trim()
      
      if (!token || token === 'your_github_token_here' || token === '') {
        console.warn('GITHUB_TOKEN not found. Using fallback method.')
        // Quick fallback: Return empty contributions array (will show empty graph)
        // This is faster than calculating from commits
        const startDate = new Date(fromDate)
        const endDate = new Date(toDate)
        const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        
        for (let i = 0; i <= daysDiff; i++) {
          const date = new Date(startDate)
          date.setDate(date.getDate() + i)
          const dateStr = date.toISOString().split('T')[0]
          contributions.push({ date: dateStr, count: 0, color: '#ebedf0' })
        }
        totalContributions = 0
      } else {
        // Use GraphQL API with token
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`,
        }

        const graphqlController = new AbortController()
        const graphqlTimeout = setTimeout(() => graphqlController.abort(), 20000) // 20 second timeout
        
        try {
          const graphqlResponse = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers,
            signal: graphqlController.signal,
            body: JSON.stringify({
              query: CONTRIBUTION_QUERY,
              variables: { 
                username: GITHUB_USERNAME,
                from: fromDate,
                to: toDate,
              },
            }),
          })
          
          clearTimeout(graphqlTimeout)

          if (graphqlResponse.ok) {
          const graphqlData = await graphqlResponse.json()
          
          if (graphqlData.errors) {
            console.error('GraphQL API errors:', JSON.stringify(graphqlData.errors, null, 2))
            throw new Error(`GraphQL Error: ${graphqlData.errors[0]?.message || 'Unknown error'}`)
          }
          
          if (graphqlData.data?.user?.contributionsCollection) {
            contributionData = graphqlData.data.user.contributionsCollection
            // Process the contribution data immediately
            if (contributionData.contributionCalendar) {
              totalContributions = contributionData.contributionCalendar.totalContributions || 0
              const weeks = contributionData.contributionCalendar.weeks || []
              
              // Process weeks - GitHub returns weeks with contributionDays
              // Each week represents a column in the contribution graph
              // GitHub's API returns weeks with 7 days each (Sunday to Saturday)
              contributions = weeks.flatMap((week: any) => {
                const days = week.contributionDays || []
                const weekDays: Array<{ date: string; count: number; color: string }> = []
                
                // GitHub returns exactly 7 days per week (some may be empty at year boundaries)
                // Process all 7 days to maintain week structure
                for (let i = 0; i < 7; i++) {
                  if (days[i]) {
                    weekDays.push({
                      date: days[i].date || '',
                      count: days[i].contributionCount || 0,
                      color: days[i].color || '#ebedf0',
                    })
                  } else {
                    // Empty day (at year boundaries)
                    weekDays.push({
                      date: '',
                      count: 0,
                      color: '#ebedf0',
                    })
                  }
                }
                return weekDays
              })
            }
          } else {
            console.error('No contribution data in GraphQL response:', JSON.stringify(graphqlData, null, 2))
            // Fallback to commit-based calculation
            const commitContributions = await generateContributionsFromCommits(repos, GITHUB_USERNAME)
            totalContributions = Array.from(commitContributions.values()).reduce((sum, count) => sum + count, 0)
            
            // Generate contribution array
            const startDate = new Date(fromDate)
            const endDate = new Date(toDate)
            const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
            
            for (let i = 0; i <= daysDiff; i++) {
              const date = new Date(startDate)
              date.setDate(date.getDate() + i)
              const dateStr = date.toISOString().split('T')[0]
              const count = commitContributions.get(dateStr) || 0
              
              let color = '#ebedf0'
              if (count === 1) color = '#9be9a8'
              else if (count <= 3) color = '#40c463'
              else if (count <= 6) color = '#30a14e'
              else if (count > 6) color = '#216e39'
              
              contributions.push({ date: dateStr, count, color })
            }
          }
        } else {
          const errorText = await graphqlResponse.text()
          console.error('GraphQL response not OK:', graphqlResponse.status, errorText)
          // Fallback to commit-based calculation
          const commitContributions = await generateContributionsFromCommits(repos, GITHUB_USERNAME)
          totalContributions = Array.from(commitContributions.values()).reduce((sum, count) => sum + count, 0)
          
          // Generate contribution array
          const startDate = new Date(fromDate)
          const endDate = new Date(toDate)
          const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
          
          for (let i = 0; i <= daysDiff; i++) {
            const date = new Date(startDate)
            date.setDate(date.getDate() + i)
            const dateStr = date.toISOString().split('T')[0]
            const count = commitContributions.get(dateStr) || 0
            
            let color = '#ebedf0'
            if (count === 1) color = '#9be9a8'
            else if (count <= 3) color = '#40c463'
            else if (count <= 6) color = '#30a14e'
            else if (count > 6) color = '#216e39'
            
            contributions.push({ date: dateStr, count, color })
          }
        }
        } catch (graphqlError: any) {
          clearTimeout(graphqlTimeout)
          if (graphqlError.name === 'AbortError') {
            console.error('GraphQL request timed out, using fallback')
            // Fallback to commit-based calculation
            const commitContributions = await generateContributionsFromCommits(repos, GITHUB_USERNAME)
            totalContributions = Array.from(commitContributions.values()).reduce((sum, count) => sum + count, 0)
            
            const startDate = new Date(fromDate)
            const endDate = new Date(toDate)
            const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
            
            for (let i = 0; i <= daysDiff; i++) {
              const date = new Date(startDate)
              date.setDate(date.getDate() + i)
              const dateStr = date.toISOString().split('T')[0]
              const count = commitContributions.get(dateStr) || 0
              
              let color = '#ebedf0'
              if (count === 1) color = '#9be9a8'
              else if (count <= 3) color = '#40c463'
              else if (count <= 6) color = '#30a14e'
              else if (count > 6) color = '#216e39'
              
              contributions.push({ date: dateStr, count, color })
            }
          } else {
            throw graphqlError
          }
        }
      }
    } catch (error) {
      console.error('GraphQL API error:', error)
      // Fallback to commit-based calculation
      try {
        console.log('Falling back to commit-based calculation...')
        const commitContributions = await generateContributionsFromCommits(repos, GITHUB_USERNAME)
        totalContributions = Array.from(commitContributions.values()).reduce((sum, count) => sum + count, 0)
        
        // Generate contribution array for fallback
        const startDate = new Date(fromDate)
        const endDate = new Date(toDate)
        const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        
        for (let i = 0; i <= daysDiff; i++) {
          const date = new Date(startDate)
          date.setDate(date.getDate() + i)
          const dateStr = date.toISOString().split('T')[0]
          const count = commitContributions.get(dateStr) || 0
          
          let color = '#ebedf0'
          if (count === 1) color = '#9be9a8'
          else if (count <= 3) color = '#40c463'
          else if (count <= 6) color = '#30a14e'
          else if (count > 6) color = '#216e39'
          
          contributions.push({ date: dateStr, count, color })
        }
      } catch (fallbackError) {
        console.error('Fallback calculation also failed:', fallbackError)
      }
    }

    // Calculate stats (with fallbacks)
    const totalRepos = repos?.length || 0
    const totalStars = repos?.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0) || 0
    const totalForks = repos?.reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0) || 0

    // If we still don't have contributions, generate empty array for the past year
    if (contributions.length === 0) {
      const startDate = new Date(fromDate)
      const endDate = new Date(toDate)
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      
      for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)
        const dateStr = date.toISOString().split('T')[0]
        contributions.push({ date: dateStr, count: 0, color: '#ebedf0' })
      }
    }

    // Always return valid data structure, even if some fields are missing
    return NextResponse.json(
      {
        username: GITHUB_USERNAME,
        profile: {
          name: user?.name || GITHUB_USERNAME,
          bio: user?.bio || '',
          avatar: user?.avatar_url || '',
          followers: user?.followers || 0,
          following: user?.following || 0,
          publicRepos: user?.public_repos || 0,
          url: user?.html_url || `https://github.com/${GITHUB_USERNAME}`,
        },
        stats: {
          totalRepos,
          totalStars,
          totalForks,
          totalContributions,
          commitContributions: contributionData?.totalCommitContributions || 0,
          issueContributions: contributionData?.totalIssueContributions || 0,
          prContributions: contributionData?.totalPullRequestContributions || 0,
          prReviewContributions: contributionData?.totalPullRequestReviewContributions || 0,
        },
        contributions,
        repos: (repos || []).slice(0, 6).map((repo: any) => ({
          name: repo.name || 'Unknown',
          description: repo.description || '',
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          language: repo.language || '',
          url: repo.html_url || '',
          updated: repo.updated_at || new Date().toISOString(),
        })),
        lastFetched: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  } catch (error: any) {
    console.error('GitHub API error:', error)
    
    // Return a valid response even on error, so the UI can display something
    const { fromDate, toDate } = getDateRange()
    const startDate = new Date(fromDate)
    const endDate = new Date(toDate)
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const emptyContributions: Array<{ date: string; count: number; color: string }> = []
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      emptyContributions.push({ date: dateStr, count: 0, color: '#ebedf0' })
    }
    
    return NextResponse.json(
      {
        username: GITHUB_USERNAME,
        profile: {
          name: GITHUB_USERNAME,
          bio: '',
          avatar: '',
          followers: 0,
          following: 0,
          publicRepos: 0,
          url: `https://github.com/${GITHUB_USERNAME}`,
        },
        stats: {
          totalRepos: 0,
          totalStars: 0,
          totalForks: 0,
          totalContributions: 0,
          commitContributions: 0,
          issueContributions: 0,
          prContributions: 0,
          prReviewContributions: 0,
        },
        contributions: emptyContributions,
        repos: [],
        error: error?.message || 'Failed to fetch GitHub activity',
        lastFetched: new Date().toISOString(),
      },
      {
        status: 200, // Return 200 so UI can still render
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  }
}
