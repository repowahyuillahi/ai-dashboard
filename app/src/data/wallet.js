// Data dompet: saldo, kartu kredit, dan riwayat transfer.

export const WALLET = {
  balance: '$34,101.94',
  delta: '+5.6%',
  moneyIn: '$1,605.15',
  moneyOut: '$892.80',
}

export const CARDS = [
  { holder: 'Lana Steiner', last4: '1234', exp: '06/28', tone: 'glass' },
  { holder: 'Olivia Rhye', last4: '1234', exp: '09/27', tone: 'sage' },
  { holder: 'Phoenix Baker', last4: '1234', exp: '11/26', tone: 'black' },
]

// Thumbnail kartu di daftar ringkas Wallet — gradien per tone, memakai
// variabel kartu yang sama dengan CreditStack (didefinisikan di index.css).
export const CARD_THUMBS = {
  glass: 'linear-gradient(135deg, var(--card-glass-a), var(--card-glass-c))',
  sage: 'linear-gradient(135deg, var(--card-sage-a), var(--card-sage-c))',
  black: 'linear-gradient(135deg, var(--card-black-a), var(--card-black-c))',
}

export const ALL_TRANSFERS = [
  { dir: 'in', name: 'From Anna Jones', note: 'Booking · Ocean View Loft', time: 'Today, 16:21', amount: 240.0 },
  { dir: 'out', name: 'To Carlos Brown III', note: 'Cleaning service', time: 'Today, 15:24', amount: 120.5 },
  { dir: 'in', name: 'From Joel Cannan', note: 'Booking · Maple Court', time: 'Today, 13:29', amount: 312.75 },
  { dir: 'in', name: 'From Priya Nair', note: 'Booking · Cedar Heights', time: 'Today, 11:02', amount: 428.0 },
  { dir: 'out', name: 'To AquaFix Plumbing', note: 'Repair · Palm Residency', time: 'Today, 09:47', amount: 185.0 },
  { dir: 'in', name: 'From Marco Ruiz', note: 'Booking · Harbor Point', time: 'Yesterday, 18:30', amount: 264.4 },
  { dir: 'out', name: 'To BrightNest Linens', note: 'Laundry · all units', time: 'Yesterday, 15:12', amount: 96.8 },
  { dir: 'in', name: 'From Sara Lindqvist', note: 'Booking · Birch Studios', time: 'Yesterday, 12:05', amount: 198.25 },
  { dir: 'out', name: 'To City Utilities Co.', note: 'Water & electricity', time: 'Mon, 09:14', amount: 342.6 },
  { dir: 'in', name: 'From Tom Becker', note: 'Booking · Olive Gardens', time: 'Mon, 08:40', amount: 355.0 },
]
