import { Cormorant_Garamond, Inter, Noto_Kufi_Arabic, IBM_Plex_Sans_Arabic } from 'next/font/google'
import type { Locale } from '@/lib/i18n'

/**
 * Latin pairing: a light Cormorant Garamond for display against Inter for text.
 * The high-contrast serif is what carries the premium register; Inter keeps
 * long-form copy readable at small sizes.
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

/**
 * Arabic gets its own pairing rather than a Latin font with Arabic fallback.
 * Noto Kufi carries the same geometric authority as the Latin display face,
 * and IBM Plex Sans Arabic is built for sustained reading.
 */
const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-kufi',
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-arabic',
})

/** Every font variable is loaded on every page so the language switcher never
 *  flashes an unstyled script when a visitor changes locale. */
export const fontVariables = [
  cormorant.variable,
  inter.variable,
  notoKufi.variable,
  plexArabic.variable,
].join(' ')

/** Maps the loaded faces onto the two families the design system consumes. */
export function fontFamilyVars(locale: Locale): React.CSSProperties {
  if (locale === 'ar') {
    return {
      '--font-display-family': 'var(--font-kufi)',
      '--font-body-family': 'var(--font-plex-arabic)',
    } as React.CSSProperties
  }

  return {
    '--font-display-family': 'var(--font-cormorant)',
    '--font-body-family': 'var(--font-inter)',
  } as React.CSSProperties
}
