// MiniBars — bar chart mini (±7 batang) hijau sage, ujung atas membulat.
// Batang `fadeFrom` ke atas dibuat lebih pucat (default: 2 batang terakhir).

export default function MiniBars({
  data = [10, 16, 12, 20, 15, 24, 19],
  width = 76,
  height = 40,
  color = 'var(--color-sage-900)',
  fadedColor = 'var(--color-bars-faded)',
  fadeFrom = null,
  gap = 5,
  className = '',
}) {
  if (!data || data.length === 0) return null
  const max = Math.max(...data) || 1
  const barW = (width - gap * (data.length - 1)) / data.length
  const from = fadeFrom ?? Math.max(0, data.length - 2)
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      {data.map((v, i) => {
        const h = Math.max(4, (v / max) * height)
        const x = i * (barW + gap)
        const y = height - h
        const r = Math.min(barW / 2, 4)
        return (
          <path
            key={i}
            d={`M${x},${height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + barW - r},${y} Q${x + barW},${y} ${x + barW},${y + r} L${x + barW},${height} Z`}
            style={{ fill: i >= from ? fadedColor : color }}
          />
        )
      })}
    </svg>
  )
}
