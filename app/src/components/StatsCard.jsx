// StatsCard — kartu statistik mini: chip ikon pastel (bila ada ikon) di kiri,
// label muted + nilai 20px/800 (spec §2), sisi kanan MiniBars ('bars') atau
// Sparkline ('spark'). Varian 'icon' hanya memakai chip ikon tanpa visual kanan.

import { motion } from 'framer-motion'
import MiniBars from './charts/MiniBars'
import Sparkline from './charts/Sparkline'
import { hoverLift } from '../lib/motion'

export default function StatsCard({
  title,
  value,
  sub = null,
  kind = 'bars',
  icon: Icon = null,
  iconBg = 'var(--color-sage-100)',
  iconColor = 'var(--color-sage-900)',
  bars = null,
  spark = null,
  className = '',
}) {
  return (
    <motion.div
      {...hoverLift}
      className={`flex items-center gap-3.5 rounded-card bg-surface p-5 shadow-card ${className}`}
    >
      {Icon && (
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon size={21} strokeWidth={2} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-muted">{title}</p>
        <p className="mt-1 text-[20px] font-extrabold leading-none tracking-tight text-ink">{value}</p>
        {sub && <p className="mt-1.5 text-xs text-muted">{sub}</p>}
      </div>
      {(kind === 'bars' || kind === 'spark') && (
        <div className="shrink-0">
          {kind === 'bars' && <MiniBars data={bars ?? undefined} />}
          {kind === 'spark' && (
            <Sparkline data={spark ?? [5, 8, 6, 10, 9, 13, 12, 16]} width={88} height={38} fill />
          )}
        </div>
      )}
    </motion.div>
  )
}
