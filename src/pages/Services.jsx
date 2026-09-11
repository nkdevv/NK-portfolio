import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceGrid from '@/components/sections/ServiceGrid'
import { ProcessSteps, WorkingPrinciples } from '@/components/sections/EngagementProcess'
import ContactSection from '@/components/sections/ContactSection'
import { services } from '@/data/services'

export default function Services() {
  useSeo(routeMeta('/services'))

  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Services"
        title="What I build,"
        accent="and what it costs."
        description="Everything I take on, from the AI layer down to the domain name. Most of it is backed by work that has already shipped. Pick the one that matches your problem, or describe the problem and I will tell you which it is."
        aside={
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <dt className="label">Engagement</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">Fixed scope or hourly</dd>
            </div>
            <div>
              <dt className="label">Availability</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">Open for projects</dd>
            </div>
          </dl>
        }
      />

      <Section id="all-services" className="pt-4 sm:pt-6 lg:pt-10">
        <h2 className="sr-only">All services</h2>
        <ServiceGrid />
      </Section>

      <Section id="process" divider>
        <SectionHeading
          index="02"
          eyebrow="How it works"
          title="Scoped, quoted, then"
          accent="built."
          description="The same four stages regardless of which service you start with."
        />
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </Section>

      <Section id="principles" divider>
        <SectionHeading
          index="03"
          eyebrow="How I work"
          title="The terms, stated"
          accent="up front."
          description={`Applies across all ${services.length} services, on every engagement.`}
        />
        <div className="mt-14">
          <WorkingPrinciples />
        </div>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
