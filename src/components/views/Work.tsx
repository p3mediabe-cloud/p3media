import { cases } from '@content/cases'
import type { Dictionary } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { Icon } from '../Icon'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section } from '../ui'

export function Work({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = isRtl(locale)

  return (
    <>
      <PageHero
        eyebrow={dict.work.eyebrow}
        title={dict.work.title}
        lead={dict.work.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [{ key: 'work', label: dict.nav.work }])}
      />

      <Section>
        <div className="container-x">
          {/* The honesty notice sits above the scenarios, not below them in
              small print. If a reader only skims, they still see it. */}
          <Reveal>
            <aside className="flex max-w-3xl gap-4 rounded-2xl border border-[var(--accent)]/35 bg-[var(--accent)]/[0.06] p-6 lg:p-8">
              <Icon name="compass" className="mt-0.5 size-5 shrink-0 text-[var(--accent)]" />
              <div>
                <p className="eyebrow mb-2">{dict.common.illustrative}</p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {dict.work.disclaimer}
                </p>
              </div>
            </aside>
          </Reveal>

          <div className="mt-20 space-y-16 lg:space-y-24">
            {cases.map((study, index) => {
              const copy = study.copy[locale]
              return (
                <Reveal key={study.id} delay={index * 50}>
                  <article className="grid gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16 lg:pt-16">
                    <div className="lg:sticky lg:top-32 lg:self-start">
                      <p className="eyebrow">{copy.sector}</p>
                      <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] text-balance">
                        {copy.title}
                      </h2>
                      <p className="mt-5 inline-flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                        <Icon name="pin" className="size-4" />
                        {copy.market}
                      </p>
                      <p className="mt-6 inline-block rounded-full border border-[var(--line-strong)] px-4 py-1.5 text-[0.7rem] tracking-[0.12em] text-[var(--text-muted)] uppercase">
                        {dict.common.illustrative}
                      </p>
                    </div>

                    <div>
                      <h3 className="eyebrow mb-4">{dict.work.challengeLabel}</h3>
                      <p className="leading-relaxed text-[var(--text-secondary)]">
                        {copy.challenge}
                      </p>

                      <h3 className="eyebrow mt-10 mb-4">{dict.work.moveLabel}</h3>
                      <ul className="space-y-3.5">
                        {copy.moves.map((item) => (
                          <li key={item} className="flex items-start gap-3.5">
                            <Icon
                              name="check"
                              className="mt-1.5 size-4 shrink-0 text-[var(--accent)]"
                            />
                            <span className="leading-relaxed text-[var(--text-secondary)]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="eyebrow mt-10 mb-4">{dict.work.resultLabel}</h3>
                      <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                        {copy.steering.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span className="text-sm text-[var(--text-secondary)]">{item}</span>
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

      <ClosingCta
        title={dict.work.cta.title}
        body={dict.work.cta.body}
        button={dict.work.cta.button}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
