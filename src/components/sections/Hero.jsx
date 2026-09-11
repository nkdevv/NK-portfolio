import { ArrowDownToLine, ArrowRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { heroCredibility, profile } from '@/data/profile'
import { EASE } from '@/lib/motion'
import Button from '@/components/ui/Button'
import { RevealText } from '@/components/ui/Reveal'
import RequestTrace from '@/components/viz/RequestTrace'

const socialIcons = { github: Github, linkedin: Linkedin }

export default function Hero() {
  const reduce = useReducedMotion()
  const socials = profile.socials.filter((s) => s.href)

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-48 lg:pb-24">
      <div
        aria-hidden="true"
        className="grid-field mask-fade pointer-events-none absolute inset-0 -top-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: 'var(--glow)' }}
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16 xl:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-muted">
                {profile.availability}
              </span>
            </motion.div>

            <h1 className="mt-7 text-[clamp(2.5rem,7.2vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              <RevealText text={profile.headline.lead} delay={0.05} />{' '}
              <RevealText
                text={profile.headline.accent}
                delay={0.12}
                wordClassName="serif-accent bg-gradient-to-r from-accent via-accent-soft to-violet bg-clip-text text-transparent"
              />{' '}
              <RevealText text={profile.headline.trail} delay={0.18} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-soft sm:text-[1.125rem]"
            >
              {profile.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button to="/hire/work" size="lg">
                View My Work
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>
              <Button to="/hire/contact" variant="outline" size="lg">
                Let&apos;s Build Something
                <ArrowUpRight size={15} strokeWidth={2} />
              </Button>
              {profile.resumeHref && (
                <Button
                  href={profile.resumeHref}
                  download
                  variant="ghost"
                  size="lg"
                  magnetic={false}
                  className="px-3 underline decoration-line-strong underline-offset-[6px] hover:decoration-accent"
                >
                  <ArrowDownToLine size={15} strokeWidth={1.8} />
                  Download Resume
                </Button>
              )}
            </motion.div>

            {socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-7 flex items-center gap-2"
              >
                {socials.map((social) => {
                  const Icon = socialIcons[social.key] ?? ArrowUpRight
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
                    >
                      <Icon size={15} strokeWidth={1.7} />
                    </a>
                  )
                })}
              </motion.div>
            )}

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } } }}
              className="mt-12 flex flex-wrap gap-x-2.5 gap-y-2"
            >
              {heroCredibility.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
            className="relative"
          >
            <RequestTrace />
            <p className="mt-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint lg:text-left">
              Architecture shipped on the C2C learning platform
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
