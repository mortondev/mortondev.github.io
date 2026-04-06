import { createFileRoute, Link } from '@tanstack/react-router'
import { getPost } from '@/lib/posts'
import { NotFound } from '@/components/not-found'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const post = getPost(slug)

  if (!post) return <NotFound />

  const { Component, title, date, tags } = post

  return (
    <article>
      <Link
        to="/"
        className="group mb-10 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <header className="mb-10">
        <time
          dateTime={date}
          className="text-sm text-muted-foreground"
        >
          {new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
          {title}
        </h1>
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:font-medium prose-a:underline prose-a:decoration-border prose-a:underline-offset-[3px] hover:prose-a:decoration-foreground/40 prose-pre:bg-muted prose-pre:text-foreground">
        <Component />
      </div>
    </article>
  )
}
