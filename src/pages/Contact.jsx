import { useLocation } from 'react-router-dom'
import { ArrowDownToLine } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { profile } from '@/data/profile'
import { isHireLayer } from '@/data/navigation'
import { routeMeta } from '@/data/routes'
import { services } from '@/data/services'
import PageHeader from '@/components/layout/PageHeader'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import ContactSection from '@/components/sections/ContactSection'

const roleEngagements = [
  {
    title: 'Product engineering roles',
    body: 'Frontend or AI-frontend positions where React, TypeScript and GenAI integration sit at the centre of the work.',
  },
  {
    title: 'AI feature integration',
    body: 'Adding RAG chat, LLM-powered features or intelligent assistance to an existing web application.',
  },
  {
    title: 'Frontend architecture & performance',
    body: 'Re-architecting React applications that have outgrown their original structure, and making them fast again.',
  },
]

const projectEngagements = services.map((service) => ({
  title: service.name,
  body: service.summary,
}))

export default function Contact() {
  const { pathname } = useLocation()
  const onHireLayer = isHireLayer(pathname)

  const copy = onHireLayer
    ? {
        index: '05',
        title: "Let's build something",
        accent: 'intelligent.',
        description:
          'Currently open to roles and collaborations where frontend engineering and applied AI meet.',
        listLabel: "What I'm looking for",
        engagements: roleEngagements,
      }
    : {
        index: '03',
        title: 'Tell me what you are',
        accent: 'trying to build.',
        description:
          'Describe the problem, the deadline and the budget. I will tell you honestly whether I am the right person for it, and what it would cost.',
        listLabel: 'What I take on',
        engagements: projectEngagements,
      }

  // One component serves both /contact and /hire/contact, so the metadata is
  // looked up by the live pathname. That also settles the noindex question:
  // /hire/contact is the CV layer's contact page and stays out of the index,
  // /contact is the public freelance one and does not.
  useSeo(routeMeta(pathname))

  return (
    <>
      <PageHeader
        index={copy.index}
        eyebrow="Contact"
        title={copy.title}
        accent={copy.accent}
        description={copy.description}
        aside={
          onHireLayer && profile.resumeHref ? (
            <Button href={profile.resumeHref} download variant="outline">
              <ArrowDownToLine size={15} strokeWidth={1.8} />
              Download Resume
            </Button>
          ) : null
        }
      />

      <Section className="pt-4 lg:pt-8">
        <ContactSection />
      </Section>

      <Section divider className="py-16 sm:py-20 lg:py-24">
        <Reveal className="label">{copy.listLabel}</Reveal>
        <div className="mt-8 overflow-hidden">
          {/* Three columns divides both layers evenly — 3 role types, 6 services. */}
          <div className="-ml-px -mt-px grid sm:grid-cols-2 lg:grid-cols-3">
            {copy.engagements.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.06}
                y={14}
                className="border-l border-t border-line px-5 py-7 sm:px-7 sm:py-9"
              >
                <h2 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
