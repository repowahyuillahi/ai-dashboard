// Gauge — gauge setengah lingkaran (arc 180°) dengan jarum di ujung isi,
// persen besar di tengah bawah + caption kecil di bawahnya.

const CX = 100
const CY = 96
const R = 78

function polar(angleDeg) {
  const a = (angleDeg * Math.PI) / 180
  return { x: CX + R * Math.cos(a), y: CY - R * Math.sin(a) }
}

function arcPath(fromDeg, toDeg) {
  const s = polar(fromDeg)
  const e = polar(toDeg)
  const large = toDeg - fromDeg > 180 ? 1 : 0
  return `M${s.x.toFixed(2)},${s.y.toFixed(2)} A${R},${R} 0 ${large} 1 ${e.x.toFixed(2)},${e.y.toFixed(2)}`
}

export default function Gauge({ value = 35, caption = 'of monthly goal', size = 200 }) {
  const v = Math.max(0, Math.min(100, value))
  const endDeg = 180 - (v / 100) * 180
  const tip = polar(endDeg)
  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 200 108" width={size} height={size * 0.54} aria-hidden="true">
        {/* track */}
        <path
          d={arcPath(180, 0)}
          fill="none"
          stroke="#DFE5DA"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* isi */}
        {v > 0 && (
          <path
            d={arcPath(180, Math.max(0.5, endDeg))}
            fill="none"
            stroke="#5F7161"
            strokeWidth="13"
            strokeLinecap="round"
          />
        )}
        {/* jarum kecil di ujung arc */}
        <circle cx={tip.x} cy={tip.y} r="9" fill="#5F7161" stroke="#fff" strokeWidth="3.5" />
        <circle cx={tip.x} cy={tip.y} r="2.6" fill="#fff" />
      </svg>
      <div className="-mt-9 text-center">
        <div className="text-[34px] font-bold leading-none tracking-tight text-ink">
          {v}
          <span className="text-[20px] font-semibold text-muted">%</span>
        </div>
        {caption && <div className="mt-1.5 text-xs font-medium text-muted">{caption}</div>}
      </div>
    </div>
  )
}
