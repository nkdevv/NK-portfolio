import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { isHireLayer, navFor } from '@/data/navigation'
import { profile } from '@/data/profile'

const year = new Date().getFullYear()

/**
 * Shown only on the hire layer, so that layer is not a dead end.
 *
 * The services layer deliberately does NOT advertise the CV — this is a
 * freelance site. The /hire routes still resolve for anyone with a direct
 * link, but nothing on the public site points at them.
 */
function LayerSwitch() {
  const copy = {
    eyebrow: 'Looking for project work instead?',
    title: 'Available for freelance',
    accent: 'engagements.',
    body: 'AI integration, React and Next.js builds, performance work and automation — scoped, quoted and delivered as a fixed engagement.',
    to: '/',
    cta: 'View services',
  }

  return (
    <div className="shell">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-elevated px-6 py-10 sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="grid-field-sm pointer-events-none absolute inset-0 opacity-40"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="label text-accent">{copy.eyebrow}</p>
            <p className="mt-4 text-[clamp(1.6rem,3.4vw,2.3rem)] font-medium leading-[1.15] tracking-[-0.035em]">
              {copy.title}{' '}
              <span className="text-gradient">{copy.accent}</span>
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-soft">{copy.body}</p>
          </div>

          <Link
            to={copy.to}
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-bg transition-opacity duration-300 hover:opacity-88"
          >
            {copy.cta}
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  const onHireLayer = isHireLayer(pathname)
  const nav = navFor(pathname)
  const socials = profile.socials.filter((s) => s.href)

  return (
    <footer className="relative border-t border-line pt-14">
      {onHireLayer && <LayerSwitch />}

      <div className="shell py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              to={onHireLayer ? '/hire' : '/'}
              className="inline-flex py-1 text-[1.05rem] font-medium tracking-[-0.02em]"
            >
              {profile.name}
            </Link>
            <p className="mt-1 text-sm text-muted">{profile.title}</p>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
              React • TypeScript • GenAI • AWS
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <nav aria-label="Footer">
              <p className="label">{onHireLayer ? 'Profile' : 'Services'}</p>
              <ul className="mt-3">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="inline-flex py-2 text-sm text-soft transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {onHireLayer && (
                  <li>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-1 py-2 text-sm text-accent transition-colors hover:text-ink"
                    >
                      Freelance services
                      <ArrowRight size={13} strokeWidth={1.8} />
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div>
              <p className="label">Contact</p>
              <ul className="mt-3">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1 py-2 text-sm text-soft transition-colors hover:text-ink"
                  >
                    {profile.email}
                    <ArrowUpRight size={13} strokeWidth={1.8} />
                  </a>
                </li>
                <li className="py-2 text-sm text-soft">{profile.location}</li>
                {socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 py-2 text-sm text-soft transition-colors hover:text-ink"
                    >
                      {social.label}
                      <ArrowUpRight size={13} strokeWidth={1.8} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
            Built with React, Vite &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
