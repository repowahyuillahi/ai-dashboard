// Data Sage & navigasi: metadata halaman, bank jawaban panel chat, dan item
// palet perintah ⌘K. Semua angka portofolio di sini DISUSUN dari konstanta
// data lain (properties/wallet/home) — tidak ada angka duplikat yang diketik ulang.

import {
  Building2, Calendar, Home as HomeIcon, LayoutDashboard, Settings,
  Sparkles, TrendingUp, Users, Wallet as WalletIcon,
} from 'lucide-react'
import { PROPERTIES, PROPERTY_STATS, TOTAL_UNITS } from './properties'
import { CARDS, WALLET } from './wallet'
import { EARNINGS, HOME_STATS } from './home'

export const PAGES = {
  home: { title: 'Hey, Codexr!', sub: 'Explore information and activity about your property' },
  wallet: { title: 'Wallet & transfers', sub: 'Cards, balance and every dollar in or out' },
  analytics: { title: 'Analytics', sub: 'Revenue, occupancy and trends across the portfolio' },
  properties: { title: 'Your properties', sub: 'Occupancy, revenue and ratings per building' },
  guests: { title: 'Guests', sub: 'People staying across your properties' },
  bookings: { title: 'Bookings', sub: 'Check-ins, check-outs and what is next' },
  settings: { title: 'Settings', sub: 'Workspace, notifications and security' },
}

// ---- Angka turunan (satu sumber kebenaran) ----
const stat = (label) => PROPERTY_STATS.find((s) => s.label === label)
const OCCUPANCY = stat('Occupancy').value // 79
const UNITS_BOOKED = stat('Units booked').value // 104
const REVENUE_MONTH = stat('Revenue this month').format(stat('Revenue this month').value) // $14,474
const byOccupancy = [...PROPERTIES].sort((a, b) => b.occupancy - a.occupancy)
const TOP_OCCUPANCY = byOccupancy[0] // Ocean View Loft 92%
const LOW_OCCUPANCY = byOccupancy[byOccupancy.length - 1] // Birch Studios 64%
const money = (s) => Number(s.replace(/[^0-9.]/g, ''))
const TOP_EARNERS = [...PROPERTIES].sort((a, b) => money(b.revenue) - money(a.revenue)).slice(0, 3)
const CARD_HOLDERS = CARDS.map((c) => c.holder).join(', ')

// ---- Panel chat Sage ----
export const SAGE_SEED_MESSAGES = [
  {
    from: 'sage',
    text: "Hi, I'm Sage — your property copilot. Ask me about occupancy, revenue, or any unit in your portfolio.",
  },
  { from: 'user', text: 'How is occupancy looking this month?' },
  {
    from: 'sage',
    text: `Occupancy is at ${OCCUPANCY}% across your portfolio — ${UNITS_BOOKED} of ${TOTAL_UNITS} units booked. ${TOP_OCCUPANCY.name} leads at ${TOP_OCCUPANCY.occupancy}%, while ${LOW_OCCUPANCY.name} (${LOW_OCCUPANCY.occupancy}%) has the most open nights right now.`,
  },
  { from: 'user', text: 'And revenue?' },
  {
    from: 'sage',
    text: `Properties brought in ${REVENUE_MONTH} this month. Wallet earnings are ${EARNINGS.value} against a ${EARNINGS.goal.replace('of ', '')} goal (${EARNINGS.gauge}%), and net profit today is ${HOME_STATS.activity.value}.`,
  },
]

