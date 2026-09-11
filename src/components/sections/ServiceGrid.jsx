import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import Reveal from '@/components/ui/Reveal'

/**
 * headingLevel is a real prop rather than a hardcoded tag: this grid appears
 * under an h2 on both pages that use it today, but nesting it one level deeper
 * would silently produce a heading-level skip.
 */
export default function ServiceGrid({ headingLevel: Heading = 'h3' }) {
  return (
    <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {services.map((service, i) => (
        <Reveal as="li" key={service.id} delay={i * 0.07} y={16}>
          <Link
            to={`/services/${service.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-elevated p-6 transition-colors duration-500 hover:border-line-strong sm:p-8"
          >
            <div
              aria-hidden="true"
              className="grid-field-sm pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-60"
            />

            <div className="relative flex items-center gap-3">
              <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
                {service.index}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            </div>

            <Heading className="relative mt-6 text-[clamp(1.45rem,2.6vw,1.85rem)] font-medium leading-tight tracking-[-0.032em]">
              {service.name}
            </Heading>
            <p className="relative mt-2 text-[0.9375rem] text-muted">{service.tagline}</p>

            <p className="relative mt-5 text-[0.9375rem] leading-relaxed text-soft">
              {service.summary}
            </p>

            <ul className="relative mt-6 space-y-2.5">
              {service.deliverables.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3 text-[0.875rem] leading-relaxed text-soft">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3.5 shrink-0 bg-line-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto pt-8">
              <ul className="flex flex-wrap gap-1.5">
                {service.stack.slice(0, 4).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <span className="mt-6 flex items-center justify-between border-t border-line pt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
                <span className="text-faint transition-colors duration-500 group-hover:text-ink">
                  From {service.pricing.project.split('–')[0].trim()}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-accent group-hover:text-accent">
                  <ArrowRight size={14} strokeWidth={1.8} />
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
