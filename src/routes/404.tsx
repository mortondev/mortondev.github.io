import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

// Prerendered to /404.html, which GitHub Pages serves for any missing path.
export const Route = createFileRoute('/404')({
  head: () => ({ meta: [{ title: 'Not found · James Morton' }, { name: 'robots', content: 'noindex' }] }),
  component: NotFound,
})
