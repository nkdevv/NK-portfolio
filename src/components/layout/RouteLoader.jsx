import { motion } from 'framer-motion'

/** Quiet, layout-stable placeholder while a route chunk loads. */
export default function RouteLoader() {
  return (
    <div className="shell flex min-h-[70vh] flex-col justify-center py-32" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div aria-hidden="true" className="max-w-2xl space-y-4">
        {[0.42, 0.86, 0.68].map((width, i) => (
          <motion.div
            key={i}
            className="h-3 rounded-full bg-line"
            style={{ width: `${width * 100}%` }}
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}
