import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '@/data/profile'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

const channels = [
  { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { key: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}`, icon: Phone },
  { key: 'location', label: 'Location', value: profile.location, href: null, icon: MapPin },
]

export default function ContactSection() {
  return (
    <div className="noise relative overflow-hidden rounded-3xl border border-line bg-elevated">
      <div
        aria-hidden="true"
        className="grid-field mask-fade pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        style={{ background: 'var(--glow)' }}
      />

      <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
        <Reveal className="label block">Contact</Reveal>

        <Reveal delay={0.06}>
          <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.1rem,5.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            Have an idea{' '}
            <span className="serif-accent bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent">
              worth building?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-soft">
            Let&apos;s turn complex ideas into fast, intelligent and production-ready experiences.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={`mailto:${profile.email}`} size="lg">
            Start a Conversation
            <ArrowUpRight size={15} strokeWidth={2} />
          </Button>
          <Button href={`mailto:${profile.email}`} variant="outline" size="lg">
            <Mail size={15} strokeWidth={1.8} />
            Email Me
          </Button>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-line">
          <div className="-ml-px -mt-px grid sm:grid-cols-3">
            {channels.map((channel, i) => {
              const Icon = channel.icon
              const content = (
                <>
                  <span className="flex items-center justify-center gap-2 label">
                    <Icon size={12} strokeWidth={1.7} />
                    {channel.label}
                  </span>
                  <span className="mt-3 block break-words text-[0.9375rem] text-ink">
                    {channel.value}
                  </span>
                </>
              )

              return (
                <Reveal
                  key={channel.key}
                  delay={0.22 + i * 0.05}
                  y={12}
                  className="border-l border-t border-line bg-bg"
                >
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="block px-5 py-6 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--accent)_6%,transparent)]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="px-5 py-6">{content}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
