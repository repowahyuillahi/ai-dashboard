// TransferList — daftar riwayat transfer dengan ikon arah dalam lingkaran pastel,
// nama + konteks, waktu, dan chip nominal berwarna sesuai arah. Filter All/In/Out opsional.

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

const DEFAULT_ITEMS = [
  { dir: 'in', name: 'Harbor View Rent', note: 'Unit 12B · October rent', time: '09:41', amount: 240.0 },
  { dir: 'out', name: 'City Utilities Co.', note: 'Water & electricity', time: '08:15', amount: 120.5 },
  { dir: 'in', name: 'Maple Loft Deposit', note: 'New lease · Unit 4A', time: 'Yesterday', amount: 850.0 },
  { dir: 'out', name: 'FixIt Maintenance', note: 'HVAC repair · Unit 7C', time: 'Yesterday', amount: 96.25 },
]

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'in', label: 'In' },
  { key: 'out', label: 'Out' },
]

function fmt(amount) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function TransferList({ items = DEFAULT_ITEMS, withFilter = false, className = '' }) {
  const [mode, setMode] = useState('all')
  const visible = items.filter((it) => mode === 'all' || it.dir === mode)

  return (
    <div className={className}>
      {withFilter && (
        <div className="mb-3 flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setMode(f.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === f.key ? 'bg-sage text-white' : 'bg-[#EFEFEA] text-muted hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <ul className="flex flex-col">
        <AnimatePresence initial={false}>
          {visible.map((it, i) => {
            const isIn = it.dir === 'in'
            return (
              <motion.li
                key={`${it.name}-${it.time}-${i}`}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 border-b border-[#F0F0EB] py-3 last:border-0 last:pb-0 first:pt-0"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: isIn ? '#E3EEDF' : '#Fbe7E2',
                    color: isIn ? '#4C7A45' : '#C4553B',
                  }}
                >
                  {isIn ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{it.name}</p>
                  {it.note && <p className="truncate text-xs text-muted">{it.note}</p>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-[11px] font-medium text-muted">{it.time}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{
                      background: isIn ? '#E3EEDF' : '#FBE7E2',
                      color: isIn ? '#3F7038' : '#B84A30',
                    }}
                  >
                    {isIn ? '+' : '-'}${fmt(Math.abs(it.amount))}
                  </span>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
        {visible.length === 0 && (
          <li className="py-4 text-center text-xs text-muted">No transfers in this view.</li>
        )}
      </ul>
    </div>
  )
}
