/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '@/styles/app.css?url'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { NotFound } from '@/components/not-found'
import { site, social } from '@/data/site'

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  image: new URL(site.avatar, site.url).href,
  jobTitle: 'Lead DevOps Engineer',
  worksFor: [
    { '@type': 'Organization', name: 'StoreFeeder', url: 'https://www.storefeeder.com' },
    { '@type': 'Organization', name: 'Quackback', url: 'https://quackback.io' },
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Nottingham' },
  address: { '@type': 'PostalAddress', addressLocality: 'Nottingham', addressCountry: 'GB' },
  sameAs: social.map((s) => s.href),
}

// Runs before first paint so there's no light/dark flash.
const themeScript = `(()=>{let t=null;try{t=localStorage.getItem('theme')}catch{}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t})()`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: site.title },
      { name: 'description', content: site.description },
      { property: 'og:site_name', content: site.name },
      { property: 'og:locale', content: 'en_GB' },
      { name: 'twitter:creator', content: '@mortondev' },
      { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#131315', media: '(prefers-color-scheme: dark)' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'alternate', type: 'application/rss+xml', title: `${site.name} — Writing`, href: '/rss.xml' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-[40rem] flex-1 px-5">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
