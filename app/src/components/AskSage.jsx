// AskSage — dua ekspor:
// (a) OrbButton: pill gelap berisi orb gradien biru→ungu→cyan dengan wajah dua mata
//     kapsul putih yang berkedip (animasi .sage-eyes global di index.css) + teks "Ask Sage".
// (b) SagePanel: panel chat melayang dengan header "Sage AI", daftar pesan,
//     dan form tanya yang berfungsi lokal (bank jawaban di data/sage.js).

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SendHorizontal, X } from 'lucide-react'
import { SAGE_SEED_MESSAGES, sageReply } from '../data'

export function SageOrb({ size = 44 }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 30% 28%, var(--orb-sky) 0%, var(--orb-indigo) 34%, var(--orb-violet) 68%, var(--orb-cyan) 108%)',
        boxShadow: '0 6px 18px var(--orb-shadow), inset 0 -6px 12px var(--orb-inset)',
      }}
      aria-hidden="true"
    >
      {/* Mata: dua kapsul vertikal putih polos ±6×14px (spec §1.4), tanpa pupil */}
      <svg width={size * 0.52} height={size * 0.36} viewBox="0 0 26 18">
        <g className="sage-eyes" style={{ fill: 'var(--color-surface)' }}>
          <rect x="5.3" y="3.5" width="3.4" height="11" rx="1.7" />
          <rect x="17.3" y="3.5" width="3.4" height="11" rx="1.7" />
        </g>
      </svg>
    </span>
  )
}

export function OrbButton({ onClick, label = 'Ask Sage' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 20 }}
      className="inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-[0_14px_32px_rgba(30,36,32,0.35)]"
    >
      <SageOrb size={44} />
      <span className="text-[15px] font-semibold tracking-tight">{label}</span>
    </motion.button>
  )
}

// ---------- Panel chat ----------

export function SagePanel({ onClose, className = '' }) {
  const [messages, setMessages] = useState(() =>
    SAGE_SEED_MESSAGES.map((m, i) => ({ ...m, id: `seed-${i}` })),
  )
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)
  const timerRef = useRef(null)
  const idRef = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  // Bersihkan timer balasan tertunda saat panel ditutup/unmount
  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    [],
  )

  const send = (e) => {
    e.preventDefault()
    const q = draft.trim()
    if (!q) return
    setDraft('')
    const userMsg = { id: `m-${++idRef.current}`, from: 'user', text: q }
    setMessages((m) => [...m, userMsg])
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      setMessages((m) => [...m, { id: `m-${++idRef.current}`, from: 'sage', text: sageReply(q) }])
    }, 450)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={`flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-card bg-surface shadow-card ${className}`}
      style={{ height: 'min(70vh,560px)' }}
      role="dialog"
      aria-label="Sage AI chat"
    >
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <SageOrb size={36} />
        <div className="flex-1">
          <p className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-ink">
            Sage AI
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </p>
          <p className="text-xs text-muted">Property copilot · replies instantly</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-chip text-muted transition-colors hover:text-ink"
            aria-label="Tutup Sage"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* pesan */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) =>
          m.from === 'sage' ? (
            <div key={m.id} className="flex items-end gap-2">
              <SageOrb size={24} />
              <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-chip px-3.5 py-2.5 text-[13px] leading-relaxed text-ink">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-sage px-3.5 py-2.5 text-[13px] leading-relaxed text-white">
                {m.text}
              </div>
            </div>
          ),
        )}
      </div>

      {/* form */}
      <form onSubmit={send} className="flex items-center gap-2 border-t border-line px-4 py-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Sage anything…"
          className="h-10 flex-1 rounded-full bg-input px-4 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-sage/40"
          aria-label="Tulis pertanyaan untuk Sage"
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105 active:scale-95"
          aria-label="Kirim pertanyaan"
        >
          <SendHorizontal size={16} />
        </button>
      </form>
    </motion.div>
  )
}

export default OrbButton
