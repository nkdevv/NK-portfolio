import { ArrowLeft } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { navFor } from '@/data/navigation'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const { pathname } = useLocation()
  const nav = navFor(pathname)

  useSeo({
    title: '404',
    description: 'This page could not be found.',
    // Belt and braces. The build emits a real 404.html that already carries
    // this directive, so on GitHub Pages an unknown URL gets a genuine 404
    // status rather than a soft one. But this component also renders when the
    // router fails to match *after* a client-side navigation, where no server
    // response is involved at all and the static file never enters the
    // picture. Setting it here covers that path too.
    noindex: true,
  })

  return (
    <div className="relative flex min-h-[86vh] items-center overflow-hidden pt-32">
      <div
        aria-hidden="true"
        className="grid-field mask-fade pointer-events-none absolute inset-0"
      />
      <div className="shell relative">
        <Reveal className="label">Error 404</Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 font-mono text-[clamp(4rem,16vw,9rem)] font-medium leading-none tracking-[-0.06em] text-ink">
            4<span className="bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent">0</span>4
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-8 max-w-xl text-[clamp(1.5rem,3.6vw,2.25rem)] font-medium leading-tight tracking-[-0.035em]">
            This route resolved to nothing.
          </h1>
          <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-soft">
            The page you were looking for does not exist, or it moved. Here is the way back.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
          <Button to="/">
            <ArrowLeft size={15} strokeWidth={2} />
            Back to home
          </Button>
        </Reveal>

        <Reveal delay={0.24} className="mt-12 border-t border-line pt-6">
          <p className="label">Or jump to</p>
          <ul className="mt-3 flex flex-wrap gap-x-6">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex py-2 text-[0.9375rem] text-soft underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-ink hover:decoration-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}
