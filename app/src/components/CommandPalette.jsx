// CommandPalette — overlay ⌘K: backdrop blur, kotak pencarian tengah-atas,
// daftar hasil terfilter (halaman + properti + aksi dari data/sage.js).
// Navigasi: ↑/↓ memindah item aktif, Enter memilih item aktif, Esc / klik
// backdrop menutup. Panel dalam hanya ter-mount saat terbuka, jadi state
// pencarian selalu segar tanpa reset lewat effect.

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownLeft, CornerDownLeft, Search, Sparkles } from 'lucide-react'
import { PALETTE_ITEMS } from '../data'

function PalettePanel({ onClose, onSelect, items }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) =>
      `${it.label} ${it.hint} ${it.keywords ?? ''} ${it.type}`.toLowerCase().includes(q),
    )
  }, [query, items])

  const activeIndex = Math.min(active, Math.max(0, results.length - 1))

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const choose = (item) => {
    if (!item) return
    onSelect?.(item)
    onClose?.()
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(results.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    choose(results[activeIndex])
  }

  return (
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
        className="w-full max-w-lg overflow-hidden rounded-card bg-surface shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search size={19} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, properties, actions…"
            className="h-6 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
            aria-label="Cari perintah"
          />
          <kbd className="rounded-md bg-chip px-2 py-1 text-[10px] font-semibold text-muted">
            ESC
          </kbd>
        </form>
        <ul ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {results.map((it, i) => {
            const Icon = it.icon ?? Search
            const isActive = i === activeIndex
            return (
              <li key={it.id}>
                <button
                  type="button"
                  data-idx={i}
                  onClick={() => choose(it)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                    isActive ? 'bg-palette-active' : 'hover:bg-palette-hover'
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-palette-chip text-sage">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{it.label}</span>
                    <span className="block truncate text-xs text-muted">{it.hint}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-chip px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    {it.type}
                  </span>
                  {isActive && <CornerDownLeft size={14} className="shrink-0 text-muted" />}
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
        <div className="flex items-center gap-4 border-t border-line px-5 py-3 text-[11px] text-muted">
          <span>
            <kbd className="font-semibold text-ink">↑↓</kbd> to navigate
          </span>
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
  )
}

export default function CommandPalette({ open = false, onClose, onSelect, items = PALETTE_ITEMS }) {
  return (
    <AnimatePresence>
      {open && <PalettePanel key="palette" onClose={onClose} onSelect={onSelect} items={items} />}
    </AnimatePresence>
  )
}
