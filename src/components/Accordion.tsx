'use client'

import { useState } from 'react'
import type { FaqItem } from '@content/types'
import { Icon } from './Icon'

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, index) => {
        const expanded = open === index
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : index)}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                className="flex w-full items-center justify-between gap-6 py-6 text-start transition-colors hover:text-[var(--accent)]"
              >
                <span className="font-display text-xl md:text-2xl">{item.q}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)]">
                  <Icon name={expanded ? 'minus' : 'plus'} className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              hidden={!expanded}
              className="pb-7"
            >
              <p className="max-w-3xl leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
