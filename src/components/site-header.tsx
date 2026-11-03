import { Link } from '@tanstack/react-router'
import { nav, site } from '@/data/site'

function toggleTheme() {
  const root = document.documentElement
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
  root.dataset.theme = next
  try {
    localStorage.setItem('theme', next)
  } catch {}
}

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[40rem] items-baseline justify-between gap-4 px-5 pt-8 pb-4">
      <Link to="/" className="font-semibold whitespace-nowrap text-ink hover:text-link">
        {site.name}
      </Link>
      <nav aria-label="Primary" className="flex items-baseline gap-4 text-[0.95rem] sm:gap-5">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-ink-2 hover:text-link"
            activeProps={{ className: 'text-ink underline decoration-rule-strong underline-offset-[0.3em]', 'aria-current': 'page' }}
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={toggleTheme}
          className="text-ink-3 hover:text-ink"
          aria-label="Switch between light and dark"
          title="Switch between light and dark"
        >
          <svg className="size-4 translate-y-[2px] dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
          <svg className="hidden size-4 translate-y-[2px] dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
