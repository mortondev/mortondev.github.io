import { site } from '@/data/site'

interface Seo {
  title?: string
  description?: string
  path: string
  type?: 'website' | 'article'
  published?: string
}

/** Per-route head tags. Spread into a route's `head()` return value. */
export function seo({ title, description = site.description, path, type = 'website', published }: Seo) {
  const fullTitle = title ? `${title} · ${site.name}` : site.title
  const url = new URL(path, site.url).href
  const image = new URL(site.avatar, site.url).href

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:title', content: title ?? site.title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary' },
      ...(published ? [{ property: 'article:published_time', content: published }] : []),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
