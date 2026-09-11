import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/data/routes'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import CaseStudy from '@/components/sections/CaseStudy'
import LiveProjects from '@/components/sections/LiveProjects'
import AIArchitecture from '@/components/sections/AIArchitecture'
import ImpactMetrics from '@/components/sections/ImpactMetrics'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  useSeo(routeMeta('/hire'))

  return (
    <>
      <Hero />
      <TrustBar />

      <Section id="work">
        <SectionHeading
          index="01"
          eyebrow="Featured work"
          title="A production platform, made"
          accent="conversational."
          description="The C2C learning platform, extended with retrieval-augmented AI and re-architected for speed."
        />
        <div className="mt-14">
          <CaseStudy compact />
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Button to="/hire/work" variant="outline">
            Explore the full build
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Button>
        </Reveal>
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

      <Section id="ai" divider>
        <SectionHeading
          index="03"
          eyebrow="AI engineering"
          title="Building interfaces that"
          accent="understand."
          description="Retrieval, inference and orchestration assembled into a request path a learner never has to think about."
        />
        <div className="mt-14">
          <AIArchitecture />
        </div>
      </Section>

      <Section id="impact" divider>
        <SectionHeading
          index="04"
          eyebrow="Impact"
          title="Engineering measured in"
          accent="outcomes."
          description="Every number here comes from shipped work, not projections."
        />
        <div className="mt-14">
          <ImpactMetrics />
        </div>
      </Section>

      <Section id="experience" divider>
        <SectionHeading
          index="05"
          eyebrow="Experience"
          title="Nearly four years of"
          accent="production"
          trail="frontend."
        />
        <div className="mt-16">
          <ExperienceTimeline />
        </div>
        <Reveal className="-mt-8">
          <Link
            to="/hire/experience"
            className="inline-flex items-center gap-1.5 py-1.5 text-[0.9375rem] text-soft underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-ink hover:decoration-accent"
          >
            Full career detail
            <ArrowRight size={14} strokeWidth={1.8} />
          </Link>
        </Reveal>
      </Section>

      <Section id="contact" divider>
        <ContactSection />
      </Section>
    </>
  )
}
