import Link from 'next/link'
import type { Dictionary, Market } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { breadcrumbSchema } from '@/lib/seo'
import { Icon } from '../Icon'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { JsonLd, Section } from '../ui'

export function MarketDetail({
  locale,
  dict,
  market,
}: {
  locale: Locale
  dict: Dictionary
  market: Market
}) {
  const rtl = isRtl(locale)
  const copy = market.copy[locale]

  const crumbs = crumbsFor(locale, dict.meta.siteName, [
    { key: 'markets', label: dict.nav.markets },
    { key: 'markets', label: copy.name, slug: market.slug[locale] },
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(crumbs.map((crumb) => ({ name: crumb.name, url: crumb.href })))}
      />

      <PageHero
        eyebrow={copy.region}
        title={copy.name}
        lead={copy.intro}
        crumbs={crumbs}
        meta={[{ label: dict.marketDetail.languagesLabel, value: copy.languages }]}
      />

      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="eyebrow mb-4">{dict.marketDetail.complianceLabel}</h2>
              <ul className="space-y-3">
                {copy.compliance.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="eyebrow mb-5">{dict.marketDetail.contextLabel}</h2>
              <p className="text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
                {copy.context}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="eyebrow mt-16 mb-6">{dict.marketDetail.opportunityLabel}</h2>
              <ul className="space-y-4">
                {copy.opportunity.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <Icon name="check" className="mt-1.5 size-4 shrink-0 text-[var(--accent)]" />
                    <span className="leading-relaxed text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="eyebrow mt-16 mb-6">{dict.marketDetail.playbookLabel}</h2>
              <ol className="space-y-px">
                {copy.playbook.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-4 border-t border-[var(--line)] py-7 last:border-b sm:grid-cols-[3rem_1fr] sm:gap-8"
                  >
                    <span className="font-display text-2xl text-[var(--accent)] opacity-50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl">{step.title}</h3>
                      <p className="mt-2.5 leading-relaxed text-[var(--text-secondary)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--line)] bg-[var(--surface-sunken)] !py-14">
        <div className="container-x">
          <Link
            href={path(locale, 'markets')}
            className="inline-flex items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            <Icon name={rtl ? 'arrow' : 'arrowRtl'} className="size-4" />
            {dict.common.allMarkets}
          </Link>
        </div>
      </Section>

      <ClosingCta
        title={dict.marketDetail.ctaTitle}
        body={dict.marketDetail.ctaBody}
        button={dict.marketDetail.ctaButton}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
