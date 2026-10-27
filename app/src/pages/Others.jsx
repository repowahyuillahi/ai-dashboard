// Halaman pendukung yang tidak tampil di video (ikon sidebar tamu, kalender, pengaturan) —
// dibangun fungsional ringan dengan data contoh agar template utuh, bukan halaman kosong.

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Star, CalendarCheck, CalendarX, Clock, Bell, ShieldCheck, User, Check,
} from 'lucide-react'
import AvatarMemoji from '../components/AvatarMemoji'
import { PROPERTIES } from '../data'

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
})

const GUESTS = [
  { name: 'Anna Jones', property: 'Ocean View Loft', nights: 5, status: 'Checked in', rating: '4.9' },
  { name: 'Joel Cannan', property: 'Maple Court', nights: 3, status: 'Checked in', rating: '4.8' },
  { name: 'Priya Nair', property: 'Cedar Heights', nights: 7, status: 'Arriving today', rating: '5.0' },
  { name: 'Marco Ruiz', property: 'Harbor Point', nights: 4, status: 'Arriving Fri', rating: '4.7' },
  { name: 'Sara Lindqvist', property: 'Birch Studios', nights: 6, status: 'Checked out', rating: '4.9' },
  { name: 'Tom Becker', property: 'Olive Gardens', nights: 2, status: 'Checked out', rating: '4.6' },
]

export function Guests() {
  const [q, setQ] = useState('')
  const list = GUESTS.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()) || g.property.toLowerCase().includes(q.toLowerCase()))
  return (
    <motion.section {...rise(0)} className="card p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">Guests</h3>
        <span className="rounded-full bg-[#E7EAE3] px-2 py-0.5 text-[11px] font-bold text-[#5C665E]">{GUESTS.length} recent</span>
        <label className="ml-auto flex h-10 w-[260px] max-w-full items-center gap-2 rounded-full bg-[#F3F1EF] px-4">
          <Search size={14} className="text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guests..."
            className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          />
        </label>
      </div>
      <ul className="mt-4 divide-y divide-[#F0F0EB]">
        {list.map((g) => (
          <li key={g.name} className="flex flex-wrap items-center gap-3 py-3.5">
            <AvatarMemoji size={38} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold text-ink">{g.name}</p>
              <p className="text-[11.5px] text-muted">{g.property} · {g.nights} nights</p>
            </div>
            <span className="flex items-center gap-1 text-[12.5px] font-bold text-ink">
              <Star size={11} className="fill-[#F2B33D] text-[#F2B33D]" /> {g.rating}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                g.status === 'Checked in'
                  ? 'bg-[#E3EDE2] text-[#4E7A5A]'
                  : g.status === 'Checked out'
                    ? 'bg-[#F1F1EC] text-[#5C665E]'
                    : 'bg-[#F5E7D3] text-[#9A6E25]'
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

const BOOKINGS = [
  { icon: CalendarCheck, tint: '#E3EDE2', color: '#4E7A5A', title: 'Check-in · Ocean View Loft', meta: 'Anna Jones · Unit 11 · Today, 15:00' },
  { icon: CalendarCheck, tint: '#E3EDE2', color: '#4E7A5A', title: 'Check-in · Cedar Heights', meta: 'Priya Nair · Unit 16 · Today, 16:30' },
  { icon: Clock, tint: '#F5E7D3', color: '#9A6E25', title: 'Cleaning window · Maple Court', meta: 'Between guests · Tomorrow, 11:00–13:00' },
  { icon: CalendarX, tint: '#F8E6E1', color: '#C65A4A', title: 'Checkout · Birch Studios', meta: 'Sara Lindqvist · Unit 10 · Tomorrow, 10:00' },
  { icon: CalendarCheck, tint: '#E3EDE2', color: '#4E7A5A', title: 'Check-in · Harbor Point', meta: 'Marco Ruiz · Unit 12 · Friday, 14:00' },
]

export function Bookings() {
  return (
    <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
      <motion.section {...rise(0)} className="card p-6 xl:col-span-7">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">Coming up</h3>
        <ul className="mt-4 flex flex-col gap-2">
          {BOOKINGS.map((b) => (
            <li key={b.title} className="flex items-center gap-3.5 rounded-2xl bg-[#F9F8F5] px-4 py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: b.tint, color: b.color }}>
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
      <motion.section {...rise(1)} className="card p-6 xl:col-span-5">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">This week</h3>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className={`rounded-xl py-2.5 text-[11px] font-bold ${i === 2 ? 'bg-[#1D1C1F] text-white' : 'bg-[#F3F1EF] text-[#5C665E]'}`}>
              {d}
              <p className={`mt-0.5 text-[13px] ${i === 2 ? 'text-white' : 'text-ink'}`}>{21 + i}</p>
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-col gap-3 text-[12.5px] text-[#5C665E]">
          <li className="flex justify-between"><span>Check-ins</span><b className="text-ink">9</b></li>
          <li className="flex justify-between"><span>Check-outs</span><b className="text-ink">7</b></li>
          <li className="flex justify-between"><span>Cleaning slots</span><b className="text-ink">11</b></li>
          <li className="flex justify-between"><span>Open nights left</span><b className="text-ink">28</b></li>
        </ul>
        <p className="mt-5 rounded-2xl bg-[#F3F1EF] p-3.5 text-[12px] leading-relaxed text-[#5C665E]">
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
    <motion.section {...rise(0)} className="card mx-auto max-w-[720px] p-6">
      <h3 className="text-[17px] font-bold tracking-tight text-ink">Workspace settings</h3>
      <p className="mt-0.5 text-xs text-muted">Applies to all {PROPERTIES.length} properties in this workspace.</p>
      <ul className="mt-5 flex flex-col gap-2">
        {rows.map((r, i) => (
          <li key={r.title} className="flex items-center gap-3.5 rounded-2xl bg-[#F9F8F5] px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4EAE1] text-sage">
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
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${r.on ? 'bg-[#5F7161]' : 'bg-[#D8DCD2]'}`}
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
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#1D1C1F] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
      >
        {saved && <Check size={14} />} {saved ? 'Saved' : 'Save changes'}
      </button>
    </motion.section>
  )
}
