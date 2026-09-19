/**
 * MERIDIAN i18n core.
 *
 * Every public URL is built from a canonical route key plus a per-locale slug,
 * so each market gets a native-language URL while the codebase keeps one route
 * tree. The slug tables below are the single source of truth for routing,
 * hreflang output and the sitemap.
 */

export const locales = ['nl', 'en', 'tr', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'nl'

export const localeConfig: Record<
  Locale,
  {
    /** BCP-47 tag used for <html lang> and hreflang. */
    hreflang: string
    dir: 'ltr' | 'rtl'
    /** Endonym — always show a language in its own language. */
    label: string
    /** Short label for the compact switcher. */
    short: string
    /** OpenGraph locale tag. */
    ogLocale: string
    /** Primary markets this locale is written for. */
    markets: string
  }
> = {
  nl: { hreflang: 'nl-BE', dir: 'ltr', label: 'Nederlands', short: 'NL', ogLocale: 'nl_BE', markets: 'België, Nederland' },
  en: { hreflang: 'en', dir: 'ltr', label: 'English', short: 'EN', ogLocale: 'en_GB', markets: 'Europe, international' },
  tr: { hreflang: 'tr-TR', dir: 'ltr', label: 'Türkçe', short: 'TR', ogLocale: 'tr_TR', markets: 'Türkiye' },
  ar: { hreflang: 'ar', dir: 'rtl', label: 'العربية', short: 'AR', ogLocale: 'ar_AE', markets: 'الخليج' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function dirOf(locale: Locale) {
  return localeConfig[locale].dir
}

export function isRtl(locale: Locale) {
  return localeConfig[locale].dir === 'rtl'
}

/* ------------------------------------------------------------------ */
/* Route keys → localized path segments                                */
/* ------------------------------------------------------------------ */

export const routeKeys = [
  'home',
  'services',
  'markets',
  'approach',
  'work',
  'about',
  'investment',
  'contact',
  'privacy',
] as const

export type RouteKey = (typeof routeKeys)[number]

/**
 * Arabic uses Latin transliterations rather than native-script slugs: encoded
 * Arabic in a URL is fragile across mail clients, ad platforms and analytics,
 * and Gulf users overwhelmingly type Latin URLs. The visible language stays
 * fully Arabic.
 */
export const routeSlugs: Record<RouteKey, Record<Locale, string>> = {
  home: { nl: '', en: '', tr: '', ar: '' },
  services: { nl: 'diensten', en: 'services', tr: 'hizmetler', ar: 'khadamat' },
  markets: { nl: 'markten', en: 'markets', tr: 'pazarlar', ar: 'aswaq' },
  approach: { nl: 'aanpak', en: 'approach', tr: 'yaklasim', ar: 'manhajiya' },
  work: { nl: 'realisaties', en: 'work', tr: 'calismalar', ar: 'aamal' },
  about: { nl: 'over-ons', en: 'about', tr: 'hakkimizda', ar: 'man-nahnu' },
  investment: { nl: 'investering', en: 'investment', tr: 'yatirim', ar: 'istithmar' },
  contact: { nl: 'contact', en: 'contact', tr: 'iletisim', ar: 'tawasul' },
  privacy: { nl: 'privacy', en: 'privacy', tr: 'gizlilik', ar: 'khsousiya' },
}

/** Build an absolute-from-root path for a route key in a given locale. */
export function path(locale: Locale, key: RouteKey, ...rest: string[]): string {
  const segments = [locale, routeSlugs[key][locale], ...rest].filter(Boolean)
  return '/' + segments.join('/')
}

/** Reverse lookup: which route key does this localized segment belong to? */
export function routeKeyFromSlug(locale: Locale, slug: string): RouteKey | null {
  for (const key of routeKeys) {
    if (routeSlugs[key][locale] === slug) return key
  }
  return null
}
