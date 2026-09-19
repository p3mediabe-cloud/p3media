import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/lib/i18n'

/**
 * Sends bare paths to a locale.
 *
 * Detection is a courtesy, not a cage: the visitor can always switch language
 * and every locale keeps its own indexable URL, so search engines never depend
 * on this redirect to reach a translation.
 */
function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    const match = locales.find((locale) => locale === base)
    if (match) return match
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Everything except Next internals, metadata routes and files with an
    // extension — those must never be rewritten into a locale.
    '/((?!_next|api|.*\\..*|robots\\.txt|sitemap\\.xml|opengraph-image|icon).*)',
  ],
}
