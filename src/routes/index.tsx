import { createFileRoute, Link } from '@tanstack/react-router'
import { CommitChart } from '@/components/commit-chart'
import { PostList } from '@/components/post-list'
import { site } from '@/data/site'
import { getPosts } from '@/lib/posts'
import { getSiteData, useLiveSiteData } from '@/lib/github'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/')({
  loader: () => getSiteData(),
  head: () => seo({ path: '/' }),
  component: Home,
})

const ext = { target: '_blank', rel: 'noopener' } as const

function Home() {
  const { stats, activity, live, builtAt } = useLiveSiteData(Route.useLoaderData())
  const posts = getPosts()

  return (
    <>
      <section className="pt-10">
        <img src={site.avatar} alt="James Morton" width={400} height={400} className="size-20 rounded-md" />
        <h1 className="mt-6 text-[1.4rem] leading-snug font-semibold">
          I’m James, a DevOps engineer and software developer in Nottingham.
        </h1>
        <div className="mt-4 space-y-4 text-ink-2">
          <p>
            Part of my week I’m Lead DevOps Engineer at{' '}
            <a href="https://www.storefeeder.com" className="a" {...ext}>
              StoreFeeder
            </a>
            , which builds and maintains software for Royal Mail, including Click &amp; Drop and Send an item. I’m
            responsible for our platform infrastructure. The rest of my week goes on{' '}
            <a href="https://quackback.io" className="a" {...ext}>
              Quackback
            </a>
            , an open-source customer feedback tool I started in December 2025.
          </p>
          <p>
            I’ve had this site since 2015. It’s where I write about infrastructure, testing and whatever I’m building.
            There’s more <Link to="/about/" className="a">about me</Link> if you’re curious.
          </p>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="qb">
        <h2 id="qb" className="h2">
          Quackback
        </h2>
        <p className="mt-2 text-ink-2">
          A self-hostable alternative to Canny and UserVoice: feedback boards, a public roadmap, a changelog and a help
          centre, with native SDKs for iOS and Android. It’s {stats.license} licensed, has{' '}
          {stats.stars.toLocaleString('en-GB')} stars on GitHub, and the latest release is {stats.release}.
        </p>
        <img
          src="/images/quackback-screenshot.webp"
          alt="Quackback’s public feedback portal, listing feature requests with vote counts"
          width={960}
          height={617}
          className="mt-6 w-full rounded-md"
        />
        <CommitChart data={activity} />
        <p className="-mt-3 mb-5 text-[0.85rem] text-ink-3">
          {live ? 'Figures fetched live from GitHub.' : `Figures from GitHub as of ${builtAt}.`}
        </p>
        <p className="flex gap-5 text-[0.95rem]">
          <a href="https://quackback.io" className="a" {...ext}>quackback.io</a>
          <a href="https://github.com/QuackbackIO/quackback" className="a" {...ext}>GitHub</a>
          <Link to="/projects/" className="a">More projects</Link>
        </p>
      </section>

      <section className="mt-14" aria-labelledby="writing">
        <h2 id="writing" className="h2">
          Writing
        </h2>
        <PostList posts={posts.slice(0, 6)} />
        {posts.length > 6 && (
          <p className="mt-3 text-[0.95rem]">
            <Link to="/blog/" className="a">All posts</Link>
          </p>
        )}
      </section>
    </>
  )
}
