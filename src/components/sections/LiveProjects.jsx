import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { liveProjects } from '@/data/work'
import { EASE } from '@/lib/motion'
import Reveal from '@/components/ui/Reveal'

export default function LiveProjects({ headingLevel: Heading = 'h3' }) {
  return (
    <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {liveProjects.map((project, i) => (
        <Reveal as="li" key={project.id} delay={i * 0.08} y={16}>
          <motion.a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-elevated p-6 transition-colors duration-500 hover:border-line-strong sm:p-8"
          >
            <div
              aria-hidden="true"
              className="grid-field-sm pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-60"
            />

            <div className="relative flex items-center gap-3">
              <span className="font-mono text-[0.7rem] tracking-[0.12em] text-accent">
                {project.index}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                {project.status}
              </span>
            </div>

            <Heading className="relative mt-6 text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-tight tracking-[-0.035em]">
              {project.name}
            </Heading>
            <p className="relative mt-2 text-[0.9375rem] text-muted">{project.tagline}</p>

            <p className="relative mt-5 text-[0.9375rem] leading-relaxed text-soft">
              {project.body}
            </p>

            <ul className="relative mt-6 space-y-2.5">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[0.875rem] leading-relaxed text-soft">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3.5 shrink-0 bg-line-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto pt-8">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <span className="mt-6 flex items-center justify-between border-t border-line pt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
                <span className="text-faint transition-colors duration-500 group-hover:text-ink">
                  {project.domain}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-accent group-hover:text-accent">
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </span>
              </span>
            </div>
          </motion.a>
        </Reveal>
      ))}
    </ul>
  )
}
