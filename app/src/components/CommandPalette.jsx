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
  { id: 'page-overview', type: 'Page', label: 'Overview', hint: 'Dashboard home', icon: LayoutDashboard, keywords: 'home main dashboard' },
  { id: 'page-properties', type: 'Page', label: 'Properties', hint: '8 buildings · 132 units', icon: Building2, keywords: 'buildings units portfolio' },
  { id: 'page-tenants', type: 'Page', label: 'Tenants', hint: '44 active leases', icon: Users, keywords: 'renters leases people' },
  { id: 'page-calendar', type: 'Page', label: 'Calendar', hint: 'Visits & deadlines', icon: Calendar, keywords: 'schedule visits rent due' },
  { id: 'page-finance', type: 'Page', label: 'Finance', hint: 'Balance & payouts', icon: Wallet, keywords: 'money balance revenue payments cards' },
  { id: 'page-settings', type: 'Page', label: 'Settings', hint: 'Workspace preferences', icon: Settings, keywords: 'preferences account profile' },
  { id: 'prop-harbor', type: 'Property', label: 'Harbor View Residences', hint: '18 units · 94% occupied', icon: Home, keywords: 'harbor view apartment' },
  { id: 'prop-maple', type: 'Property', label: 'Maple Loft', hint: '12 units · 91% occupied', icon: Home, keywords: 'maple loft apartment' },
  { id: 'prop-sage', type: 'Property', label: 'Sage Residences', hint: '10 units · 97% occupied', icon: Home, keywords: 'sage residences apartment' },
  { id: 'act-ask-sage', type: 'Action', label: 'Ask Sage AI', hint: 'Chat with your copilot', icon: Sparkles, keywords: 'ai chat assistant ask' },
  { id: 'act-add-payment', type: 'Action', label: 'Record a payment', hint: 'Log incoming rent', icon: CreditCard, keywords: 'add payment income rent transaction' },
  { id: 'act-revenue', type: 'Action', label: 'View revenue report', hint: 'This month · $14,474', icon: TrendingUp, keywords: 'report analytics revenue chart' },
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
