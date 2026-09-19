'use client'

import { useState, type FormEvent } from 'react'
import { site } from '@content/site'
import type { Dictionary } from '@content/types'
import type { Locale } from '@/lib/i18n'
import { Icon } from './Icon'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'w-full rounded-xl border border-[var(--line-strong)] bg-transparent px-4 py-3.5 text-sm transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none'

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [status, setStatus] = useState<Status>('idle')
  const form = dict.contact.form

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const element = event.currentTarget
    const data = Object.fromEntries(new FormData(element).entries())
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })

      if (response.ok) {
        setStatus('sent')
        element.reset()
        return
      }

      // No delivery provider configured yet, or it failed: hand the visitor a
      // pre-filled mail draft rather than losing their enquiry.
      const subject = `${site.brand} — ${data.name ?? ''}`
      const lines = [
        `${form.name}: ${data.name ?? ''}`,
        `${form.company}: ${data.company ?? ''}`,
        `${form.email}: ${data.email ?? ''}`,
        `${form.phone}: ${data.phone ?? ''}`,
        `${form.market}: ${data.market ?? ''}`,
        `${form.budget}: ${data.budget ?? ''}`,
        '',
        String(data.message ?? ''),
      ].join('\n')

      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(lines)}`
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-3xl border border-[var(--accent)]/40 bg-[var(--accent)]/[0.06] p-10"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)]">
          <Icon name="check" className="size-5" />
        </span>
        <p className="font-display text-2xl">{dict.contact.title}</p>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{form.note}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2.5 block">
            {form.name} *
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="company" className="eyebrow mb-2.5 block">
            {form.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="eyebrow mb-2.5 block">
            {form.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="eyebrow mb-2.5 block">
            {form.phone}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="market" className="eyebrow mb-2.5 block">
            {form.market}
          </label>
          <select id="market" name="market" className={fieldClass} defaultValue="">
            <option value="" disabled>
              —
            </option>
            {form.marketOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="eyebrow mb-2.5 block">
            {form.budget}
          </label>
          <select id="budget" name="budget" className={fieldClass} defaultValue="">
            <option value="" disabled>
              —
            </option>
            {form.budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2.5 block">
          {form.message} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={form.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
        />
        <span>{form.consent}</span>
      </label>

      {status === 'error' ? (
        <p role="alert" className="text-sm text-[var(--accent)]">
          {site.contact.email}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex items-center gap-3 rounded-full bg-[var(--text-primary)] px-8 py-4 text-sm text-[var(--surface)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] disabled:opacity-55"
        >
          {form.submit}
          <Icon name="arrow" className="size-4 rtl:rotate-180" />
        </button>
        <p className="text-xs text-[var(--text-muted)]">{form.note}</p>
      </div>
    </form>
  )
}
