import { ShieldCheck } from 'lucide-react'
import { profile } from '@/data/profile'
import { awsServices } from '@/data/skills'
import Reveal from '@/components/ui/Reveal'

export default function CertificationSection() {
  const { certification } = profile

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
      <Reveal className="rounded-2xl border border-line bg-elevated p-7 sm:p-9">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-line text-accent">
          <ShieldCheck size={17} strokeWidth={1.6} />
        </span>
        <h3 className="mt-6 text-[1.375rem] font-medium leading-snug tracking-[-0.03em]">
          {certification.name}
        </h3>
        <p className="mt-2 text-[0.875rem] text-muted">{certification.issuer}</p>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-soft">{certification.note}</p>
      </Reveal>

      <div>
        <Reveal className="label">AWS services worked with</Reveal>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <div className="-ml-px -mt-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {awsServices.map((service, i) => (
              <Reveal
                key={service.name}
                delay={i * 0.04}
                y={12}
                className="group border-l border-t border-line bg-elevated px-4 py-5 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--cyan)_6%,transparent)]"
              >
                <p className="text-[0.9375rem] font-medium tracking-[-0.015em]">{service.name}</p>
                <p className="mt-1.5 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-faint">
                  {service.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.2} className="mt-4 text-[0.8125rem] leading-relaxed text-faint">
          Hands-on usage in production and prototype work. Certification held: AWS Certified Cloud
          Practitioner.
        </Reveal>
      </div>
    </div>
  )
}
