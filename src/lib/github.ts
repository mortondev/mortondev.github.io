import { useEffect, useState } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'
import { REPO, refresh, type SiteData } from '@/lib/github-core'

export type { MonthCount, Release, RepoStats, SiteData } from '@/lib/github-core'

// Last-known values, used when the build can't reach GitHub.
const FALLBACK: SiteData = {
  stats: { stars: 337, forks: 113, release: 'v0.14.1', license: 'AGPL-3.0' },
  releases: [
    { tag: 'v0.14.1', date: '2026-10-07', url: `https://github.com/${REPO}/releases/tag/v0.14.1` },
    { tag: 'v0.14.0', date: '2026-10-05', url: `https://github.com/${REPO}/releases/tag/v0.14.0` },
  ],
  activity: (
    [
      ['2025-12', 386], ['2026-01', 234], ['2026-02', 176], ['2026-03', 289], ['2026-04', 186], ['2026-05', 752],
      ['2026-06', 416], ['2026-07', 609], ['2026-08', 108], ['2026-09', 115], ['2026-10', 110],
    ] as const
  ).map(([month, count]) => ({ month, count })),
  builtAt: '',
}

/**
 * Snapshot taken at build time and shipped as static JSON. It's what the
 * prerendered HTML shows, so pages are complete before any script runs.
 * `staticFunctionMiddleware` must be the last middleware.
 */
export const getSiteData = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<SiteData> => {
    const data = await refresh(FALLBACK, { token: process.env.GITHUB_TOKEN, statsRetries: 4 })
    return { ...data, builtAt: new Date().toISOString().slice(0, 10) }
  })

const CACHE_KEY = 'github-live-v1'
const CACHE_MS = 15 * 60 * 1000

/**
 * Starts from the build-time snapshot, then refreshes from the GitHub API in
 * the visitor's browser. Results are cached for 15 minutes per browser to stay
 * well inside GitHub's 60 requests/hour anonymous limit.
 */
export function useLiveSiteData(snapshot: SiteData): SiteData & { live: boolean } {
  const [data, setData] = useState<SiteData & { live: boolean }>({ ...snapshot, live: false })

  useEffect(() => {
    let cancelled = false
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as { at: number; data: SiteData } | null
      if (cached && Date.now() - cached.at < CACHE_MS) {
        setData({ ...cached.data, builtAt: snapshot.builtAt, live: true })
        return
      }
    } catch {}

    refresh(snapshot).then((fresh) => {
      if (cancelled) return
      setData({ ...fresh, live: true })
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: fresh }))
      } catch {}
    })
    return () => {
      cancelled = true
    }
  }, [snapshot])

  return data
}
