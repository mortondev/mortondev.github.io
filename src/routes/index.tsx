import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllPosts } from '@/lib/posts'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const posts = getAllPosts()

  return (
    <div className="space-y-16">
      <div className="flex items-start gap-5">
        <img
          src="/images/mortondev-avatar.png"
          alt="James Morton"
          className="h-14 w-14 rounded-full ring-1 ring-border"
        />
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold">James Morton</h1>
          <p className="text-[0.935rem] leading-relaxed text-muted-foreground">
            Software developer from Nottinghamshire, UK.{' '}
            <br className="hidden sm:block" />
            Building{' '}
            <a
              href="https://quackback.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-border underline-offset-[3px] hover:decoration-foreground/40 transition-colors"
            >
              Quackback
            </a>
            , an open-source feedback platform.
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
          Writing
        </h2>
        <div className="space-y-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group -mx-3 flex items-baseline justify-between gap-4 rounded-lg px-3 py-3.5 transition-colors hover:bg-muted/60"
            >
              <div className="min-w-0">
                <h3 className="text-[0.935rem] font-medium leading-snug">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm leading-normal text-muted-foreground line-clamp-1">
                  {post.description}
                </p>
              </div>
              <time
                dateTime={post.date}
                className="shrink-0 text-sm tabular-nums text-muted-foreground"
              >
                {new Date(post.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                })}
              </time>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
