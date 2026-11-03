import { createFileRoute } from '@tanstack/react-router'
import { PostList } from '@/components/post-list'
import { getPosts, type PostMeta } from '@/lib/posts'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () => seo({ title: 'Writing', path: '/blog/', description: 'Everything James Morton has written, newest first.' }),
  component: Archive,
})

function byYear(posts: PostMeta[]) {
  const years = new Map<string, PostMeta[]>()
  for (const p of posts) years.set(p.date.slice(0, 4), [...(years.get(p.date.slice(0, 4)) ?? []), p])
  return [...years.entries()]
}

function Archive() {
  const posts = getPosts()
  return (
    <>
      <h1 className="pt-10 text-[1.4rem] font-semibold">Writing</h1>
      <p className="mt-2 text-ink-2">
        Everything I’ve written, newest first. You can also follow along with{' '}
        <a href="/rss.xml" className="a">RSS</a>.
      </p>
      {byYear(posts).map(([year, list]) => (
        <section key={year} className="mt-10" aria-labelledby={`y${year}`}>
          <h2 id={`y${year}`} className="h2">
            {year}
          </h2>
          <PostList posts={list} showYear={false} />
        </section>
      ))}
    </>
  )
}
