// Halaman Analytics — ringkasan tren portofolio: kartu revenue besar dengan grafik,
// bar okupansi per properti, dan sumber booking. Fungsional ringan (pemilih rentang mengubah data grafik).

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Sparkline, { smoothPath, pointsFromData } from '../components/charts/Sparkline'
import StatsCard from '../components/StatsCard'
import { PROPERTIES } from '../data'

const RANGES = {
  '6M': { revenue: [18, 22, 20, 26, 24, 31, 29, 34, 32, 38, 36, 42], total: '$96,420', delta: '+12.4%' },
  '1Y': { revenue: [12, 15, 14, 19, 22, 20, 26, 24, 31, 29, 36, 42, 40, 47, 45, 52], total: '$188,930', delta: '+18.1%' },
  '30D': { revenue: [8, 11, 9, 13, 12, 15, 14, 17, 16, 19], total: '$14,474', delta: '+5.6%' },
}

const CHANNELS = [
  { name: 'Direct bookings', share: 46, note: 'Website & repeat guests' },
  { name: 'Booking platforms', share: 34, note: 'Airbnb, Booking.com, Vrbo' },
  { name: 'Referrals', share: 12, note: 'Guest referrals & partners' },
  { name: 'Long stays', share: 8, note: '30+ night contracts' },
]

function BigChart({ data }) {
  const w = 640
  const h = 190
  const pts = pointsFromData(data, w, h, 10)
  const line = smoothPath(pts)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Revenue trend">
      <defs>
        <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5F7161" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#5F7161" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#EFEDE8" strokeWidth="1" />
      ))}
      <motion.path
        d={`${line} L ${w - 10} ${h} L 10 ${h} Z`}
        fill="url(#rev-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#5F7161"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4.5" fill="#5F7161" stroke="#fff" strokeWidth="2" />
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
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-6 xl:col-span-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-ink">Revenue trend</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                <TrendingUp size={13} className="text-[#4E7A5A]" /> {data.delta} vs previous period
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 rounded-full bg-[#F3F1EF] p-1">
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
            <BigChart data={data.revenue} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="card p-6 xl:col-span-4"
        >
          <h3 className="text-[15px] font-bold tracking-tight text-ink">Top occupancy</h3>
          <ul className="mt-4 flex flex-col gap-4">
            {top.map((p) => (
              <li key={p.name}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold text-ink">{p.name}</p>
                  <p className="text-[13px] font-bold text-ink">{p.occupancy}%</p>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#E7EDE6]">
                  <motion.div
                    className="h-full rounded-full bg-[#5F7161]"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.occupancy}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="card mt-[18px] p-6"
      >
        <h3 className="text-[15px] font-bold tracking-tight text-ink">Where bookings come from</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CHANNELS.map((c) => (
            <div key={c.name} className="rounded-2xl bg-[#F3F1EF] p-4">
              <p className="text-[26px] font-extrabold tracking-tight text-ink">{c.share}%</p>
              <p className="mt-1 text-[13px] font-semibold text-ink">{c.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-muted">
                {c.share >= 12 ? <TrendingUp size={12} className="text-[#4E7A5A]" /> : <TrendingDown size={12} className="text-[#C65A4A]" />}
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
