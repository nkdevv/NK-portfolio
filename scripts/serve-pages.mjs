/**
 * Serves dist/ the way GitHub Pages does, so the deployment can be checked
 * before it is pushed.
 *
 * `vite preview` is not a substitute. It applies a single-page fallback —
 * every unmatched path gets index.html with a 200 — which is exactly the
 * behaviour GitHub Pages does *not* have. Under that fallback a missing
 * prerendered route looks perfectly healthy locally and 404s in production.
 * This server does what Pages does instead:
 *
 *   - everything is mounted under the base path, and a request outside it 404s
 *   - a directory resolves to its index.html, or 404s if there isn't one
 *   - unmatched paths get 404.html with a real 404 status, not a 200
 *
 * Which means a route missing from the prerender list fails here the same way
 * it would fail live.
 *
 * Usage: npm run preview:pages
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE_PATH } from '../src/data/site.js'

const dist = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
const port = Number(process.env.PORT) || 4173

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

async function resolveFile(pathname) {
  // normalize collapses any ".." before it is joined, so a crafted path cannot
  // escape dist/.
  const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '')
  const target = join(dist, rel)
  if (!target.startsWith(dist)) return null

  try {
    const info = await stat(target)
    if (info.isDirectory()) {
      const index = join(target, 'index.html')
      await stat(index)
      return index
    }
    return target
  } catch {
    return null
  }
}

function send(res, status, file) {
  res.writeHead(status, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  })
  createReadStream(file).pipe(res)
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${port}`)

  if (BASE_PATH && !pathname.startsWith(BASE_PATH)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`Not found. The site is served from ${BASE_PATH}/\n`)
    return
  }

  const file = await resolveFile(pathname.slice(BASE_PATH.length) || '/')
  if (file) {
    send(res, 200, file)
    return
  }

  const notFound = await resolveFile('/404.html')
  if (notFound) {
    send(res, 404, notFound)
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Not found\n')
}).listen(port, () => {
  console.log(`Serving dist/ as GitHub Pages would: http://localhost:${port}${BASE_PATH}/`)
})
