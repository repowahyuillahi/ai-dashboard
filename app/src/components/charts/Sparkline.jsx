// Sparkline — garis SVG kecil mulus dari array angka.
// Murni presentasional: tanpa sumbu, tanpa label. Data kosong → tidak dirender.

import { pointsFromData, smoothPath } from '../../lib/chart'

export default function Sparkline({
  data = [4, 7, 5, 9, 8, 12, 10, 14],
  width = 96,
  height = 36,
  stroke = 'var(--color-sage-900)',
  strokeWidth = 2,
  fill = false,
  className = '',
}) {
  if (!data || data.length === 0) return null
  const points = pointsFromData(data, width, height)
  if (points.length === 0) return null
  const d = smoothPath(points)
  const area = fill
    ? `${d} L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`
    : null
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {area && <path d={area} style={{ fill: stroke }} opacity="0.12" />}
      <path
        d={d}
        style={{ stroke }}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
