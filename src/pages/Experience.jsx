import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import AwardSection from '@/components/sections/AwardSection'
import CertificationSection from '@/components/sections/CertificationSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Experience() {
  useSeo(routeMeta('/hire/experience'))

  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Career"
        title="Nearly four years of"
        accent="production"
        trail="frontend."
        description="Two roles, two learning platforms, and a steady shift from shipping features to designing the systems those features live in."
        aside={
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <dt className="label">Current</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">Stringserve Technologies</dd>
            </div>
            <div>
              <dt className="label">Since</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">September 2022</dd>
            </div>
          </dl>
        }
      />

      <Section className="pt-6 lg:pt-10">
        <ExperienceTimeline headingLevel="h2" />
      </Section>

      <Section id="award" divider>
        <SectionHeading
          index="02"
          eyebrow="Award"
          title="Recognized as an"
          accent="Impactful Contributor."
        />
        <div className="mt-14">
          <AwardSection />
        </div>
      </Section>

      <Section id="certification" divider>
        <SectionHeading
          index="03"
          eyebrow="Certification"
          title="Certified on the"
          accent="cloud"
          trail="it runs on."
        />
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
