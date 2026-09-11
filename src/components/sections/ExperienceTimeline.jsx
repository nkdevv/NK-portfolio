import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { experience } from '@/data/experience'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

function Role({ role, index, headingLevel: Heading }) {
  return (
    <li className="relative pl-8 sm:pl-14">
      {/* Node on the rail */}
      <Reveal
        y={0}
        delay={0.1}
        className="absolute left-0 top-1.5 grid h-4 w-4 -translate-x-1/2 place-items-center sm:top-2"
      >
        <span className="relative h-2.5 w-2.5 rounded-full border border-accent bg-bg">
          {role.current && <span className="pulse-ring absolute inset-0 rounded-full" />}
        </span>
      </Reveal>

      <div className="pb-16 sm:pb-24">
        <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-2 label">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          <span>{role.period}</span>
          {role.current && (
            <span className="rounded-full border border-emerald-500/40 px-2 py-0.5 text-emerald-500 dark:text-emerald-400">
              Current
            </span>
          )}
        </Reveal>

        <Reveal delay={0.05}>
          <Heading className="mt-4 text-[clamp(1.5rem,3.4vw,2.25rem)] font-medium leading-tight tracking-[-0.035em]">
            {role.role}
          </Heading>
          <p className="mt-1.5 text-[0.9375rem] text-muted">
            {role.companyShort}
            <span className="mx-2 text-faint">·</span>
            <span className="text-faint">{role.product}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-soft">{role.thesis}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="label">Core contributions</p>
            <ul className="mt-4 space-y-3">
              {role.contributions.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-soft">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-3.5 shrink-0 bg-line-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="label mt-8">Technologies</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {role.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Impact</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-elevated">
              <div className="-ml-px -mt-px grid grid-cols-2">
                {role.impact.map((metric) => (
                  <div key={metric.label} className="border-l border-t border-line px-4 py-5">
                    <p className="text-[1.5rem] font-medium tracking-[-0.035em]">{metric.value}</p>
                    <p className="mt-1.5 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-faint">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </li>
  )
}

export default function ExperienceTimeline({ className, headingLevel = 'h3' }) {
  const containerRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 55%'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const scaleY = useTransform(smooth, (v) => (reduce ? 1 : v))

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-2 w-px bg-line" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-0 left-0 top-2 w-px origin-top bg-gradient-to-b from-accent via-violet to-transparent"
      />
      <ol>
        {experience.map((role, i) => (
          <Role key={role.id} role={role} index={i} headingLevel={headingLevel} />
        ))}
      </ol>
    </div>
  )
}
