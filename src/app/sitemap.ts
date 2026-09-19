import type { MetadataRoute } from 'next'
import { site } from '@content/site'
import { services } from '@content/services'
import { markets } from '@content/markets'
import { locales, localeConfig, path, routeKeys, type Locale, type RouteKey } from '@/lib/i18n'

/**
 * Every URL is listed once per locale with a full set of hreflang alternates.
 * Search engines use those alternates to group the four language versions as
 * one page rather than four competing near-duplicates.
 */
function alternatesFor(key: RouteKey, slugs?: Record<Locale, string>) {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[localeConfig[locale].hreflang] = slugs
      ? site.url + path(locale, key, slugs[locale])
      : site.url + path(locale, key)
  }
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const key of routeKeys) {
      // The privacy policy is deliberately noindex, so it stays out.
      if (key === 'privacy') continue

      entries.push({
        url: site.url + path(locale, key),
        lastModified,
        changeFrequency: key === 'home' ? 'weekly' : 'monthly',
        priority: key === 'home' ? 1 : key === 'contact' ? 0.9 : 0.8,
        alternates: alternatesFor(key),
      })
    }

    for (const service of services) {
      entries.push({
        url: site.url + path(locale, 'services', service.slug[locale]),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: alternatesFor('services', service.slug),
      })
    }

    for (const market of markets) {
      entries.push({
        url: site.url + path(locale, 'markets', market.slug[locale]),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: alternatesFor('markets', market.slug),
      })
    }
  }

  return entries
}
