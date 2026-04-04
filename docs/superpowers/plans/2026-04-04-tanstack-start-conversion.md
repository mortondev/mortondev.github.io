# TanStack Start Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Jekyll blog at mortondev.github.io to a TanStack Start + shadcn/ui static site deployed to GitHub Pages.

**Architecture:** TanStack Start with file-based routing, MDX blog posts compiled via `@mdx-js/rollup`, shadcn/ui components with dark/light theme, statically prerendered to HTML via Nitro's `static` preset. GitHub Actions builds and deploys on push to `master`.

**Tech Stack:** TanStack Start, React 19, Tailwind CSS v4, shadcn/ui, MDX, Shiki, Nitro, Vite, TypeScript

---

### Task 1: Remove Jekyll files and scaffold project

**Files:**
- Delete: `_config.yml`, `feed.xml`, `index.html`, `style.scss`, `404.md`, `README.md`, `_includes/`, `_layouts/`, `_posts/`, `_sass/`, `images/`
- Create: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Remove all Jekyll files**

```bash
rm -rf _config.yml feed.xml index.html style.scss 404.md README.md _includes _layouts _posts _sass images
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "mortondev.github.io",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.120.0",
    "@tanstack/react-start": "^1.120.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@mdx-js/rollup": "^3.1.0",
    "@shikijs/rehype": "^3.0.0",
    "@tailwindcss/vite": "^4.1.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.4.0",
    "nitro": "^2.11.0",
    "remark-frontmatter": "^5.0.0",
    "remark-mdx-frontmatter": "^5.0.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vite-tsconfig-paths": "^5.1.0"
  }
}
```

- [ ] **Step 3: Update .gitignore**

```
node_modules/
.output/
dist/
.nitro/
.vinxi/
*.local
.env*
src/routeTree.gen.ts
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: Clean install with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Jekyll files and scaffold TanStack Start project"
```

---

### Task 2: Core configuration files

**Files:**
- Create: `tsconfig.json`, `vite.config.ts`, `src/router.tsx`

- [ ] **Step 1: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client", "node"]
  },
  "include": ["src"]
}
```

- [ ] **Step 2: Create vite.config.ts**

```ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeShiki from '@shikijs/rehype'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
      },
    }),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' } }],
      ],
    }),
    viteReact({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    nitro({ preset: 'static' }),
  ],
})
```

- [ ] **Step 3: Create src/router.tsx**

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json vite.config.ts src/router.tsx
git commit -m "chore: add Vite, TypeScript, and router configuration"
```

---

### Task 3: Root route and Tailwind CSS setup

**Files:**
- Create: `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/styles/globals.css`

- [ ] **Step 1: Create src/styles/globals.css**

Tailwind v4 base with shadcn CSS variables (neutral base, New York style):

```css
@import "tailwindcss";

@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.145 0 0);
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
  --color-secondary: oklch(0.97 0 0);
  --color-secondary-foreground: oklch(0.205 0 0);
  --color-muted: oklch(0.97 0 0);
  --color-muted-foreground: oklch(0.556 0 0);
  --color-accent: oklch(0.97 0 0);
  --color-accent-foreground: oklch(0.205 0 0);
  --color-destructive: oklch(0.577 0.245 27.325);
  --color-destructive-foreground: oklch(0.577 0.245 27.325);
  --color-border: oklch(0.922 0 0);
  --color-input: oklch(0.922 0 0);
  --color-ring: oklch(0.708 0 0);
  --radius: 0.625rem;
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.dark {
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
  --color-card: oklch(0.145 0 0);
  --color-card-foreground: oklch(0.985 0 0);
  --color-popover: oklch(0.145 0 0);
  --color-popover-foreground: oklch(0.985 0 0);
  --color-primary: oklch(0.985 0 0);
  --color-primary-foreground: oklch(0.205 0 0);
  --color-secondary: oklch(0.269 0 0);
  --color-secondary-foreground: oklch(0.985 0 0);
  --color-muted: oklch(0.269 0 0);
  --color-muted-foreground: oklch(0.708 0 0);
  --color-accent: oklch(0.269 0 0);
  --color-accent-foreground: oklch(0.985 0 0);
  --color-destructive: oklch(0.396 0.141 25.723);
  --color-destructive-foreground: oklch(0.637 0.237 25.331);
  --color-border: oklch(0.269 0 0);
  --color-input: oklch(0.269 0 0);
  --color-ring: oklch(0.439 0 0);
}

/* Shiki dual theme support */
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 2: Create src/routes/__root.tsx**

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '@/styles/globals.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'James Morton — Software Developer' },
      { name: 'description', content: 'Software Developer from Nottinghamshire, UK' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.classList.add(r)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="container max-w-screen-md py-8 px-4 mx-auto">
              {children}
            </div>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create placeholder src/routes/index.tsx**

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <h1 className="text-3xl font-bold">James Morton</h1>
}
```

