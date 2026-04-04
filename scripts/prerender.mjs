import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const PAGES = [
  '/',
  '/projects/',
  '/blog/safer-email-development-with-mailcatcher/',
  '/blog/unit-testing-datetime-now/',
]

const OUTPUT_DIR = '.output/public'

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 1000))
  }
  throw new Error(`Server at ${url} did not start after ${maxAttempts}s`)
}

async function prerender() {
  // Start the server
  const port = 4567
  const server = spawn('node', ['.output/server/index.mjs'], {
    env: { ...process.env, PORT: String(port) },
    stdio: 'pipe',
  })

  server.stderr.on('data', (d) => process.stderr.write(d))

  const baseUrl = `http://localhost:${port}`
  console.log(`Waiting for server at ${baseUrl}...`)
  await waitForServer(baseUrl)
  console.log('Server ready. Prerendering pages...')

  for (const page of PAGES) {
    const url = `${baseUrl}${page}`
    const res = await fetch(url)
    if (!res.ok) {
      console.error(`Failed to fetch ${page}: ${res.status}`)
      continue
    }

    const html = await res.text()
    const filePath = join(OUTPUT_DIR, page, 'index.html')
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, html)
    console.log(`  Prerendered: ${page}`)
  }

  server.kill()
  console.log(`Done! Prerendered ${PAGES.length} pages.`)
}

prerender().catch((err) => {
  console.error(err)
  process.exit(1)
})
