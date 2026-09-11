import { impactMetrics } from '@/data/work'
import Counter from '@/components/ui/Counter'
import Reveal from '@/components/ui/Reveal'

export default function ImpactMetrics() {
  return (
    <div className="overflow-hidden">
      <dl className="-ml-px -mt-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {impactMetrics.map((metric, i) => (
          <Reveal
            key={metric.label}
            delay={i * 0.06}
            y={16}
            className="group relative border-l border-t border-line px-5 py-10 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--accent)_4%,transparent)] sm:px-7 sm:py-12"
          >
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <Counter
                value={metric.value}
                suffix={metric.suffix}
                className="block text-[clamp(3rem,7vw,4.75rem)] font-medium leading-[0.9] tracking-[-0.05em] text-ink transition-colors duration-500 group-hover:text-accent"
              />
              <p className="mt-5 text-[0.9375rem] tracking-[-0.01em] text-soft">{metric.label}</p>
              <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
                {metric.note}
              </p>
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  )
}
