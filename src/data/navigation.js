/**
 * The site is split into two layers with separate navigation.
 *
 * - Services layer (default, rooted at "/") is the freelance offering.
 * - Hire layer (rooted at "/hire") is the personal CV: work, experience, background.
 *
 * A visitor lands on the services layer and crosses into the hire layer through
 * the "Get hired" action in the footer.
 */

export const HIRE_ROOT = '/hire'

export const serviceNav = [
  { label: 'Services', to: '/services', index: '01' },
  { label: 'Pricing', to: '/pricing', index: '02' },
  { label: 'Contact', to: '/contact', index: '03' },
]

export const hireNav = [
  { label: 'Work', to: '/hire/work', index: '01' },
  { label: 'Experience', to: '/hire/experience', index: '02' },
  { label: 'Skills', to: '/hire/skills', index: '03' },
  { label: 'About', to: '/hire/about', index: '04' },
  { label: 'Contact', to: '/hire/contact', index: '05' },
]

export function isHireLayer(pathname) {
  return pathname === HIRE_ROOT || pathname.startsWith(`${HIRE_ROOT}/`)
}

export function navFor(pathname) {
  return isHireLayer(pathname) ? hireNav : serviceNav
}

/** Where the wordmark and the primary CTA point, plus the status wording, per layer. */
export function layerLinks(pathname) {
  return isHireLayer(pathname)
    ? {
        home: HIRE_ROOT,
        contact: '/hire/contact',
        ctaLabel: 'Get in touch',
        status: 'Open to roles',
      }
    : {
        home: '/',
        contact: '/contact',
        ctaLabel: 'Start a project',
        status: 'Available for projects',
      }
}
