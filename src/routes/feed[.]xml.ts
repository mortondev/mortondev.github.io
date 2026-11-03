import { createFileRoute } from '@tanstack/react-router'
import { rssResponse } from '@/lib/rss'

// The original Jekyll feed URL, kept for existing subscribers.
export const Route = createFileRoute('/feed.xml')({
  server: { handlers: { GET: () => rssResponse('/feed.xml') } },
})
