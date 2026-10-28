// CreditStack — tumpukan 3 kartu kredit CSS 3D.
// Hover: kartu mekar (fan out). Klik kartu: membawanya ke depan (urutan state + animasi layout framer-motion).
// Tiap kartu digambar dengan div: gradien per tone (variabel kartu di index.css),
// logo dua lingkaran Mastercard, nomor, nama pemegang.
// Urutan tumpukan selalu disinkronkan ulang bila prop `cards` berubah.

import { useState } from 'react'
import { motion } from 'framer-motion'

const TONES = {
  glass: {
    background: 'linear-gradient(135deg, var(--card-glass-a) 0%, var(--card-glass-b) 55%, var(--card-glass-c) 100%)',
    color: 'var(--color-ink)',
    sub: 'rgba(30,36,32,0.55)',
    border: '1px solid rgba(30,36,32,0.08)',
    shadow: '0 18px 36px rgba(30,36,32,0.16)',
  },
  sage: {
    background: 'linear-gradient(135deg, var(--card-sage-a) 0%, var(--card-sage-b) 55%, var(--card-sage-c) 100%)',
    color: 'var(--color-surface)',
    sub: 'rgba(255,255,255,0.65)',
    border: '1px solid rgba(255,255,255,0.12)',
    shadow: '0 18px 36px rgba(95,113,97,0.4)',
  },
  black: {
    background: 'linear-gradient(135deg, var(--card-black-a) 0%, var(--card-black-b) 60%, var(--card-black-c) 100%)',
    color: 'var(--color-surface)',
    sub: 'rgba(255,255,255,0.55)',
    border: '1px solid rgba(255,255,255,0.08)',
    shadow: '0 18px 36px rgba(18,21,15,0.45)',
  },
}

const DEFAULT_CARDS = [
  { holder: 'A. Whitmore', last4: '4291', exp: '09/28', tone: 'black' },
  { holder: 'A. Whitmore', last4: '8834', exp: '04/27', tone: 'sage' },
  { holder: 'A. Whitmore', last4: '1234', exp: '12/26', tone: 'glass' },
]

// Pose tumpukan per "kedalaman" (0 = paling depan)
const STACK_POSE = [
  { rotate: 0, x: 0, y: 0, scale: 1 },
  { rotate: -7, x: -14, y: -13, scale: 0.97 },
  { rotate: 6, x: 13, y: -24, scale: 0.94 },
]
// Pose saat hover: mekar seperti kipas
const FAN_POSE = [
  { rotate: 0, x: 0, y: 8, scale: 1 },
  { rotate: -11, x: -30, y: -16, scale: 0.97 },
  { rotate: 10, x: 28, y: -30, scale: 0.94 },
]

function MastercardLogo({ light }) {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" aria-hidden="true">
      <circle cx="14" cy="12" r="9" style={{ fill: 'var(--mc-red)' }} />
      <circle cx="24" cy="12" r="9" style={{ fill: 'var(--mc-yellow)' }} fillOpacity="0.9" />
      <path
        d="M19 4.6a9 9 0 0 1 0 14.8 9 9 0 0 1 0-14.8Z"
        style={{ fill: 'var(--mc-orange)' }}
        opacity={light ? 0.95 : 0.9}
      />
    </svg>
  )
}

function CardFace({ card, compact }) {
  const tone = TONES[card.tone] ?? TONES.glass
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-2xl"
      style={{
        background: tone.background,
        color: tone.color,
        border: tone.border,
        boxShadow: tone.shadow,
        padding: compact ? 14 : 18,
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="rounded-md"
          style={{
            width: compact ? 30 : 36,
            height: compact ? 21 : 26,
            background: 'linear-gradient(135deg, var(--chip-gold-a), var(--chip-gold-b))',
            boxShadow: 'inset 0 0 0 1px rgba(120,84,10,0.35)',
          }}
        />
        <MastercardLogo light={card.tone !== 'glass'} />
      </div>
      <div>
        <p
          className="whitespace-nowrap font-mono tracking-[0.06em]"
          style={{ fontSize: compact ? 11 : 13.5, color: tone.color }}
        >
          1234&nbsp;••••&nbsp;••••&nbsp;{card.last4 ?? '1234'}
        </p>
        <div className="mt-2 flex items-end justify-between" style={{ fontSize: compact ? 9.5 : 11 }}>
          <div>
            <p style={{ color: tone.sub, fontSize: compact ? 7.5 : 8.5, letterSpacing: '0.12em' }}>
              CARD HOLDER
            </p>
            <p className="font-semibold uppercase tracking-wide">{card.holder}</p>
          </div>
          <div className="text-right">
            <p style={{ color: tone.sub, fontSize: compact ? 7.5 : 8.5, letterSpacing: '0.12em' }}>
              EXPIRES
            </p>
            <p className="font-semibold">{card.exp ?? '12/26'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreditStack({ cards = DEFAULT_CARDS, compact = false, className = '' }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i)) // index kartu, depan → belakang
  const [prevCards, setPrevCards] = useState(cards)
  const [hover, setHover] = useState(false)
  const W = compact ? 218 : 272
  const H = compact ? 138 : 172

  // Sinkronkan urutan dengan prop terbaru saat render (pola resmi React untuk
  // menyesuaikan state dari props — menghindari indeks basi saat cards berganti)
  if (prevCards !== cards) {
    setPrevCards(cards)
    setOrder(cards.map((_, i) => i))
  }

  const bringToFront = (cardIdx) =>
    setOrder((prev) => [cardIdx, ...prev.filter((i) => i !== cardIdx)])

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width: W, height: H + 34, perspective: 900 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {order.map((cardIdx, depth) => {
        const card = cards[cardIdx]
        if (!card) return null // guard: indeks di luar daftar kartu saat ini
        const pose = (hover ? FAN_POSE : STACK_POSE)[Math.min(depth, 2)]
        return (
          <motion.button
            key={cardIdx}
            type="button"
            onClick={() => bringToFront(cardIdx)}
            animate={{
              rotate: pose.rotate,
              x: pose.x,
              y: pose.y,
              scale: pose.scale,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            whileTap={{ scale: 0.98 }}
            className="absolute left-0 top-7 cursor-pointer text-left"
            style={{ width: W, height: H, zIndex: 10 - depth, transformOrigin: '50% 90%' }}
            aria-label={`Kartu berakhiran ${card.last4} — klik untuk ke depan`}
          >
            <CardFace card={card} compact={compact} />
          </motion.button>
        )
      })}
    </div>
  )
}