- [ ] **Step 4: Verify dev server starts**

Run: `npm run dev`
Expected: Dev server starts on localhost, route tree generates at `src/routeTree.gen.ts`, page renders.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css src/routes/__root.tsx src/routes/index.tsx
git commit -m "feat: add root route, Tailwind CSS, and globals"
```

---

### Task 4: shadcn/ui setup and components

**Files:**
- Create: `components.json`, `src/lib/utils.ts`
- Create (via CLI): `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/separator.tsx`, `src/components/ui/dropdown-menu.tsx`

- [ ] **Step 1: Create components.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

- [ ] **Step 2: Create src/lib/utils.ts**

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 3: Install shadcn utility dependencies**

Run: `npm install clsx tailwind-merge class-variance-authority lucide-react`

- [ ] **Step 4: Install shadcn components**

Run: `npx shadcn@latest add card button badge separator dropdown-menu`

Expected: Components created in `src/components/ui/`. If prompted, accept defaults.

- [ ] **Step 5: Commit**

```bash
git add components.json src/lib/utils.ts src/components/ui/ package.json package-lock.json
git commit -m "feat: add shadcn/ui setup and components"
```

---

### Task 5: Theme provider

**Files:**
- Create: `src/components/theme-provider.tsx`

- [ ] **Step 1: Create src/components/theme-provider.tsx**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    const resolved =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme

    root.classList.add(resolved)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

- [ ] **Step 2: Integrate ThemeProvider in __root.tsx**

Update `RootComponent` in `src/routes/__root.tsx`:

```tsx
import { ThemeProvider } from '@/components/theme-provider'

