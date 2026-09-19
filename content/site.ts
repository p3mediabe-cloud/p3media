/**
 * Brand + organisation constants.
 *
 * ⚠️  LAUNCH CHECKLIST — every value marked `PLACEHOLDER` must be replaced with
 * verified company data before this site goes live. NAP (name/address/phone)
 * consistency is a direct local-SEO ranking factor, and structured data that
 * does not match the legal entity is a liability, not an optimisation.
 */

export const site = {
  brand: 'MERIDIAN',
  brandFull: 'MERIDIAN by P3Media',
  parent: 'P3Media',
  /** PLACEHOLDER — point at the production domain before launch. */
  url: 'https://meridian.p3media.be',
  /** Latin + Arabic lockup used in the logo and structured data. */
  brandAr: 'ميريديان',

  legal: {
    /** PLACEHOLDER */
    name: 'P3Media BV',
    /** PLACEHOLDER — Belgian enterprise number (KBO/BCE). */
    vat: 'BE 0000.000.000',
    /** PLACEHOLDER */
    street: 'Vestigingsadres',
    postalCode: '0000',
    city: 'Antwerpen',
    region: 'Vlaanderen',
    country: 'BE',
    countryName: 'België',
  },

  contact: {
    email: 'p3media.be@gmail.com',
    /** PLACEHOLDER — a dedicated VIP line converts far better than a generic inbox. */
    phoneBe: '+32 000 00 00 00',
    /** PLACEHOLDER — Türkiye operations line. */
    phoneTr: '+90 000 000 00 00',
    /** PLACEHOLDER — Gulf line (UAE presence signals local credibility). */
    phoneAe: '+971 00 000 0000',
    /** PLACEHOLDER */
    whatsapp: '+32000000000',
  },

  /** PLACEHOLDER — create and verify each channel before linking it. */
  social: {
    linkedin: 'https://www.linkedin.com/company/p3media',
    instagram: 'https://www.instagram.com/p3media',
    youtube: 'https://www.youtube.com/@p3media',
  },

  /** Operating hubs shown on the site and emitted as structured data. */
  hubs: [
    { key: 'antwerp', city: 'Antwerpen', country: 'BE', role: 'hq' },
    { key: 'istanbul', city: 'İstanbul', country: 'TR', role: 'operations' },
    { key: 'dubai', city: 'Dubai', country: 'AE', role: 'gulf-desk' },
  ] as const,

  /** Languages the team actually delivers in — a core differentiator. */
  languages: ['nl', 'en', 'tr', 'ar', 'fr', 'de'] as const,

  /** Hard cap on concurrent VIP engagements. Scarcity is part of the offer. */
  clientCap: 12,

  analytics: {
    /** PLACEHOLDER — leave empty to disable. Privacy-first analytics preferred. */
    plausibleDomain: '',
    gtmId: '',
  },
} as const

export type Site = typeof site
