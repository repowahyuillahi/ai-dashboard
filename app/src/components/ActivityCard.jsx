// ActivityCard — varian kartu statistik hijau tua penuh (sage) dengan teks putih
// dan Sparkline putih di kanan. Varian tetap sesuai referensi: $116.99 net profit today.

import { motion } from 'framer-motion'
import Sparkline from './charts/Sparkline'

export default function ActivityCard({
  value = '$116.99',
  sub = 'Net profit today',
  spark = [6, 9, 7, 12, 10, 15, 13, 18],
  className = '',
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`flex items-center justify-between gap-3 rounded-[24px] p-5 text-white shadow-[0_8px_24px_rgba(95,113,97,0.35)] ${className}`}
      style={{ background: 'linear-gradient(135deg, #63765F 0%, #5F7161 55%, #52634F 100%)' }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-medium text-white/85">Activity</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            Live
          </span>
        </div>
        <p className="mt-1 text-[26px] font-bold leading-none tracking-tight">{value}</p>
        <p className="mt-1.5 text-xs text-white/70">{sub}</p>
      </div>
      <div className="shrink-0">
        <Sparkline data={spark} width={92} height={40} stroke="#FFFFFF" strokeWidth={2.2} />
      </div>
    </motion.div>
  )
}
