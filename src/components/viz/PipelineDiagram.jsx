import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Horizontal signal rail. Each stage owns its own rail segment, so the line
 * stays continuous however the grid wraps at different breakpoints.
 */
export default function PipelineDiagram({ steps, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (reduce || !inView) return
    const id = setInterval(() => setActive((prev) => (prev + 1) % (steps.length + 2)), 780)
    return () => clearInterval(id)
  }, [inView, reduce, steps.length])

  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-2 gap-y-9 lg:grid-cols-3 xl:grid-cols-6 xl:gap-y-0',
        className
      )}
    >
      {steps.map((step, i) => {
        const isActive = !reduce && active === i
        const isPast = reduce || active > i

        return (
          <div key={step.id} className="relative pr-3 xl:pr-4">
            {/* Rail */}
            {/* The segment fades at its right end so a wrapped row reads as
                flowing signal rather than a line stopping in empty space. */}
            <div
              aria-hidden="true"
              className="relative mb-5 h-2.5 [mask-image:linear-gradient(90deg,#000_78%,transparent)]"
            >
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line" />
              <motion.span
                className="absolute left-0 top-1/2 h-px w-full origin-left -translate-y-1/2 bg-gradient-to-r from-accent to-violet"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPast || isActive ? 1 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-px -translate-y-1/2 rounded-full border bg-bg"
                animate={{
                  borderColor: isActive || isPast ? 'var(--accent)' : 'var(--line-strong)',
                  scale: isActive ? 1.25 : 1,
                }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3
              className={cn(
                'mt-2 text-[0.9375rem] font-medium leading-snug tracking-[-0.015em] transition-colors duration-500',
                isActive ? 'text-accent' : 'text-ink'
              )}
            >
              {step.label}
            </h3>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{step.note}</p>
          </div>
        )
      })}
    </div>
  )
}
