import type { Locale } from '@/lib/i18n'
import type { Market } from '../types'
import { benelux } from './benelux'
import { europe } from './europe'
import { turkiye } from './turkiye'
import { gulf } from './gulf'

/** Ordered from home market outward — the same order we advise clients to expand in. */
export const markets: Market[] = [benelux, europe, turkiye, gulf]

export function marketBySlug(locale: Locale, slug: string): Market | undefined {
  return markets.find((market) => market.slug[locale] === slug)
}
