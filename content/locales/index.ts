import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '../types'
import { nl } from './nl'
import { en } from './en'
import { tr } from './tr'
import { ar } from './ar'

const dictionaries: Record<Locale, Dictionary> = { nl, en, tr, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export { nl, en, tr, ar }
