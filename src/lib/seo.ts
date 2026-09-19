import type { Metadata } from 'next'
import { site } from '@content/site'
import { getDictionary } from '@content/locales'
import { locales, localeConfig, path, type Locale, type RouteKey } from './i18n'

/**
 * Build the alternates block for a page.
 *
 * `slugs` carries the per-locale slug of a detail page (a service or a market);
 * omit it for section-level pages. Every page gets a canonical plus one
 * hreflang entry per locale, and an x-default pointing at English — the safest
 * fallback for a site whose visitors come from four language regions.
 */
export function alternates(
  locale: Locale,
  key: RouteKey,
  slugs?: Record<Locale, string>,
): Metadata['alternates'] {
  const languages: Record<string, string> = {}

  for (const candidate of locales) {
    const url = slugs
      ? path(candidate, key, slugs[candidate])
      : path(candidate, key)
    languages[localeConfig[candidate].hreflang] = url
  }

  languages['x-default'] = slugs ? path('en', key, slugs.en) : path('en', key)

  const canonical = slugs ? path(locale, key, slugs[locale]) : path(locale, key)

  return { canonical, languages }
}

interface PageMetaInput {
  locale: Locale
  title: string
  description: string
  key: RouteKey
  slugs?: Record<Locale, string>
  /** Set false on pages that should not be indexed (none by default). */
  index?: boolean
}

export function pageMetadata({
  locale,
  title,
  description,
  key,
  slugs,
  index = true,
}: PageMetaInput): Metadata {
  const canonicalPath = slugs ? path(locale, key, slugs[locale]) : path(locale, key)
  const dict = getDictionary(locale)

  return {
    title,
    description,
    alternates: alternates(locale, key, slugs),
    robots: index
      ? { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
      : { index: false, follow: true },
    openGraph: {
      type: 'website',
      siteName: dict.meta.siteName,
      title,
      description,
      url: site.url + canonicalPath,
      locale: localeConfig[locale].ogLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeConfig[candidate].ogLocale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/*                                                                     */
/* Everything emitted here must be true of the real organisation. We   */
/* deliberately do not emit aggregateRating or review markup: we have  */
/* no reviews yet, and inventing them is both dishonest and a manual   */
/* penalty waiting to happen.                                          */
/* ------------------------------------------------------------------ */

export function organizationSchema(locale: Locale) {
  const dict = getDictionary(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: dict.meta.siteName,
    alternateName: [site.brand, site.brandAr, site.parent],
    description: dict.meta.description,
    url: site.url + path(locale, 'home'),
    email: site.contact.email,
    slogan: dict.meta.tagline,
    parentOrganization: { '@type': 'Organization', name: site.parent },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.legal.street,
      postalCode: site.legal.postalCode,
      addressLocality: site.legal.city,
      addressRegion: site.legal.region,
      addressCountry: site.legal.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
    ],
    knowsLanguage: ['nl', 'fr', 'en', 'de', 'tr', 'ar'],
    sameAs: Object.values(site.social),
  }
}

export function websiteSchema(locale: Locale) {
  const dict = getDictionary(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: dict.meta.siteName,
    url: site.url + path(locale, 'home'),
    inLanguage: localeConfig[locale].hreflang,
    publisher: { '@id': `${site.url}/#organization` },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: site.url + item.url,
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function serviceSchema(input: {
  locale: Locale
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: site.url + input.url,
    inLanguage: localeConfig[input.locale].hreflang,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: ['Europe', 'Türkiye', 'Gulf Cooperation Council'],
  }
}
