// Shared by the build (with a token) and the browser (anonymous, CORS-enabled).

export type RepoStats = { stars: number; forks: number; release: string; license: string }
export type Release = { tag: string; date: string; url: string }
export type MonthCount = { month: string; count: number }
export type SiteData = {
  stats: RepoStats
  releases: Release[]
  /** James's commits to Quackback's default branch, per month. */
  activity: MonthCount[]
  builtAt: string
}

export const REPO = 'QuackbackIO/quackback'
const AUTHOR = 'mortondev'

class Pending extends Error {}

async function gh(path: string, token?: string, retries = 0): Promise<any> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`https://api.github.com/repos/${path}`, { headers, signal: AbortSignal.timeout(8000) })
  // Stats endpoints answer 202 while GitHub computes them.
  if (res.status === 202) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500))
      return gh(path, token, retries - 1)
    }
    throw new Pending(`202 ${path}`)
  }
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return res.json()
}

export async function fetchStats(token?: string): Promise<RepoStats> {
  const [info, latest] = await Promise.all([gh(REPO, token), gh(`${REPO}/releases/latest`, token)])
  return {
    stars: info.stargazers_count,
    forks: info.forks_count,
    release: latest.tag_name,
    license: info.license?.spdx_id ?? 'AGPL-3.0',
  }
}

export async function fetchReleases(token?: string): Promise<Release[]> {
  const list: any[] = await gh(`${REPO}/releases?per_page=6`, token)
  return list
    .filter((r) => !r.draft && !r.prerelease)
    .map((r) => ({ tag: r.tag_name, date: r.published_at.slice(0, 10), url: r.html_url }))
}

export async function fetchActivity(token?: string, retries = 0): Promise<MonthCount[]> {
  const contributors: any[] = await gh(`${REPO}/stats/contributors`, token, retries)
  const me = contributors.find((c) => c.author?.login === AUTHOR)
  if (!me) throw new Error('author not in contributors')
  const byMonth = new Map<string, number>()
  for (const w of me.weeks as { w: number; c: number }[]) {
    if (!w.c) continue
    const month = new Date(w.w * 1000).toISOString().slice(0, 7)
    byMonth.set(month, (byMonth.get(month) ?? 0) + w.c)
  }
  return [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([month, count]) => ({ month, count }))
}

/** Fetch everything; any part that fails keeps the value from `base`. */
export async function refresh(base: SiteData, opts: { token?: string; statsRetries?: number } = {}): Promise<SiteData> {
  const keep = async <T,>(label: string, p: Promise<T>, fallback: T) => {
    try {
      return await p
    } catch (err) {
      if (!(err instanceof Pending)) console.warn(`[github] ${label}: kept previous value (${(err as Error).message})`)
      return fallback
    }
  }
  const [stats, releases, activity] = await Promise.all([
    keep('stats', fetchStats(opts.token), base.stats),
    keep('releases', fetchReleases(opts.token), base.releases),
    keep('activity', fetchActivity(opts.token, opts.statsRetries ?? 0), base.activity),
  ])
  return { ...base, stats, releases, activity }
}
