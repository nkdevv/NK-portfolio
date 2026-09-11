import { useEffect } from 'react'
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
  canonicalUrl,
} from '@/data/site'

function upsertMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) ?? []
    if (key && val) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps document metadata in sync with the active route.
 *
 * @param {object}  options
 * @param {string}  [options.title]        Page title, prefixed onto the site name.
 * @param {string}  [options.description]  Meta and social description.
 * @param {string}  [options.path]         Route path; drives canonical and og:url.
 * @param {boolean} [options.noindex]      Ask crawlers to keep this page out of results.
 */
export function useSeo({ title, description, path, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TITLE}`
    document.title = fullTitle

    if (description) {
      upsertMeta('meta[name="description"]', 'content', description)
      upsertMeta('meta[property="og:description"]', 'content', description)
      upsertMeta('meta[name="twitter:description"]', 'content', description)
    }

    upsertMeta('meta[property="og:title"]', 'content', fullTitle)
    upsertMeta('meta[name="twitter:title"]', 'content', fullTitle)

    // Re-assert the social image on every route. Without this a client-side
    // navigation could leave a stale value behind, and it keeps the absolute
    // URL anchored to the production origin rather than whatever host is
    // serving the page.
    upsertMeta('meta[property="og:image"]', 'content', absoluteUrl(OG_IMAGE))
    upsertMeta('meta[property="og:image:alt"]', 'content', OG_IMAGE_ALT)
    upsertMeta('meta[name="twitter:image"]', 'content', absoluteUrl(OG_IMAGE))
    upsertMeta('meta[name="twitter:image:alt"]', 'content', OG_IMAGE_ALT)

    if (path) {
      // Built from the fixed production origin, never window.location.origin.
      // Preview and staging deployments serve the same bundle on a different
      // host; deriving the canonical from the runtime host makes every preview
      // self-canonicalise and compete with production in the index.
      const url = canonicalUrl(path)
      upsertMeta('meta[property="og:url"]', 'content', url)
      upsertLink('canonical', url)
    } else {
      // No path means there is no canonical URL to claim — the 404 page, or a
      // service slug that does not resolve. Leaving the tags in place would
      // hand the previous route's canonical to this one, telling Google that a
      // mistyped URL *is* the page it was last showing. Clearing is the only
      // honest answer; the static tag in index.html is included in the sweep
      // because it would otherwise reassert the homepage here.
      document.head.querySelector('link[rel="canonical"]')?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }

    // The CV layer is reachable by direct link but should not surface in search.
    // robots.txt alone cannot deliver that: disallowing a URL only stops the
    // crawl, and Google documents that a blocked URL can still be indexed as a
    // bare link when it is discovered elsewhere. Only a robots meta tag
    // actually removes it — and the page has to stay crawlable for that tag to
    // ever be read.
    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      upsertMeta('meta[name="robots"]', 'content', 'noindex, follow')
    } else if (robots) {
      robots.remove()
    }
  }, [title, description, path, noindex])
}
