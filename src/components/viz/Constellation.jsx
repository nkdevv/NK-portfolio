import { motion, useReducedMotion } from 'framer-motion'
import { constellation, orbits } from '@/data/skills'
import { cn, polar } from '@/lib/utils'

// Kept clear of the container edge so the widest labels never clip.
const R_NEAR = 25
const R_FAR = 36

const orbitColor = Object.fromEntries(orbits.map((o) => [o.id, o.accent]))

function nodePosition(node) {
  const r = node.radius >= 0.95 ? R_FAR : R_NEAR
  return polar(50, 50, r, node.angle)
}

/**
 * Radial system diagram: every technology connects back to the shipped
 * product, grouped by the layer it belongs to.
 */
export default function Constellation({ activeId, onActivate, className }) {
  const reduce = useReducedMotion()
  const activeNode = constellation.nodes.find((n) => n.id === activeId)
  const activeOrbit = activeNode?.orbit

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        role="presentation"
      >
        {[R_NEAR, R_FAR].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.18"
          />
        ))}

        {constellation.nodes.map((node) => {
          const { x, y } = nodePosition(node)
          const dim = activeOrbit && activeOrbit !== node.orbit
          const highlighted = activeId === node.id
          return (
            <line
              key={node.id}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={highlighted ? orbitColor[node.orbit] : 'var(--line-strong)'}
              strokeWidth={highlighted ? 0.4 : 0.24}
              opacity={dim ? 0.25 : 1}
              className={cn('transition-all duration-500', !reduce && 'flow-line')}
              style={reduce ? undefined : { animationDelay: `${node.angle * -0.02}s` }}
            />
          )
        })}

        <circle cx="50" cy="50" r="9" fill="var(--bg-elevated)" stroke="var(--line-strong)" strokeWidth="0.2" />
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 w-[18%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-mono text-[0.5rem] uppercase leading-tight tracking-[0.12em] text-faint xl:text-[0.58rem]">
          {constellation.core.label}
        </p>
      </div>

      {constellation.nodes.map((node, i) => {
        const { x, y } = nodePosition(node)
        const isActive = activeId === node.id
        const dim = activeOrbit && activeOrbit !== node.orbit

        return (
          <motion.button
            key={node.id}
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.04 }}
            onMouseEnter={() => onActivate(node.id)}
            onFocus={() => onActivate(node.id)}
            onClick={() => onActivate(node.id)}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              borderColor: isActive ? orbitColor[node.orbit] : undefined,
              boxShadow: isActive
                ? `0 0 0 4px color-mix(in oklab, ${orbitColor[node.orbit]} 12%, transparent)`
                : undefined,
              opacity: dim ? 0.4 : 1,
            }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] transition-all duration-400 xl:px-3 xl:text-[0.65rem]',
              isActive
                ? 'z-10 bg-bg text-ink'
                : 'border-line bg-elevated text-muted hover:border-line-strong hover:text-ink'
            )}
          >
            {node.label}
          </motion.button>
        )
      })}
    </div>
  )
}
