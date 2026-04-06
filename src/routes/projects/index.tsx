import { createFileRoute } from '@tanstack/react-router'
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
    <div className="space-y-16">
      <div>
        <h1 className="text-xl font-semibold">Projects</h1>
        <p className="mt-1.5 text-[0.935rem] text-muted-foreground">
          Things I've built.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border hover:bg-muted/30"
          >
            <div className="flex items-start gap-4">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="h-10 w-10 rounded-lg"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Code2 className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold leading-snug">{project.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-3 flex gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
