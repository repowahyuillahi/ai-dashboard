// AskSage — dua ekspor:
// (a) OrbButton: pill gelap berisi orb gradien biru→ungu→cyan dengan wajah dua mata
//     yang berkedip (CSS animation) + teks "Ask Sage".
// (b) SagePanel: panel chat melayang dengan header "Sage AI", daftar pesan,
//     dan form tanya yang berfungsi lokal (bank jawaban kata-kunci).

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SendHorizontal, X } from 'lucide-react'

const BLINK_STYLE = `
@keyframes sage-blink {
  0%, 88%, 100% { transform: scaleY(1); }
  92%, 96% { transform: scaleY(0.12); }
}
.sage-eyes { transform-origin: center; animation: sage-blink 4.2s ease-in-out infinite; }
`

export function SageOrb({ size = 44 }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 30% 28%, #7DD3FC 0%, #818CF8 34%, #A855F7 68%, #22D3EE 108%)',
        boxShadow: '0 6px 18px rgba(129,140,248,0.5), inset 0 -6px 12px rgba(34,211,238,0.35)',
      }}
      aria-hidden="true"
    >
      <svg width={size * 0.52} height={size * 0.36} viewBox="0 0 26 18">
        <g className="sage-eyes" fill="#FFFFFF">
          <circle cx="7" cy="9" r="3.1" />
          <circle cx="19" cy="9" r="3.1" />
        </g>
        <circle cx="8" cy="7.8" r="1" fill="#1E2430" opacity="0.85" />
        <circle cx="20" cy="7.8" r="1" fill="#1E2430" opacity="0.85" />
      </svg>
    </span>
  )
}

export function OrbButton({ onClick, label = 'Ask Sage' }) {
  return (
    <>
      <style>{BLINK_STYLE}</style>
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
    </>
  )
}

// ---------- Panel chat ----------

const SEED_MESSAGES = [
  {
    from: 'sage',
    text: "Hi, I'm Sage — your property copilot. Ask me about occupancy, revenue, or any unit in your portfolio.",
  },
  { from: 'user', text: 'How is occupancy looking this month?' },
  {
    from: 'sage',
    text: 'Occupancy is at 79% across your portfolio — 104 of 132 units booked. Ocean View Loft leads at 92%, while Birch Studios (64%) has the most open nights right now.',
  },
  { from: 'user', text: 'And revenue?' },
  {
    from: 'sage',
    text: 'Properties brought in $14,474 this month. Wallet earnings are $10,842.74 against a $21,000 goal (35%), and net profit today is $116.99.',
  },
]

function sageReply(q) {
  const s = q.toLowerCase()
  if (/(occup|vacant|empty|tenant|lease)/.test(s)) {
    return 'Current occupancy is 79% — 104 of 132 units booked. Ocean View Loft is nearly full at 92% (11 of 12 units); Birch Studios has the most room to grow at 64%.'
  }
  if (/(revenue|income|rent|earning|profit|money)/.test(s)) {
    return 'Properties earned $14,474 this month. Top earners: Ocean View Loft ($2,790), Maple Court ($2,660) and Cedar Heights ($2,236). Wallet earnings are $10,842.74 — 35% of the $21,000 goal, with profit 2% above last month.'
  }
  if (/(balance|cash|account|bank|card)/.test(s)) {
    return 'Your available balance is $34,101.94 (+5.6% in the last 30 days), across 3 cards held by Lana Steiner, Olivia Rhye and Phoenix Baker. Money in: $1,605.15 · money out: $892.80.'
  }
  if (/(propert|building|unit|portfolio|apartment)/.test(s)) {
    return 'Your portfolio has 8 properties and 132 units: Ocean View Loft (Lisbon), Maple Court (Toronto), Cedar Heights (Denver), Palm Residency (Dubai), Linden House (Berlin), Harbor Point (Sydney), Olive Gardens (Athens) and Birch Studios (Oslo).'
  }
  if (/(mainten|repair|fix|hvac)/.test(s)) {
    return 'Recent vendor payments: AquaFix Plumbing took $185.00 for a repair at Palm Residency, and Carlos Brown III was paid $120.50 for cleaning. Nothing urgent is open right now.'
  }
  if (/(hi|hello|hey|halo)/.test(s)) {
    return 'Hello! Your portfolio is steady today — 79% occupancy, $14,474 earned this month, and 230 new clients. What would you like to dig into?'
  }
  return "Here's what I can see: occupancy 79% (104 of 132 units), $14,474 earned this month, wallet balance $34,101.94, and earnings at 35% of the $21,000 goal. Ask me about any of those and I'll break it down."
}

export function SagePanel({ onClose }) {
  const [messages, setMessages] = useState(SEED_MESSAGES)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const send = (e) => {
    e.preventDefault()
    const q = draft.trim()
    if (!q) return
    setDraft('')
    setMessages((m) => [...m, { from: 'user', text: q }])
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: 'sage', text: sageReply(q) }])
    }, 450)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="card flex w-[min(92vw,380px)] flex-col overflow-hidden"
      style={{ height: 'min(70vh,560px)' }}
      role="dialog"
      aria-label="Sage AI chat"
    >
      <style>{BLINK_STYLE}</style>
      {/* header */}
      <div className="flex items-center gap-3 border-b border-[#F0F0EB] px-5 py-4">
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
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F1EC] text-muted transition-colors hover:text-ink"
            aria-label="Tutup Sage"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* pesan */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) =>
          m.from === 'sage' ? (
            <div key={i} className="flex items-end gap-2">
              <SageOrb size={24} />
              <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-[#F1F1EC] px-3.5 py-2.5 text-[13px] leading-relaxed text-ink">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-sage px-3.5 py-2.5 text-[13px] leading-relaxed text-white">
                {m.text}
              </div>
            </div>
          ),
        )}
      </div>

      {/* form */}
      <form onSubmit={send} className="flex items-center gap-2 border-t border-[#F0F0EB] px-4 py-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Sage anything…"
          className="h-10 flex-1 rounded-full bg-[#F5F5F0] px-4 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-sage/40"
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
