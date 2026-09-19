import type { Locale } from '@/lib/i18n'

/** A string that must exist in every supported locale. */
export type I18nString = Record<Locale, string>
/** A list that must exist in every supported locale. */
export type I18nList = Record<Locale, string[]>

export interface Meta {
  title: string
  description: string
}

export interface TitledBlock {
  title: string
  body: string
}

export interface Stat {
  value: string
  label: string
  note?: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface Dictionary {
  meta: {
    siteName: string
    tagline: string
    description: string
  }

  nav: {
    services: string
    markets: string
    approach: string
    work: string
    about: string
    investment: string
    contact: string
    cta: string
  }

  common: {
    skipToContent: string
    languageLabel: string
    openMenu: string
    closeMenu: string
    readMore: string
    explore: string
    backTo: string
    allServices: string
    allMarkets: string
    scrollCue: string
    /** Honesty label on any figure that is a model rather than a measured result. */
    illustrative: string
    availability: string
    hqLabel: string
    opsLabel: string
    gulfLabel: string
    languagesLabel: string
    responseTime: string
  }

  home: {
    meta: Meta
    hero: {
      eyebrow: string
      title: string
      titleAccent: string
      lead: string
      ctaPrimary: string
      ctaSecondary: string
      signals: string[]
    }
    marquee: string[]
    positioning: {
      eyebrow: string
      title: string
      body: string
      pillars: TitledBlock[]
    }
    servicesSection: { eyebrow: string; title: string; body: string }
    marketsSection: { eyebrow: string; title: string; body: string }
    method: { eyebrow: string; title: string; body: string }
    edge: { eyebrow: string; title: string; body: string; items: TitledBlock[] }
    numbers: { eyebrow: string; title: string; body: string; stats: Stat[] }
    testimonialPlaceholder: { quote: string; author: string; role: string }
    faq: { eyebrow: string; title: string; items: FaqItem[] }
    cta: { eyebrow: string; title: string; body: string; button: string; note: string }
  }

  services: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    intro: string
    outro: { title: string; body: string; button: string }
  }

  serviceDetail: {
    whatLabel: string
    forWhomLabel: string
    deliverablesLabel: string
    outcomesLabel: string
    processLabel: string
    faqLabel: string
    nextLabel: string
    ctaTitle: string
    ctaBody: string
    ctaButton: string
  }

  markets: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    intro: string
    whyUsTitle: string
    whyUs: TitledBlock[]
  }

  marketDetail: {
    contextLabel: string
    opportunityLabel: string
    playbookLabel: string
    languagesLabel: string
    complianceLabel: string
    ctaTitle: string
    ctaBody: string
    ctaButton: string
  }

  approach: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    intro: string
    steps: { number: string; title: string; duration: string; body: string; deliverables: string[] }[]
    principlesTitle: string
    principles: TitledBlock[]
    cta: { title: string; body: string; button: string }
  }

  work: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    disclaimer: string
    challengeLabel: string
    moveLabel: string
    resultLabel: string
    cta: { title: string; body: string; button: string }
  }

  about: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    story: string[]
    valuesTitle: string
    values: TitledBlock[]
    hubsTitle: string
    hubsBody: string
    languagesTitle: string
    languagesBody: string
    cta: { title: string; body: string; button: string }
  }

  investment: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    intro: string
    /** Badge on the recommended tier. */
    featuredLabel: string
    tiers: {
      name: string
      tagline: string
      priceLabel: string
      priceNote: string
      forWhom: string
      includes: string[]
      cta: string
      featured?: boolean
    }[]
    notesTitle: string
    notes: string[]
    faqTitle: string
    faq: FaqItem[]
  }

  contact: {
    meta: Meta
    eyebrow: string
    title: string
    lead: string
    intro: string
    form: {
      name: string
      company: string
      email: string
      phone: string
      market: string
      marketOptions: string[]
      budget: string
      budgetOptions: string[]
      message: string
      messagePlaceholder: string
      consent: string
      submit: string
      note: string
    }
    directTitle: string
    directBody: string
    hoursTitle: string
    hoursBody: string
  }

  privacy: {
    meta: Meta
    title: string
    updated: string
    sections: TitledBlock[]
  }

  footer: {
    blurb: string
    servicesTitle: string
    companyTitle: string
    contactTitle: string
    legalTitle: string
    newsletterTitle: string
    newsletterBody: string
    newsletterPlaceholder: string
    newsletterButton: string
    rights: string
    builtBy: string
  }

  notFound: {
    title: string
    body: string
    button: string
  }
}

/* ------------------------------------------------------------------ */
/* Entities — each carries its own four-language content so that the   */
/* translations of one concept live side by side and cannot drift.     */
/* ------------------------------------------------------------------ */

export interface ServiceCopy {
  name: string
  /** One line for cards and the hero sub-title. */
  tagline: string
  metaTitle: string
  metaDescription: string
  what: string
  forWhom: string
  deliverables: string[]
  outcomes: string[]
  process: TitledBlock[]
  faq: FaqItem[]
}

export interface Service {
  id: string
  number: string
  /** Icon key resolved by the Icon component. */
  icon: string
  slug: I18nString
  copy: Record<Locale, ServiceCopy>
}

export interface MarketCopy {
  name: string
  /** Region descriptor shown under the name. */
  region: string
  metaTitle: string
  metaDescription: string
  intro: string
  context: string
  opportunity: string[]
  playbook: TitledBlock[]
  languages: string
  compliance: string[]
}

export interface Market {
  id: string
  /** ISO-3166 alpha-2 codes covered, used for structured data. */
  countries: string[]
  slug: I18nString
  copy: Record<Locale, MarketCopy>
}

export interface CaseCopy {
  title: string
  sector: string
  market: string
  challenge: string
  moves: string[]
  steering: string[]
}

export interface CaseStudy {
  id: string
  copy: Record<Locale, CaseCopy>
}
