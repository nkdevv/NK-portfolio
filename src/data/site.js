/**
 * Single source of truth for site identity.
 *
 * Imported by the runtime SEO hook AND by vite.config.js at build time (to
 * inject structured data into index.html), so it must stay free of JSX and of
 * the "@" alias — plain ESM only.
 *
 * ── REPLACE BEFORE LAUNCH ──────────────────────────────────────────────────
 * SITE_ORIGIN must be the real production origin, with no trailing slash, and
 * BASE_PATH must match the repository name. Canonical tags, og:url, asset
 * URLs, the sitemap and the structured data are all derived from them, so an
 * incorrect value here is wrong everywhere at once.
 */
export const SITE_ORIGIN = "https://nkdevv.github.io";

/**
 * Sub-path the site is served from: leading slash, no trailing slash. Empty
 * string for a root deployment.
 *
 * This is a GitHub Pages *project site*, which serves from
 * <user>.github.io/<repo>/ rather than from the origin root. That prefix is
 * not cosmetic — it has to appear in the Vite base, the router basename, every
 * public-directory asset URL, every canonical, the sitemap and the JSON-LD
 * @ids. Defining it once is what stops those six places from disagreeing.
 *
 * Must match the repository name exactly, including case.
 *
 * Switching to a custom domain later means setting this to '' and updating
 * SITE_ORIGIN. Nothing else needs to change.
 */
export const BASE_PATH = "/NK-portfolio";

/** Origin plus sub-path — the public root of the site. */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * Prefixes an app-relative path with the deployment sub-path.
 *
 * Needed for anything the bundler cannot see: files served straight out of
 * public/, and hrefs that trigger a real navigation rather than a client-side
 * route change. Vite rewrites asset URLs it parses at build time, but a string
 * literal inside a component is opaque to it, so '/profile.jpeg' would resolve
 * against the origin root and 404.
 *
 * Do NOT use this for react-router <Link to>. The router applies its own
 * basename, so prefixing first yields /portfolio/portfolio/...
 */
export function basePath(path = "/") {
  if (!BASE_PATH) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_NAME = "Nirmal Kumar Umapathi";
export const SITE_TITLE = "Freelance AI Frontend Engineer";

export const SITE_DESCRIPTION =
  "Freelance AI frontend engineer in Chennai. RAG and LLM integration, React and Next.js development, performance optimization, workflow automation, technical SEO and hosting setup.";

/**
 * Social cards must be raster. No platform renders an SVG og:image — they fall
 * back to no preview image at all. Regenerate with `npm run images`.
 */
export const OG_IMAGE = "/og.png";
export const OG_IMAGE_ALT =
  "Nirmal Kumar Umapathi — AI features and frontends, built to ship.";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
