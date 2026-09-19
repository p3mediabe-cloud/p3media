import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@content/locales'
import type { Dictionary, Meta } from '@content/types'
import {
  isLocale,
  locales,
  routeKeys,
  routeSlugs,
  routeKeyFromSlug,
  type Locale,
  type RouteKey,
} from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import { ServicesIndex } from '@/components/views/ServicesIndex'
import { MarketsIndex } from '@/components/views/MarketsIndex'
import { Approach } from '@/components/views/Approach'
import { Work } from '@/components/views/Work'
import { About } from '@/components/views/About'
import { Investment } from '@/components/views/Investment'
import { Contact } from '@/components/views/Contact'
import { Privacy } from '@/components/views/Privacy'

export const dynamicParams = false

/** Section-level route keys — `home` has its own file, so it is excluded. */
const sectionKeys = routeKeys.filter((key): key is Exclude<RouteKey, 'home'> => key !== 'home')

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    sectionKeys.map((key) => ({ locale, section: routeSlugs[key][locale] })),
  )
}

function metaFor(dict: Dictionary, key: RouteKey): Meta {
  switch (key) {
    case 'services':
      return dict.services.meta
    case 'markets':
      return dict.markets.meta
    case 'approach':
      return dict.approach.meta
    case 'work':
      return dict.work.meta
    case 'about':
      return dict.about.meta
    case 'investment':
      return dict.investment.meta
    case 'contact':
      return dict.contact.meta
    case 'privacy':
      return dict.privacy.meta
    default:
      return { title: dict.meta.siteName, description: dict.meta.description }
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>
}): Promise<Metadata> {
  const { locale, section } = await params
  if (!isLocale(locale)) return {}

  const key = routeKeyFromSlug(locale, section)
  if (!key) return {}

  const dict = getDictionary(locale)
  const meta = metaFor(dict, key)

  return pageMetadata({
    locale,
    key,
    title: meta.title,
    description: meta.description,
    // A privacy policy has no business competing for search results.
    index: key !== 'privacy',
  })
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>
}) {
  const { locale: raw, section } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw as Locale
  const key = routeKeyFromSlug(locale, section)
  if (!key || key === 'home') notFound()

  const dict = getDictionary(locale)

  switch (key) {
    case 'services':
      return <ServicesIndex locale={locale} dict={dict} />
    case 'markets':
      return <MarketsIndex locale={locale} dict={dict} />
    case 'approach':
      return <Approach locale={locale} dict={dict} />
    case 'work':
      return <Work locale={locale} dict={dict} />
    case 'about':
      return <About locale={locale} dict={dict} />
    case 'investment':
      return <Investment locale={locale} dict={dict} />
    case 'contact':
      return <Contact locale={locale} dict={dict} />
    case 'privacy':
      return <Privacy locale={locale} dict={dict} />
    default:
      notFound()
  }
}
