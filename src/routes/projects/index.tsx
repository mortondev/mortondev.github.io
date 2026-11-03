import { createFileRoute } from '@tanstack/react-router'
import { getSiteData, useLiveSiteData } from '@/lib/github'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/projects/')({
  loader: () => getSiteData(),
  head: () => seo({ title: 'Projects', path: '/projects/', description: 'Quackback and other things James Morton has built.' }),
  component: Projects,
})

const ext = { target: '_blank', rel: 'noopener' } as const

const parts = [
  { name: 'quackback', note: 'the main app, built with TypeScript, TanStack Start and PostgreSQL', href: 'https://github.com/QuackbackIO/quackback' },
  { name: 'quackback-ios', note: 'Swift SDK for in-app feedback', href: 'https://github.com/QuackbackIO/quackback-ios' },
  { name: 'quackback-android', note: 'Kotlin SDK for in-app feedback', href: 'https://github.com/QuackbackIO/quackback-android' },
  { name: 'skills', note: 'agent skills for installing the widget and identifying users', href: 'https://github.com/QuackbackIO/skills' },
  { name: 'MCP server', note: 'lets AI agents search and triage feedback', href: 'https://quackback.io/docs/mcp' },
]

function Projects() {
  const { stats } = useLiveSiteData(Route.useLoaderData())

  return (
    <>
      <h1 className="pt-10 text-[1.4rem] font-semibold">Projects</h1>

      <section className="mt-8" aria-labelledby="qb">
        <h2 id="qb" className="h2">
          <a href="https://quackback.io" className="a" {...ext}>Quackback</a>
          <span className="ml-2 font-normal text-ink-3">2025 to now</span>
        </h2>
        <p className="mt-2 text-ink-2">
          An open-source customer feedback platform: boards for feature requests, a public roadmap, a changelog and a
          help centre. Teams can use the hosted version or run it themselves. {stats.stars.toLocaleString('en-GB')}{' '}
          stars, {stats.forks.toLocaleString('en-GB')} forks, latest release {stats.release}.
        </p>
        <img
          src="/images/quackback-screenshot.webp"
          alt="Quackback’s public feedback portal, listing feature requests with vote counts"
          width={960}
          height={617}
          loading="lazy"
          className="mt-6 w-full rounded-md"
        />
        <ul className="mt-6 space-y-1.5">
          {parts.map((p) => (
            <li key={p.name}>
              <a href={p.href} className="a font-mono text-[0.92rem]" {...ext}>
                {p.name}
              </a>
              <span className="text-ink-2">: {p.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="site">
        <h2 id="site" className="h2">
          <a href="https://github.com/mortondev/mortondev.github.io" className="a" {...ext}>mortondev.com</a>
          <span className="ml-2 font-normal text-ink-3">since 2015</span>
        </h2>
        <p className="mt-2 text-ink-2">
          This site. It started on Jekyll; now it’s TanStack Start, prerendered to static HTML and deployed to GitHub
          Pages. The Quackback numbers are pulled from GitHub on each deploy.
        </p>
      </section>
    </>
  )
}
