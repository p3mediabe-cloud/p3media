import Link from 'next/link'
import type { Dictionary } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { faqSchema } from '@/lib/seo'
import { Icon } from '../Icon'
import { Accordion } from '../Accordion'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { JsonLd, Section, SectionHeading } from '../ui'

export function Investment({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = isRtl(locale)

  return (
    <>
      <JsonLd data={faqSchema(dict.investment.faq)} />

      <PageHero
        eyebrow={dict.investment.eyebrow}
        title={dict.investment.title}
        lead={dict.investment.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [
          { key: 'investment', label: dict.nav.investment },
        ])}
      />

      <Section>
        <div className="container-x">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
              {dict.investment.intro}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {dict.investment.tiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 70}>
                <article
                  className={`flex h-full flex-col rounded-3xl border p-8 lg:p-10 ${
                    tier.featured
                      ? 'border-[var(--accent)] bg-[var(--surface-raised)] shadow-[0_32px_80px_-40px_rgb(0_0_0/0.4)]'
                      : 'border-[var(--line)]'
                  }`}
                >
                  {tier.featured ? (
                    <span className="mb-6 self-start rounded-full bg-[var(--accent)] px-4 py-1.5 text-[0.65rem] tracking-[0.16em] text-[var(--accent-contrast)] uppercase">
                      {dict.investment.featuredLabel}
                    </span>
                  ) : null}

                  <h2 className="font-display text-3xl">{tier.name}</h2>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">{tier.tagline}</p>

                  <div className="mt-8 border-y border-[var(--line)] py-6">
                    <p className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-[var(--accent)]">
                      {tier.priceLabel}
                    </p>
                    <p className="mt-2 text-xs tracking-wide text-[var(--text-muted)]">
                      {tier.priceNote}
                    </p>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {tier.forWhom}
                  </p>

                  <ul className="mt-8 flex-1 space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Icon name="check" className="mt-1 size-3.5 shrink-0 text-[var(--accent)]" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={path(locale, 'contact')}
                    className={`group mt-10 inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm transition-all duration-300 ${
                      tier.featured
                        ? 'bg-[var(--accent)] text-[var(--accent-contrast)] hover:gap-5'
                        : 'border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {tier.cta}
                    <Icon name={rtl ? 'arrowRtl' : 'arrow'} className="size-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <SectionHeading title={dict.investment.notesTitle} />
              <ul className="mt-10 space-y-5">
                {dict.investment.notes.map((note) => (
                  <li key={note} className="flex items-start gap-4">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="leading-relaxed text-[var(--text-secondary)]">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <SectionHeading title={dict.investment.faqTitle} />
              <div className="mt-10">
                <Accordion items={dict.investment.faq} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta
        title={dict.home.cta.title}
        body={dict.home.cta.body}
        button={dict.home.cta.button}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
