import Link from 'next/link'
import { site } from '@content/site'
import { services } from '@content/services'
import type { Dictionary } from '@content/types'
import { path, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'
import { Logo } from './Logo'

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()

  return (
    <footer className="surface-inverse relative overflow-hidden">
      <div className="container-x relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo locale={locale} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">{dict.footer.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.14em] uppercase opacity-60">
              {site.hubs.map((hub) => (
                <span key={hub.key} className="inline-flex items-center gap-2">
                  <Icon name="pin" className="size-3.5" />
                  {hub.city}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label={dict.footer.servicesTitle}>
            <h2 className="eyebrow mb-5">{dict.footer.servicesTitle}</h2>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={path(locale, 'services', service.slug[locale])}
                    className="opacity-70 transition-opacity hover:opacity-100"
                  >
                    {service.copy[locale].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.companyTitle}>
            <h2 className="eyebrow mb-5">{dict.footer.companyTitle}</h2>
            <ul className="space-y-3 text-sm">
              {(['markets', 'approach', 'work', 'about', 'investment', 'contact'] as const).map(
                (key) => (
                  <li key={key}>
                    <Link
                      href={path(locale, key)}
                      className="opacity-70 transition-opacity hover:opacity-100"
                    >
                      {key === 'markets'
                        ? dict.nav.markets
                        : key === 'approach'
                          ? dict.nav.approach
                          : key === 'work'
                            ? dict.nav.work
                            : key === 'about'
                              ? dict.nav.about
                              : key === 'investment'
                                ? dict.nav.investment
                                : dict.nav.contact}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5">{dict.footer.contactTitle}</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
                >
                  <Icon name="mail" className="size-4" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phoneBe.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
                >
                  <Icon name="phone" className="size-4" />
                  {site.contact.phoneBe}
                </a>
              </li>
            </ul>

            <h2 className="eyebrow mt-8 mb-3">{dict.footer.newsletterTitle}</h2>
            <p className="mb-4 text-sm leading-relaxed opacity-70">{dict.footer.newsletterBody}</p>
            <form
              action={`mailto:${site.contact.email}`}
              method="post"
              encType="text/plain"
              className="flex gap-2"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                {dict.footer.newsletterTitle}
              </label>
              <input
                id="footer-newsletter"
                type="email"
                name="email"
                required
                placeholder={dict.footer.newsletterPlaceholder}
                className="min-w-0 flex-1 rounded-full border border-current/20 bg-transparent px-4 py-2.5 text-sm placeholder:opacity-45 focus:border-current/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm text-[var(--accent-contrast)] transition-opacity hover:opacity-85"
              >
                {dict.footer.newsletterButton}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-current/15 pt-8 text-xs opacity-55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legal.name} — {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{site.legal.vat}</span>
            <Link href={path(locale, 'privacy')} className="transition-opacity hover:opacity-100">
              {dict.footer.legalTitle}
            </Link>
            <span>{dict.footer.builtBy}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
