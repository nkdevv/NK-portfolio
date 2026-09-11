import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { pricingMeta, services } from '@/data/services'
import { profile } from '@/data/profile'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { ProcessSteps } from '@/components/sections/EngagementProcess'
import ContactSection from '@/components/sections/ContactSection'

function PriceRow({ label, value, note }) {
  return (
    <div className="border-t border-line px-6 py-5">
      <p className="label">{label}</p>
      <p className="mt-2 text-[1.15rem] font-medium tracking-[-0.03em]">{value}</p>
      {note && <p className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{note}</p>}
    </div>
  )
}

export default function Pricing() {
  useSeo(routeMeta('/pricing'))

  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Pricing"
        title={pricingMeta.title.split(',')[0] + ','}
        accent="quoted on scope."
        description={pricingMeta.body}
        aside={
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
            {pricingMeta.currencies.map((currency) => (
              <div key={currency.id}>
                <dt className="label">{currency.label}</dt>
                <dd className="mt-2 text-[0.9375rem] text-ink">{currency.note}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section id="rates" className="pt-4 sm:pt-6 lg:pt-10">
        <h2 className="sr-only">Rates by service</h2>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.id}
              delay={i * 0.06}
              y={16}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-elevated"
            >
              <div className="p-6">
                <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
                  {service.index}
                </span>
                <h3 className="mt-4 text-[1.15rem] font-medium leading-snug tracking-[-0.025em]">
                  {service.name}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                  {service.tagline}
                </p>
              </div>

              <PriceRow label="Hourly · India" value={service.pricing.hourlyInr} />
              <PriceRow label="Hourly · International" value={service.pricing.hourlyUsd} />
              <PriceRow
                label="Fixed project"
                value={service.pricing.project}
                note={service.pricing.projectNote}
              />
              {service.pricing.retainer && (
                <PriceRow label="Retainer" value={service.pricing.retainer} />
              )}

              <div className="mt-auto border-t border-line p-6">
                <Link
                  to={`/services/${service.slug}`}
                  className="group inline-flex items-center gap-1.5 py-1 text-[0.875rem] text-accent transition-colors hover:text-ink"
                >
                  What is included
                  <ArrowRight
                    size={13}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-[0.875rem] leading-relaxed text-muted">
            {pricingMeta.footnote}
          </p>
        </Reveal>
      </Section>

      <Section id="process" divider>
        <SectionHeading
          index="03"
          eyebrow="How it works"
          title="From enquiry to"
          accent="handover."
          description="You get a fixed written quote before any work starts. Nothing is billed against a moving scope."
        />
        <div className="mt-14">
          <ProcessSteps />
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          <Button href={`mailto:${profile.email}?subject=Project%20enquiry`} size="lg">
            Request a quote
            <ArrowUpRight size={15} strokeWidth={2} />
          </Button>
          <Button to="/services" variant="outline" size="lg">
            Browse services
          </Button>
        </Reveal>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
