import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * Contact endpoint.
 *
 * Until a delivery provider is configured, this returns `fallback: true` and
 * the form opens a pre-filled mail draft instead. That way the site never
 * silently swallows an enquiry — the failure mode a contact form must not have.
 *
 * To enable server-side delivery, set CONTACT_WEBHOOK_URL to an endpoint that
 * accepts a JSON POST (a CRM intake URL, a Make/Zapier hook, or your own
 * mailer). Nothing else needs to change.
 */

const MAX_FIELD = 4000

interface Payload {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  market?: unknown
  budget?: unknown
  message?: unknown
  locale?: unknown
  /** Honeypot — real people never fill this in. */
  website?: unknown
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, MAX_FIELD).trim() : ''
}

export async function POST(request: Request) {
  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Silently accept bot submissions so they get no signal to retry.
  if (asString(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const name = asString(body.name)
  const email = asString(body.email)
  const message = asString(body.message)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 422 })
  }

  const enquiry = {
    name,
    email,
    company: asString(body.company),
    phone: asString(body.phone),
    market: asString(body.market),
    budget: asString(body.budget),
    message,
    locale: asString(body.locale),
    receivedAt: new Date().toISOString(),
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    return NextResponse.json({ fallback: true }, { status: 501 })
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(enquiry),
    })

    if (!response.ok) {
      return NextResponse.json({ fallback: true }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ fallback: true }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
