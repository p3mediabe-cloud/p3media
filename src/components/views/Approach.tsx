import type { Dictionary } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { Icon } from '../Icon'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section, SectionHeading } from '../ui'

export function Approach({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = isRtl(locale)

  return (
    <>
      <PageHero
        eyebrow={dict.approach.eyebrow}
        title={dict.approach.title}
        lead={dict.approach.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [
          { key: 'approach', label: dict.nav.approach },
        ])}
      />

      <Section>
        <div className="container-x">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
              {dict.approach.intro}
            </p>
          </Reveal>

          <ol className="mt-20 space-y-16 lg:space-y-24">
            {dict.approach.steps.map((step, index) => (
              <Reveal as="li" key={step.number} delay={index * 50}>
                <div className="grid gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 lg:pt-16">
                  <div className="lg:sticky lg:top-32 lg:self-start">
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none text-[var(--accent)] opacity-35">
                        {step.number}
                      </span>
                      <span className="eyebrow">{step.duration}</span>
                    </div>
                    <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.9rem)]">
                      {step.title}
                    </h2>
                  </div>

                  <div>
                    <p className="text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
                      {step.body}
                    </p>

                    <h3 className="eyebrow mt-10 mb-5">{dict.serviceDetail.deliverablesLabel}</h3>
                    <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Icon name="check" className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                          <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={dict.approach.principlesTitle} />
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
            {dict.approach.principles.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 70}>
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
        title={dict.approach.cta.title}
        body={dict.approach.cta.body}
        button={dict.approach.cta.button}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
