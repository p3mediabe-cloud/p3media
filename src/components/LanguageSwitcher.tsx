'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { locales, localeConfig, type Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/paths'
import { Icon } from './Icon'

export function LanguageSwitcher({
  locale,
  label,
  className = '',
}: {
  locale: Locale
  label: string
  className?: string
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        className="flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs tracking-[0.12em] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <Icon name="globe" className="size-3.5" />
        {localeConfig[locale].short}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute end-0 top-[calc(100%+0.6rem)] z-50 min-w-48 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] py-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]"
        >
          {locales.map((candidate) => {
            const active = candidate === locale
            return (
              <Link
                key={candidate}
                href={localizedPath(pathname, candidate)}
                hrefLang={localeConfig[candidate].hreflang}
                lang={localeConfig[candidate].hreflang}
                dir={localeConfig[candidate].dir}
                role="menuitem"
                onClick={() => setOpen(false)}
                aria-current={active ? 'true' : undefined}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface-sunken)] ${
                  active ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                <span>{localeConfig[candidate].label}</span>
                <span className="text-[0.65rem] tracking-[0.14em] text-[var(--text-muted)] uppercase">
                  {localeConfig[candidate].short}
                </span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
