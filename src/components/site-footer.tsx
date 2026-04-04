import { Github, Linkedin, Twitter } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/mortondev', icon: Github, label: 'GitHub' },
  {
    href: 'https://linkedin.com/in/mortondev',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  { href: 'https://twitter.com/mortondev', icon: Twitter, label: 'Twitter' },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0 max-w-screen-md mx-auto px-4">
        <p className="text-sm text-muted-foreground">James Morton</p>
        <div className="flex items-center space-x-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
