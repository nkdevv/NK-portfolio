import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TechStack from '@/components/sections/TechStack'
import AIArchitecture from '@/components/sections/AIArchitecture'
import CertificationSection from '@/components/sections/CertificationSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Skills() {
  useSeo(routeMeta('/hire/skills'))

  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Engineering stack"
        title="One system, three"
        accent="layers."
        description="Interface, intelligence and infrastructure. Every technology here earns its place by appearing in shipped work."
      />

      <Section className="pt-6 lg:pt-10">
        <TechStack headingLevel="h2" />
      </Section>

      <Section id="ai" divider>
        <SectionHeading
          index="02"
          eyebrow="AI engineering"
          title="Building interfaces that"
          accent="understand."
          description="Retrieval-augmented generation is only useful when the interface around it handles latency, state and failure honestly."
        />
        <div className="mt-14">
          <AIArchitecture />
        </div>
      </Section>

      <Section id="cloud" divider>
        <SectionHeading index="03" eyebrow="Cloud" title="Running on" accent="AWS." />
        <div className="mt-14">
          <CertificationSection />
        </div>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
