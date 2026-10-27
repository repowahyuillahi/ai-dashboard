// Ring — ring progres okupansi kecil (SVG circle) dengan persen di tengah.

export default function Ring({
  value = 82,
  size = 84,
  stroke = 8,
  color = '#5F7161',
  track = '#E4E8DF',
  label = null,
}) {
  const v = Math.max(0, Math.min(100, value))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - v / 100)
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold leading-none tracking-tight text-ink">{v}%</span>
        {label && <span className="mt-0.5 text-[9px] font-medium text-muted">{label}</span>}
      </div>
    </div>
  )
}
