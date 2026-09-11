/**
 * Shared motion primitives.
 *
 * This file previously also exported fadeUp / fadeIn / scaleIn / stagger /
 * pageTransition variant objects. None had a single call site: components
 * settled on <Reveal> for scroll entrances and inline variants for the few
 * bespoke cases, and App.jsx declares the page transition inline because it
 * needs to branch on useReducedMotion(). Keeping them around implied a shared
 * animation vocabulary that the codebase does not actually use.
 */

/** Quint-out. The single easing curve the whole site animates on. */
export const EASE = [0.16, 1, 0.3, 1]

/**
 * Scroll-entrance viewport config. The negative bottom margin delays the
 * trigger until the element is ~12% into the viewport, so content does not
 * animate in while still visually below the fold.
 */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' }
