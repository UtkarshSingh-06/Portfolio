import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN
    const username = 'UtkarshSingh-06'
    
    // Debug info
    const envKeys = Object.keys(process.env).filter(key => key.includes('GITHUB'))
    
    if (!token || token === 'your_github_token_here' || token.trim() === '') {
      return NextResponse.json({
        error: 'Token not configured',
        tokenExists: !!token,
        tokenLength: token?.length || 0,
        tokenPrefix: token?.substring(0, 7) || 'none',
        envKeysFound: envKeys,
        message: 'Please add GITHUB_TOKEN to .env.local and restart the server'
      }, { status: 400 })
    }

    // Test GraphQL API
    const query = `
      query($username: String!) {
        user(login: $username) {
          login
          name
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      return NextResponse.json({
        success: false,
        error: 'GraphQL Error',
        details: data.errors,
        tokenLength: token.length,
        tokenPrefix: token.substring(0, 7),
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      user: data.data?.user?.login,
      name: data.data?.user?.name,
      totalContributions: data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0,
      commitContributions: data.data?.user?.contributionsCollection?.totalCommitContributions || 0,
      tokenConfigured: true,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
