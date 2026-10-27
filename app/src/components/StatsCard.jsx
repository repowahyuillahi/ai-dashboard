// StatsCard — kartu statistik mini: label muted, nilai besar bold,
// sisi kanan berupa MiniBars ('bars'), Sparkline ('spark'), atau lingkaran ikon pastel ('icon').

import { motion } from 'framer-motion'
import MiniBars from './charts/MiniBars'
import Sparkline from './charts/Sparkline'

export default function StatsCard({
  title,
  value,
  sub = null,
  kind = 'bars',
  icon: Icon = null,
  iconBg = '#E7EBDD',
  iconColor = '#5F7161',
  bars = null,
  spark = null,
  className = '',
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`card flex items-center justify-between gap-3 p-5 ${className}`}
    >
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-muted">{title}</p>
        <p className="mt-1 text-[26px] font-bold leading-none tracking-tight text-ink">{value}</p>
        {sub && <p className="mt-1.5 text-xs text-muted">{sub}</p>}
      </div>
      <div className="shrink-0">
        {kind === 'bars' && <MiniBars data={bars ?? undefined} />}
        {kind === 'spark' && (
          <Sparkline data={spark ?? [5, 8, 6, 10, 9, 13, 12, 16]} width={88} height={38} fill />
        )}
        {kind === 'icon' && Icon && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: iconBg, color: iconColor }}
          >
            <Icon size={21} strokeWidth={2} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
