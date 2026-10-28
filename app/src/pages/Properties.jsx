// Halaman Your properties — 4 statistik mini dengan animasi count-up saat halaman dibuka,
// lalu grid 4×2 kartu properti: ilustrasi gedung pastel, ring okupansi, 3 tile statistik,
// tombol "Ask Sage about it" (membuka panel Sage).
// Count-up memakai useMotionValue + animate + useTransform: angka dirender sebagai
// MotionValue di dalam motion.p, tanpa re-render React per frame.

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Building2, CircleCheck, TrendingUp, HandCoins, MapPin, Star, Sparkles } from 'lucide-react'
import BuildingArt from '../components/BuildingArt'
import Ring from '../components/charts/Ring'
import { rise } from '../lib/motion'
import { PROPERTIES, PROPERTY_STATS } from '../data'

const STAT_ICONS = [Building2, CircleCheck, TrendingUp, HandCoins]

function MiniStat({ icon: Icon, label, target, format, index }) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => format(v))

  useEffect(() => {
    const controls = animate(mv, target, {
      duration: (750 + index * 60) / 1000,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [mv, target, index])

  return (
    <motion.div
      {...rise(index, 0, 0.05)}
      whileHover={{ y: -5 }}
      className="flex items-center gap-3.5 rounded-card bg-surface p-[18px] shadow-card"
    >
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-stat-chip text-sage">
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-medium text-muted">{label}</p>
        <motion.p className="text-[17px] font-bold leading-snug tracking-tight text-ink">{text}</motion.p>
      </div>
    </motion.div>
  )
}

function PropertyCard({ p, index, onAskSage }) {
  return (
    <motion.article
      {...rise(index, 0.12, 0.07)}
      whileHover={{ y: -5 }}
      className="rounded-card bg-surface p-2.5 pb-4 shadow-card"
    >
      <div className="h-[128px] overflow-hidden rounded-[18px]">
        <BuildingArt palette={p.palette} />
      </div>
      <div className="flex items-start gap-2 px-2.5 pt-3.5">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14.5px] font-bold tracking-tight text-ink">{p.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <MapPin size={11} /> {p.city}
          </p>
        </div>
        <Ring value={p.occupancy} size={52} stroke={4.5} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 px-2.5">
        <div className="rounded-xl bg-surface-soft px-2.5 py-2">
          <p className="text-[10.5px] text-muted">This month</p>
          <p className="mt-0.5 text-[13px] font-bold text-ink">{p.revenue}</p>
        </div>
        <div className="rounded-xl bg-surface-soft px-2.5 py-2">
          <p className="text-[10.5px] text-muted">Units</p>
          <p className="mt-0.5 text-[13px] font-bold text-ink">{p.units}</p>
        </div>
        <div className="rounded-xl bg-surface-soft px-2.5 py-2">
          <p className="text-[10.5px] text-muted">Rating</p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-bold text-ink">
            <Star size={11} className="fill-star text-star" /> {p.rating}
          </p>
        </div>
      </div>
      <div className="px-2.5">
        <button
          type="button"
          onClick={onAskSage}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-count py-2.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:border-border-soft hover:bg-hover-soft hover:text-ink"
        >
          <Sparkles size={13} className="text-sage" /> Ask Sage about it
        </button>
      </div>
    </motion.article>
  )
}

export default function Properties({ onAskSage }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {PROPERTY_STATS.map((s, i) => (
          <MiniStat
            key={s.label}
            icon={STAT_ICONS[i % STAT_ICONS.length]}
            label={s.label}
            target={s.value}
            format={s.format}
            index={i}
          />
        ))}
      </div>
      <div className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {PROPERTIES.map((p, i) => (
          <PropertyCard key={p.name} p={p} index={i} onAskSage={onAskSage} />
        ))}
      </div>
    </div>
  )
}
