// Halaman Wallet & transfers — kartu saldo (grafik + money in/out + tombol New transfer),
// kartu "Cards in wallet" (tumpukan 3D + daftar ringkas kartu), dan "All transfers" berfilter.

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Send, Plus, Trash2 } from 'lucide-react'
import CreditStack from '../components/CreditStack'
import TransferList from '../components/TransferList'
import BalanceChart from '../components/charts/BalanceChart'
import { WALLET, CARDS, ALL_TRANSFERS } from '../data'

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
})

const THUMB = {
  glass: 'linear-gradient(135deg,#FDFDFB,#DDE3D8)',
  sage: 'linear-gradient(135deg,#71826C,#4C5D4E)',
  black: 'linear-gradient(135deg,#343A36,#12150F)',
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'in', label: 'In' },
  { key: 'out', label: 'Out' },
]

export default function Wallet() {
  const [mode, setMode] = useState('all')
  const visible = ALL_TRANSFERS.filter((t) => mode === 'all' || t.dir === mode)

  return (
    <div>
      <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
        {/* Available balance */}
        <motion.section {...rise(0)} className="card flex flex-col p-6 xl:col-span-5">
          <p className="text-xs font-medium text-muted">Available balance</p>
          <p className="mt-1.5 text-[30px] font-extrabold leading-none tracking-tight text-ink">{WALLET.balance}</p>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span className="rounded-full bg-[#E3EDE2] px-2 py-0.5 font-bold text-[#4E7A5A]">{WALLET.delta}</span>
            in the last 30 days
          </p>

          <div className="mt-2">
            <BalanceChart height={118} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F3F1EF] p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4EAE1] text-sage">
                <ArrowDown size={16} />
              </span>
              <p className="mt-2.5 text-[11px] font-medium text-muted">Money in</p>
              <p className="text-[15px] font-bold text-ink">{WALLET.moneyIn}</p>
            </div>
            <div className="rounded-2xl bg-[#F3F1EF] p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8E6E1] text-[#C65A4A]">
                <ArrowUpRight size={16} />
              </span>
              <p className="mt-2.5 text-[11px] font-medium text-muted">Money out</p>
              <p className="text-[15px] font-bold text-ink">{WALLET.moneyOut}</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#1D1C1F] py-3.5 text-[13.5px] font-semibold text-white shadow-[0_14px_28px_rgba(29,28,31,0.25)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Send size={14} /> New transfer
          </button>
        </motion.section>

        {/* Cards in wallet */}
        <motion.section {...rise(1)} className="card p-6 xl:col-span-7">
          <div className="flex flex-wrap items-start gap-3">
            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-ink">Cards in wallet</h3>
              <p className="mt-0.5 text-xs text-muted">3 linked · tap a card to bring it forward</p>
            </div>
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#6A8775] px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-[0_10px_22px_rgba(106,135,117,0.35)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Plus size={13} /> Add card
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-[20px] bg-[#EBEDE8] px-6 py-7">
            <CreditStack cards={CARDS} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CARDS.map((c) => (
              <div key={c.holder} className="flex items-center gap-3 rounded-[14px] bg-[#F3F1EF] px-3.5 py-3">
                <span
                  className="h-7 w-10 shrink-0 rounded-md shadow-inner"
                  style={{ background: THUMB[c.tone] }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-ink">•••• {c.last4}</p>
                  <p className="truncate text-[11px] text-muted">
                    {c.holder} · {c.exp}
                  </p>
                </div>
                <button type="button" aria-label={`Remove card of ${c.holder}`} className="text-[#B9BDB4] transition-colors hover:text-[#C65A4A]">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* All transfers */}
      <motion.section {...rise(2)} className="card mt-[18px] p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h3 className="text-[17px] font-bold tracking-tight text-ink">All transfers</h3>
            <p className="mt-0.5 text-xs text-muted">Money in from bookings, money out to vendors</p>
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full bg-[#F3F1EF] p-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setMode(f.key)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                  mode === f.key ? 'bg-white text-ink shadow-[0_4px_12px_rgba(96,100,84,0.12)]' : 'text-muted hover:text-ink'
                }`}
              >
                {f.label}
                {f.key === 'all' && (
                  <span className="rounded-full bg-[#E7EAE3] px-1.5 py-px text-[10.5px] font-bold text-[#5C665E]">
                    {ALL_TRANSFERS.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <TransferList items={visible} />
        </div>
      </motion.section>
    </div>
  )
}
