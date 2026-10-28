// Data halaman Home & profil pengguna.

export const USER = {
  name: 'Codexr',
  email: 'codexr@gmail.com',
  projects: 17,
  followers: 182,
  following: 21,
}

export const HOME_STATS = {
  spent: { title: 'Spent this month', value: '$8,216.24' },
  clients: { title: 'New clients', value: '230' },
  earningsToday: { title: 'Earnings', accent: 'today', value: '$398.15' },
  activity: { value: '$116.99' },
}

export const BALANCE = {
  saves: { label: 'Saves', value: '29.69%', delta: '-1.35%', up: false },
  balance: { label: 'Balance', value: '$36,973', delta: '+5.56%', up: true },
}

export const EARNINGS = {
  label: 'revenue this month',
  value: '$10,842.74',
  note: 'Profit is 2% more than last month',
  gauge: 35,
  goal: 'of $21,000',
}

export const HOME_TRANSFERS = [
  { dir: 'in', name: 'From Anna Jones', time: 'Today, 16:21', amount: '+$240.00' },
  { dir: 'out', name: 'To Carlos Brown III', time: 'Today, 15:24', amount: '-$120.50' },
  { dir: 'in', name: 'From Joel Cannan', time: 'Today, 13:29', amount: '+$312.75' },
]
