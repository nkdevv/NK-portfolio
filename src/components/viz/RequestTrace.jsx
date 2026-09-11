import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  BrainCircuit,
  Layers,
  Library,
  MessageSquareText,
  Network,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STAGES = [
  { id: 'user', label: 'User', meta: 'asks a question', icon: User, tint: 'var(--ink-muted)' },
  { id: 'react', label: 'React Interface', meta: 'client', icon: Layers, tint: 'var(--accent)' },
  { id: 'apigw', label: 'API Gateway', meta: 'POST /chat', icon: Network, tint: 'var(--accent)' },
  { id: 'lambda', label: 'AWS Lambda', meta: 'orchestrate', icon: Zap, tint: 'var(--cyan)' },
  { id: 'rag', label: 'RAG', meta: 'retrieve context', icon: Library, tint: 'var(--violet)' },
  { id: 'bedrock', label: 'AWS Bedrock', meta: 'inference', icon: BrainCircuit, tint: 'var(--violet)' },
  {
    id: 'response',
    label: 'Intelligent response',
    meta: 'grounded',
    icon: MessageSquareText,
    tint: 'var(--accent)',
  },
]

const STEP_MS = 900

export default function RequestTrace({ className }) {
  const ref = useRef(null)
  // Gated on visibility, as PipelineDiagram already is. Ungated, this interval
  // re-rendered the component every 900ms for the entire session — including
  // while the diagram was scrolled far off screen or the tab was in the
  // background — which is pure battery drain on mobile for animation nobody
  // can see.
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(reduce ? STAGES.length - 1 : 0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    if (reduce || paused || !inView) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % (STAGES.length + 1))
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduce, paused, inView])

  return (
    <div
      ref={ref}
      className={cn(
        'noise relative overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift',
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false)
        setHovered(null)
      }}
    >
      <div
        aria-hidden="true"
        className="grid-field-sm pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-70 blur-3xl"
        style={{ background: 'var(--glow)' }}
      />

      {/* Panel chrome */}
      <div className="relative flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Sparkles size={13} strokeWidth={1.8} className="text-accent" />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-muted">
            RAG request trace
          </span>
        </div>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
          c2c · lms
        </span>
      </div>

      <ol className="relative px-4 py-5 sm:px-5 sm:py-6">
        {STAGES.map((stage, i) => {
          const isActive = !reduce && active === i
          const isDone = reduce || active > i
          const isHovered = hovered === stage.id
          const Icon = stage.icon

          return (
            <li
              key={stage.id}
              onMouseEnter={() => setHovered(stage.id)}
              className="relative flex items-center gap-3.5 py-[0.5rem] sm:gap-4"
            >
              <span
                className={cn(
                  'relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-all duration-500 sm:h-9 sm:w-9',
                  isActive || isHovered
                    ? 'border-transparent bg-bg'
                    : isDone
                      ? 'border-line-strong bg-elevated'
                      : 'border-line bg-elevated'
                )}
                style={
                  isActive || isHovered
                    ? {
                        borderColor: stage.tint,
                        boxShadow: `0 0 0 3px color-mix(in oklab, ${stage.tint} 14%, transparent)`,
                      }
                    : undefined
                }
              >
                <Icon
                  size={14}
                  strokeWidth={1.7}
                  style={{ color: isActive || isDone || isHovered ? stage.tint : 'var(--ink-faint)' }}
                  className="transition-colors duration-500"
                />

                {/* Connector to the next stage — height matches the row gap exactly */}
                {i < STAGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-full h-4 w-px -translate-x-1/2 bg-line"
                  >
                    <motion.span
                      className="block h-full w-px origin-top"
                      style={{ background: stage.tint }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isDone ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={cn(
                      'truncate text-[0.875rem] transition-colors duration-500',
                      isActive || isDone || isHovered ? 'text-ink' : 'text-faint'
                    )}
                  >
                    {stage.label}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors duration-500',
                      isActive ? 'text-accent' : 'text-faint'
                    )}
                  >
                    {stage.meta}
                  </span>
                </div>
                <div className="mt-1.5 h-px w-full bg-line">
                  <motion.div
                    className="h-px origin-left"
                    style={{ background: stage.tint }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isDone ? 1 : isActive ? 0.6 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="relative flex items-center justify-between gap-3 border-t border-line px-4 py-3.5 sm:px-5">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
          Context-aware answer
        </span>
        <span className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-accent"
              animate={reduce ? { opacity: 0.6 } : { opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}
