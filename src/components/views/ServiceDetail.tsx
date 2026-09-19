import Link from 'next/link'
import { nextService } from '@content/services'
import type { Dictionary, Service } from '@content/types'
import { isRtl, path, type Locale } from '@/lib/i18n'
import { faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'
import { Icon } from '../Icon'
import { Accordion } from '../Accordion'
import { PageHero, crumbsFor, ClosingCta } from '../PageHero'
import { Reveal } from '../Reveal'
import { JsonLd, Section } from '../ui'

export function ServiceDetail({
  locale,
  dict,
  service,
}: {
  locale: Locale
  dict: Dictionary
  service: Service
}) {
  const rtl = isRtl(locale)
  const copy = service.copy[locale]
  const next = nextService(service)
  const url = path(locale, 'services', service.slug[locale])

  const crumbs = crumbsFor(locale, dict.meta.siteName, [
    { key: 'services', label: dict.nav.services },
    { key: 'services', label: copy.name, slug: service.slug[locale] },
  ])

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ locale, name: copy.name, description: copy.metaDescription, url }),
          faqSchema(copy.faq),
          breadcrumbSchema(crumbs.map((crumb) => ({ name: crumb.name, url: crumb.href }))),
        ]}
      />

      <PageHero
        eyebrow={`${service.number} — ${dict.nav.services}`}
        title={copy.name}
        lead={copy.tagline}
        crumbs={crumbs}
      />

      <Section>
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span className="flex size-16 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--accent)]">
                <Icon name={service.icon} className="size-7" />
              </span>

              <h2 className="eyebrow mt-8 mb-3">{dict.serviceDetail.forWhomLabel}</h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{copy.forWhom}</p>

              <h2 className="eyebrow mt-8 mb-3">{dict.serviceDetail.outcomesLabel}</h2>
              <ul className="space-y-2.5">
                {copy.outcomes.map((item) => (
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
              <h2 className="eyebrow mb-5">{dict.serviceDetail.whatLabel}</h2>
              <p className="text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
                {copy.what}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="eyebrow mt-16 mb-6">{dict.serviceDetail.deliverablesLabel}</h2>
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {copy.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="eyebrow mt-16 mb-6">{dict.serviceDetail.processLabel}</h2>
              <ol className="space-y-px">
                {copy.process.map((step, index) => (
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

            <Reveal delay={160}>
              <h2 className="eyebrow mt-16 mb-4">{dict.serviceDetail.faqLabel}</h2>
              <Accordion items={copy.faq} />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--line)] bg-[var(--surface-sunken)] !py-14">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <Link
            href={path(locale, 'services')}
            className="inline-flex items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            <Icon name={rtl ? 'arrow' : 'arrowRtl'} className="size-4" />
            {dict.common.allServices}
          </Link>

          <Link
            href={path(locale, 'services', next.slug[locale])}
            className="group text-end"
          >
            <span className="eyebrow block">{dict.serviceDetail.nextLabel}</span>
            <span className="mt-1.5 inline-flex items-center gap-3 font-display text-2xl transition-colors group-hover:text-[var(--accent)]">
              {next.copy[locale].name}
              <Icon
                name={rtl ? 'arrowRtl' : 'arrow'}
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </span>
          </Link>
        </div>
      </Section>

      <ClosingCta
        title={dict.serviceDetail.ctaTitle}
        body={dict.serviceDetail.ctaBody}
        button={dict.serviceDetail.ctaButton}
        href={path(locale, 'contact')}
        rtl={rtl}
      />
    </>
  )
}
