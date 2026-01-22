# Quick Setup Guide: GitHub Token

Follow these steps to set up your GitHub Personal Access Token:

## Step 1: Generate GitHub Token

1. **Open GitHub Settings**
   - Go to: https://github.com/settings/tokens
   - Or: GitHub → Your Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Create New Token**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Give it a name: `Portfolio Activity` (or any name you prefer)
   - Set expiration: Choose your preferred duration (90 days, 1 year, or no expiration)

3. **Select Scopes**
   - ✅ Check **`public_repo`** (for public repositories)
   - ✅ If you want private repos too, check **`repo`** (gives full access)
   - That's all you need!

4. **Generate and Copy**
   - Scroll down and click **"Generate token"**
   - **⚠️ IMPORTANT**: Copy the token immediately! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again after you leave this page

## Step 2: Add Token to Project

1. **Open `.env.local` file** in the root of your project
2. **Replace the placeholder**:
   ```
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```
   Replace `ghp_your_actual_token_here` with the token you copied

3. **Save the file**

## Step 3: Restart Development Server

Stop your current server (Ctrl+C) and restart:
```bash
npm run dev
```

## Step 4: Verify It Works

1. Open your portfolio in the browser
2. Navigate to the "GitHub Activity" section
3. You should see your actual contribution graph with real data!

## Troubleshooting

### Token Not Working?
- Make sure there are no extra spaces in `.env.local`
- Verify the token starts with `ghp_`
- Check that you selected the `public_repo` scope
- Restart the dev server after adding the token

### Still Seeing "Fetching data"?
- Check browser console for errors
- Verify the token is correct in `.env.local`
- Make sure the file is named exactly `.env.local` (not `.env` or `.env.local.txt`)

### Need Help?
- Check `GITHUB_SETUP.md` for detailed troubleshooting
- Verify your GitHub username is correct in `app/api/github/activity/route.ts`

## Security Reminder

✅ **DO:**
- Keep `.env.local` in your project (it's already in `.gitignore`)
- Use the token for development

❌ **DON'T:**
- Commit `.env.local` to Git (it's already ignored)
- Share your token publicly
- Commit the token to GitHub

## For Production (Vercel/Netlify)

When deploying:
1. Go to your hosting platform's environment variables settings
2. Add `GITHUB_TOKEN` with your token value
3. Deploy - it will work automatically!
