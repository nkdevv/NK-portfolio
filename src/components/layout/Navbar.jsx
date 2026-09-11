import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { layerLinks, navFor } from '@/data/navigation'
import { profile } from '@/data/profile'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'

function StatusDot() {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navbar() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const nav = navFor(location.pathname)
  const links = layerLinks(location.pathname)

  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  // Distinguishes "the user dismissed the menu" from "the menu closed because
  // we navigated". Only the former should send focus back to the toggle; on a
  // route change App.jsx is already moving focus to <main>, and two handlers
  // fighting over it means the announcement the user actually needs loses.
  const restoreFocus = useRef(false)

  useMotionValueEvent(scrollY, 'change', (latest) => setCompact(latest > 24))

  const close = useCallback((returnFocus = false) => {
    restoreFocus.current = returnFocus
    setOpen(false)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /**
   * Modal focus behaviour for the mobile menu.
   *
   * The panel covers the viewport, so without a trap Tab walks straight out of
   * it and into the page underneath — links the user cannot see, while the menu
   * still visually owns the screen. The toggle is deliberately the first stop
   * in the cycle: it lives in the header rather than inside the panel, and it
   * is the only way to close the menu with a pointer, so excluding it would
   * trap a keyboard user in a menu with no exit.
   */
  useEffect(() => {
    if (!open) {
      if (restoreFocus.current) {
        restoreFocus.current = false
        toggleRef.current?.focus()
      }
      return undefined
    }

    const items = () => {
      const inPanel = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll(FOCUSABLE))
        : []
      return [toggleRef.current, ...inPanel].filter(Boolean)
    }

    // Focus the first link rather than the toggle, so the first thing
    // announced is the menu's content and not the button just activated.
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        close(true)
        return
      }
      if (event.key !== 'Tab') return

      const list = items()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-80 transition-[padding] duration-500',
          compact ? 'pt-2' : 'pt-4 sm:pt-6'
        )}
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between gap-4 rounded-full border transition-all duration-500',
              compact
                ? 'border-line bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] px-3 py-2 shadow-soft backdrop-blur-xl sm:px-4'
                : 'border-transparent bg-transparent px-0 py-2.5'
            )}
          >
            <Link
              to={links.home}
              className="group flex items-baseline gap-px rounded-full px-2 py-1 text-[1.15rem] font-medium tracking-[-0.04em] text-ink"
              aria-label={`${profile.name} — home`}
            >
              {profile.initials}
              <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 -z-10 rounded-full border border-line bg-surface"
                            transition={{ duration: 0.4, ease: EASE }}
                          />
                        )}
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.11em] text-muted xl:inline-flex">
                <StatusDot />
                {links.status}
              </span>
              <ThemeToggle />
              <Link
                to={links.contact}
                className="hidden h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[0.8125rem] font-medium text-bg transition-opacity duration-300 hover:opacity-88 sm:inline-flex"
              >
                {links.ctaLabel}
                <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => (open ? close(false) : setOpen(true))}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls={open ? 'mobile-menu' : undefined}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
              >
                {open ? <X size={16} strokeWidth={1.8} /> : <Menu size={16} strokeWidth={1.8} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-70 bg-bg lg:hidden"
          >
            <div className="grid-field mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
            <div className="shell relative flex h-full flex-col pt-28 pb-10">
              {/*
                The links need their own landmark. The <nav aria-label="Primary">
                in the header wraps the desktop list only, so on mobile these
                were a bare <ul> — invisible to landmark navigation, which is how
                screen reader users jump to the menu in the first place.
              */}
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE }}
                      className="border-b border-line"
                    >
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            'flex items-baseline gap-4 py-5 text-[1.75rem] font-medium tracking-[-0.03em] transition-colors',
                            isActive ? 'text-ink' : 'text-soft'
                          )
                        }
                      >
                        <span className="label text-accent">{item.index}</span>
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36, duration: 0.5 }}
                className="mt-auto space-y-4 pt-10"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.11em] text-muted">
                  <StatusDot />
                  {links.status}
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="block text-[1.05rem] text-ink underline decoration-line-strong underline-offset-4"
                >
                  {profile.email}
                </a>
                <p className="text-sm text-muted">{profile.location}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
