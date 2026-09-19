import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Brass "M" on ink — the wordmark reduced to the one glyph that survives 16px. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111110',
          color: '#c9a961',
          fontSize: 40,
          fontFamily: 'serif',
          letterSpacing: -1,
        }}
      >
        M
      </div>
    ),
    size,
  )
}
