import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { constellation, orbits, stackGroups } from '@/data/skills'
import { EASE } from '@/lib/motion'
import { useCoarsePointer } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'
import Constellation from '@/components/viz/Constellation'

const orbitColor = Object.fromEntries(orbits.map((o) => [o.id, o.accent]))

export default function TechStack({ headingLevel: Heading = 'h3' }) {
  const [activeId, setActiveId] = useState(null)
  const [activeTech, setActiveTech] = useState(null)
  const coarse = useCoarsePointer()

  const activeNode = constellation.nodes.find((n) => n.id === activeId)
  const readout = activeTech ?? {
    name: activeNode?.label ?? constellation.core.label,
    desc: activeNode?.desc ?? constellation.core.desc,
    orbit: activeNode?.orbit,
  }

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
        <Reveal
          className="relative mx-auto hidden w-full max-w-[34rem] md:block"
          onMouseLeave={() => setActiveId(null)}
        >
          <Constellation activeId={activeId} onActivate={setActiveId} />
        </Reveal>

        <div>
          <Reveal className="flex flex-wrap gap-2">
            {orbits.map((orbit) => (
              <span
                key={orbit.id}
                className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: orbit.accent }}
                />
                {orbit.label}
              </span>
            ))}
          </Reveal>

          <Reveal
            delay={0.06}
            className="mt-6 min-h-[10.5rem] rounded-2xl border border-line bg-elevated p-6 sm:p-7"
          >
            <p className="label">Readout</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={readout.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <p
                  className="mt-4 text-[1.375rem] font-medium tracking-[-0.03em]"
                  style={readout.orbit ? { color: orbitColor[readout.orbit] } : undefined}
                >
                  {readout.name}
                </p>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-soft">{readout.desc}</p>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.11em] text-faint">
            {coarse ? 'Tap any technology to inspect it' : 'Hover any technology to inspect it'}
          </Reveal>
        </div>
      </div>

      <div className="mt-16 overflow-hidden lg:mt-24">
        <div className="-ml-px -mt-px grid sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group, i) => (
            <Reveal
              key={group.id}
              delay={i * 0.04}
              y={14}
              className="border-l border-t border-line px-5 py-7 sm:px-6 sm:py-8"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: orbitColor[group.orbit] }}
                />
                <Heading className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-muted">
                  {group.name}
                </Heading>
              </div>

              <ul className="mt-5 space-y-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveTech(item)}
                      onFocus={() => setActiveTech(item)}
                      onMouseLeave={() => !coarse && setActiveTech(null)}
                      onBlur={() => !coarse && setActiveTech(null)}
                      onClick={() =>
                        setActiveTech((prev) => (prev?.name === item.name ? null : item))
                      }
                      aria-pressed={activeTech?.name === item.name}
                      title={item.desc}
                      className={cn(
                        '-mx-2 flex w-[calc(100%+1rem)] items-center rounded-md px-2 py-1.5 text-left text-[0.875rem] transition-colors duration-300',
                        activeTech?.name === item.name
                          ? 'bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] text-ink'
                          : 'text-soft hover:text-ink'
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
