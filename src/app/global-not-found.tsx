import type { Metadata } from 'next'
import { getDictionary } from '@content/locales'
import { defaultLocale, localeConfig, path } from '@/lib/i18n'
import { fontVariables, fontFamilyVars } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
}

/**
 * Shown for paths that do not resolve to any locale at all, so it renders its
 * own document shell — the locale layout never runs for these requests.
 */
export default function GlobalNotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <html
      lang={localeConfig[defaultLocale].hreflang}
      dir={localeConfig[defaultLocale].dir}
      className={fontVariables}
      style={fontFamilyVars(defaultLocale)}
    >
      <body className="flex min-h-screen items-center justify-center">
        <div className="container-x py-24 text-center">
          <p className="eyebrow">404</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] text-balance">
            {dict.notFound.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)]">
            {dict.notFound.body}
          </p>
          <a
            href={path(defaultLocale, 'home')}
            className="mt-10 inline-flex rounded-full bg-[var(--text-primary)] px-7 py-3.5 text-sm text-[var(--surface)]"
          >
            {dict.notFound.button}
          </a>
        </div>
      </body>
    </html>
  )
}
