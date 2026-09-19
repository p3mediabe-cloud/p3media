import { site } from '@content/site'
import type { Dictionary } from '@content/types'
import { localeConfig, type Locale } from '@/lib/i18n'
import { PageHero, crumbsFor } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section } from '../ui'

/** Fixed so the stated date reflects a real review, not the build timestamp. */
const LAST_UPDATED = '2026-09-19'

export function Privacy({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const formatted = new Intl.DateTimeFormat(localeConfig[locale].hreflang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(LAST_UPDATED))

  return (
    <>
      <PageHero
        eyebrow={dict.footer.legalTitle}
        title={dict.privacy.title}
        crumbs={crumbsFor(locale, dict.meta.siteName, [
          { key: 'privacy', label: dict.privacy.title },
        ])}
        meta={[{ label: dict.privacy.updated, value: formatted }]}
      />

      <Section>
        <div className="container-x max-w-3xl">
          <div className="space-y-12">
            {dict.privacy.sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 40}>
                <article>
                  <h2 className="font-display text-2xl md:text-3xl">{section.title}</h2>
                  <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                    {section.body}
                  </p>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <div className="border-t border-[var(--line)] pt-10">
                <p className="text-sm text-[var(--text-secondary)]">
                  {site.legal.name} — {site.legal.vat}
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-2 inline-block text-sm text-[var(--accent)]"
                >
                  {site.contact.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
