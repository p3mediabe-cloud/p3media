import { site } from '@content/site'
import type { Dictionary } from '@content/types'
import type { Locale } from '@/lib/i18n'
import { ContactForm } from '../ContactForm'
import { Icon } from '../Icon'
import { PageHero, crumbsFor } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section } from '../ui'

const hubLabelKeys = ['hqLabel', 'opsLabel', 'gulfLabel'] as const
const hubPhones = [site.contact.phoneBe, site.contact.phoneTr, site.contact.phoneAe]

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <PageHero
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        lead={dict.contact.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [
          { key: 'contact', label: dict.nav.contact },
        ])}
      />

      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-20">
          <Reveal>
            <div>
              <p className="mb-10 max-w-2xl leading-relaxed text-[var(--text-secondary)] text-pretty">
                {dict.contact.intro}
              </p>
              <ContactForm locale={locale} dict={dict} />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-3xl border border-[var(--line)] p-8">
                <h2 className="eyebrow mb-5">{dict.contact.directTitle}</h2>
                <p className="mb-7 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {dict.contact.directBody}
                </p>

                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="inline-flex items-center gap-3 transition-colors hover:text-[var(--accent)]"
                    >
                      <Icon name="mail" className="size-4 text-[var(--accent)]" />
                      {site.contact.email}
                    </a>
                  </li>
                  {site.hubs.map((hub, index) => (
                    <li key={hub.key} className="flex items-start gap-3">
                      <Icon name="phone" className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                      <span>
                        <span className="block text-[0.65rem] tracking-[0.16em] text-[var(--text-muted)] uppercase">
                          {dict.common[hubLabelKeys[index]]} — {hub.city}
                        </span>
                        <a
                          href={`tel:${hubPhones[index].replace(/\s/g, '')}`}
                          className="transition-colors hover:text-[var(--accent)]"
                        >
                          {hubPhones[index]}
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-3xl border border-[var(--line)] p-8">
                <h2 className="eyebrow mb-4">{dict.contact.hoursTitle}</h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {dict.contact.hoursBody}
                </p>

                <div className="mt-7 border-t border-[var(--line)] pt-6">
                  <p className="eyebrow mb-2">{dict.common.responseTime}</p>
                  <p className="font-display text-3xl text-[var(--accent)]">
                    {dict.home.numbers.stats[3].value}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-[var(--line)] p-8">
                <h2 className="eyebrow mb-4">{dict.common.languagesLabel}</h2>
                <ul className="flex flex-wrap gap-2">
                  {site.languages.map((language) => (
                    <li
                      key={language}
                      className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[0.65rem] tracking-[0.14em] uppercase"
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
