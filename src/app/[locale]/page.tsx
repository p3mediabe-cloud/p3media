import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { site } from '@content/site'
import { getDictionary } from '@content/locales'
import { services } from '@content/services'
import { markets } from '@content/markets'
import { isLocale, isRtl, path, type Locale } from '@/lib/i18n'
import { pageMetadata, faqSchema } from '@/lib/seo'
import { ButtonLink, JsonLd, Section, SectionHeading } from '@/components/ui'
import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/Marquee'
import { MeridianLines } from '@/components/MeridianLines'
import { Accordion } from '@/components/Accordion'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return pageMetadata({
    locale,
    key: 'home',
    title: dict.home.meta.title,
    description: dict.home.meta.description,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw as Locale
  const dict = getDictionary(locale)
  const rtl = isRtl(locale)
  const home = dict.home

  return (
    <>
      <JsonLd data={faqSchema(home.faq.items)} />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <MeridianLines className="pointer-events-none absolute start-1/2 top-1/2 size-[min(160vw,1100px)] -translate-x-1/2 -translate-y-1/2 text-[var(--accent)] opacity-[0.18] rtl:translate-x-1/2" />

        <div className="container-x relative py-24 md:py-32 lg:py-40">
          <Reveal>
            <p className="eyebrow">{home.hero.eyebrow}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] text-balance">
              {home.hero.title}
              <br />
              <span className="text-[var(--accent)] italic">{home.hero.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] text-pretty md:text-xl">
              {home.hero.lead}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <ButtonLink href={path(locale, 'contact')} rtl={rtl}>
                {home.hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={path(locale, 'approach')} variant="ghost" rtl={rtl}>
                {home.hero.ctaSecondary}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-20 grid gap-x-8 gap-y-5 border-t border-[var(--line)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {home.hero.signals.map((signal) => (
                <li key={signal} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-[var(--accent)]" />
                  {signal}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Marquee items={home.marquee} />

      {/* ---------------------------------------------------------------- */}
      {/* Positioning                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow={home.positioning.eyebrow}
              title={home.positioning.title}
              body={home.positioning.body}
            />
          </Reveal>

          <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
            {home.positioning.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 70}>
                <article className="h-full bg-[var(--surface)] p-9 transition-colors duration-500 hover:bg-[var(--surface-raised)] lg:p-12">
                  <span className="font-display text-4xl text-[var(--accent)] opacity-40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 font-display text-2xl lg:text-3xl">{pillar.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Services                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow={home.servicesSection.eyebrow}
              title={home.servicesSection.title}
              body={home.servicesSection.body}
            />
          </Reveal>

          <ul className="mt-16 space-y-px">
            {services.map((service, index) => {
              const copy = service.copy[locale]
              return (
                <Reveal as="li" key={service.id} delay={index * 60}>
                  <Link
                    href={path(locale, 'services', service.slug[locale])}
                    className="group flex flex-col gap-6 border-t border-[var(--line)] py-9 transition-colors last:border-b hover:border-[var(--accent)] md:flex-row md:items-center md:gap-12"
                  >
                    <span className="font-display text-2xl text-[var(--accent)] opacity-50 md:w-16">
                      {service.number}
                    </span>

                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                      <Icon name={service.icon} className="size-5" />
                    </span>

                    <span className="md:w-72 lg:w-80">
                      <span className="block font-display text-2xl transition-colors group-hover:text-[var(--accent)] lg:text-3xl">
                        {copy.name}
                      </span>
                    </span>

                    <span className="flex-1 leading-relaxed text-[var(--text-secondary)]">
                      {copy.tagline}
                    </span>

                    <Icon
                      name={rtl ? 'arrowRtl' : 'arrow'}
                      className="size-5 shrink-0 text-[var(--text-muted)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--accent)] rtl:group-hover:-translate-x-1.5"
                    />
                  </Link>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Numbers                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section inverse className="overflow-hidden">
        <MeridianLines className="pointer-events-none absolute end-0 top-1/2 size-[46rem] -translate-y-1/2 translate-x-1/3 text-[var(--color-brass-light)] opacity-20 rtl:-translate-x-1/3" />

        <div className="container-x relative">
          <Reveal>
            <SectionHeading
              eyebrow={home.numbers.eyebrow}
              title={home.numbers.title}
              body={home.numbers.body}
            />
          </Reveal>

          <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {home.numbers.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div className="border-t border-current/20 pt-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(3rem,7vw,5rem)] leading-none text-[var(--color-brass-light)]">
                      {stat.value}
                    </span>
                    <span className="mt-5 block text-sm leading-relaxed opacity-80">
                      {stat.label}
                    </span>
                    {stat.note ? (
                      <span className="mt-2 block text-xs tracking-wide opacity-50">
                        {stat.note}
                      </span>
                    ) : null}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={200}>
            <figure className="mt-24 max-w-4xl">
              <blockquote className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight text-balance">
                “{home.testimonialPlaceholder.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-sm opacity-65">
                <span className="h-px w-10 bg-current" />
                <span>
                  {home.testimonialPlaceholder.author} — {home.testimonialPlaceholder.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Markets                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow={home.marketsSection.eyebrow}
              title={home.marketsSection.title}
              body={home.marketsSection.body}
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {markets.map((market, index) => {
              const copy = market.copy[locale]
              return (
                <Reveal key={market.id} delay={index * 70}>
                  <Link
                    href={path(locale, 'markets', market.slug[locale])}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-[var(--line)] p-9 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)] lg:p-11"
                  >
                    <div>
                      <p className="eyebrow">{copy.region}</p>
                      <h3 className="mt-5 font-display text-3xl transition-colors group-hover:text-[var(--accent)] lg:text-4xl">
                        {copy.name}
                      </h3>
                      <p className="mt-5 leading-relaxed text-[var(--text-secondary)]">
                        {copy.intro}
                      </p>
                    </div>
                    <span className="mt-9 inline-flex items-center gap-3 text-sm text-[var(--accent)]">
                      {dict.common.explore}
                      <Icon
                        name={rtl ? 'arrowRtl' : 'arrow'}
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Method                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow={home.method.eyebrow}
              title={home.method.title}
              body={home.method.body}
            />
          </Reveal>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4">
            {dict.approach.steps.map((step, index) => (
              <Reveal as="li" key={step.number} delay={index * 70}>
                <div className="h-full bg-[var(--surface)] p-8 lg:p-9">
                  <span className="eyebrow">{step.duration}</span>
                  <h3 className="mt-5 font-display text-2xl">
                    <span className="me-3 text-[var(--accent)] opacity-50">{step.number}</span>
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200}>
            <div className="mt-12">
              <ButtonLink href={path(locale, 'approach')} variant="ghost" rtl={rtl}>
                {dict.nav.approach}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Edge                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow={home.edge.eyebrow} title={home.edge.title} body={home.edge.body} />
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
            {home.edge.items.map((item, index) => (
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

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section className="bg-[var(--surface-sunken)]">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow={home.faq.eyebrow} title={home.faq.title} />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Accordion items={home.faq.items} />
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section inverse className="overflow-hidden">
        <MeridianLines className="pointer-events-none absolute start-1/2 top-1/2 size-[52rem] -translate-x-1/2 -translate-y-1/2 text-[var(--color-brass-light)] opacity-20 rtl:translate-x-1/2" />

        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow">{home.cta.eyebrow}</p>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.25rem)] text-balance">
              {home.cta.title}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed opacity-75 text-pretty">
              {home.cta.body}
            </p>
            <div className="mt-12 flex flex-col items-center gap-5">
              <ButtonLink href={path(locale, 'contact')} variant="inverse" rtl={rtl}>
                {home.cta.button}
              </ButtonLink>
              <p className="text-sm opacity-55">{home.cta.note}</p>
            </div>
            <p className="mt-14 text-xs tracking-[0.2em] uppercase opacity-45">
              {site.hubs.map((hub) => hub.city).join('  ·  ')}
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
