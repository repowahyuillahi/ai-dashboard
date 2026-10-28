// Helper geometri grafik SVG — dipakai Sparkline, BalanceChart, dan Analytics.
// Dipisah dari berkas komponen agar file komponen hanya mengekspor komponen.

/** Jalur mulus (Catmull-Rom → Bézier kubik) dari daftar titik {x, y}. */
export function smoothPath(points) {
  if (!points.length) return ''
  if (points.length < 3) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  }
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x},${p2.y}`
  }
  return d
}

/** Petakan array angka ke titik SVG dalam kotak width × height. Data kosong → []. */
export function pointsFromData(data, width, height, pad = 3) {
  if (!data || data.length === 0) return []
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0
  return data.map((v, i) => ({
    x: pad + i * stepX,
    y: pad + (1 - (v - min) / range) * (height - pad * 2),
  }))
}
