import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { getService, services } from '@/data/services'
import { profile } from '@/data/profile'
import { routeMeta } from '@/data/routes'
import { useSeo } from '@/lib/seo'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import ContactSection from '@/components/sections/ContactSection'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  // An unknown slug gets no path, which makes useSeo clear the canonical and
  // og:url rather than let a mistyped URL claim to be a real service page.
  useSeo(
    service
      ? routeMeta(`/services/${service.slug}`)
      : {
          title: 'Service not found',
          description:
            'That service does not exist. Browse the full list of freelance services instead.',
          noindex: true,
        }
  )

  // Render the miss rather than redirecting: a <Navigate> here would swap the
  // AnimatePresence key mid-transition and leave the incoming page blank.
  if (!service) {
    return (
      <>
        <PageHeader
          index="—"
          eyebrow="Not found"
          title="No such"
          accent="service."
          description="That link does not match anything I offer. Here is everything I do."
        />
        <Section className="pt-4 sm:pt-6 lg:pt-10">
          <h2 className="sr-only">Available services</h2>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {services.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 0.06} y={12} className="bg-elevated">
                <Link
                  to={`/services/${item.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] sm:p-7"
                >
                  <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
                    {item.index}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.02em]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-soft">{item.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent">
                    View
                    <ArrowRight size={13} strokeWidth={1.8} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1} className="mt-10">
            <Button to="/services" variant="outline">
              All services
              <ArrowRight size={15} strokeWidth={2} />
            </Button>
          </Reveal>
        </Section>
      </>
    )
  }

  // Capped at three: the grid below is a 3-column line-gap layout, so any other
  // count leaves empty cells showing the divider colour. Three is also plenty —
  // the full list is one click away at /services.
  const others = services.filter((item) => item.id !== service.id).slice(0, 3)

  // Newer services have not shipped a public reference yet, so the evidence
  // block is omitted rather than filled with something unverifiable.
  const sections = [
    'included',
    'process',
    ...(service.proof ? ['proof'] : []),
    'pricing',
    'other',
  ]
  const sectionIndex = (id) => String(sections.indexOf(id) + 1).padStart(2, '0')

  return (
    <>
      <PageHeader
        index={service.index}
        eyebrow="Service"
        title={service.name}
        description={service.body}
        aside={
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <dt className="label">Typical project</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">{service.pricing.project}</dd>
            </div>
            <div>
              <dt className="label">Hourly</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">{service.pricing.hourlyInr}</dd>
            </div>
          </dl>
        }
      />

      <Section id="included" className="pt-4 sm:pt-6 lg:pt-10">
        <SectionHeading
          index={sectionIndex('included')}
          eyebrow="What you get"
          title="Included in the"
          accent="engagement."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {service.deliverables.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={i * 0.05}
              y={12}
              className="flex items-start gap-3 bg-elevated p-5 sm:p-6"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line text-accent">
                <Check size={11} strokeWidth={2.4} />
              </span>
              <span className="text-[0.9375rem] leading-relaxed text-soft">{item}</span>
            </Reveal>
          ))}
          {/* The grid draws its dividers with a line-coloured background showing
              through 1px gaps, so an odd count would leave the trailing cell as a
              bare block of divider colour. This fills it. */}
          {service.deliverables.length % 2 === 1 && (
            <li aria-hidden="true" className="hidden bg-elevated sm:block" />
          )}
        </ul>
      </Section>

      <Section id="process" divider>
        <SectionHeading
          index={sectionIndex('process')}
          eyebrow="Process"
          title="How this one"
          accent="runs."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.step}
              delay={i * 0.07}
              y={14}
              className="flex flex-col bg-elevated p-6 sm:p-7"
            >
              <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.02em]">
                {stage.step}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-soft">{stage.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-10">
          <p className="label">Stack</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {service.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.11em] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {service.proof && (
      <Section id="proof" divider>
        <SectionHeading
          index={sectionIndex('proof')}
          eyebrow="Evidence"
          title="Where this has"
          accent="already shipped."
        />
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-elevated p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="grid-field-sm pointer-events-none absolute inset-0 opacity-40"
            />
            <div className="relative max-w-3xl">
              <p className="text-[clamp(1.3rem,2.6vw,1.7rem)] font-medium leading-snug tracking-[-0.03em]">
                {service.proof.label}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-soft">
                {service.proof.body}
              </p>
              {service.proof.to && (
                <Link
                  to={service.proof.to}
                  className="mt-6 inline-flex items-center gap-1.5 py-2 text-[0.9375rem] text-accent underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-ink"
                >
                  See the detail
                  <ArrowRight size={14} strokeWidth={1.8} />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </Section>
      )}

      <Section id="pricing" divider>
        <SectionHeading
          index={sectionIndex('pricing')}
          eyebrow="Pricing"
          title="What this usually"
          accent="costs."
          description="Indicative ranges. You get a fixed written quote once the scope is agreed."
        />
        <Reveal className="mt-14">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-elevated p-6 sm:p-7">
              <dt className="label">Hourly · India</dt>
              <dd className="mt-3 text-[1.35rem] font-medium tracking-[-0.03em]">
                {service.pricing.hourlyInr}
              </dd>
            </div>
            <div className="bg-elevated p-6 sm:p-7">
              <dt className="label">Hourly · International</dt>
              <dd className="mt-3 text-[1.35rem] font-medium tracking-[-0.03em]">
                {service.pricing.hourlyUsd}
              </dd>
            </div>
            <div className="bg-elevated p-6 sm:p-7">
              <dt className="label">Fixed project</dt>
              <dd className="mt-3 text-[1.35rem] font-medium tracking-[-0.03em]">
                {service.pricing.project}
              </dd>
              <p className="mt-2 text-[0.8125rem] leading-snug text-muted">
                {service.pricing.projectNote}
              </p>
            </div>
          </dl>
          {service.pricing.retainer && (
            <p className="mt-5 text-[0.9375rem] text-soft">
              Ongoing maintenance retainer:{' '}
              <span className="text-ink">{service.pricing.retainer}</span>
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          <Button href={`mailto:${profile.email}?subject=${encodeURIComponent(service.name)}`} size="lg">
            Discuss this project
            <ArrowUpRight size={15} strokeWidth={2} />
          </Button>
          <Button to="/pricing" variant="outline" size="lg">
            Compare all pricing
          </Button>
        </Reveal>
      </Section>

      <Section id="other-services" divider>
        <SectionHeading
          index={sectionIndex('other')}
          eyebrow="Also available"
          title="Other"
          accent="services."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {others.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.06} y={12} className="bg-elevated">
              <Link
                to={`/services/${item.slug}`}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] sm:p-7"
              >
                <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
                  {item.index}
                </span>
                <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.02em]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-soft">{item.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent">
                  View
                  <ArrowRight size={13} strokeWidth={1.8} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1} className="mt-10">
          <Button to="/services" variant="outline">
            All services
            <ArrowRight size={15} strokeWidth={2} />
          </Button>
        </Reveal>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
