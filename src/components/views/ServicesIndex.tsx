import Link from 'next/link'
import { services } from '@content/services'
import type { Dictionary } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { Icon } from '../Icon'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { Section } from '../ui'

export function ServicesIndex({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = isRtl(locale)

  return (
    <>
      <PageHero
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        lead={dict.services.lead}
        crumbs={crumbsFor(locale, dict.meta.siteName, [
          { key: 'services', label: dict.nav.services },
        ])}
      />

      <Section>
        <div className="container-x">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
              {dict.services.intro}
            </p>
          </Reveal>

          <div className="mt-20 space-y-px">
            {services.map((service, index) => {
              const copy = service.copy[locale]
              return (
                <Reveal key={service.id} delay={index * 60}>
                  <article className="border-t border-[var(--line)] py-12 last:border-b lg:py-16">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
                      <div>
                        <div className="flex items-center gap-5">
                          <span className="flex size-12 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--accent)]">
                            <Icon name={service.icon} className="size-5" />
                          </span>
                          <span className="font-display text-2xl text-[var(--accent)] opacity-50">
                            {service.number}
                          </span>
                        </div>

                        <h2 className="mt-7 font-display text-[clamp(1.9rem,3.6vw,2.9rem)]">
                          <Link
                            href={path(locale, 'services', service.slug[locale])}
                            className="transition-colors hover:text-[var(--accent)]"
                          >
                            {copy.name}
                          </Link>
                        </h2>
                        <p className="mt-4 text-[var(--text-secondary)]">{copy.tagline}</p>

                        <Link
                          href={path(locale, 'services', service.slug[locale])}
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
                        <p className="leading-relaxed text-[var(--text-secondary)]">{copy.what}</p>

                        <h3 className="eyebrow mt-10 mb-4">{dict.serviceDetail.deliverablesLabel}</h3>
                        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {copy.deliverables.slice(0, 6).map((item) => (
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
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Section>

      <ClosingCta
        title={dict.services.outro.title}
        body={dict.services.outro.body}
        button={dict.services.outro.button}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
