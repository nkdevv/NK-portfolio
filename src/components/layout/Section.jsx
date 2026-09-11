import { cn } from '@/lib/utils'

/**
 * Consistent vertical rhythm + optional top hairline for every section.
 *
 * scroll-mt-28 keeps a hash-linked section clear of the fixed navbar; without
 * it the heading lands underneath the bar.
 */
export default function Section({ id, className, divider = false, children, ...rest }) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-28 py-20 sm:py-28 lg:py-36', className)}
      {...rest}
    >
      {divider && <div aria-hidden="true" className="rule-x absolute inset-x-0 top-0" />}
      <div className="shell">{children}</div>
    </section>
  )
}
