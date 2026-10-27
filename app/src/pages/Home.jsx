// Halaman Home — "Hey, Codexr!": baris 4 kartu statistik, baris Balance/Earnings/Profil,
// baris kartu kredit/transfer/keamanan. Orb Sage besar melayang di atas kartu tengah.

import { motion } from 'framer-motion'
import {
  Users, HandCoins, CircleCheck, ChevronDown, Plus, ArrowUpRight, RotateCw,
} from 'lucide-react'
import StatsCard from '../components/StatsCard'
import ActivityCard from '../components/ActivityCard'
import CreditStack from '../components/CreditStack'
import AvatarMemoji from '../components/AvatarMemoji'
import BalanceChart from '../components/charts/BalanceChart'
import Gauge from '../components/charts/Gauge'
import { SageOrb } from '../components/AskSage'
import { USER, HOME_STATS, BALANCE, EARNINGS, HOME_TRANSFERS, CARDS } from '../data'

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
})

function FloatingTile({ data, className = '' }) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_rgba(96,100,84,0.13)] ${className}`}>
      <div>
        <p className="text-[11px] font-medium text-muted">{data.label}</p>
        <p className="text-[17px] font-bold leading-snug tracking-tight text-ink">{data.value}</p>
      </div>
      <span
        className={`ml-auto rounded-full px-2 py-1 text-[11px] font-bold ${
          data.up ? 'bg-[#E3EDE2] text-[#4E7A5A]' : 'bg-[#F8E6E1] text-[#C65A4A]'
        }`}
      >
        {data.delta}
      </span>
    </div>
  )
}

export default function Home({ onAskSage }) {
  return (
    <div className="relative">
      {/* Orb Sage besar + gelembung ucapan (ciri khas halaman Home di video) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 160, damping: 15 }}
        className="absolute left-1/2 top-[300px] z-30 hidden -translate-x-1/3 xl:block"
      >
        <motion.button
          type="button"
          onClick={onAskSage}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative block rounded-full"
          aria-label="Ask Sage"
          style={{ filter: 'drop-shadow(0 22px 34px rgba(99,91,255,0.45))' }}
        >
          <SageOrb size={76} />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute -top-11 left-1/2 -translate-x-[78%] whitespace-nowrap rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[12.5px] text-ink shadow-[0_14px_30px_rgba(96,100,84,0.16)]"
        >
          I'm <b>Sage</b>, your dashboard AI
        </motion.div>
      </motion.div>

      {/* Baris statistik */}
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <motion.div {...rise(0)}>
          <StatsCard title={HOME_STATS.spent.title} value={HOME_STATS.spent.value} kind="bars" />
        </motion.div>
        <motion.div {...rise(1)}>
          <StatsCard title={HOME_STATS.clients.title} value={HOME_STATS.clients.value} kind="spark" icon={Users} />
        </motion.div>
        <motion.div {...rise(2)}>
          <StatsCard
            title={HOME_STATS.earningsToday.title}
            value={HOME_STATS.earningsToday.value}
            kind="icon"
            icon={HandCoins}
            iconBg="#F5E7D3"
            iconColor="#B07E2E"
          />
        </motion.div>
        <motion.div {...rise(3)}>
          <ActivityCard value={HOME_STATS.activity.value} />
        </motion.div>
      </div>

      {/* Baris tengah: Balance / Earnings / Profil */}
      <div className="mt-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-12">
        <motion.section {...rise(4)} className="card relative overflow-hidden p-6 xl:col-span-6">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold tracking-tight text-ink">Balance</h3>
            <CircleCheck size={14} className="text-sage" />
            <span className="text-xs text-[#5C665E]">On track</span>
            <button type="button" className="ml-auto flex items-center gap-1 text-[13px] font-medium text-muted hover:text-ink">
              Monthly <ChevronDown size={14} />
            </button>
          </div>
          <div className="relative mt-5">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex gap-4 pr-24">
              <FloatingTile data={BALANCE.saves} className="w-[190px]" />
              <FloatingTile data={BALANCE.balance} className="w-[200px]" />
            </div>
            <BalanceChart height={212} />
          </div>
        </motion.section>

        <motion.section {...rise(5)} className="card flex flex-col p-6 xl:col-span-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-bold tracking-tight text-ink">Earnings</h3>
            <span className="text-[11px] text-muted">{EARNINGS.label}</span>
          </div>
          <p className="mt-2 text-[22px] font-extrabold tracking-tight text-ink">{EARNINGS.value}</p>
          <p className="mt-1 text-xs text-[#5C665E]">{EARNINGS.note}</p>
          <div className="mt-auto pt-2">
            <Gauge value={EARNINGS.gauge} caption={EARNINGS.goal} size={196} />
          </div>
        </motion.section>

        <motion.section {...rise(6)} className="card flex flex-col items-center p-6 text-center xl:col-span-3">
          <div className="rounded-full p-[5px] ring-1 ring-[#D8DCD2]">
            <div className="rounded-full bg-[#F1E8D8] p-1.5">
              <AvatarMemoji size={76} />
            </div>
          </div>
          <h3 className="mt-3.5 text-base font-bold tracking-tight text-ink">{USER.name}</h3>
          <p className="text-xs text-muted">{USER.email}</p>
          <div className="mt-5 grid w-full grid-cols-3 border-t border-[#F0F0EB] pt-4">
            {[
              ['Projects', USER.projects],
              ['Followers', USER.followers],
              ['Following', USER.following],
            ].map(([label, v]) => (
              <div key={label}>
                <p className="text-[11px] text-muted">{label}</p>
                <p className="mt-0.5 text-base font-bold text-ink">{v}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Baris bawah: kartu kredit / transfer / keamanan */}
      <div className="mt-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-12">
        <motion.section {...rise(7)} className="card grid gap-5 p-6 sm:grid-cols-2 xl:col-span-6">
          <div className="flex flex-col">
            <h3 className="text-base font-bold leading-snug tracking-tight text-ink">
              Available Credit Card
              <br />
              in Wallet
            </h3>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#5C665E]">
              3 cards linked to payouts and expenses. Hover to fan the stack, tap any card to bring it to the front.
            </p>
            <button
              type="button"
              className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-[#6A8775] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(106,135,117,0.35)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              Add New Card <Plus size={14} />
            </button>
          </div>
          <div className="flex items-center justify-center rounded-[18px] bg-[#F3F1EF] px-4 py-5">
            <CreditStack cards={CARDS} compact />
          </div>
        </motion.section>

        <motion.section {...rise(8)} className="card p-6 xl:col-span-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold tracking-tight text-ink">Your Transfers</h3>
            <button
              type="button"
              aria-label="See all transfers"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F1EC] text-[#5C665E] transition-colors hover:bg-[#E7EAE3] hover:text-ink"
            >
              <ArrowUpRight size={15} />
            </button>
          </div>
          <ul className="mt-4 flex flex-col gap-4">
            {HOME_TRANSFERS.map((t) => (
              <li key={t.name} className="flex items-center gap-3">
                <span className="h-[26px] w-[3px] rounded-full bg-[#1D1C1F]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{t.name}</p>
                  <p className="text-[11px] text-muted">{t.time}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                    t.dir === 'in' ? 'bg-[#E3EDE2] text-[#4E7A5A]' : 'bg-[#F8E6E1] text-[#C65A4A]'
                  }`}
                >
                  {t.amount}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section {...rise(9)} className="card flex flex-col items-center p-6 text-center xl:col-span-3">
          <span className="mt-1 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E4EAE1] text-sage">
            <RotateCw size={24} />
          </span>
          <h3 className="mt-3.5 text-[15px] font-bold tracking-tight text-ink">Keep you safe!</h3>
          <p className="mt-1 text-xs text-muted">Update your security password</p>
          <button
            type="button"
            className="mt-4 rounded-full bg-[#6A8775] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(106,135,117,0.35)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            Update Your Security
          </button>
        </motion.section>
      </div>
    </div>
  )
}
