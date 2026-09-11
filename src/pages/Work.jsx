import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import CaseStudy from '@/components/sections/CaseStudy'
import LiveProjects from '@/components/sections/LiveProjects'
import PrototypeLab from '@/components/sections/PrototypeLab'
import PerformanceSection from '@/components/sections/PerformanceSection'
import AutomationSection from '@/components/sections/AutomationSection'
import ImpactMetrics from '@/components/sections/ImpactMetrics'
import ContactSection from '@/components/sections/ContactSection'

export default function Work() {
  useSeo(routeMeta('/hire/work'))

  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Selected work"
        title="Systems that ship,"
        accent="then improve."
        description="One production platform, the AI layer built on top of it, and the internal tooling that keeps the next prototype cheap to start."
        aside={
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <dt className="label">Domain</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">E-learning / LMS</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">Frontend + GenAI</dd>
            </div>
          </dl>
        }
      />

      <Section id="case-study" className="pt-4 sm:pt-6 lg:pt-10">
        <CaseStudy headingLevel="h2" />
      </Section>

      <Section id="live" divider>
        <SectionHeading
          index="02"
          eyebrow="Live projects"
          title="Shipped, and"
          accent="publicly online."
          description="Two products running in the open — an AI writing assistant built for Indian languages, and the product site for a drone research organisation."
        />
        <div className="mt-14">
          <LiveProjects />
        </div>
      </Section>

      <Section id="prototypes" divider>
        <SectionHeading
          index="03"
          eyebrow="Internal tools & POCs"
          title="From idea to working"
          accent="prototype."
          description="Five-plus internal tools and proofs of concept built alongside product work — the kind of engineering that compounds across a team."
        />
        <div className="mt-14">
          <PrototypeLab />
        </div>
      </Section>

      <Section id="performance" divider>
        <SectionHeading
          index="04"
          eyebrow="Performance engineering"
          title="Performance is a"
          accent="feature."
          description="Load time is the first thing a user experiences and the last thing most teams budget for. Both roles below ended with a measurably faster application."
        />
        <div className="mt-14">
          <PerformanceSection />
        </div>
      </Section>

      <Section id="automation" divider>
        <SectionHeading
          index="05"
          eyebrow="Automation"
          title="Removing repetitive work from the"
          accent="workflow."
          description="Manual steps are a recurring tax. Automation applications and AI-assisted workflows moved that time back to product engineering."
        />
        <div className="mt-14">
          <AutomationSection />
        </div>
      </Section>

      <Section id="impact" divider>
        <SectionHeading
          index="06"
          eyebrow="Impact"
          title="Measured in"
          accent="outcomes."
        />
        <div className="mt-14">
          <ImpactMetrics />
        </div>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
