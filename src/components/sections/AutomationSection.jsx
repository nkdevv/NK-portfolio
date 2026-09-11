import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { automationFlow } from '@/data/work'
import { EASE } from '@/lib/motion'
import Counter from '@/components/ui/Counter'
import Reveal from '@/components/ui/Reveal'

export default function AutomationSection() {
  const reduce = useReducedMotion()

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-elevated p-7 sm:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full blur-[90px]"
          style={{ background: 'var(--glow)' }}
        />
        <p className="relative label">Automation impact</p>
        <Counter
          value={80}
          suffix="%"
          className="relative mt-6 block text-[clamp(3.5rem,9vw,5.5rem)] font-medium leading-[0.85] tracking-[-0.05em]"
        />
        <p className="relative mt-6 text-[0.9375rem] leading-relaxed text-soft">
          Reduction in manual workload delivered by the automation applications built at Stringserve
          Technologies.
        </p>
        <ul className="relative mt-7 flex flex-wrap gap-1.5">
          {['n8n', 'AI-assisted workflows', 'Internal tools', 'POCs'].map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>

      <div>
        <Reveal className="label">Workflow</Reveal>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {automationFlow.map((step, i) => (
            <Reveal
              as="li"
              key={step.id}
              delay={i * 0.08}
              y={14}
              className="relative rounded-xl border border-line bg-elevated px-5 py-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[0.6rem] tracking-[0.12em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[0.9375rem] font-medium tracking-[-0.015em]">{step.label}</h3>
              </div>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-soft">{step.body}</p>

              {/* Connector only where a neighbour actually sits to the right */}
              {i < automationFlow.length - 1 && i % 2 === 0 && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-bg p-1 text-accent sm:block"
                  animate={reduce ? undefined : { x: [0, 3, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: EASE, delay: i * 0.3 }}
                >
                  <ArrowRight size={11} strokeWidth={2} />
                </motion.span>
              )}
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.3} className="mt-6 rounded-xl border border-line bg-bg px-5 py-4">
          <p className="text-[0.875rem] leading-relaxed text-muted">
            The same principle drives the internal tooling: repeatable work becomes an application,
            and the time it used to consume goes back into product engineering.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
