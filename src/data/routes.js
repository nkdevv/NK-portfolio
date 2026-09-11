import { services } from './services.js'
import { SITE_DESCRIPTION } from './site.js'

/**
 * Every route the site answers, with the metadata that describes it.
 *
 * Imported by the page components at runtime AND by vite.config.js at build
 * time, so it must stay plain ESM — no JSX, no "@" alias.
 *
 * The reason this exists as its own module rather than living inline in each
 * page: GitHub Pages cannot rewrite URLs, so the build has to emit a real
 * static HTML file per route (see the prerender plugin). Those files need the
 * same title and description the page sets at runtime. Any arrangement where
 * the two are written out separately drifts — that is precisely how the copy
 * on the services page ended up claiming "four services" after a fifth and
 * sixth were added. One list, two consumers.
 *
 * `title` is omitted for the homepage, where useSeo falls back to the full
 * site title rather than prefixing a page name onto it.
 *
 * `noindex` marks the CV layer. It is reachable by direct link but must not
 * surface in search results.
 */
const staticRoutes = [
  {
    path: '/',
    description:
      'Freelance AI frontend engineer in Chennai. RAG and LLM integration, React and Next.js development, performance optimization and workflow automation.',
    changefreq: 'monthly',
    priority: '1.0',
  },
  {
    path: '/services',
    title: 'Services',
    description:
      'Freelance services — AI and RAG integration, React and Next.js development, frontend performance optimization, workflow automation, technical SEO, and domain and hosting setup.',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description:
      'Indicative freelance pricing for AI and RAG integration, React and Next.js development, performance optimization, workflow automation, technical SEO and hosting setup. Hourly and fixed-project ranges.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Start a freelance project with Nirmal Kumar Umapathi — AI and RAG integration, React and Next.js development, performance optimization, workflow automation, technical SEO and hosting setup.',
    changefreq: 'yearly',
    priority: '0.7',
  },

  // Hire layer — the personal CV. Crawlable so the noindex directive can be
  // read, but excluded from the sitemap.
  {
    path: '/hire',
    title: 'Hire me',
    description:
      'AI Frontend Engineer specializing in React, TypeScript, GenAI, RAG, AWS Bedrock and scalable web applications. Shipped work includes NativeWriter and GSV Drones.',
    noindex: true,
  },
  {
    path: '/hire/work',
    title: 'Work',
    description:
      'Case study of the C2C AI-powered learning platform — a React RAG chatbot on AWS Bedrock, internal tooling, performance and automation work.',
    noindex: true,
  },
  {
    path: '/hire/experience',
    title: 'Experience',
    description:
      'Career timeline of Nirmal Kumar Umapathi — Software Developer at Stringserve Technologies and Trainee Software Developer at Evolve Bizcon Services.',
    noindex: true,
  },
  {
    path: '/hire/skills',
    title: 'Skills',
    description:
      'Engineering stack — React, Next.js, TypeScript, Redux Toolkit, RAG, LLM integration, AWS Bedrock, Lambda, API Gateway, Jest and modern tooling.',
    noindex: true,
  },
  {
    path: '/hire/about',
    title: 'About',
    description:
      'AI-focused frontend engineer building scalable React interfaces, integrating GenAI systems on AWS, and turning ideas into working products.',
    noindex: true,
  },
  {
    path: '/hire/contact',
    title: 'Contact',
    description:
      'Get in touch with Nirmal Kumar Umapathi — AI Frontend Engineer based in Chennai, India. Available for opportunities.',
    noindex: true,
  },
]

/** Service detail pages, derived so a new service cannot be forgotten here. */
const serviceRoutes = services.map((service) => ({
  path: `/services/${service.slug}`,
  title: service.name,
  description: service.summary,
  changefreq: 'monthly',
  priority: '0.8',
}))

export const routes = [...staticRoutes, ...serviceRoutes]

/** Routes that belong in the sitemap: indexable ones only. */
export const indexableRoutes = routes.filter((route) => !route.noindex)

const byPath = new Map(routes.map((route) => [route.path, route]))

/**
 * Metadata for a path, shaped for useSeo().
 *
 * Falls back to the site description rather than returning undefined, so a
 * route added to the router but forgotten here degrades to generic copy
 * instead of inheriting whatever the previously rendered page set.
 */
export function routeMeta(path) {
  const route = byPath.get(path)
  if (!route) return { description: SITE_DESCRIPTION, path }
  return {
    title: route.title,
    description: route.description,
    path: route.path,
    noindex: Boolean(route.noindex),
  }
}
