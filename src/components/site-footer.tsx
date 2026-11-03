import { social } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[40rem] border-t border-rule px-5 pt-6 pb-12 text-[0.9rem] text-ink-3">
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {social.map((s) => (
          <li key={s.label}>
            <a href={s.href} className="a" rel="me noopener" target="_blank">
              {s.label}
            </a>
          </li>
        ))}
        <li>
          <a href="/rss.xml" className="a">RSS</a>
        </li>
      </ul>
      <p className="mt-3">
        Built with TanStack Start, set in IBM Plex, hosted on GitHub Pages.{' '}
        <a href="https://github.com/mortondev/mortondev.github.io" className="a" target="_blank" rel="noopener">
          Source
        </a>
        .
      </p>
    </footer>
  )
}
