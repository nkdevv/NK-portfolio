import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'

/**
 * The label names the *action*, so aria-pressed is deliberately absent.
 *
 * Carrying both made screen readers announce "Switch to light theme, toggle
 * button, pressed": the label describes what will happen and the pressed state
 * describes what currently is, leaving the listener to work out which one
 * refers to the active theme. A toggle should do one or the other.
 */
export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={cn(
        'relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-soft transition-colors duration-300 hover:border-line-strong hover:text-ink',
        className
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {isDark ? <Moon size={15} strokeWidth={1.7} /> : <Sun size={15} strokeWidth={1.7} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
