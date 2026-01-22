# GitHub Activity Integration Setup

This guide explains how to set up the GitHub Activity Integration feature to display your actual contribution graph.

## Option 1: Using GitHub Personal Access Token (Recommended)

For the most accurate contribution data, use a GitHub Personal Access Token:

### Step 1: Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Activity")
4. Select the following scopes:
   - `public_repo` (for public repositories)
   - Or `repo` (if you want to include private repos)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again!)

### Step 2: Add Token to Your Project

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following line:
   ```
   GITHUB_TOKEN=your_token_here
   ```
3. Replace `your_token_here` with your actual token
4. **Important**: Never commit `.env.local` to Git (it's already in `.gitignore`)

### Step 3: Restart Your Development Server

After adding the token, restart your Next.js development server:
```bash
npm run dev
```

## Option 2: Fallback Method (No Token Required)

If you don't set up a token, the system will automatically:
- Fetch your public repositories
- Calculate contributions from commit history
- Display a contribution graph based on your commits

**Note**: This method may be less accurate than using the GraphQL API with a token, but it works without authentication.

## Troubleshooting

### GraphQL API Errors

If you see errors in the console:
- Verify your token is correct
- Check that the token hasn't expired
- Ensure the token has the correct scopes (`public_repo` or `repo`)

### Rate Limiting

GitHub API has rate limits:
- **With token**: 5,000 requests/hour
- **Without token**: 60 requests/hour

If you hit rate limits, wait an hour or use a token for higher limits.

### No Contributions Showing

If the contribution graph is empty:
- Check that you have public repositories with commits
- Verify your GitHub username is correct in `app/api/github/activity/route.ts`
- Try using a token for more accurate data

## Security Notes

- **Never commit your `.env.local` file** to version control
- Keep your token secure and don't share it
- If your token is compromised, revoke it immediately on GitHub
- Consider using environment variables in production (Vercel, Netlify, etc.)

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add `GITHUB_TOKEN` as an environment variable in your hosting platform
2. The token will be automatically used by the API route
3. No code changes needed!
