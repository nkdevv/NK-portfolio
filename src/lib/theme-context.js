import { createContext, useContext } from 'react'

export const STORAGE_KEY = 'nk-theme'
export const ThemeContext = createContext(null)

/**
 * localStorage access that cannot take the page down.
 *
 * Merely *touching* window.localStorage throws SecurityError when storage is
 * blocked — Safari private browsing, third-party iframe contexts, embedded
 * webviews, and Chrome's "block all cookies" setting. readInitialTheme() is
 * the useState initializer for ThemeProvider, so it runs during the very first
 * render: an uncaught throw there fails the root render and the visitor gets a
 * blank white page instead of the site. Losing the remembered theme is an
 * acceptable degradation; losing the whole site is not. The inline script in
 * index.html already guards the identical call.
 */
function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function writeStored(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage unavailable — the theme still applies for this session.
  }
}

/** Dark-first: only an explicit stored choice moves off the default. */
export function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = readStored()
  return stored === 'light' || stored === 'dark' ? stored : 'dark'
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
