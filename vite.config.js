import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { services } from './src/data/services.js'
import { profile } from './src/data/profile.js'
import { indexableRoutes, routes } from './src/data/routes.js'
import {
  BASE_PATH,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  basePath,
} from './src/data/site.js'

const src = fileURLToPath(new URL('./src', import.meta.url))

/**
 * Injects JSON-LD into index.html at build time.
 *
 * Structured data has to be present in the static HTML to be reliable, but the
 * service catalogue lives in src/data/services.js. Hand-maintaining a second
 * copy inside index.html guarantees the two drift apart — which is exactly how
 * the page copy ended up claiming "four services" after a fifth and sixth were
 * added. Generating it from the same module removes that failure mode.
 */
function structuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        url: SITE_URL,
        // Deliberately no telephone. Including it would publish the number in
        // machine-readable form on every page; the contact page is the only
        // place it belongs.
        email: `mailto:${profile.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: profile.education.institution,
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name: profile.certification.name,
          recognizedBy: { '@type': 'Organization', name: profile.certification.issuer },
        },
        knowsAbout: [
          'React',
          'TypeScript',
          'Next.js',
          'Retrieval-Augmented Generation',
          'LLM Integration',
          'AWS Bedrock',
          'Frontend Performance Engineering',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: `${profile.name} — ${SITE_TITLE}`,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: absoluteUrl('/og.png'),
        founder: { '@id': `${SITE_URL}/#person` },
        provider: { '@id': `${SITE_URL}/#person` },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'AdministrativeArea', name: 'Worldwide (remote)' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressCountry: 'IN',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Freelance services',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            url: absoluteUrl(`/services/${service.slug}`),
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.summary,
              serviceType: service.name,
              provider: { '@id': `${SITE_URL}/#person` },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en',
      },
    ],
  }

  return {
    name: 'inject-structured-data',
    transformIndexHtml(html) {
      // The origin-bearing tags in index.html are rewritten from site.js
      // rather than trusted as written. They were authored against a different
      // domain, and a stale absolute URL in the static head is invisible in
      // testing — the runtime SEO hook corrects it for browsers, so only the
      // social scrapers, which do not run JavaScript, would ever see it wrong.
      let rebased = withHead(html, {
        canonical: absoluteUrl('/'),
        og: { 'og:url': absoluteUrl('/'), 'og:image': absoluteUrl(OG_IMAGE) },
        name: { 'twitter:image': absoluteUrl(OG_IMAGE) },
      })

      // Vite rewrites root-absolute URLs in index.html for the attributes it
      // knows carry assets, but rel="manifest" is not one of them — the href
      // is left as authored. Under a sub-path deployment that resolves to the
      // origin root and 404s, taking the icons and install metadata with it.
      // Verified by diffing the emitted head against the authored one.
      rebased = rebased.replace(
        /(<link\s[^>]*rel="manifest"[^>]*href=")\/([^"]*")/,
        (_, before, after) => `${before}${basePath('/')}${after}`
      )

      return rebased.replace(
        '<!--structured-data-->',
        `<script type="application/ld+json">${JSON.stringify(graph)}</script>`
      )
    },
  }
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

/**
 * Rewrites the content attribute of an existing meta tag, matched by its
 * identifying attribute.
 *
 * Tolerates the tag being spread over several lines, which prettier does to
 * the long ones in index.html — `[^>]` matches newlines, so no `s` flag is
 * needed and the match still cannot run past the end of the tag.
 *
 * A missing tag is left missing rather than appended. Every tag this is asked
 * to touch already exists in index.html; silently creating one would hide the
 * fact that the template had drifted.
 */
function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`<meta\\s[^>]*${attr}="${key}"[^>]*>`)
  const tag = html.match(pattern)
  if (!tag) return html
  const updated = tag[0].replace(/content="[^"]*"/, `content="${escapeAttr(value)}"`)
  return html.replace(pattern, () => updated)
}

