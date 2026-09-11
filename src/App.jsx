import { Suspense, lazy, useCallback, useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RouteLoader from '@/components/layout/RouteLoader'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Cursor from '@/components/ui/Cursor'
import ServicesHome from '@/pages/ServicesHome'

const Services = lazy(() => import('@/pages/Services'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Pricing = lazy(() => import('@/pages/Pricing'))

const Home = lazy(() => import('@/pages/Home'))
const Work = lazy(() => import('@/pages/Work'))
const Experience = lazy(() => import('@/pages/Experience'))
const Skills = lazy(() => import('@/pages/Skills'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/**
 * The CV used to live at the root. These are resolved before the animated tree
 * renders — a <Navigate> inside AnimatePresence swaps the transition key
 * mid-flight and leaves the incoming page stuck at opacity 0.
 */
const LEGACY_ROUTES = {
  '/work': '/hire/work',
  '/experience': '/hire/experience',
  '/skills': '/hire/skills',
  '/about': '/hire/about',
}

/**
 * Scroll and focus handling for a route change.
 *
 * Deliberately rendered *inside* the keyed transition element. With
 * AnimatePresence mode="wait" the outgoing page stays mounted for the length of
 * its exit animation, so an effect that lives above the transition fires while
 * the old page is still on screen — visibly snapping the old content to the top
 * before it fades out. Mounting with the incoming page gets the timing right.
 */
function RouteTransition({ hash, mainRef, isInitial }) {
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))

      const seek = () => {
        const target = document.getElementById(id)
        if (!target) return false
        // 'instant', not 'auto'. 'auto' does not mean "jump" — it means "defer
        // to CSS scroll-behavior", and index.css sets that to smooth on
        // <html>. That turned arriving at a deep link into a multi-thousand
        // pixel animation that the next render cancelled, leaving the page
        // sitting at the top. Smooth belongs to anchor clicks within a page,
        // not to landing on one from outside it. scroll-margin-top on Section
        // keeps the heading clear of the fixed navbar.
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        return true
      }

      // The target usually exists already. When it does not, it is because the
      // route is lazily loaded and its chunk has not resolved — so wait for the
      // DOM to change rather than polling.
      //
      // This deliberately does not use requestAnimationFrame: rAF does not fire
      // while the document is hidden, so opening a deep link in a background
      // tab would leave the scroll pending indefinitely. A MutationObserver
      // fires regardless of visibility, and fires exactly when the content
      // commits instead of burning frames until it does.
      if (seek()) return undefined

      let timer
      const observer = new MutationObserver(() => {
        if (seek()) stop()
      })
      const stop = () => {
        observer.disconnect()
        clearTimeout(timer)
      }
      observer.observe(document.body, { childList: true, subtree: true })
      // Backstop for a hash that names nothing, so the observer is not left
      // watching every mutation on the page for the rest of the session.
      timer = setTimeout(stop, 10000)
      return stop
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return undefined
  }, [hash])

  useEffect(() => {
    // Move focus to the page container on navigation. Without this, activating
    // a link unmounts the element that had focus, focus falls back to <body>,
    // and keyboard users restart from the top of the document with no
    // indication that the page changed. Skipped on first load, where the
    // browser's own initial focus is correct.
    if (isInitial) return
    mainRef.current?.focus({ preventScroll: true })
  }, [isInitial, mainRef])

  return null
}

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const mainRef = useRef(null)
  const hasNavigated = useRef(false)

  useEffect(() => {
    hasNavigated.current = true
  }, [location.pathname])

  // Firefox and Safari move the URL fragment but not focus, which makes a skip
  // link a no-op there: the next Tab re-enters the navbar it was meant to skip.
  // Focusing the target explicitly is the only portable fix.
  const handleSkip = useCallback((event) => {
    event.preventDefault()
    const main = mainRef.current
    if (!main) return
    main.focus({ preventScroll: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const legacyTarget = LEGACY_ROUTES[location.pathname]
  if (legacyTarget) return <Navigate to={legacyTarget} replace />

  return (
    <>
      <a
        href="#main"
        onClick={handleSkip}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Cursor />
      <Navbar />

      {/*
        tabIndex={-1} makes this programmatically focusable, which both the skip
        link and the post-navigation focus reset depend on. outline-none is safe
        here because focus is being moved for assistive tech, not by the user.
      */}
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <RouteTransition
              hash={location.hash}
              mainRef={mainRef}
              isInitial={!hasNavigated.current}
            />
            <ErrorBoundary resetKey={location.pathname}>
              <Suspense fallback={<RouteLoader />}>
                <Routes location={location}>
                  {/* Services layer — the default face of the site. */}
                  <Route path="/" element={<ServicesHome />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Hire layer — the personal CV, reached by direct link only. */}
                  <Route path="/hire" element={<Home />} />
                  <Route path="/hire/work" element={<Work />} />
                  <Route path="/hire/experience" element={<Experience />} />
                  <Route path="/hire/skills" element={<Skills />} />
                  <Route path="/hire/about" element={<About />} />
                  <Route path="/hire/contact" element={<Contact />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
