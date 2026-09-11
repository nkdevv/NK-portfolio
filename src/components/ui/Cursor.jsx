import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * A soft focus ring that trails the pointer and expands over interactive
 * elements. Fine pointers only — never rendered on touch devices.
 */
export default function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.35 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(pointer: fine)')
    setEnabled(fine.matches)
    const onChange = (e) => setEnabled(e.matches)
    fine.addEventListener('change', onChange)
    return () => fine.removeEventListener('change', onChange)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = event.target
      setActive(
        Boolean(
          target instanceof Element &&
            target.closest('a, button, [role="button"], [data-cursor="active"]')
        )
      )
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-90 hidden md:block"
    >
      <motion.div
        animate={{
          width: active ? 40 : 22,
          height: active ? 40 : 22,
          opacity: visible ? (active ? 0.9 : 0.45) : 0,
        }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
      />
    </motion.div>
  )
}
