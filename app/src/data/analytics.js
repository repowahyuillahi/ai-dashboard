// Data halaman Analytics: deret revenue per rentang & sumber booking.

export const RANGES = {
  '6M': { revenue: [18, 22, 20, 26, 24, 31, 29, 34, 32, 38, 36, 42], total: '$96,420', delta: '+12.4%' },
  '1Y': { revenue: [12, 15, 14, 19, 22, 20, 26, 24, 31, 29, 36, 42, 40, 47, 45, 52], total: '$188,930', delta: '+18.1%' },
  '30D': { revenue: [8, 11, 9, 13, 12, 15, 14, 17, 16, 19], total: '$14,474', delta: '+5.6%' },
}

export const CHANNELS = [
  { name: 'Direct bookings', share: 46, note: 'Website & repeat guests' },
  { name: 'Booking platforms', share: 34, note: 'Airbnb, Booking.com, Vrbo' },
  { name: 'Referrals', share: 12, note: 'Guest referrals & partners' },
  { name: 'Long stays', share: 8, note: '30+ night contracts' },
]
