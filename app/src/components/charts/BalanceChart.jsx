// BalanceChart — grafik garis area besar "Balance".
// Bentuk khas: naik landai → turun tajam di tengah → naik lagi berombak sampai akhir.
// Titik data internal menghasilkan bentuk tersebut; dirender responsif (viewBox 720×height).

import { useId } from 'react'
import { smoothPath } from './Sparkline'

// 24 titik: indeks 0-8 naik landai, 9-11 jatuh tajam, 12-23 naik berombak.
const DATA = [
  18, 24, 30, 36, 42, 50, 57, 64, 70, // naik landai
  46, 30, 24, // turun tajam di tengah
  34, 44, 40, 52, 60, 55, 68, 76, 70, 84, 92, 100, // naik berombak sampai akhir
]

export default function BalanceChart({ height = 210, className = '' }) {
  const W = 720
  const H = height
  const padX = 8
  const padTop = 14
  const padBottom = 10
  const max = Math.max(...DATA)
  const min = Math.min(...DATA)
  const range = max - min || 1
  const stepX = (W - padX * 2) / (DATA.length - 1)
  const points = DATA.map((v, i) => ({
    x: padX + i * stepX,
    y: padTop + (1 - (v - min) / range) * (H - padTop - padBottom),
  }))
  const line = smoothPath(points)
  const area = `${line} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bal-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5F7161" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#5F7161" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#5F7161" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#bal-${gid})`} />
      <path
        d={line}
        fill="none"
        stroke="#42503F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="4.5"
        fill="#5F7161"
        stroke="#fff"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
