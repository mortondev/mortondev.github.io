import { createFileRoute, Link } from '@tanstack/react-router'
import { getPost } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
    <article className="py-2">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to blog
      </Link>
      <div className="space-y-2 mb-4">
        <time dateTime={date} className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <Separator className="my-6" />
      <div className="prose dark:prose-invert max-w-none">
        <Component />
      </div>
    </article>
  )
}
