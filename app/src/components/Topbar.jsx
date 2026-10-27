// Topbar — logo asterisk sage, judul + subjudul halaman (blur-crossfade saat berganti),
// search pill "Search or ask Sage..." + chip ⌘K + tombol bundar hitam, tombol chat (titik merah)
// dan bell (badge hijau 9).

import { AnimatePresence, motion } from 'framer-motion'
import { Search, MessageCircle, Bell } from 'lucide-react'

export function SageMark({ size = 36, className = '' }) {
  // Asterisk/starburst merek: 12 jari-jari tipis memancar dari pusat.
  const rays = Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6)
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g stroke="#5F7161" strokeWidth="3.4" strokeLinecap="round">
        {rays.map((a, i) => (
          <line
            key={i}
            x1={24 - Math.cos(a) * 4.5}
            y1={24 - Math.sin(a) * 4.5}
            x2={24 + Math.cos(a) * (i % 2 === 0 ? 17 : 12.5)}
            y2={24 + Math.sin(a) * (i % 2 === 0 ? 17 : 12.5)}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="3.4" fill="#5F7161" />
    </svg>
  )
}

export default function Topbar({ title, sub, onSearchFocus }) {
  return (
    <header className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <div className="flex min-w-0 items-center gap-3.5">
        <SageMark size={38} className="shrink-0" />
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 4 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -4 }}
              transition={{ duration: 0.28 }}
            >
              <h1 className="truncate text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink">{title}</h1>
              <p className="truncate text-[13px] text-muted">{sub}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          onClick={onSearchFocus}
          className="group flex h-[46px] w-[330px] max-w-[46vw] items-center gap-2 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-left shadow-[0_10px_28px_rgba(96,100,84,0.08)] transition-shadow hover:shadow-[0_14px_34px_rgba(96,100,84,0.13)]"
          aria-label="Search or ask Sage"
        >
          <span className="flex-1 truncate text-[13px] text-muted">Search or ask Sage...</span>
          <kbd className="rounded-md bg-[#F1F1EC] px-1.5 py-0.5 text-[10.5px] font-semibold text-muted">⌘K</kbd>
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#1D1C1F] text-white transition-transform group-hover:scale-105">
            <Search size={15} />
          </span>
        </button>

        <button
          type="button"
          aria-label="Messages"
          className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_28px_rgba(96,100,84,0.08)] transition-transform hover:scale-105"
        >
          <MessageCircle size={19} />
          <span className="absolute right-[9px] top-[9px] h-2 w-2 rounded-full bg-[#E4573D] ring-2 ring-white" />
        </button>

        <button
          type="button"
          aria-label="Notifications, 9 unread"
          className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_28px_rgba(96,100,84,0.08)] transition-transform hover:scale-105"
        >
          <Bell size={19} />
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#5F7161] px-1 text-[10px] font-bold text-white ring-2 ring-[#EFEEE9]">
            9
          </span>
        </button>
      </div>
    </header>
  )
}
