import { profile } from '@/data/profile'
import Reveal from '@/components/ui/Reveal'

export default function AwardSection() {
  const { award } = profile

  return (
    <Reveal className="noise relative overflow-hidden rounded-2xl border border-line bg-elevated">
      <div
        aria-hidden="true"
        className="grid-field-sm mask-fade pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[100px]"
        style={{ background: 'var(--glow)' }}
      />

      <div className="relative grid gap-8 p-7 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:p-16">
        <div>
          <p className="label">Recognition</p>
          <h3 className="mt-6 text-[clamp(2.25rem,5.5vw,3.75rem)] font-medium leading-[1] tracking-[-0.045em]">
            <span className="serif-accent bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent">
              {award.name}
            </span>
          </h3>
          <p className="mt-4 text-[0.9375rem] text-muted">{award.org}</p>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-16">
          <p className="text-[1.0625rem] leading-relaxed text-soft">{award.description}</p>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {['Delivery', 'Quality outcomes', 'Team influence'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
