import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@content/locales'
import { services, serviceBySlug } from '@content/services'
import { markets, marketBySlug } from '@content/markets'
import { isLocale, locales, routeSlugs, routeKeyFromSlug, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import { ServiceDetail } from '@/components/views/ServiceDetail'
import { MarketDetail } from '@/components/views/MarketDetail'

export const dynamicParams = false

/**
 * Detail pages exist only under the services and markets sections. Enumerating
 * them here is what lets every localized slug be statically rendered — and it
 * means an unknown slug 404s at build time instead of at request time.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...services.map((service) => ({
      locale,
      section: routeSlugs.services[locale],
      slug: service.slug[locale],
    })),
    ...markets.map((market) => ({
      locale,
      section: routeSlugs.markets[locale],
      slug: market.slug[locale],
    })),
  ])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>
}): Promise<Metadata> {
  const { locale, section, slug } = await params
  if (!isLocale(locale)) return {}

  const key = routeKeyFromSlug(locale, section)

  if (key === 'services') {
    const service = serviceBySlug(locale, slug)
    if (!service) return {}
    const copy = service.copy[locale]
    return pageMetadata({
      locale,
      key: 'services',
      title: copy.metaTitle,
      description: copy.metaDescription,
      slugs: service.slug,
    })
  }

  if (key === 'markets') {
    const market = marketBySlug(locale, slug)
    if (!market) return {}
    const copy = market.copy[locale]
    return pageMetadata({
      locale,
      key: 'markets',
      title: copy.metaTitle,
      description: copy.metaDescription,
      slugs: market.slug,
    })
  }

  return {}
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>
}) {
  const { locale: raw, section, slug } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw as Locale
  const dict = getDictionary(locale)
  const key = routeKeyFromSlug(locale, section)

  if (key === 'services') {
    const service = serviceBySlug(locale, slug)
    if (!service) notFound()
    return <ServiceDetail locale={locale} dict={dict} service={service} />
  }

  if (key === 'markets') {
    const market = marketBySlug(locale, slug)
    if (!market) notFound()
    return <MarketDetail locale={locale} dict={dict} market={market} />
  }

  notFound()
}
