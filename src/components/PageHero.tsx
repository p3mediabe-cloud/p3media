import Link from 'next/link'
import { path, type Locale, type RouteKey } from '@/lib/i18n'
import { Icon } from './Icon'
import { MeridianLines } from './MeridianLines'
import { Reveal } from './Reveal'

export interface Crumb {
  name: string
  href: string
}

/**
 * The shared opening for every inner page: eyebrow, display headline, lead and
 * a breadcrumb trail. Keeping this in one place is what makes the inner pages
 * feel like one publication rather than eight separate templates.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  meta,
}: {
  eyebrow: string
  title: string
  lead?: string
  crumbs?: Crumb[]
  meta?: { label: string; value: string }[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)]">
      <MeridianLines className="pointer-events-none absolute end-0 top-1/2 size-[40rem] -translate-y-1/2 translate-x-1/4 text-[var(--accent)] opacity-[0.14] rtl:-translate-x-1/4" />

      <div className="container-x relative py-16 md:py-24 lg:py-28">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-[var(--accent)]">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
            {title}
          </h1>
          {lead ? (
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] text-pretty md:text-xl">
              {lead}
            </p>
          ) : null}
        </Reveal>

        {meta?.length ? (
          <Reveal delay={120}>
            <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-[var(--line)] pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {meta.map((entry) => (
                <div key={entry.label}>
                  <dt className="eyebrow mb-2">{entry.label}</dt>
                  <dd className="text-sm text-[var(--text-secondary)]">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

/** Crumb trail helper so every page builds its breadcrumbs the same way. */
export function crumbsFor(
  locale: Locale,
  homeLabel: string,
  trail: { key: RouteKey; label: string; slug?: string }[],
): Crumb[] {
  return [
    { name: homeLabel, href: path(locale, 'home') },
    ...trail.map((entry) => ({
      name: entry.label,
      href: entry.slug ? path(locale, entry.key, entry.slug) : path(locale, entry.key),
    })),
  ]
}

/** Closing call-to-action shared by the inner pages. */
export function ClosingCta({
  title,
  body,
  button,
  href,
  rtl,
}: {
  title: string
  body: string
  button: string
  href: string
  rtl: boolean
}) {
  return (
    <section className="surface-inverse relative overflow-hidden py-20 lg:py-28">
      <MeridianLines className="pointer-events-none absolute start-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 text-[var(--color-brass-light)] opacity-20 rtl:translate-x-1/2" />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-balance">{title}</h2>
              <p className="mt-6 leading-relaxed opacity-75 text-pretty">{body}</p>
            </div>

            <Link
              href={href}
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 text-sm text-[var(--accent-contrast)] transition-all duration-300 hover:gap-5"
            >
              {button}
              <Icon name={rtl ? 'arrowRtl' : 'arrow'} className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
