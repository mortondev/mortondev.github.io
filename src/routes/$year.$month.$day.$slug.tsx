import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getPostMeta } from '@/lib/posts'

// Original Jekyll permalinks (/:year/:month/:day/:title/). Prerendered as tiny
// pages that meta-refresh to the new URL, since GitHub Pages can't send 301s.
export const Route = createFileRoute('/$year/$month/$day/$slug')({
  loader: ({ params }) => {
    const post = getPostMeta(params.slug)
    if (!post || post.date !== `${params.year}-${params.month}-${params.day}`) throw notFound()
    return { slug: post.slug }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const to = `/blog/${loaderData.slug}/`
    return {
      meta: [{ httpEquiv: 'refresh', content: `0; url=${to}` }, { name: 'robots', content: 'noindex' }],
      links: [{ rel: 'canonical', href: `https://www.mortondev.com${to}` }],
    }
  },
  component: LegacyRedirect,
})

function LegacyRedirect() {
  const { slug } = Route.useLoaderData()
  return (
    <p className="pt-10 text-ink-2">
      This post has moved to{' '}
      <Link to="/blog/$slug/" params={{ slug }} className="a">
        its new home
      </Link>
      .
    </p>
  )
}
