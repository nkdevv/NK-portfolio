import { useState } from 'react'
import { motion } from 'framer-motion'
import { performancePractices, performanceResults } from '@/data/work'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'

const STATES = [
  { id: 'before', label: 'Before' },
  { id: 'after', label: 'After' },
]

export default function PerformanceSection() {
  const [state, setState] = useState('after')
  const isAfter = state === 'after'

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
      <Reveal className="overflow-hidden rounded-2xl border border-line bg-elevated">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <div>
            <p className="label">Relative page load time</p>
            <p className="mt-1.5 text-[0.75rem] text-faint">Baseline before optimisation = 100</p>
          </div>

          <div
            role="group"
            aria-label="Toggle optimisation state"
            className="relative flex rounded-full border border-line p-0.5"
          >
            {STATES.map((option) => {
              const selected = state === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setState(option.id)}
                  aria-pressed={selected}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.11em] transition-colors duration-300',
                    selected ? 'text-bg' : 'text-muted hover:text-ink'
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="perf-toggle"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-9 px-5 py-8 sm:px-7 sm:py-10">
          {performanceResults.map((result) => {
            const value = isAfter ? 100 - result.improvement : 100
            return (
              <div key={result.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[0.9375rem] font-medium tracking-[-0.015em]">
                    {result.context}
                  </p>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.11em] text-faint">
                    {result.scope}
                  </p>
                </div>

                <div className="mt-3.5 h-9 overflow-hidden rounded-lg border border-line bg-bg">
                  <motion.div
                    className={cn(
                      'flex h-full items-center justify-end px-3',
                      isAfter
                        ? 'bg-gradient-to-r from-accent/25 to-accent/60'
                        : 'bg-[color-mix(in_oklab,var(--ink)_12%,transparent)]'
                    )}
                    animate={{ width: `${value}%` }}
                    initial={false}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <span className="font-mono text-[0.65rem] tabular-nums tracking-[0.08em] text-ink">
                      {value}
                    </span>
                  </motion.div>
                </div>

                <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{result.detail}</p>
              </div>
            )
          })}
        </div>
      </Reveal>

      <div>
        <Reveal className="label">How it was achieved</Reveal>
        <ul className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line">
          {performancePractices.map((practice, i) => (
            <Reveal
              as="li"
              key={practice.title}
              delay={i * 0.06}
              y={12}
              className={cn('bg-elevated px-5 py-5 sm:px-6', i > 0 && 'border-t border-line')}
            >
              <h3 className="text-[0.9375rem] font-medium tracking-[-0.015em]">{practice.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-soft">{practice.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  )
}
