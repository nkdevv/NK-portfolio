import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

/**
 * Vertical architecture flow. `revealed` progressively discloses the per-node
 * technical notes — used to reward hover on the case study panel.
 */
export default function FlowStack({ steps, revealed = false, className }) {
  const reduce = useReducedMotion()

  return (
    <ol className={cn('relative', className)}>
      {steps.map((step, i) => (
        <li key={step.id}>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            className={cn(
              'rounded-xl border px-4 py-3 transition-colors duration-500',
              revealed
                ? 'border-line-strong bg-[color-mix(in_oklab,var(--accent)_5%,var(--bg-elevated))]'
                : 'border-line bg-elevated'
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.875rem] font-medium tracking-[-0.01em] text-ink">
                {step.label}
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.1em] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {revealed && step.note && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden text-[0.8125rem] leading-relaxed text-muted"
                >
                  <span className="block pt-1.5">{step.note}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {i < steps.length - 1 && (
            <div aria-hidden="true" className="flex justify-center py-1.5">
              <ChevronDown
                size={14}
                strokeWidth={1.6}
                className={cn(
                  'transition-colors duration-500',
                  revealed ? 'text-accent' : 'text-faint'
                )}
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}
