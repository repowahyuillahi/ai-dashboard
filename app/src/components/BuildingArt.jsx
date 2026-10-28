// BuildingArt — ilustrasi gedung flat SVG (bukan file gambar).
// palette: { sky: [warnaAtas, warnaBawah], sun, sunPos: {cx, cy}, main, side, windows: [menyala, redup] }
// Palet berasal dari data properti (data/properties.js); palet bawaan juga dari sana.
// Gedung utama tinggi di kiri dengan grid jendela; gedung samping lebih pendek & lebar di kanan bawah;
// matahari lingkaran solid kanan atas; latar gradien langit.

import { useId } from 'react'
import { DEFAULT_BUILDING_PALETTE } from '../data'

// Aksen tetap ilustrasi (tanah, pintu, pepohonan) — variabel --art-* di index.css
const GROUND = 'var(--art-ground)'
const DOOR = 'var(--art-door)'
const TREE = 'var(--color-sage-500)'
const TRUNK = 'var(--art-trunk)'

// Pola jendela gedung utama: 1 = menyala, 0 = redup (deterministik, tanpa acak)
const MAIN_WINDOWS = [
  1, 0, 1, 1,
  0, 1, 0, 1,
  1, 1, 0, 0,
  0, 1, 1, 0,
  1, 0, 1, 1,
  1, 1, 0, 1,
]
const SIDE_WINDOWS = [
  1, 0, 1, 0, 1,
  0, 1, 1, 0, 0,
  1, 0, 0, 1, 1,
]

export default function BuildingArt({ palette = {}, className = '' }) {
  const p = {
    ...DEFAULT_BUILDING_PALETTE,
    sunPos: { cx: 268, cy: 38 },
    ...palette,
  }
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [winOn, winOff] = p.windows
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Ilustrasi gedung"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={`sky-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="100%" stopColor={p.sky[1]} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="180" fill={`url(#sky-${gid})`} />
      {/* matahari */}
      <circle cx={p.sunPos.cx} cy={p.sunPos.cy} r="17" fill={p.sun} />
      {/* awan tipis */}
      <g style={{ fill: 'var(--color-surface)' }} opacity="0.55">
        <ellipse cx="70" cy="34" rx="22" ry="6" />
        <ellipse cx="88" cy="29" rx="13" ry="5" />
        <ellipse cx="206" cy="58" rx="16" ry="4.5" />
      </g>
      {/* tanah */}
      <rect x="0" y="166" width="320" height="14" style={{ fill: GROUND }} opacity="0.35" />
      {/* gedung samping: lebih pendek & lebar, kanan bawah */}
      <g>
        <rect x="188" y="88" width="118" height="80" rx="7" fill={p.side} />
        {SIDE_WINDOWS.map((on, i) => {
          const col = i % 5
          const row = Math.floor(i / 5)
          return (
            <rect
              key={i}
              x={200 + col * 21}
              y={100 + row * 21}
              width="11"
              height="13"
              rx="2.5"
              fill={on ? winOn : winOff}
              opacity={on ? 1 : 0.45}
            />
          )
        })}
      </g>
      {/* gedung utama */}
      <g>
        <rect x="42" y="34" width="118" height="134" rx="9" fill={p.main} />
        <rect x="42" y="34" width="118" height="10" rx="5" style={{ fill: 'var(--color-surface)' }} opacity="0.14" />
        {MAIN_WINDOWS.map((on, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          return (
            <rect
              key={i}
              x={56 + col * 25}
              y={54 + row * 18}
              width="13"
              height="10"
              rx="2.5"
              fill={on ? winOn : winOff}
              opacity={on ? 1 : 0.5}
            />
          )
        })}
        {/* pintu */}
        <rect x="90" y="146" width="20" height="22" rx="4" style={{ fill: DOOR }} />
        <circle cx="105" cy="158" r="1.6" fill={winOn} />
      </g>
      {/* pepohonan kecil */}
      <g>
        <circle cx="176" cy="156" r="11" style={{ fill: TREE }} />
        <rect x="174.6" y="162" width="2.8" height="7" style={{ fill: TRUNK }} />
        <circle cx="26" cy="160" r="8" style={{ fill: TREE }} />
        <rect x="24.8" y="165" width="2.4" height="5" style={{ fill: TRUNK }} />
      </g>
    </svg>
  )
}
