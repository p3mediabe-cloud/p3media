import Link from 'next/link'
import { markets } from '@content/markets'
import type { Dictionary } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { Icon } from '../Icon'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section, SectionHeading } from '../ui'

export function MarketsIndex({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = isRtl(locale)

  return (
    <>
      <PageHero
        eyebrow={dict.markets.eyebrow}
        title={dict.markets.title}
        lead={dict.markets.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [
          { key: 'markets', label: dict.nav.markets },
        ])}
      />

      <Section>
        <div className="container-x">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
              {dict.markets.intro}
            </p>
          </Reveal>

          <div className="mt-20 space-y-16 lg:space-y-24">
            {markets.map((market, index) => {
              const copy = market.copy[locale]
              return (
                <Reveal key={market.id} delay={index * 50}>
                  <article className="grid gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16 lg:pt-16">
                    <div className="lg:sticky lg:top-32 lg:self-start">
                      <p className="eyebrow">{copy.region}</p>
                      <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)]">
                        <Link
                          href={path(locale, 'markets', market.slug[locale])}
                          className="transition-colors hover:text-[var(--accent)]"
                        >
                          {copy.name}
                        </Link>
                      </h2>
                      <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
                        {copy.intro}
                      </p>
                      <Link
                        href={path(locale, 'markets', market.slug[locale])}
                        className="group mt-8 inline-flex items-center gap-3 text-sm text-[var(--accent)]"
                      >
                        {dict.common.readMore}
                        <Icon
                          name={rtl ? 'arrowRtl' : 'arrow'}
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                        />
                      </Link>
                    </div>

                    <div>
                      <h3 className="eyebrow mb-4">{dict.marketDetail.contextLabel}</h3>
                      <p className="leading-relaxed text-[var(--text-secondary)]">{copy.context}</p>

                      <h3 className="eyebrow mt-10 mb-4">{dict.marketDetail.opportunityLabel}</h3>
                      <ul className="space-y-3">
                        {copy.opportunity.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm">
                            <Icon
                              name="check"
                              className="mt-1 size-3.5 shrink-0 text-[var(--accent)]"
                            />
                            <span className="text-[var(--text-secondary)]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={dict.markets.whyUsTitle} />
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3 lg:gap-14">
            {dict.markets.whyUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article>
                  <div className="mb-5 h-px w-12 bg-[var(--accent)]" />
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
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
