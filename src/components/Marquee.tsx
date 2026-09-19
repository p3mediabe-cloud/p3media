/**
 * Infinite ticker. The list is rendered twice and the track translates by
 * exactly -50%, which is what makes the loop seamless; the duplicate is hidden
 * from assistive tech so the words are not announced twice.
 */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div
      className="relative flex overflow-hidden border-y border-[var(--line)] py-6"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-10 px-10 text-sm tracking-[0.1em] whitespace-nowrap text-[var(--text-muted)] uppercase"
              >
                <span>{item}</span>
                <span aria-hidden className="text-[var(--accent)]">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
