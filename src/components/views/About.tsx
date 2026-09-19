import { site } from '@content/site'
import type { Dictionary } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { Icon } from '../Icon'
import { MeridianLines } from '../MeridianLines'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section, SectionHeading } from '../ui'

const hubLabelKeys = ['hqLabel', 'opsLabel', 'gulfLabel'] as const

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = isRtl(locale)

  return (
    <>
      <PageHero
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        lead={dict.about.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [{ key: 'about', label: dict.nav.about }])}
      />

      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <MeridianLines className="size-40 text-[var(--accent)] opacity-50" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-6">
              {dict.about.story.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={
                    index === 0
                      ? 'text-xl leading-relaxed text-[var(--text-primary)] text-pretty md:text-2xl'
                      : 'leading-relaxed text-[var(--text-secondary)] text-pretty'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={dict.about.hubsTitle} body={dict.about.hubsBody} />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            {site.hubs.map((hub, index) => (
              <Reveal key={hub.key} delay={index * 70}>
                <div className="h-full bg-[var(--surface)] p-9 lg:p-11">
                  <p className="eyebrow">{dict.common[hubLabelKeys[index]]}</p>
                  <h3 className="mt-5 font-display text-3xl">{hub.city}</h3>
                  <p className="mt-3 inline-flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                    <Icon name="pin" className="size-4" />
                    {hub.country}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <SectionHeading title={dict.about.valuesTitle} />
              <div className="mt-10 space-y-8">
                {dict.about.values.map((value) => (
                  <article key={value.title}>
                    <h3 className="font-display text-2xl">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
                      {value.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-[var(--line)] p-9 lg:p-12">
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)]">
                {dict.about.languagesTitle}
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
                {dict.about.languagesBody}
              </p>

              <ul className="mt-10 flex flex-wrap gap-2.5">
                {site.languages.map((language) => (
                  <li
                    key={language}
                    className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-xs tracking-[0.14em] uppercase"
                  >
                    {language}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-[var(--line)] pt-8">
                <p className="eyebrow mb-2">{dict.common.availability}</p>
                <p className="font-display text-4xl text-[var(--accent)]">
                  {site.clientCap}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {dict.home.numbers.stats[0].label}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta
        title={dict.about.cta.title}
        body={dict.about.cta.body}
        button={dict.about.cta.button}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
