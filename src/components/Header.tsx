'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { path, isRtl, type Locale, type RouteKey } from '@/lib/i18n'
import type { Dictionary } from '@content/types'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'

const navKeys: RouteKey[] = ['services', 'markets', 'approach', 'work', 'about', 'investment']

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rtl = isRtl(locale)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation, and stop the page behind it scrolling.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const labels: Record<RouteKey, string> = {
    home: dict.meta.siteName,
    services: dict.nav.services,
    markets: dict.nav.markets,
    approach: dict.nav.approach,
    work: dict.nav.work,
    about: dict.nav.about,
    investment: dict.nav.investment,
    contact: dict.nav.contact,
    privacy: dict.privacy.title,
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--text-primary)] focus:px-5 focus:py-3 focus:text-sm focus:text-[var(--surface)]"
      >
        {dict.common.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Logo locale={locale} />

          <nav aria-label={dict.meta.siteName} className="hidden items-center gap-8 lg:flex">
            {navKeys.map((key) => {
              const href = path(locale, key)
              const active = pathname.startsWith(href)
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative text-sm transition-colors after:absolute after:-bottom-1.5 after:start-0 after:h-px after:bg-[var(--accent)] after:transition-all after:duration-300 hover:text-[var(--accent)] ${
                    active
                      ? 'text-[var(--accent)] after:w-full'
                      : 'text-[var(--text-secondary)] after:w-0 hover:after:w-full'
                  }`}
                >
                  {labels[key]}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} label={dict.common.languageLabel} />

            <Link
              href={path(locale, 'contact')}
              className="hidden rounded-full bg-[var(--text-primary)] px-6 py-2.5 text-sm text-[var(--surface)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] md:inline-flex"
            >
              {dict.nav.cta}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.common.openMenu}
              className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] lg:hidden"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/45 transition-opacity duration-400 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          role="dialog"
          aria-modal={menuOpen}
          aria-label={dict.common.openMenu}
          className={`absolute inset-y-0 end-0 flex w-[min(88vw,26rem)] flex-col bg-[var(--surface-raised)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? 'translate-x-0' : rtl ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-[var(--line)] px-6">
            <Logo locale={locale} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={dict.common.closeMenu}
              className="flex size-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-1">
              {[...navKeys, 'contact' as RouteKey].map((key, index) => (
                <li key={key}>
                  <Link
                    href={path(locale, key)}
                    className="flex items-baseline gap-4 py-3 font-display text-3xl transition-colors hover:text-[var(--accent)]"
                  >
                    <span className="w-8 shrink-0 text-[0.65rem] tracking-widest text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {labels[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-[var(--line)] px-6 py-6">
            <p className="eyebrow mb-3">{dict.common.languagesLabel}</p>
            <p className="text-sm text-[var(--text-secondary)]">
              NL · FR · EN · DE · TR · AR
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
