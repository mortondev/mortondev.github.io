# Convert Jekyll Blog to TanStack Start + shadcn/ui

## Overview

Convert the existing Jekyll Now blog/portfolio at mortondev.github.io into a TanStack Start application with shadcn/ui components, MDX blog posts, and static prerendering for GitHub Pages deployment.

**Custom domain**: www.mortondev.com (preserved via CNAME)

## Tech Stack

- **Framework**: TanStack Start (React) with TanStack Router (file-based routing)
- **UI**: shadcn/ui (New York style) + Tailwind CSS v4
- **Content**: MDX blog posts with frontmatter, parsed at build time
- **Syntax highlighting**: shiki
- **Build**: Vite, static prerendering with `crawlLinks: true`
- **Deploy**: GitHub Actions -> GitHub Pages
- **TypeScript** throughout

## Project Structure

```
mortondev.github.io/
├── src/
│   ├── routes/
│   │   ├── __root.tsx          # Root layout (nav, footer, theme provider)
│   │   ├── index.tsx           # Home — blog post list
│   │   ├── blog/
│   │   │   └── $slug.tsx       # Individual blog post
│   │   └── projects/
│   │       └── index.tsx       # Projects portfolio page
│   ├── components/
│   │   ├── ui/                 # shadcn components (card, button, badge, etc.)
│   │   ├── site-header.tsx     # Navigation bar with theme toggle
│   │   ├── site-footer.tsx     # Footer with social links (GitHub, LinkedIn, Twitter)
│   │   ├── post-card.tsx       # Blog post preview card for the index page
│   │   ├── mdx-components.tsx  # Custom MDX component overrides
│   │   └── theme-provider.tsx  # Dark/light mode provider
│   ├── content/
│   │   └── blog/
│   │       ├── safer-email-development-with-mailcatcher.mdx
│   │       └── unit-testing-datetime-now.mdx
│   ├── lib/
│   │   ├── posts.ts            # Read/parse MDX at build time, extract frontmatter
│   │   └── utils.ts            # shadcn cn() utility
│   └── styles/
│       └── globals.css         # Tailwind base + shadcn CSS variables
├── public/
│   ├── images/
│   │   └── 404.jpg             # Existing 404 image
│   └── CNAME                   # Custom domain file
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build and deploy to GitHub Pages
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json             # shadcn config
└── package.json
```

## Pages

### Home (`/`)

- Site header with name "James Morton", description "Software Developer from Nottinghamshire, UK"
- Navigation links: Blog (home), Projects
- List of blog posts as cards, sorted by date descending
- Each card: title, date, excerpt, "Read More" link
- Footer with GitHub, LinkedIn, Twitter icon links

### Blog Post (`/blog/:slug`)

- Full MDX-rendered post content
- Title, published date, optional tags
- Styled prose via `@tailwindcss/typography`
- Syntax-highlighted code blocks via shiki
- Back link to home

### Projects (`/projects`)

- Grid of project cards
- Each card: title, description, tech tags, link to repo/demo
- Initially can be hardcoded data; later could be MDX or a data file

### 404

- Custom 404 page with the existing Constructocat image
- Link back to home

## Blog Post Format

MDX files in `src/content/blog/` with frontmatter:

```mdx
---
title: "Safer Email Development with MailCatcher"
date: "2015-09-22"
description: "How to use MailCatcher to safely test emails in development"
tags: ["ruby", "email", "development"]
---

Post content here with full markdown support and optional React components.
```

## Content Pipeline

1. `src/lib/posts.ts` exports functions to:
   - `getAllPosts()`: Read all `.mdx` files from `src/content/blog/`, parse frontmatter, return sorted list
   - `getPostBySlug(slug)`: Read and compile a single MDX file, return frontmatter + compiled content
2. These are called from route loaders at build time (static prerendering means they only run during build)
3. MDX compilation uses `@mdx-js/mdx` with shiki for code highlighting

## Theme & Styling

- shadcn/ui "New York" variant
- Dark/light mode with system preference detection, manual toggle in header
- Theme stored in localStorage, applied via class on `<html>`
- Tailwind CSS v4 with `@tailwindcss/typography` for prose
- CSS variables for shadcn color tokens (supports both themes)
- Responsive: mobile-first, single column on mobile, wider content area on desktop
- Max content width ~768px for readability

## Static Prerendering & Deployment

### Vite Config

```ts
tanstackStart({
  prerender: {
    enabled: true,
    crawlLinks: true,
    autoSubfolderIndex: true,
  },
})
```

### GitHub Actions Workflow

- Trigger: push to `master`
- Steps: checkout, install Node 20, install deps, build, deploy to `gh-pages` branch
- CNAME file in `public/` ensures custom domain persists

## Migration Plan

### Existing Posts

Convert from Jekyll markdown to MDX:
- Move frontmatter format (Jekyll `layout`/`categories` -> standard `title`/`date`/`description`/`tags`)
- Content is already standard markdown, minimal changes needed
- Code blocks already use fenced syntax

### Dropped Features

- **Disqus comments**: Removed (heavy, ad-laden). Can add giscus later if wanted.
- **Google Analytics**: Removed. Can add privacy-friendly analytics later.
- **RSS feed**: Generated at build time as a prerendered XML route or static file in public/
- **Gravatar avatar**: Replace with a local image or keep the URL

### Preserved Features

- Custom domain (CNAME)
- Blog post listing and individual post pages
- 404 page
- Social links in footer (GitHub, LinkedIn, Twitter)
- Code syntax highlighting

## shadcn Components Needed

- `card` — post cards, project cards
- `button` — navigation, links
- `badge` — tags on posts/projects
- `separator` — visual dividers
- `dropdown-menu` — theme toggle (sun/moon/system)

## Dependencies

```json
{
  "@tanstack/react-start": "latest",
  "@tanstack/react-router": "latest",
  "react": "^19",
  "react-dom": "^19",
  "tailwindcss": "^4",
  "@tailwindcss/typography": "latest",
  "@tailwindcss/vite": "latest",
  "shiki": "latest",
  "@mdx-js/mdx": "latest",
  "gray-matter": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "lucide-react": "latest",
  "vinxi": "latest",
  "nitro": "latest"
}
```

## Success Criteria

- All existing blog posts render correctly with syntax highlighting
- Site builds to static HTML and deploys to GitHub Pages
- Custom domain www.mortondev.com works
- Dark/light theme toggle works
- Mobile responsive
- Lighthouse performance score > 90
