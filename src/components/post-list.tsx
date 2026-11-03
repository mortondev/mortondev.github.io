import { Link } from '@tanstack/react-router'
import type { PostMeta } from '@/lib/posts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`

export function PostList({ posts, showYear = true }: { posts: PostMeta[]; showYear?: boolean }) {
  return (
    <ul className="mt-3">
      {posts.map((p) => (
        <li key={p.slug} className="flex flex-col gap-x-6 py-1.5 sm:flex-row sm:items-baseline">
          <time dateTime={p.date} className="date shrink-0 sm:w-24">
            {showYear ? month(p.date) : month(p.date).split(' ')[0]}
          </time>
          <Link to="/blog/$slug/" params={{ slug: p.slug }} className="a">
            {p.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
