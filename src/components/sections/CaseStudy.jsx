import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { caseStudy } from '@/data/work'
import { EASE } from '@/lib/motion'
import { useCoarsePointer } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'
import FlowStack from '@/components/viz/FlowStack'

export default function CaseStudy({ compact = false, headingLevel: Heading = 'h3' }) {
  const [hovered, setHovered] = useState(false)
  // Hover is the reveal trigger on pointer devices; touch devices get it open.
  const coarse = useCoarsePointer()
  const revealed = hovered || coarse

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="noise group relative overflow-hidden rounded-3xl border border-line bg-elevated shadow-soft transition-shadow duration-700 hover:shadow-lift"
    >
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-100"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[110px]"
        style={{ background: 'var(--glow)' }}
        animate={{ opacity: revealed ? 1 : 0.45 }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:p-14">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 label">
            <span className="text-accent">{caseStudy.index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>{caseStudy.kicker}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>{caseStudy.period}</span>
          </div>

          <Heading
            className={cn(
              'mt-6 font-medium leading-[1.03] tracking-[-0.04em]',
              compact
                ? 'text-[clamp(1.9rem,4.4vw,3rem)]'
                : 'text-[clamp(2.1rem,5vw,3.6rem)]'
            )}
          >
            {caseStudy.name}
            <span className="text-faint"> — </span>
            <span className="serif-accent bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent">
              {caseStudy.title}
            </span>
          </Heading>

          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-soft">
            {caseStudy.summary}
          </p>

          <dl className="mt-9 space-y-6 border-t border-line pt-8">
            {caseStudy.narrative.map((block, i) => (
              <Reveal key={block.label} delay={i * 0.06} y={12} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="label pt-1">{block.label}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-soft">{block.body}</dd>
              </Reveal>
            ))}
          </dl>

          <ul className="mt-9 flex flex-wrap gap-1.5">
            {caseStudy.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-2">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <span className="label">System architecture</span>
            <motion.span
              className="flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.11em] text-accent"
              animate={{ opacity: revealed ? 0 : 1 }}
              transition={{ duration: 0.35 }}
            >
              Hover to expand
              <ArrowUpRight size={11} strokeWidth={2} />
            </motion.span>
          </div>

          <FlowStack steps={caseStudy.architecture} revealed={revealed} className="mt-5" />

          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <div className="-ml-px -mt-px grid grid-cols-2">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="border-l border-t border-line px-4 py-4">
                  <p className="text-[1.375rem] font-medium tracking-[-0.03em]">{metric.value}</p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-faint">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
