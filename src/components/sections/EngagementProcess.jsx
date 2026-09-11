import { engagementProcess, workingPrinciples } from '@/data/services'
import Reveal from '@/components/ui/Reveal'

export function ProcessSteps({ headingLevel: Heading = 'h3' }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {engagementProcess.map((stage, i) => (
        <Reveal
          as="li"
          key={stage.step}
          delay={i * 0.07}
          y={14}
          className="flex flex-col bg-elevated p-6 sm:p-7"
        >
          <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
            {stage.step}
          </span>
          <Heading className="mt-5 text-[1.0625rem] font-medium tracking-[-0.02em]">
            {stage.label}
          </Heading>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-soft">{stage.body}</p>
        </Reveal>
      ))}
    </ol>
  )
}

export function WorkingPrinciples({ headingLevel: Heading = 'h3' }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
      {workingPrinciples.map((principle, i) => (
        <Reveal
          as="li"
          key={principle.title}
          delay={i * 0.07}
          y={14}
          className="rounded-2xl border border-line bg-elevated p-6 sm:p-7"
        >
          <Heading className="text-[1.0625rem] font-medium tracking-[-0.02em]">
            {principle.title}
          </Heading>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-soft">{principle.body}</p>
        </Reveal>
      ))}
    </ul>
  )
}
