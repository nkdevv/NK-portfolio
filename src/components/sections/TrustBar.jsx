import { trustSignals } from '@/data/profile'
import Reveal from '@/components/ui/Reveal'

export default function TrustBar() {
  return (
    <section aria-label="Credibility highlights" className="relative border-y border-line">
      <div className="shell">
        {/* Negative offset + clip renders interior hairlines only. */}
        <div className="overflow-hidden">
          <ul className="-ml-px -mt-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {trustSignals.map((signal, i) => (
              <Reveal
                as="li"
                key={signal.label}
                delay={i * 0.05}
                y={12}
                className="group relative border-l border-t border-line px-4 py-7 sm:py-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
                <p className="text-[1.375rem] font-medium tracking-[-0.03em] text-ink sm:text-[1.625rem]">
                  {signal.value}
                </p>
                <p className="mt-1.5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.11em] text-faint">
                  {signal.label}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
