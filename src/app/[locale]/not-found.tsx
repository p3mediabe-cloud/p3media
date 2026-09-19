import { getDictionary } from '@content/locales'
import { defaultLocale, path } from '@/lib/i18n'
import { ButtonLink } from '@/components/ui'
import { MeridianLines } from '@/components/MeridianLines'

/**
 * Rendered for unknown paths inside a known locale. It cannot read the route
 * params, so it speaks the default locale — the language switcher in the
 * header remains available for anyone who needs another.
 */
export default function LocaleNotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <MeridianLines className="pointer-events-none absolute start-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 text-[var(--accent)] opacity-[0.15]" />

      <div className="container-x relative py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] text-balance">
          {dict.notFound.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)] text-pretty">
          {dict.notFound.body}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={path(defaultLocale, 'home')}>{dict.notFound.button}</ButtonLink>
        </div>
      </div>
    </section>
  )
}
