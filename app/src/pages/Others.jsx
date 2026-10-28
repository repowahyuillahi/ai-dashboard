// Halaman pendukung yang tidak tampil di video (ikon sidebar tamu, kalender, pengaturan) —
// dibangun fungsional ringan dengan data contoh agar template utuh, bukan halaman kosong.
// Data tamu & booking tinggal di data/guests.js & data/bookings.js.

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Star, Bell, ShieldCheck, User, Check,
} from 'lucide-react'
import AvatarMemoji from '../components/AvatarMemoji'
import { rise } from '../lib/motion'
import { PROPERTIES, GUESTS, BOOKINGS } from '../data'

// Kelas chip per tone booking (set warna kanonis token up/peach/down)
const TONE_CLASSES = {
  up: 'bg-up-bg text-up-text',
  peach: 'bg-peach text-gold-text',
  down: 'bg-down-bg text-down-text',
}

export function Guests() {
  const [q, setQ] = useState('')
  const list = GUESTS.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()) || g.property.toLowerCase().includes(q.toLowerCase()))
  return (
    <motion.section {...rise(0)} className="rounded-card bg-surface p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">Guests</h3>
        <span className="rounded-full bg-count px-2 py-0.5 text-[11px] font-bold text-ink-2">{GUESTS.length} recent</span>
        <label className="ml-auto flex h-10 w-[260px] max-w-full items-center gap-2 rounded-full bg-surface-soft px-4">
          <Search size={14} className="text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guests..."
            className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          />
        </label>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {list.map((g) => (
          <li key={g.name} className="flex flex-wrap items-center gap-3 py-3.5">
            <AvatarMemoji size={38} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold text-ink">{g.name}</p>
              <p className="text-[11.5px] text-muted">{g.property} · {g.nights} nights</p>
            </div>
            <span className="flex items-center gap-1 text-[12.5px] font-bold text-ink">
              <Star size={11} className="fill-star text-star" /> {g.rating}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                g.status === 'Checked in'
                  ? 'bg-up-bg text-up-text'
                  : g.status === 'Checked out'
                    ? 'bg-chip text-ink-2'
                    : 'bg-peach text-gold-text'
              }`}
            >
              {g.status}
            </span>
          </li>
        ))}
        {list.length === 0 && <li className="py-6 text-center text-[13px] text-muted">No guests match “{q}”.</li>}
      </ul>
    </motion.section>
  )
}

export function Bookings() {
  return (
    <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
      <motion.section {...rise(0)} className="rounded-card bg-surface p-6 shadow-card xl:col-span-7">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">Coming up</h3>
        <ul className="mt-4 flex flex-col gap-2">
          {BOOKINGS.map((b) => (
            <li key={b.title} className="flex items-center gap-3.5 rounded-2xl bg-tile px-4 py-3.5">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[b.tone] ?? TONE_CLASSES.up}`}>
                <b.icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-ink">{b.title}</p>
                <p className="truncate text-[11.5px] text-muted">{b.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>
      <motion.section {...rise(1)} className="rounded-card bg-surface p-6 shadow-card xl:col-span-5">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">This week</h3>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className={`rounded-xl py-2.5 text-[11px] font-bold ${i === 2 ? 'bg-black text-white' : 'bg-surface-soft text-ink-2'}`}>
              {d}
              <p className={`mt-0.5 text-[13px] ${i === 2 ? 'text-white' : 'text-ink'}`}>{21 + i}</p>
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-col gap-3 text-[12.5px] text-ink-2">
          <li className="flex justify-between"><span>Check-ins</span><b className="text-ink">9</b></li>
          <li className="flex justify-between"><span>Check-outs</span><b className="text-ink">7</b></li>
          <li className="flex justify-between"><span>Cleaning slots</span><b className="text-ink">11</b></li>
          <li className="flex justify-between"><span>Open nights left</span><b className="text-ink">28</b></li>
        </ul>
        <p className="mt-5 rounded-2xl bg-surface-soft p-3.5 text-[12px] leading-relaxed text-ink-2">
          Sage tip: Palm Residency has 8 open nights next week — a 10% weekday offer usually fills them in 2 days.
        </p>
      </motion.section>
    </div>
  )
}

const SETTING_ROWS = [
  { icon: Bell, title: 'Smart notifications', note: 'Sage only pings you when money moves or a guest needs help', on: true },
  { icon: ShieldCheck, title: 'Two-factor security', note: 'Extra check at sign-in and before payouts', on: true },
  { icon: User, title: 'Public host profile', note: 'Show ratings and response time on listings', on: false },
]

export function Settings() {
  const [rows, setRows] = useState(SETTING_ROWS)
  const [saved, setSaved] = useState(false)
  const toggle = (i) => {
    setRows((r) => r.map((row, j) => (j === i ? { ...row, on: !row.on } : row)))
    setSaved(false)
  }
  return (
    <motion.section {...rise(0)} className="mx-auto max-w-[720px] rounded-card bg-surface p-6 shadow-card">
      <h3 className="text-[17px] font-bold tracking-tight text-ink">Workspace settings</h3>
      <p className="mt-0.5 text-xs text-muted">Applies to all {PROPERTIES.length} properties in this workspace.</p>
      <ul className="mt-5 flex flex-col gap-2">
        {rows.map((r, i) => (
          <li key={r.title} className="flex items-center gap-3.5 rounded-2xl bg-tile px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage">
              <r.icon size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-ink">{r.title}</p>
              <p className="truncate text-[11.5px] text-muted">{r.note}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={r.on}
              aria-label={r.title}
              onClick={() => toggle(i)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${r.on ? 'bg-sage' : 'bg-avatar-ring'}`}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${r.on ? 'right-0.5' : 'left-0.5'}`}
              />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setSaved(true)}
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
      >
        {saved && <Check size={14} />} {saved ? 'Saved' : 'Save changes'}
      </button>
    </motion.section>
  )
}
