import type { Locale } from '@/lib/i18n'
import type { Service } from '../types'
import { seo } from './seo'
import { brand } from './brand'
import { web } from './web'
import { video } from './video'
import { systems } from './systems'

/** Order here is the order shown on the site — it reflects the customer journey. */
export const services: Service[] = [seo, brand, web, video, systems]

export function serviceBySlug(locale: Locale, slug: string): Service | undefined {
  return services.find((service) => service.slug[locale] === slug)
}

export function nextService(current: Service): Service {
  const index = services.findIndex((service) => service.id === current.id)
  return services[(index + 1) % services.length]
}