export function sageReply(q) {
  const s = q.toLowerCase()
  if (/(occup|vacant|empty|tenant|lease)/.test(s)) {
    return `Current occupancy is ${OCCUPANCY}% — ${UNITS_BOOKED} of ${TOTAL_UNITS} units booked. ${TOP_OCCUPANCY.name} is nearly full at ${TOP_OCCUPANCY.occupancy}% (${TOP_OCCUPANCY.units} units); ${LOW_OCCUPANCY.name} has the most room to grow at ${LOW_OCCUPANCY.occupancy}%.`
  }
  if (/(revenue|income|rent|earning|profit|money)/.test(s)) {
    const earners = TOP_EARNERS.map((p) => `${p.name} (${p.revenue})`).join(', ')
    return `Properties earned ${REVENUE_MONTH} this month. Top earners: ${earners}. Wallet earnings are ${EARNINGS.value} — ${EARNINGS.gauge}% of the ${EARNINGS.goal.replace('of ', '')} goal, with profit 2% above last month.`
  }
  if (/(balance|cash|account|bank|card)/.test(s)) {
    return `Your available balance is ${WALLET.balance} (${WALLET.delta} in the last 30 days), across ${CARDS.length} cards held by ${CARD_HOLDERS}. Money in: ${WALLET.moneyIn} · money out: ${WALLET.moneyOut}.`
  }
  if (/(propert|building|unit|portfolio|apartment)/.test(s)) {
    const list = PROPERTIES.map((p) => `${p.name} (${p.city})`).join(', ')
    return `Your portfolio has ${PROPERTIES.length} properties and ${TOTAL_UNITS} units: ${list}.`
  }
  if (/(mainten|repair|fix|hvac)/.test(s)) {
    return 'Recent vendor payments: AquaFix Plumbing took $185.00 for a repair at Palm Residency, and Carlos Brown III was paid $120.50 for cleaning. Nothing urgent is open right now.'
  }
  if (/(hi|hello|hey|halo)/.test(s)) {
    return `Hello! Your portfolio is steady today — ${OCCUPANCY}% occupancy, ${REVENUE_MONTH} earned this month, and ${HOME_STATS.clients.value} new clients. What would you like to dig into?`
  }
  return `Here's what I can see: occupancy ${OCCUPANCY}% (${UNITS_BOOKED} of ${TOTAL_UNITS} units), ${REVENUE_MONTH} earned this month, wallet balance ${WALLET.balance}, and earnings at ${EARNINGS.gauge}% of the ${EARNINGS.goal.replace('of ', '')} goal. Ask me about any of those and I'll break it down.`
}

// ---- Palet perintah ⌘K ----
export const PALETTE_ITEMS = [
  { id: 'page-home', type: 'Page', label: 'Home', hint: `${PAGES.home.title} · dashboard`, page: 'home', icon: LayoutDashboard, keywords: 'home main dashboard overview' },
  { id: 'page-wallet', type: 'Page', label: 'Wallet & transfers', hint: `Balance ${WALLET.balance}`, page: 'wallet', icon: WalletIcon, keywords: 'money balance cards transfers payments' },
  { id: 'page-analytics', type: 'Page', label: 'Analytics', hint: 'Revenue & occupancy trends', page: 'analytics', icon: TrendingUp, keywords: 'chart report revenue trends' },
  { id: 'page-properties', type: 'Page', label: 'Properties', hint: `${PROPERTIES.length} buildings · ${TOTAL_UNITS} units`, page: 'properties', icon: Building2, keywords: 'buildings units portfolio' },
  { id: 'page-guests', type: 'Page', label: 'Guests', hint: 'People staying with you', page: 'guests', icon: Users, keywords: 'guests tenants people renters' },
  { id: 'page-bookings', type: 'Page', label: 'Bookings', hint: 'Check-ins & check-outs', page: 'bookings', icon: Calendar, keywords: 'schedule calendar check-in checkout' },
  { id: 'page-settings', type: 'Page', label: 'Settings', hint: 'Workspace preferences', page: 'settings', icon: Settings, keywords: 'preferences account profile security' },
  ...PROPERTIES.slice(0, 3).map((p) => ({
    id: `prop-${p.name.toLowerCase().replace(/[^a-z]+/g, '-')}`,
    type: 'Property',
    label: p.name,
    hint: `${p.city} · ${p.occupancy}% occupied`,
    page: 'properties',
    icon: HomeIcon,
    keywords: `${p.name.toLowerCase()} ${p.city.toLowerCase()} apartment`,
  })),
  { id: 'act-ask-sage', type: 'Action', label: 'Ask Sage AI', hint: 'Chat with your copilot', action: 'ask-sage', icon: Sparkles, keywords: 'ai chat assistant ask' },
  { id: 'act-revenue', type: 'Action', label: 'View revenue report', hint: `This month · ${REVENUE_MONTH}`, page: 'analytics', icon: TrendingUp, keywords: 'report analytics revenue chart' },
]
