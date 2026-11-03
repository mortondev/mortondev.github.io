import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeShiki from '@shikijs/rehype'
import remarkReadingTime from './scripts/remark-reading-time.ts'

const SITE = 'https://www.mortondev.com'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // MDX must compile before Start/React see the module
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkReadingTime, [remarkMdxFrontmatter, { name: 'frontmatter' }]],
        rehypePlugins: [
          [rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark-dimmed' }, defaultColor: false }],
        ],
      }),
    },
    tanstackStart({
      prerender: {
        enabled: true,
        // Pages are listed below with trailing slashes; crawling finds the posts.
        autoStaticPathsDiscovery: false,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
      },
      pages: [
        { path: '/', sitemap: { priority: 1 } },
        { path: '/about/' },
        { path: '/projects/' },
        { path: '/blog/' },
        ...[
          { path: '/rss.xml', outputPath: '/rss.xml' },
          { path: '/feed.xml', outputPath: '/feed.xml' },
          { path: '/404', outputPath: '/404.html' },
          // Original Jekyll permalinks → redirect pages
          { path: '/2015/09/22/safer-email-development-with-mailcatcher/' },
          { path: '/2015/11/05/unit-testing-datetime-now/' },
        ].map(({ path, outputPath }) => ({
          path,
          prerender: { enabled: true, outputPath },
          sitemap: { exclude: true },
        })),
      ],
      sitemap: { host: SITE },
    }),
    // must come after tanstackStart()
    viteReact({ include: /\.(mdx|[jt]sx?)$/ }),
  ],
})
