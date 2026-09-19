import { services } from '@content/services'
import { markets } from '@content/markets'
import {
  isLocale,
  path,
  routeKeyFromSlug,
  type Locale,
} from './i18n'

/**
 * Translate the current URL into its equivalent in another locale.
 *
 * Because slugs are localized, the language switcher cannot simply swap the
 * first segment — /nl/diensten/seo-en-zichtbaarheid has to become
 * /tr/hizmetler/seo-ve-gorunurluk. Anything we cannot resolve falls back to
 * that locale's homepage, which is always a valid destination.
 */
export function localizedPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  const [current, section, detail] = segments

  if (!current || !isLocale(current)) return path(target, 'home')
  if (!section) return path(target, 'home')

  const key = routeKeyFromSlug(current, section)
  if (!key) return path(target, 'home')

  if (!detail) return path(target, key)

  if (key === 'services') {
    const service = services.find((entry) => entry.slug[current] === detail)
    return service ? path(target, key, service.slug[target]) : path(target, key)
  }

  if (key === 'markets') {
    const market = markets.find((entry) => entry.slug[current] === detail)
    return market ? path(target, key, market.slug[target]) : path(target, key)
  }

  return path(target, key)
}
