import Link from 'next/link'
import { site } from '@content/site'
import { path, type Locale } from '@/lib/i18n'

/**
 * The wordmark. A drawn logo file would be swapped in here at launch; until
 * then the type itself carries the brand — which for a typographic identity is
 * closer to the final result than a placeholder image would be.
 */
export function Logo({ locale, className = '' }: { locale: Locale; className?: string }) {
  return (
    <Link
      href={path(locale, 'home')}
      className={`group inline-flex items-baseline gap-2.5 ${className}`}
      aria-label={site.brandFull}
    >
      <span className="font-display text-2xl leading-none font-normal tracking-[0.2em] uppercase">
        {site.brand}
      </span>
      <span className="hidden text-[0.6rem] tracking-[0.18em] text-[var(--text-muted)] uppercase transition-colors group-hover:text-[var(--accent)] sm:inline">
        by {site.parent}
      </span>
    </Link>
  )
}
