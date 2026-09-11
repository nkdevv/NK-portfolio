import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import AboutSection from '@/components/sections/AboutSection'
import AwardSection from '@/components/sections/AwardSection'
import ImpactMetrics from '@/components/sections/ImpactMetrics'
import ContactSection from '@/components/sections/ContactSection'

export default function About() {
  useSeo(routeMeta('/hire/about'))

  return (
    <>
      <PageHeader
        index="04"
        eyebrow="About"
        title="An engineer for the layer where AI meets"
        accent="people."
        description="I care about the moment a model stops being an endpoint and becomes something usable — and about the architecture that keeps it fast once it is."
      />

      <Section className="pt-6 lg:pt-10">
        <AboutSection />
      </Section>

      <Section id="numbers" divider>
        <SectionHeading index="02" eyebrow="By the numbers" title="What that has" accent="produced." />
        <div className="mt-14">
          <ImpactMetrics />
        </div>
      </Section>

      <Section id="award" divider>
        <SectionHeading index="03" eyebrow="Recognition" title="Impactful" accent="Contributor." />
        <div className="mt-14">
          <AwardSection />
        </div>
      </Section>

      <Section divider>
        <ContactSection />
      </Section>
    </>
  )
}
