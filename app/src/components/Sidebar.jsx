// Sidebar — rail pil vertikal putih melayang: ikon navigasi Lucide, state aktif
// berupa lingkaran hitam penuh, tooltip pill hitam saat hover, avatar di dasar rail.

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutGrid, Wallet, ChartColumn, Building2, Users, CalendarCheck,
  Sun, Moon, Settings, LogOut,
} from 'lucide-react'
import AvatarMemoji from './AvatarMemoji'

const NAV = [
  { key: 'home', label: 'Home', icon: LayoutGrid },
  { key: 'wallet', label: 'Wallet', icon: Wallet },
  { key: 'analytics', label: 'Analytics', icon: ChartColumn },
  { key: 'properties', label: 'Properties', icon: Building2 },
  { key: 'guests', label: 'Guests', icon: Users },
  { key: 'bookings', label: 'Bookings', icon: CalendarCheck },
]

function RailButton({ icon: Icon, label, active, onClick }) {
  const [tip, setTip] = useState(false)
  return (
    <div className="relative">
      <motion.button
        type="button"
        aria-label={label}
        onClick={onClick}
        onHoverStart={() => setTip(true)}
        onHoverEnd={() => setTip(false)}
        onFocus={() => setTip(true)}
        onBlur={() => setTip(false)}
        whileTap={{ scale: 0.9 }}
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 ${
          active ? 'bg-[#1D1C1F] text-white shadow-[0_10px_20px_rgba(29,28,31,0.28)]' : 'text-[#6B7268] hover:bg-[#F0F0EA] hover:text-ink'
        }`}
      >
        <Icon size={20} strokeWidth={active ? 2.2 : 1.9} />
      </motion.button>
      {tip && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1D1C1F] px-2.5 py-1.5 text-[11.5px] font-semibold text-white shadow-lg"
        >
          {label}
        </motion.span>
      )}
    </div>
  )
}

export default function Sidebar({ page, onNavigate }) {
  const [dark, setDark] = useState(false)
  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-[104px] z-40 flex max-h-[calc(100vh-128px)] w-[68px] shrink-0 flex-col items-center gap-[7px] overflow-visible rounded-full bg-white py-4 shadow-[0_16px_40px_rgba(96,100,84,0.10)]"
    >
      {NAV.map((item) => (
        <RailButton
          key={item.key}
          icon={item.icon}
          label={item.label}
          active={page === item.key}
          onClick={() => onNavigate(item.key)}
        />
      ))}
      <div className="flex-1" />
      <RailButton
        icon={dark ? Moon : Sun}
        label={dark ? 'Dark theme (soon)' : 'Light theme'}
        active={false}
        onClick={() => setDark((d) => !d)}
      />
      <RailButton icon={Settings} label="Settings" active={page === 'settings'} onClick={() => onNavigate('settings')} />
      <RailButton icon={LogOut} label="Log out" active={false} onClick={() => {}} />
      <div className="mt-1 rounded-full bg-[#F5EFE3] p-[3px]">
        <AvatarMemoji size={40} />
      </div>
    </motion.aside>
  )
}
