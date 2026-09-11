import { Component } from 'react'
import { basePath } from '@/data/site'

/**
 * Distinguishes a stale-deploy chunk failure from a genuine render error.
 *
 * After a redeploy the hashed chunk filenames change. A browser still running
 * the previous index.html will request a chunk that no longer exists, and the
 * dynamic import rejects. That is not a bug in the page — the fix is simply to
 * reload and pick up the new manifest.
 */
function isStaleChunkError(error) {
  const message = `${error?.name ?? ''} ${error?.message ?? ''}`
  return (
    /ChunkLoadError/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /Importing a module script failed/i.test(message) ||
    /error loading dynamically imported module/i.test(message)
  )
}

const RELOAD_FLAG = 'nk-chunk-reload'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidUpdate(prevProps) {
    // Clear the error when the route changes so a single broken page does not
    // trap the user on the fallback for the rest of the session.
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  componentDidCatch(error, info) {
    if (isStaleChunkError(error)) {
      // Reload once, guarded, so a genuinely missing chunk cannot become an
      // infinite reload loop.
      let alreadyTried = true
      try {
        alreadyTried = sessionStorage.getItem(RELOAD_FLAG) === '1'
        if (!alreadyTried) sessionStorage.setItem(RELOAD_FLAG, '1')
      } catch {
        // Storage unavailable — skip the auto-reload rather than risk looping.
      }
      if (!alreadyTried) {
        window.location.reload()
        return
      }
    }

    if (import.meta.env.DEV) {
      console.error('Unhandled render error:', error, info?.componentStack)
    }
  }

  handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    const stale = isStaleChunkError(error)

    return (
      <div className="shell flex min-h-[70vh] flex-col justify-center py-24">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
          {stale ? 'New version available' : 'Something broke'}
        </p>
        <h1 className="mt-6 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-medium leading-[1.1] tracking-[-0.04em]">
          {stale ? 'This page was updated.' : 'This page failed to load.'}
        </h1>
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-soft">
          {stale
            ? 'A new version of the site shipped while this tab was open. Reloading will pick it up.'
            : 'Something went wrong rendering this page. The rest of the site still works.'}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-bg transition-opacity duration-300 hover:opacity-88"
          >
            Reload the page
          </button>
          {/*
            A plain <a>, not a <Link>: the boundary is showing because the
            React tree below it failed, so a client-side navigation would
            re-render into the same broken state. This forces a full document
            load. Because it bypasses the router it also bypasses the router's
            basename, so the sub-path has to be applied by hand.
          */}
          <a
            href={basePath('/')}
            className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[0.9375rem] transition-colors duration-300 hover:border-line-strong"
          >
            Go to the homepage
          </a>
          {!stale && (
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex h-11 items-center px-2 text-[0.9375rem] text-muted underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-ink"
            >
              Try again
            </button>
          )}
        </div>

        {import.meta.env.DEV && (
          <pre className="mt-10 max-w-full overflow-x-auto rounded-xl border border-line bg-elevated p-5 text-[0.75rem] leading-relaxed text-muted">
            {error.stack || String(error)}
          </pre>
        )}
      </div>
    )
  }
}
