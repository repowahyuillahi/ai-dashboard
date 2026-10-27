// Halaman Your properties — 4 statistik mini dengan animasi count-up saat halaman dibuka,
// lalu grid 4×2 kartu properti: ilustrasi gedung pastel, ring okupansi, 3 tile statistik,
// tombol "Ask Sage about it" (membuka panel Sage).

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, CircleCheck, TrendingUp, HandCoins, MapPin, Star, Sparkles } from 'lucide-react'
import BuildingArt from '../components/BuildingArt'
import Ring from '../components/charts/Ring'
import { PROPERTIES, PROPERTY_STATS } from '../data'

const STAT_ICONS = [Building2, CircleCheck, TrendingUp, HandCoins]

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])
  return value
}

function MiniStat({ icon: Icon, label, target, format, index }) {
  const value = useCountUp(target, 1000 + index * 120)
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="card flex items-center gap-3.5 p-[18px]"
    >
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#EDF1EA] text-sage">
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-medium text-muted">{label}</p>
        <p className="text-[17px] font-bold leading-snug tracking-tight text-ink">{format(value)}</p>
      </div>
    </motion.div>
  )
}

function PropertyCard({ p, index, onAskSage }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 + 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="card p-2.5 pb-4"
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
        <div className="rounded-xl bg-[#F3F1EF] px-2.5 py-2">
          <p className="text-[10.5px] text-muted">This month</p>
          <p className="mt-0.5 text-[13px] font-bold text-ink">{p.revenue}</p>
        </div>
        <div className="rounded-xl bg-[#F3F1EF] px-2.5 py-2">
          <p className="text-[10.5px] text-muted">Units</p>
          <p className="mt-0.5 text-[13px] font-bold text-ink">{p.units}</p>
        </div>
        <div className="rounded-xl bg-[#F3F1EF] px-2.5 py-2">
          <p className="text-[10.5px] text-muted">Rating</p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-bold text-ink">
            <Star size={11} className="fill-[#F2B33D] text-[#F2B33D]" /> {p.rating}
          </p>
        </div>
      </div>
      <div className="px-2.5">
        <button
          type="button"
          onClick={onAskSage}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#E7EAE3] py-2.5 text-[12.5px] font-medium text-[#5C665E] transition-colors hover:border-[#CBD5C6] hover:bg-[#F6F8F4] hover:text-ink"
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
          <MiniStat key={s.label} icon={STAT_ICONS[i]} label={s.label} target={s.value} format={s.format} index={i} />
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
