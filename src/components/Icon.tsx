/**
 * Inline icon set. Kept as hand-written SVG rather than an icon package so the
 * stroke weight matches the typography — imported icon sets are almost always
 * too heavy next to a light display serif.
 */

const paths: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  diamond: <path d="M12 3 21 12l-9 9-9-9 9-9Z" />,
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  play: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
    </>
  ),
  flow: (
    <>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <path d="M7.5 6h5a4 4 0 0 1 4 4v.5M7.5 18h5a4 4 0 0 0 4-4v-.5" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowRtl: <path d="M20 12H5m6-6-6 6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 6 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-6-3.8-9S9.5 5.8 12 3Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L21 14.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
}

export type IconName = keyof typeof paths

export function Icon({
  name,
  className = 'size-5',
  strokeWidth = 1.25,
}: {
  name: IconName | string
  className?: string
  strokeWidth?: number
}) {
  const shape = paths[name] ?? paths.compass

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  )
}
