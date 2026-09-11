import { cn } from '@/lib/utils'
import Reveal from './Reveal'

/**
 * Editorial section header: numbered eyebrow, display title with an optional
 * serif accent fragment, and supporting copy.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  trail,
  description,
  align = 'left',
  className,
  id,
}) {
  const centered = align === 'center'

  return (
    <header className={cn('relative', centered && 'text-center', className)}>
      {(index || eyebrow) && (
        <Reveal
          className={cn(
            'flex items-center gap-3 label',
            centered && 'justify-center'
          )}
        >
          {index && <span className="text-accent">{index}</span>}
          {index && eyebrow && <span aria-hidden="true" className="h-px w-8 bg-line-strong" />}
          {eyebrow && <span>{eyebrow}</span>}
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-5 max-w-4xl text-balance text-[clamp(1.9rem,4.6vw,3.35rem)] font-medium leading-[1.06] tracking-[-0.035em]"
        >
          {title}
          {accent && (
            <>
              {' '}
              <span className="serif-accent bg-gradient-to-r from-accent to-violet bg-clip-text text-transparent">
                {accent}
              </span>
            </>
          )}
          {trail ? ` ${trail}` : null}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-soft',
              centered && 'mx-auto'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </header>
  )
}
