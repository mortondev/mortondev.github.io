import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ExternalLink, Code2 } from 'lucide-react'

const projects = [
  {
    title: 'Quackback',
    description:
      'Open-source feedback platform for teams that ship. The alternative to Canny, UserVoice, and Productboard.',
    logo: '/images/quackback-logo.svg',
    links: [
      { label: 'Website', href: 'https://quackback.io' },
      { label: 'GitHub', href: 'https://github.com/QuackbackIO/quackback' },
    ],
  },
  {
    title: 'mortondev.com',
    description:
      'Personal dev blog and portfolio built with TanStack Start, shadcn/ui, and Tailwind CSS.',
    logo: '/images/mortondev-avatar.png',
    links: [
      { label: 'Website', href: 'https://mortondev.com' },
      {
        label: 'GitHub',
        href: 'https://github.com/mortondev/mortondev.github.io',
      },
    ],
  },
]

export const Route = createFileRoute('/projects/')({
  component: Projects,
})

function Projects() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Things I've built.</p>
      </div>
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="hover:bg-muted/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                {'logo' in project && project.logo ? (
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="h-12 w-12 rounded-lg"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Code2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
