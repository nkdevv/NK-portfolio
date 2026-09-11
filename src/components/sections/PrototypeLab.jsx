import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { prototypes } from '@/data/work'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'

export default function PrototypeLab() {
  const [active, setActive] = useState(prototypes[0].id)

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-elevated">
      <ul>
        {prototypes.map((item, i) => {
          const isOpen = active === item.id
          const panelId = `prototype-panel-${item.id}`

          return (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.06}
              y={14}
              className={cn(i > 0 && 'border-t border-line')}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? panelId : undefined}
                  className="group flex w-full items-center gap-4 px-5 py-6 text-left transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--accent)_4%,transparent)] sm:gap-6 sm:px-8 sm:py-7"
                >
                  <span
                    className={cn(
                      'font-mono text-[0.7rem] tracking-[0.12em] transition-colors duration-500',
                      isOpen ? 'text-accent' : 'text-faint'
                    )}
                  >
                    {item.step}
                  </span>

                  <span className="flex-1 text-[1.0625rem] font-medium tracking-[-0.02em] sm:text-[1.25rem]">
                    {item.name}
                  </span>

                  <span className="hidden shrink-0 text-right sm:block">
                    <span
                      className={cn(
                        'block text-[1.25rem] font-medium tracking-[-0.03em] transition-colors duration-500',
                        isOpen ? 'text-accent' : 'text-ink'
                      )}
                    >
                      {item.metric}
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-500 group-hover:border-line-strong group-hover:text-ink"
                  >
                    <Plus size={13} strokeWidth={1.8} />
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 px-5 pb-8 sm:grid-cols-[1fr_minmax(0,16rem)] sm:gap-10 sm:px-8 sm:pl-[4.6rem]">
                      <div>
                        <p className="max-w-xl text-[0.9375rem] leading-relaxed text-soft">
                          {item.body}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-line bg-bg px-4 py-4">
                        <p className="text-[1.75rem] font-medium leading-none tracking-[-0.035em] text-accent">
                          {item.metric}
                        </p>
                        <p className="mt-2 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-faint">
                          {item.metricLabel}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </ul>
    </div>
  )
}
