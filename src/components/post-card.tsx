import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PostCardProps {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
}

export function PostCard({
  slug,
  title,
  date,
  description,
  tags,
}: PostCardProps) {
  return (
    <Link to="/blog/$slug" params={{ slug }}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader>
          <time dateTime={date} className="text-sm text-muted-foreground">
            {new Date(date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
