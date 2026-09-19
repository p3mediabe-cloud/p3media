/**
 * The brand device: meridian arcs converging on a single point.
 *
 * Drawn as inline SVG rather than an image so it inherits the theme colour,
 * scales without artefacts and costs no extra request.
 */
export function MeridianLines({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="meridian-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="45%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="300" r="240" stroke="url(#meridian-fade)" strokeWidth="0.75" />
      <circle cx="300" cy="300" r="180" stroke="url(#meridian-fade)" strokeWidth="0.75" />
      <circle cx="300" cy="300" r="120" stroke="url(#meridian-fade)" strokeWidth="0.75" />

      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse
          key={angle}
          cx="300"
          cy="300"
          rx="240"
          ry="88"
          stroke="url(#meridian-fade)"
          strokeWidth="0.6"
          transform={`rotate(${angle} 300 300)`}
        />
      ))}

      <line x1="60" y1="300" x2="540" y2="300" stroke="url(#meridian-fade)" strokeWidth="0.75" />
      <circle cx="300" cy="300" r="3" fill="currentColor" opacity="0.9" />
    </svg>
  )
}
