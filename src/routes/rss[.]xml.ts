import { createFileRoute } from '@tanstack/react-router'
import { rssResponse } from '@/lib/rss'

export const Route = createFileRoute('/rss.xml')({
  server: { handlers: { GET: () => rssResponse('/rss.xml') } },
})