function RootComponent() {
  return (
    <ThemeProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/theme-provider.tsx src/routes/__root.tsx
git commit -m "feat: add dark/light theme provider"
```

---

### Task 6: Site header and footer

**Files:**
- Create: `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Create src/components/site-header.tsx**

```tsx
import { Link } from '@tanstack/react-router'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, Monitor } from 'lucide-react'

export function SiteHeader() {
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-md items-center mx-auto px-4">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">James Morton</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Blog
            </Link>
            <Link
              to="/projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Projects
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create src/components/site-footer.tsx**

```tsx
import { Github, Linkedin, Twitter } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/mortondev', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/mortondev', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/mortondev', icon: Twitter, label: 'Twitter' },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0 max-w-screen-md mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          James Morton
        </p>
        <div className="flex items-center space-x-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Integrate header and footer in __root.tsx**

Update `RootDocument` in `src/routes/__root.tsx` to include header and footer:

```tsx
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.classList.add(r)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="container max-w-screen-md py-8 px-4 mx-auto">
              {children}
            </div>
          </main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify layout renders**

Run: `npm run dev`
Expected: Header with nav links and theme toggle visible. Footer with social icons visible. Theme toggle switches between light/dark/system.

- [ ] **Step 5: Commit**

```bash
git add src/components/site-header.tsx src/components/site-footer.tsx src/routes/__root.tsx
git commit -m "feat: add site header with theme toggle and footer with social links"
```

---

### Task 7: MDX content pipeline

**Files:**
- Create: `src/lib/posts.ts`

- [ ] **Step 1: Create src/lib/posts.ts**

```ts
import type { ComponentType } from 'react'

interface PostModule {
  default: ComponentType
  frontmatter: {
    title: string
    date: string
    description: string
    tags?: string[]
  }
}

const modules = import.meta.glob<PostModule>('../content/blog/*.mdx', {
  eager: true,
})

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
}

export interface Post extends PostMeta {
  Component: ComponentType
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      slug: path.split('/').pop()!.replace('.mdx', ''),
      ...mod.frontmatter,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.mdx`),
  )
  if (!entry) return null
  const [, mod] = entry
  return {
    slug,
    Component: mod.default,
    ...mod.frontmatter,
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/posts.ts
git commit -m "feat: add MDX blog post content pipeline"
```

---

### Task 8: Migrate blog posts to MDX

**Files:**
- Create: `src/content/blog/safer-email-development-with-mailcatcher.mdx`
- Create: `src/content/blog/unit-testing-datetime-now.mdx`

- [ ] **Step 1: Create src/content/blog/safer-email-development-with-mailcatcher.mdx**

```mdx
---
title: "Safer Email Development With MailCatcher"
date: "2015-09-22"
description: "How to use MailCatcher to safely test emails during development without risking sending to real customers."
tags: ["ruby", "email", "development"]
---

Having worked on a number of applications which send lots of emails to customers, one thing that has always concerned me is the risk of accidentally sending emails to customers.

After a quick search I came across a great little gem called [MailCatcher](http://mailcatcher.me).

Mailcatcher creates a local SMTP server which can be used for development purposes. It simply stores emails in memory and displays them in a web interface, which is great for testing email delivery and content.

The benefit of using a local SMTP server instead of having a test mode redirecting emails to a different address is that there are no code differences between development and production. I can also be confident that while developing email related code on my machine that I'm not about to accidentally send emails out.

## Prerequisites

To use MailCatcher you must have ruby installed.

### Linux

You can find instructions for installing Ruby on Linux on the [official Ruby website](https://www.ruby-lang.org/en/documentation/installation).

### Windows

Installing Ruby on Windows is thankfully a simple task thanks to [Ruby Installer](http://rubyinstaller.org). You will need to use the Ruby Installer and also install the Ruby Development Kit (see the [download page](http://rubyinstaller.org/downloads) for information).

## How to install MailCatcher

Assuming you have Ruby installed, you can install the mailcatcher gem by running:

```sh
gem install mailcatcher
```

## Capturing Emails with MailCatcher

You can start the MailCatcher server using:

```sh
mailcatcher
```

Next step (very important) is make sure your application is configured to use your local SMTP server (running at localhost on port 1025).

You can you can view all sent emails by visiting [localhost:1080](http://localhost:1080).
```

- [ ] **Step 2: Create src/content/blog/unit-testing-datetime-now.mdx**

```mdx
---
title: "Unit Testing with NodaTime"
date: "2015-11-05"
description: "How to use NodaTime's IClock interface and FakeClock to test time-based code in C#."
tags: ["csharp", "testing", "nodatime"]
---

When trying to test code which uses DateTime.Now, it can be challenging to test time-based scenarios as by default your stuck with the current system time. Ideally we want to be able to change the current time to give us more freedom when testing.

My solution to testing the current time involves injecting an IClock interface into the classes that require DateTime.Now. By doing this it becomes a simple case of mocking the interface to return whatever time you require, allowing you simulate time-based scenarios.

## Setting up NodaTime

Instead of reinventing the wheel we're going to use [NodaTime](http://nodatime.org), a mature library which offers an alternative to the standard date and time API offered by .NET.

Firstly you need to install NodaTime and NodaTime.Testing nuget packages:

```
Install-Package NodaTime
Install-Package NodaTime.Testing
```

NodaTime provides us with an IClock interface from which we can query the current date and time. NodaTime.Testing gives you access to a FakeClock implementation which allows you provide a static time in the constructor that will always be returned for that instance of IClock.

### Code Example

First up we have a simple Widget class and WidgetFactory to produce our widgets.

```csharp
public class Widget {
  public Guid WidgetId { get; set; }
  public DateTime CreatedOn { get; set; }
}

public class WidgetFactory {
  private IClock _clock;

  public WidgetFactory(IClock clock) {
    _clock = clock;
  }

  public Widget Create() {
    return new Widget() {
      WidgetId = Guid.NewGuid(),
      CreatedOn = _clock.Now.ToDateTimeUtc()
    };
  }
}
```

And now for a test to prove that our CreatedOn date is set according to the current time, which has been faked to a specific point in time.

```csharp
[TestFixture]
public class WidgetFactoryTests {

  [Test]
  public void CreatedOn_Set_To_2015_01_01() {
    var clock = new FakeClock(Instant.FromUtc(2015, 1, 1, 0, 0));
    var widgetFactory = new WidgetFactory(clock);
    var widget = widgetFactory.Create();

    Assert.AreEqual(new DateTime(2015, 1, 1, 0, 0, DateTimeKind.Utc), widget.CreatedOn);
  }
}
```
```

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/
git commit -m "content: migrate Jekyll blog posts to MDX format"
```

---

### Task 9: Home page with post cards

**Files:**
- Create: `src/components/post-card.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Create src/components/post-card.tsx**

```tsx
import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PostCardProps {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
}

export function PostCard({
  slug,
  title,
  date,
  description,
  tags,
}: PostCardProps) {
  return (
    <Link to="/blog/$slug" params={{ slug }}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader>
          <time
            dateTime={date}
            className="text-sm text-muted-foreground"
          >
            {new Date(date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 2: Update src/routes/index.tsx**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/post-card'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const posts = getAllPosts()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Software Developer from Nottinghamshire, UK
        </p>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify home page**

Run: `npm run dev`
Expected: Home page shows two post cards sorted by date (NodaTime first, MailCatcher second). Each card shows title, date, description, and tags.

- [ ] **Step 4: Commit**

```bash
git add src/components/post-card.tsx src/routes/index.tsx
git commit -m "feat: add home page with blog post cards"
```

---

### Task 10: Blog post page

**Files:**
- Create: `src/routes/blog/$slug.tsx`, `src/components/not-found.tsx`

- [ ] **Step 1: Create src/components/not-found.tsx**

```tsx
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Page not found.</p>
      <Button asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Create src/routes/blog/$slug.tsx**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getPost } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { NotFound } from '@/components/not-found'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const post = getPost(slug)

  if (!post) return <NotFound />

  const { Component, title, date, tags } = post

  return (
    <article className="py-2">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to blog
      </Link>
      <div className="space-y-2 mb-4">
        <time dateTime={date} className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <Separator className="my-6" />
      <div className="prose dark:prose-invert max-w-none">
        <Component />
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Verify blog post page**

Run: `npm run dev`
Navigate to a post from the home page. Expected: Full post renders with syntax-highlighted code blocks, back link, title, date, tags.

- [ ] **Step 4: Commit**

```bash
git add src/components/not-found.tsx src/routes/blog/
git commit -m "feat: add blog post page with MDX rendering"
```

---

### Task 11: Projects page

**Files:**
- Create: `src/routes/projects/index.tsx`

- [ ] **Step 1: Create src/routes/projects/index.tsx**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    title: 'mortondev.com',
    description:
      'Personal dev blog and portfolio built with TanStack Start, shadcn/ui, and Tailwind CSS.',
    tags: ['React', 'TanStack Start', 'Tailwind CSS', 'MDX'],
    url: 'https://github.com/mortondev/mortondev.github.io',
  },
]

