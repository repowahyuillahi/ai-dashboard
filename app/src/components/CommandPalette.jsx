// CommandPalette — overlay ⌘K: backdrop blur, kotak pencarian tengah-atas,
// daftar hasil terfilter (halaman + properti + aksi), Enter memilih item pertama,
// Esc / klik backdrop menutup. Render null bila `open` false.

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownLeft,
  Building2,
  Calendar,
  CornerDownLeft,
  CreditCard,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export const DEFAULT_ITEMS = [
  { id: 'page-home', type: 'Page', label: 'Home', hint: 'Hey, Codexr! · dashboard', page: 'home', icon: LayoutDashboard, keywords: 'home main dashboard overview' },
  { id: 'page-wallet', type: 'Page', label: 'Wallet & transfers', hint: 'Balance $34,101.94', page: 'wallet', icon: Wallet, keywords: 'money balance cards transfers payments' },
  { id: 'page-analytics', type: 'Page', label: 'Analytics', hint: 'Revenue & occupancy trends', page: 'analytics', icon: TrendingUp, keywords: 'chart report revenue trends' },
  { id: 'page-properties', type: 'Page', label: 'Properties', hint: '8 buildings · 132 units', page: 'properties', icon: Building2, keywords: 'buildings units portfolio' },
  { id: 'page-guests', type: 'Page', label: 'Guests', hint: 'People staying with you', page: 'guests', icon: Users, keywords: 'guests tenants people renters' },
  { id: 'page-bookings', type: 'Page', label: 'Bookings', hint: 'Check-ins & check-outs', page: 'bookings', icon: Calendar, keywords: 'schedule calendar check-in checkout' },
  { id: 'page-settings', type: 'Page', label: 'Settings', hint: 'Workspace preferences', page: 'settings', icon: Settings, keywords: 'preferences account profile security' },
  { id: 'prop-ocean', type: 'Property', label: 'Ocean View Loft', hint: 'Lisbon · 92% occupied', page: 'properties', icon: Home, keywords: 'ocean view loft lisbon apartment' },
  { id: 'prop-maple', type: 'Property', label: 'Maple Court', hint: 'Toronto · 79% occupied', page: 'properties', icon: Home, keywords: 'maple court toronto apartment' },
  { id: 'prop-cedar', type: 'Property', label: 'Cedar Heights', hint: 'Denver · 89% occupied', page: 'properties', icon: Home, keywords: 'cedar heights denver apartment' },
  { id: 'act-ask-sage', type: 'Action', label: 'Ask Sage AI', hint: 'Chat with your copilot', action: 'ask-sage', icon: Sparkles, keywords: 'ai chat assistant ask' },
  { id: 'act-revenue', type: 'Action', label: 'View revenue report', hint: 'This month · $14,474', page: 'analytics', icon: TrendingUp, keywords: 'report analytics revenue chart' },
]

export default function CommandPalette({ open = false, onClose, onSelect, items = DEFAULT_ITEMS }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = window.setTimeout(() => inputRef.current?.focus(), 40)
      return () => window.clearTimeout(t)
    }
  }, [open ])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) =>
      `${it.label} ${it.hint} ${it.keywords ?? ''} ${it.type}`.toLowerCase().includes(q),
    )
  }, [query, items])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const choose = (item) => {
    if (!item) return
    onSelect?.(item)
    onClose?.()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    choose(results[0])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/35 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => onClose?.()}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="card w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-[#F0F0EB] px-5 py-4">
              <Search size={19} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, properties, actions…"
                className="h-6 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
                aria-label="Cari perintah"
              />
              <kbd className="rounded-md bg-[#F1F1EC] px-2 py-1 text-[10px] font-semibold text-muted">
                ESC
              </kbd>
            </form>
            <ul className="max-h-[46vh] overflow-y-auto p-2">
              {results.map((it, i) => {
                const Icon = it.icon ?? Search
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      onClick={() => choose(it)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                        i === 0 ? 'bg-[#F1F4EC]' : 'hover:bg-[#F7F7F2]'
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ECEEE6] text-sage">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{it.label}</span>
                        <span className="block truncate text-xs text-muted">{it.hint}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-[#F1F1EC] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                        {it.type}
                      </span>
                      {i === 0 && <CornerDownLeft size={14} className="shrink-0 text-muted" />}
                    </button>
                  </li>
                )
              })}
              {results.length === 0 && (
                <li className="flex items-center gap-2 px-3 py-6 text-sm text-muted">
                  <ArrowDownLeft size={15} className="rotate-45" />
                  No results for “{query}”.
                </li>
              )}
            </ul>
            <div className="flex items-center gap-4 border-t border-[#F0F0EB] px-5 py-3 text-[11px] text-muted">
              <span>
                <kbd className="font-semibold text-ink">↵</kbd> to select
              </span>
              <span>
                <kbd className="font-semibold text-ink">esc</kbd> to close
              </span>
              <span className="ml-auto inline-flex items-center gap-1">
                <Sparkles size={12} /> Sage Command
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
