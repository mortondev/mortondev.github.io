import { Suspense } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { formatDate, getAdjacent, getPostComponent, getPostMeta, preloadPost } from '@/lib/posts'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = getPostMeta(params.slug)
    if (!post) throw notFound()
    await preloadPost(params.slug)
    return { post }
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo({
          title: loaderData.post.title,
          description: loaderData.post.description,
          path: `/blog/${params.slug}/`,
          type: 'article',
          published: loaderData.post.date,
        })
      : {},
  component: BlogPost,
})

const STALE_AFTER_YEARS = 5

function BlogPost() {
  const { post } = Route.useLoaderData()
  const Body = getPostComponent(post.slug)!
  const { newer, older } = getAdjacent(post.slug)
  const age = new Date().getUTCFullYear() - Number(post.date.slice(0, 4))

  return (
    <article className="pt-10">
      <header>
        <h1 className="text-[1.75rem] leading-tight font-semibold sm:text-[2rem]">{post.title}</h1>
        <p className="mt-2 text-[0.95rem] text-ink-3">
          <time dateTime={post.date}>{formatDate.long(post.date)}</time> · {post.readingTime} min read
          {post.tags && post.tags.length > 0 && <> · {post.tags.join(', ')}</>}
        </p>
      </header>

      {age >= STALE_AFTER_YEARS && (
        <p className="mt-6 border-l-2 border-rule-strong pl-4 text-[0.95rem] text-ink-2 italic">
          I wrote this in {post.date.slice(0, 4)}. The idea still holds, but the tools and versions have moved on.
        </p>
      )}

      <div className="prose mt-8 max-w-none">
        <Suspense fallback={null}>
          <Body />
        </Suspense>
      </div>

      {(newer || older) && (
        <nav aria-label="More writing" className="mt-14 flex flex-col justify-between gap-3 border-t border-rule pt-6 text-[0.95rem] sm:flex-row">
          {older ? (
            <span>
              <span className="text-ink-3">Older: </span>
              <Link to="/blog/$slug/" params={{ slug: older.slug }} className="a">{older.title}</Link>
            </span>
          ) : (
            <span />
          )}
          {newer && (
            <span className="sm:text-right">
              <span className="text-ink-3">Newer: </span>
              <Link to="/blog/$slug/" params={{ slug: newer.slug }} className="a">{newer.title}</Link>
            </span>
          )}
        </nav>
      )}
    </article>
  )
}
