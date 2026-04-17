# Modern Portfolio Website

A fully responsive, data-driven portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- Next.js (App Router + TypeScript)
- Tailwind CSS
- Framer Motion
- next-themes (dark/light mode)
- EmailJS (contact form)
- Vercel Analytics

## Quick Start

```bash
npm install
npm run dev
```

## Configure Personal Content

All editable personal content lives in `src/data/site.ts`.

Update these sections:

- `siteConfig`: name, title, email, social links, resume URL, hero text
- `projects`: project cards, tech tags, GitHub/live links
- `skills`: skill list, icon keys, and proficiency percentages
- `experiences`: timeline entries
- `aboutHighlights`: short profile highlights

## Environment Variables

Copy `.env.example` to `.env.local` and set values:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID` (optional)

## EmailJS Setup

1. Create an EmailJS account and email service.
2. Create an email template with fields: `from_name`, `from_email`, `message`.
3. Add service/template/public key values in `.env.local`.

## Sections Implemented

- Hero (typing effect, CTA, social links)
- About
- Projects (filters + hover + links)
- Skills (animated progress bars)
- Experience (timeline)
- Contact (functional form)
- Sticky navbar with smooth scrolling and theme toggle

## Advanced UX Features

- Custom cursor (desktop)
- Particle background
- Scroll progress bar
- Micro-interactions and motion reveal
- Lazy-loaded visual effects using dynamic imports

## Accessibility + SEO

- Semantic sections and labeled controls
- Keyboard-friendly navigation and clear focus behavior
- Metadata, OpenGraph, Twitter tags
- `robots.ts` and `sitemap.ts`

## Build + Lint

```bash
npm run lint
npm run build
```

## Deployment

### Vercel (recommended)

1. Push code to GitHub.
2. Import repository in Vercel.
3. Add environment variables in project settings.
4. Deploy.

### Netlify

1. Create a new Netlify site from repo.
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add all environment variables.

## Custom Domain Checklist

- Add domain in Vercel/Netlify dashboard.
- Point DNS records to platform targets.
- Wait for SSL certificate provisioning.
- Update `NEXT_PUBLIC_SITE_URL`.

## Notes

- Replace placeholder project images in `public/projects/`.
- Keep section components reusable under `src/components/sections`.
- Heavier effects are client-only and dynamically loaded for faster first paint.

