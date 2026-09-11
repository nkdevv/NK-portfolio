import { motion, useReducedMotion } from 'framer-motion'
import { EASE, viewportOnce } from '@/lib/motion'

/**
 * Scroll-triggered reveal. Collapses to a plain fade when the user has
 * requested reduced motion.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 18,
  duration = 0.7,
  className,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: reduce ? 0.3 : duration, ease: EASE, delay: reduce ? 0 : delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Word-by-word staggered text reveal for display headings. */
export function RevealText({ text, className, wordClassName, delay = 0, as: Tag = 'span' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ''}`}
              initial={{ y: '112%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: delay + i * 0.045 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
