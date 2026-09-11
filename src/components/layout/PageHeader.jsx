import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { RevealText } from '@/components/ui/Reveal'

/** Shared masthead for the routed inner pages. */
export default function PageHeader({ index, eyebrow, title, accent, trail, description, aside }) {
  return (
    <header className="relative overflow-hidden pt-32 pb-14 sm:pt-40 lg:pt-44 lg:pb-20">
      <div
        aria-hidden="true"
        className="grid-field mask-fade pointer-events-none absolute inset-0 -top-24 opacity-70"
      />
      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3 label"
        >
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span>{eyebrow}</span>
        </motion.div>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6.4vw,4.5rem)] font-medium leading-[1] tracking-[-0.045em]">
          <RevealText text={title} delay={0.06} />{' '}
          {accent && (
            <RevealText
              text={accent}
              delay={0.14}
              wordClassName="serif-accent bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent"
            />
          )}
          {trail ? <> <RevealText text={trail} delay={0.2} /></> : null}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="max-w-2xl text-[1.0625rem] leading-relaxed text-soft sm:text-[1.125rem]"
            >
              {description}
            </motion.p>
          )}
          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.38 }}
              className="lg:justify-self-end"
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
