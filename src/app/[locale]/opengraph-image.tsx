import { ImageResponse } from 'next/og'
import { site } from '@content/site'
import { locales, localeConfig, isLocale } from '@/lib/i18n'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = site.brandFull

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Share card.
 *
 * Deliberately set in ASCII only: the renderer ships a Latin font, and an
 * Arabic or Turkish glyph it cannot resolve renders as a blank box in every
 * social preview. A designed per-language card should replace this at launch —
 * until then a card that always renders beats one that sometimes breaks.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const badge = isLocale(locale) ? localeConfig[locale].short : 'EN'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#111110',
          color: '#f8f5ef',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Meridian device */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -140,
            width: 760,
            height: 760,
            borderRadius: '50%',
            border: '1px solid rgba(201,169,97,0.30)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -40,
            width: 560,
            height: 560,
            borderRadius: '50%',
            border: '1px solid rgba(201,169,97,0.22)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontSize: 34, letterSpacing: 14, fontWeight: 400 }}>MERIDIAN</span>
            <span style={{ fontSize: 15, letterSpacing: 4, color: '#8e887c' }}>BY P3MEDIA</span>
          </div>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 4,
              color: '#c9a961',
              border: '1px solid rgba(201,169,97,0.45)',
              borderRadius: 999,
              padding: '8px 20px',
            }}
          >
            {badge}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>One meridian.</span>
          <span style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2, color: '#c9a961' }}>
            Three markets.
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 19, letterSpacing: 5, color: '#8e887c' }}>
            ANTWERP · ISTANBUL · DUBAI
          </span>
          <span style={{ fontSize: 19, letterSpacing: 5, color: '#8e887c' }}>
            NL · FR · EN · DE · TR · AR
          </span>
        </div>
      </div>
    ),
    size,
  )
}
