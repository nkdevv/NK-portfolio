import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { services } from '@/data/services'
import { EASE } from '@/lib/motion'
import Button from '@/components/ui/Button'
import { RevealText } from '@/components/ui/Reveal'

/** Every figure here traces back to shipped work — nothing is projected. */
const proofPoints = [
  { value: '~4 yrs', label: 'Production experience' },
  { value: '2', label: 'Products live' },
  { value: '35%', label: 'Faster page loads' },
  { value: '80%', label: 'Manual work removed' },
]

export default function ServicesHero() {
  return (
    <header className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      <div
        aria-hidden="true"
        className="grid-field mask-fade pointer-events-none absolute inset-0 -top-24 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[48rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[130px]"
        style={{ background: 'var(--glow)' }}
      />

      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-wrap items-center gap-3 label"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for projects
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span>Freelance · {profile.location}</span>
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-[clamp(2.4rem,6.6vw,4.7rem)] font-medium leading-[1] tracking-[-0.045em]">
          <RevealText text="AI features and frontends," delay={0.06} />{' '}
          <RevealText
            text="built to ship."
            delay={0.16}
            wordClassName="serif-accent bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-soft sm:text-[1.1875rem]"
        >
          I am a freelance AI frontend engineer. I build RAG assistants and LLM features into
          existing products, ship React and Next.js applications, make slow frontends fast, and
          automate the manual work your team repeats every week — then get it indexed, on a domain
          and online, so you are not left stitching vendors together yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button to="/services" size="lg">
            View services
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Button>
          <Button href={`mailto:${profile.email}`} variant="outline" size="lg">
            Start a project
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </Button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 lg:grid-cols-4"
        >
          {proofPoints.map((point) => (
            <li key={point.label}>
              <p className="text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.035em]">
                {point.value}
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{point.label}</p>
            </li>
          ))}
        </motion.ul>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.58 }}
          className="mt-10 flex flex-wrap gap-1.5"
        >
          {services.map((service) => (
            <li
              key={service.id}
              className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.11em] text-muted"
            >
              {service.name}
            </li>
          ))}
        </motion.ul>
      </div>
    </header>
  )
}
