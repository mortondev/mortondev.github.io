import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllPosts } from '@/lib/posts'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const posts = getAllPosts()

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-5">
        <img
          src="/images/mortondev-avatar.png"
          alt="James Morton"
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">James Morton</h1>
          <p className="text-muted-foreground">
            Software Developer from Nottinghamshire, UK.
            Building{' '}
            <a
              href="https://quackback.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
            >
              Quackback
            </a>
            .
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Posts</h2>
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block py-4 -mx-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium group-hover:text-foreground transition-colors">
                  {post.title}
                </h3>
                <time
                  dateTime={post.date}
                  className="text-sm text-muted-foreground shrink-0"
                >
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </time>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
