import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useCoarsePointer } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:opacity-50'

const variants = {
  primary:
    'bg-ink text-bg hover:bg-[color-mix(in_oklab,var(--ink)_86%,var(--accent))] shadow-[0_10px_30px_-12px_var(--glow)]',
  outline:
    'border border-line-strong bg-surface text-ink backdrop-blur-sm hover:border-[color-mix(in_oklab,var(--accent)_55%,var(--line-strong))] hover:bg-[color-mix(in_oklab,var(--accent)_9%,transparent)]',
  ghost: 'text-soft hover:text-ink',
}

const sizes = {
  sm: 'h-9 px-4',
  md: 'h-11 px-5',
  lg: 'h-12 px-6 text-[0.9375rem]',
}

const MAGNET_SPRING = { stiffness: 260, damping: 22, mass: 0.5 }

/**
 * Magnetic pointer effect — the control drifts a few pixels toward the cursor.
 * Skipped for reduced-motion preferences and coarse pointers.
 *
 * Driven by motion values rather than component state. The previous version
 * called setOffset({ x, y }) on every mousemove, and because that is a fresh
 * object each time React could never bail out — so a single hover re-rendered
 * the button, and everything inside it, at pointer-event frequency. Motion
 * values write to the transform directly and skip React entirely. The
 * per-event window.matchMedia() call is gone for the same reason: it allocated
 * a MediaQueryList per mousemove to answer a question that only changes when
 * the input device does.
 */
function useMagnetic(strength) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, MAGNET_SPRING)
  const springY = useSpring(y, MAGNET_SPRING)

  const enabled = strength !== 0 && !reduce && !coarse

  const onMouseMove = (event) => {
    if (!enabled || !ref.current) return
    // Measured per move rather than cached on enter: the rect is viewport
    // relative, so scrolling while hovering would otherwise pull the button
    // toward a position the cursor no longer occupies.
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, style: enabled ? { x: springX, y: springY } : undefined, onMouseMove, onMouseLeave }
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  children,
  ...rest
}) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic(magnetic ? 0.24 : 0)

  const Tag = to ? MotionLink : href ? motion.a : motion.button
  const tagProps = to ? { to } : href ? { href } : { type: 'button' }

  return (
    <Tag
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      {...tagProps}
      {...rest}
    >
      {children}
    </Tag>
  )
}
