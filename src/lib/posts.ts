import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface Frontmatter {
  title: string
  description: string
  date: string
  updated?: string
  tags?: string[]
  draft?: boolean
  readingTime: number
}

export interface PostMeta extends Frontmatter {
  slug: string
}

// Frontmatter is tiny, so it's bundled eagerly for lists and RSS.
const frontmatter = import.meta.glob<Frontmatter>('../content/blog/*.mdx', {
  eager: true,
  import: 'frontmatter',
})

// Post bodies are code-split: one chunk per post, loaded on demand.
const bodies = import.meta.glob<{ default: ComponentType }>('../content/blog/*.mdx')

const slugOf = (path: string) => path.slice(path.lastIndexOf('/') + 1, -'.mdx'.length)
const pathOf = (slug: string) => `../content/blog/${slug}.mdx`

const all: PostMeta[] = Object.entries(frontmatter)
  .map(([path, fm]) => ({ ...fm, slug: slugOf(path) }))
  .filter((p) => import.meta.env.DEV || !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const getPosts = () => all
export const getPostMeta = (slug: string) => all.find((p) => p.slug === slug)

export function getAdjacent(slug: string) {
  const i = all.findIndex((p) => p.slug === slug)
  return { newer: i > 0 ? all[i - 1] : undefined, older: i >= 0 ? all[i + 1] : undefined }
}

/** Warm the post's chunk (called from the route loader during navigation). */
export function preloadPost(slug: string) {
  return bodies[pathOf(slug)]?.()
}

const lazyCache = new Map<string, LazyExoticComponent<ComponentType>>()
export function getPostComponent(slug: string) {
  const load = bodies[pathOf(slug)]
  if (!load) return undefined
  if (!lazyCache.has(slug)) lazyCache.set(slug, lazy(load))
  return lazyCache.get(slug)!
}

export const formatDate = {
  long: (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
  year: (iso: string) => iso.slice(0, 4),
}
