import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const buttonBase =
  'group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  rtl = false,
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'inverse'
  className?: string
  rtl?: boolean
}) {
  const variants = {
    primary:
      'bg-[var(--text-primary)] text-[var(--surface)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]',
    ghost:
      'border border-[var(--line-strong)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
    inverse:
      'bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]',
  }

  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <Icon
        name={rtl ? 'arrowRtl' : 'arrow'}
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      />
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  className = '',
  inverse = false,
  id,
}: {
  children: ReactNode
  className?: string
  inverse?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 lg:py-[var(--spacing-section)] ${
        inverse ? 'surface-inverse' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-5">{children}</p>
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'start',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  body?: string
  align?: 'start' | 'center'
  className?: string
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-[clamp(2.1rem,5vw,3.75rem)] text-balance">{title}</h2>
      {body ? (
        <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] text-pretty">
          {body}
        </p>
      ) : null}
    </div>
  )
}

/** Thin brass rule used to separate major movements on a page. */
export function Rule({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent ${className}`}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data]

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Schema payloads are built from our own typed content, never from
          // user input, so there is nothing here to escape against.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  )
}
