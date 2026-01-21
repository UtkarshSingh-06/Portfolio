# Portfolio Website

A modern, responsive developer portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, minimal design with smooth animations
- 📱 Fully responsive for desktop and mobile devices
- 🌙 Dark mode support
- ⚡ Fast and optimized with Next.js
- 🎯 Smooth scrolling navigation
- ✨ Framer Motion animations

## Sections

1. **Hero Section** - Introduction with name, role, tagline, and CTAs
2. **About Section** - Bio and personal information
3. **Skills Section** - Core technologies and tools
4. **Projects Section** - Showcase of featured projects with detail pages
5. **Experience Section** - Timeline of work experience
6. **Contact Section** - Contact form and social links

## Project System

The portfolio includes a complete project management system:

- **Project Data**: All project information is stored in `lib/projects.ts`
- **API Route**: `/api/projects` - Fetch all projects or a specific project by slug
- **Detail Pages**: Each project has its own detail page at `/projects/[slug]`
- **Dynamic Routing**: Projects are automatically generated as static pages

### Adding a New Project

1. Open `lib/projects.ts`
2. Add a new project object to the `projects` array
3. Include all required fields (slug, title, descriptions, technologies, etc.)
4. The project will automatically appear on the projects page and have its own detail page

### Project Detail Pages

Each project detail page includes:
- Full project description
- Technology stack
- Key features
- Challenges faced
- Technical implementation details
- Learnings
- Impact/Results
- Links to live demo and source code (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd portfolio1
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Update Personal Information

1. **Hero Section** - Edit `components/Hero.tsx`:
   - Update name, role, and tagline

2. **About Section** - Edit `components/About.tsx`:
   - Update bio text
   - Replace placeholder image/avatar

3. **Skills** - Edit `components/Skills.tsx`:
   - Update the `skills` array with your technologies

4. **Projects** - Edit `lib/projects.ts`:
   - Update the `projects` array with your project details
   - Each project has a `slug` used for the URL (e.g., `/projects/ai-powered-ecommerce`)
   - Add full descriptions, challenges, learnings, and impact
   - Project cards automatically link to detail pages
   - Add project images to the `public` folder and reference them in the `image` field

5. **Experience** - Edit `components/Experience.tsx`:
   - Update the `experiences` array with your work history

6. **Contact** - Edit `components/Contact.tsx`:
   - Update social media links
   - Update email address
   - Connect form to your backend/email service

### Resume Link

Update the resume link in `components/Hero.tsx`:
- Replace `/resume.pdf` with your actual resume path
- Or upload your resume to the `public` folder

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy!

### Environment Variables

If you need to add environment variables (e.g., for contact form):
1. Create a `.env.local` file
2. Add your variables
3. Update the code to use `process.env.VARIABLE_NAME`

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## License

This project is open source and available under the MIT License.