/**
 * Applies a set of head edits to an HTML document.
 *
 * `robots` is handled differently from the rest: index.html has no robots tag,
 * because the default is to be indexable. So it is inserted when needed rather
 * than rewritten, and never removed — a prerendered file is generated fresh
 * from the template each time, so there is nothing stale to clear.
 */
function withHead(
  html,
  { title, description, canonical, stripCanonical, robots, og = {}, name = {} }
) {
  let out = html

  // Used by 404.html, which has no canonical URL to claim. Leaving the
  // template's tags in place would hand the homepage's canonical to the
  // not-found page — telling Google that every dead URL *is* the homepage.
  // Same reasoning as the pathless branch in src/lib/seo.js.
  if (stripCanonical) {
    out = out.replace(/[ \t]*<link\s[^>]*rel="canonical"[^>]*>\n?/, '')
    out = out.replace(/[ \t]*<meta\s[^>]*property="og:url"[^>]*>\n?/, '')
  }

  if (title) {
    out = out.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(title)}</title>`)
    out = setMeta(out, 'property', 'og:title', title)
    out = setMeta(out, 'name', 'twitter:title', title)
  }

  if (description) {
    out = setMeta(out, 'name', 'description', description)
    out = setMeta(out, 'property', 'og:description', description)
    out = setMeta(out, 'name', 'twitter:description', description)
  }

  if (canonical) {
    out = out.replace(
      /<link\s[^>]*rel="canonical"[^>]*>/,
      () => `<link rel="canonical" href="${escapeAttr(canonical)}" />`
    )
    out = setMeta(out, 'property', 'og:url', canonical)
  }

  for (const [key, value] of Object.entries(og)) out = setMeta(out, 'property', key, value)
  for (const [key, value] of Object.entries(name)) out = setMeta(out, 'name', key, value)

  if (robots) {
    out = out.replace('</head>', `  <meta name="robots" content="${escapeAttr(robots)}" />\n  </head>`)
  }

  return out
}

/**
 * Writes a real HTML file for every route, plus a 404 fallback.
 *
 * GitHub Pages cannot rewrite URLs. The usual single-page workaround is to
 * copy index.html to 404.html and let the not-found handler serve the app —
 * which does render the right page, but answers with HTTP 404. Google does not
 * index a 404, so that trick would quietly cost the site every URL except the
 * homepage. Since the route list is known at build time, the honest fix is to
 * emit an actual file at each path so the server returns 200 without needing
 * to rewrite anything.
 *
 * Each file is the same SPA shell with a different head. The body is still
 * hydrated by React on load; what the static file buys is the status code, and
 * correct per-route metadata for the social scrapers that never run the JS.
 *
 * 404.html is still written, for paths that genuinely do not exist. It carries
 * noindex so a mistyped URL cannot enter the index.
 */
function prerenderRoutes() {
  let outDir = 'dist'

  return {
    name: 'prerender-routes',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const template = await readFile(resolve(outDir, 'index.html'), 'utf8')

      const written = []
      for (const route of routes) {
        // The homepage is index.html, already emitted by Vite and already
        // carrying the right head from transformIndexHtml.
        if (route.path === '/') continue

        const html = withHead(template, {
          title: `${route.title} | ${SITE_NAME}`,
          description: route.description,
          canonical: absoluteUrl(route.path),
          robots: route.noindex ? 'noindex, follow' : undefined,
        })

        // Directory + index.html, not "<route>.html". Pages serves
        // /services/seo/ from /services/seo/index.html, and serving it from
        // services/seo.html would require the extensionless-URL handling that
        // Pages only applies to top-level files.
        const dir = resolve(outDir, `.${route.path}`)
        await mkdir(dir, { recursive: true })
        await writeFile(resolve(dir, 'index.html'), html)
        written.push(route.path)
      }

      await writeFile(
        resolve(outDir, '404.html'),
        withHead(template, {
          title: `Page not found | ${SITE_NAME}`,
          description: 'This page could not be found.',
          stripCanonical: true,
          robots: 'noindex, follow',
        })
      )

      console.log(`\nprerendered ${written.length} routes + 404.html`)
    },
  }
}

/**
 * Emits sitemap.xml and robots.txt from the route list.
 *
 * Previously both were hand-written files in public/ carrying a hardcoded
 * origin and a hardcoded list of URLs. That is two more copies of information
 * that already exists in code, and the deployment sub-path would have had to
 * be pasted into all of them.
 *
 * Note for the project-site deployment: a robots.txt is only consulted at the
 * origin root, so https://user.github.io/robots.txt — which belongs to a
 * different repository — is the one crawlers actually read. The file emitted
 * here has no effect until the site moves to its own domain. Nothing depends
 * on it: /hire is kept out of search by its noindex meta tag, which is
 * per-page and works regardless, and the sitemap can be submitted to Search
 * Console by URL.
 */
function seoFiles() {
  return {
    name: 'emit-seo-files',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)

      const urls = indexableRoutes
        .map((route) =>
          [
            '  <url>',
            `    <loc>${absoluteUrl(route.path)}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            route.changefreq ? `    <changefreq>${route.changefreq}</changefreq>` : null,
            route.priority ? `    <priority>${route.priority}</priority>` : null,
            '  </url>',
          ]
            .filter(Boolean)
            .join('\n')
        )
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })

      // Generated for the same reason as the rest: every URL in it is
      // root-absolute, and under a sub-path deployment "/icon-192.png" points
      // outside the site. A manifest with unreachable icons and a start_url
      // that lands on someone else's page fails silently — nothing breaks
      // until an install is attempted.
      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: `${JSON.stringify(
          {
            name: `${SITE_NAME} — ${SITE_TITLE}`,
            short_name: 'Nirmal Kumar',
            description: SITE_DESCRIPTION,
            start_url: basePath('/'),
            scope: basePath('/'),
            display: 'minimal-ui',
            background_color: '#08090b',
            theme_color: '#08090b',
            icons: [
              { src: basePath('/icon-192.png'), sizes: '192x192', type: 'image/png' },
              { src: basePath('/icon-512.png'), sizes: '512x512', type: 'image/png' },
              { src: basePath('/favicon.svg'), sizes: 'any', type: 'image/svg+xml' },
            ],
          },
          null,
          2
        )}\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: [
          'User-agent: *',
          'Allow: /',
          '',
          '# The personal CV layer at /hire is not linked from the public site and',
          '# every page in it serves <meta name="robots" content="noindex, follow">.',
          '#',
          '# It is deliberately NOT disallowed. Disallow only blocks crawling, and a',
          '# blocked URL can still be listed as a bare link when something external',
          '# points at it. noindex is the directive that actually keeps a page out of',
          '# results — and the crawler has to be allowed to fetch the page to see it.',
          '',
          `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig({
  // Trailing slash is required. Vite concatenates this directly onto emitted
  // asset filenames, so '/portfolio' (without it) produces
  // '/portfolioassets/index.js'.
  base: `${BASE_PATH}/`,
  plugins: [react(), tailwindcss(), structuredData(), seoFiles(), prerenderRoutes()],
  resolve: {
    // Resolved relative to this file rather than the working directory, so the
    // build does not silently break when run from a parent directory.
    alias: { '@': src },
  },
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        // Matched on the resolved module id, not the package name written in
        // the import. The object form (`{ react: ['react', 'react-dom'] }`)
        // looks equivalent but silently misses `react-dom/client` — a
        // different id — which left the ~180kB reconciler inside the app
        // chunk, invalidated on every content change. Matching the
        // node_modules path segment catches every entry point of a package.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'react'
          }
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'motion'
          }
          return undefined
        },
      },
    },
  },
})
