import { aiCapabilities, aiPipeline } from '@/data/work'
import Reveal from '@/components/ui/Reveal'
import PipelineDiagram from '@/components/viz/PipelineDiagram'

export default function AIArchitecture() {
  return (
    <div>
      <Reveal className="noise relative overflow-hidden rounded-2xl border border-line bg-elevated p-6 sm:p-10 lg:p-12">
        <div
          aria-hidden="true"
          className="grid-field-sm mask-fade pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-[110px]"
          style={{ background: 'var(--glow)' }}
        />

        <div className="relative flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
          <span className="label">Retrieval-augmented request path</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
            context in · grounded answer out
          </span>
        </div>

        <PipelineDiagram steps={aiPipeline} className="relative mt-10" />
      </Reveal>

      <div className="mt-6 overflow-hidden">
        <div className="-ml-px -mt-px grid sm:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((capability, i) => (
            <Reveal
              key={capability.title}
              delay={i * 0.05}
              y={14}
              className="group relative border-l border-t border-line px-5 py-7 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--violet)_5%,transparent)] sm:px-7 sm:py-9"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-violet transition-transform duration-500 group-hover:scale-y-100"
              />
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{capability.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-soft">{capability.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
