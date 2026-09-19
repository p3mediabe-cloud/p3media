import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { site } from '@content/site'
import { getDictionary } from '@content/locales'
import { locales, localeConfig, isLocale, type Locale } from '@/lib/i18n'
import { organizationSchema, websiteSchema } from '@/lib/seo'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/ui'
import { fontVariables, fontFamilyVars } from '../fonts'
import '../globals.css'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f5ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0c' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.siteName,
      template: `%s — ${site.brand}`,
    },
    description: dict.meta.description,
    applicationName: dict.meta.siteName,
    authors: [{ name: site.parent }],
    creator: site.parent,
    publisher: site.legal.name,
    formatDetection: { telephone: true, address: false, email: false },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw as Locale
  const config = localeConfig[locale]
  const dict = getDictionary(locale)

  return (
    <html
      lang={config.hreflang}
      dir={config.dir}
      className={fontVariables}
      style={fontFamilyVars(locale)}
      suppressHydrationWarning
    >
      <head>
        {/* Marks that JavaScript is available so the reveal animations can hide
            their content first. Without JS everything stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
        <Header locale={locale} dict={dict} />
        <main id="main" className="pt-[4.5rem] lg:pt-20">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  )
}
