import { ArrowRight } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import ServicesHero from '@/components/sections/ServicesHero'
import ServiceGrid from '@/components/sections/ServiceGrid'
import LiveProjects from '@/components/sections/LiveProjects'
import { ProcessSteps, WorkingPrinciples } from '@/components/sections/EngagementProcess'
import ContactSection from '@/components/sections/ContactSection'

export default function ServicesHome() {
  useSeo(routeMeta('/'))

  return (
    <>
      <ServicesHero />

      <Section id="services" divider>
        <SectionHeading
          index="01"
          eyebrow="What I do"
          title="From the AI layer down to the"
          accent="domain name."
          description="The engineering work is backed by things that have already shipped. The setup work is what I do around it so you are not left stitching vendors together yourself."
        />
        <div className="mt-14">
          <ServiceGrid />
        </div>
      </Section>

      <Section id="proof" divider>
        <SectionHeading
          index="02"
          eyebrow="Proof"
          title="Products that are"
          accent="publicly online."
          description="Two builds you can open right now — an AI writing assistant for Indian languages, and the product site for a drone research organisation."
        />
        <div className="mt-14">
          <LiveProjects />
        </div>
      </Section>

      <Section id="process" divider>
        <SectionHeading
          index="03"
          eyebrow="How it works"
          title="Scoped, quoted, then"
          accent="built."
          description="No work starts before both sides agree in writing what done looks like."
        />
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </Section>

      <Section id="principles" divider>
        <SectionHeading
          index="04"
          eyebrow="How I work"
          title="The terms, stated"
          accent="up front."
        />
        <div className="mt-14">
          <WorkingPrinciples />
        </div>
        <Reveal delay={0.1} className="mt-10">
          <Button to="/pricing" variant="outline">
            See pricing
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Button>
        </Reveal>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
