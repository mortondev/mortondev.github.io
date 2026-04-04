import type { ComponentType } from 'react'

interface PostModule {
  default: ComponentType
  frontmatter: {
    title: string
    date: string
    description: string
    tags?: string[]
  }
}

const modules = import.meta.glob<PostModule>('../content/blog/*.mdx', {
  eager: true,
})

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
}

export interface Post extends PostMeta {
  Component: ComponentType
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      slug: path.split('/').pop()!.replace('.mdx', ''),
      ...mod.frontmatter,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.mdx`),
  )
  if (!entry) return null
  const [, mod] = entry
  return {
    slug,
    Component: mod.default,
    ...mod.frontmatter,
  }
}