export const Route = createFileRoute('/projects/')({
  component: Projects,
})

function Projects() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Things I've built.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/projects/
git commit -m "feat: add projects portfolio page"
```

---

### Task 12: 404 page integration

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Add notFoundComponent to root route**

In `src/routes/__root.tsx`, update the `createRootRoute` call:

```tsx
import { NotFound } from '@/components/not-found'

export const Route = createRootRoute({
  head: () => ({
    // ... existing head config
  }),
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
})
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: add 404 not found page"
```

---

### Task 13: Public assets and GitHub Actions

**Files:**
- Create: `public/CNAME`, `public/images/404.jpg` (copy from repo history)
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create public directory with assets**

```bash
mkdir -p public/images
echo "www.mortondev.com" > public/CNAME
git show HEAD~12:images/404.jpg > public/images/404.jpg  # restore from git history
```

(If the git show command fails, the 404.jpg can be omitted — the NotFound component works without it.)

- [ ] **Step 2: Create .github/workflows/deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit**

```bash
git add public/ .github/
git commit -m "feat: add public assets and GitHub Actions deploy workflow"
```

---

### Task 14: Build and verify

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build completes. Static HTML files generated in `.output/public/`. Should see prerendered pages for `/`, `/blog/safer-email-development-with-mailcatcher`, `/blog/unit-testing-datetime-now`, `/projects`.

- [ ] **Step 2: Verify output**

Run: `ls -R .output/public/`
Expected: `index.html` at root, blog post HTML files, projects HTML, and static assets (JS, CSS).

- [ ] **Step 3: Serve locally to verify**

Run: `npx serve .output/public`
Expected: Site renders correctly at localhost. All pages accessible. Theme toggle works. Code blocks have syntax highlighting.

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: build and deployment fixes"
```
