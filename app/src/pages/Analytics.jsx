// Halaman Analytics — ringkasan tren portofolio: kartu revenue besar dengan grafik,
// bar okupansi per properti, dan sumber booking. Fungsional ringan (pemilih rentang mengubah data grafik).

import { useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Sparkline from '../components/charts/Sparkline'
import { pointsFromData, smoothPath } from '../lib/chart'
import { EASE, fadeUp } from '../lib/motion'
import StatsCard from '../components/StatsCard'
import { PROPERTIES, RANGES, CHANNELS } from '../data'

function BigChart({ data }) {
  const w = 640
  const h = 190
  const pts = pointsFromData(data, w, h, 10)
  const line = smoothPath(pts)
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '')
  if (pts.length === 0) return null
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Revenue trend">
      <defs>
        <linearGradient id={`rev-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--color-sage-900)' }} stopOpacity="0.22" />
          <stop offset="100%" style={{ stopColor: 'var(--color-sage-900)' }} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} className="stroke-hairline" strokeWidth="1" />
      ))}
      <motion.path
        d={`${line} L ${w - 10} ${h} L 10 ${h} Z`}
        fill={`url(#rev-${gid})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      <motion.path
        d={line}
        fill="none"
        style={{ stroke: 'var(--color-sage-900)' }}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="4.5"
        style={{ fill: 'var(--color-sage-900)', stroke: 'var(--color-surface)' }}
        strokeWidth="2"
      />
    </svg>
  )
}

export default function Analytics() {
  const [range, setRange] = useState('6M')
  const data = useMemo(() => RANGES[range], [range])
  const top = [...PROPERTIES].sort((a, b) => b.occupancy - a.occupancy).slice(0, 5)

  return (
    <div>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Portfolio revenue" value={data.total} sub={range === '30D' ? 'Last 30 days' : `Last ${range === '6M' ? '6 months' : '12 months'}`} kind="spark" spark={data.revenue} />
        <StatsCard title="Avg. occupancy" value="79%" sub="Across 8 properties" kind="bars" bars={[4, 6, 5, 8, 7, 9, 8]} />
        <StatsCard title="Bookings" value="312" sub="This quarter" kind="spark" spark={[4, 7, 6, 9, 8, 11, 10, 13]} />
        <StatsCard title="Cancellations" value="11" sub="3.4% of bookings" kind="spark" spark={[9, 7, 8, 5, 6, 4, 5, 3]} />
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-12">
        <motion.section {...fadeUp(0.1)} className="rounded-card bg-surface p-6 shadow-card xl:col-span-8">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-ink">Revenue trend</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                <TrendingUp size={13} className="text-up-text" /> {data.delta} vs previous period
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 rounded-full bg-surface-soft p-1">
              {Object.keys(RANGES).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                    range === r ? 'bg-white text-ink shadow-[0_4px_12px_rgba(96,100,84,0.12)]' : 'text-muted hover:text-ink'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            {/* key={range}: draw-in grafik berulang setiap rentang berganti */}
            <BigChart key={range} data={data.revenue} />
          </div>
        </motion.section>

        <motion.section {...fadeUp(0.16)} className="rounded-card bg-surface p-6 shadow-card xl:col-span-4">
          <h3 className="text-[15px] font-bold tracking-tight text-ink">Top occupancy</h3>
          <ul className="mt-4 flex flex-col gap-4">
            {top.map((p) => (
              <li key={p.name}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold text-ink">{p.name}</p>
                  <p className="text-[13px] font-bold text-ink">{p.occupancy}%</p>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ring-track">
                  <motion.div
                    className="h-full w-full origin-left rounded-full bg-sage-900"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: p.occupancy / 100 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section {...fadeUp(0.22)} className="mt-[18px] rounded-card bg-surface p-6 shadow-card">
        <h3 className="text-[15px] font-bold tracking-tight text-ink">Where bookings come from</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CHANNELS.map((c) => (
            <div key={c.name} className="rounded-2xl bg-surface-soft p-4">
              <p className="text-[26px] font-extrabold tracking-tight text-ink">{c.share}%</p>
              <p className="mt-1 text-[13px] font-semibold text-ink">{c.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-muted">
                {c.share >= 12 ? <TrendingUp size={12} className="text-up-text" /> : <TrendingDown size={12} className="text-down-text" />}
                {c.note}
              </p>
              <div className="mt-3">
                <Sparkline data={[3, 5, 4, 6, 8, 7, 9]} width={120} height={26} />
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
