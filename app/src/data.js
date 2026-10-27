// Data demo untuk template ai-dashboard (Sage — AI Property Dashboard).
// Semua angka adalah data contoh statis agar template bisa langsung dijelajahi.

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

// Palet header ilustrasi per properti: [skyAtas, skyBawah], matahari, gedung utama, gedung samping
export const PROPERTIES = [
  {
    name: 'Ocean View Loft', city: 'Lisbon', occupancy: 92, revenue: '$2,790', units: '11/12', rating: '4.9',
    palette: { sky: ['#CDEBDD', '#F4FBF6'], sun: '#9FEBC8', main: '#4A7462', side: '#7FA08D', windows: ['#F2C66D', '#33503F'] },
  },
  {
    name: 'Maple Court', city: 'Toronto', occupancy: 79, revenue: '$2,660', units: '19/24', rating: '4.7',
    palette: { sky: ['#EEDCD3', '#FBF5F0'], sun: '#F0C19E', main: '#86705A', side: '#B39F8D', windows: ['#F2C66D', '#57493A'] },
  },
  {
    name: 'Cedar Heights', city: 'Denver', occupancy: 89, revenue: '$2,236', units: '16/18', rating: '4.8',
    palette: { sky: ['#D1E2EE', '#F4F9FC'], sun: '#9FD1EF', main: '#496A84', side: '#7E97A8', windows: ['#F2C66D', '#2F485C'] },
  },
  {
    name: 'Palm Residency', city: 'Dubai', occupancy: 73, revenue: '$1,984', units: '22/30', rating: '4.6',
    palette: { sky: ['#EDE3D1', '#FBF7EE'], sun: '#EFD29B', main: '#78654A', side: '#A08B6D', windows: ['#F2C66D', '#4E4130'] },
  },
  {
    name: 'Linden House', city: 'Berlin', occupancy: 85, revenue: '$1,520', units: '11/13', rating: '4.8',
    palette: { sky: ['#E2D8F3', '#F8F5FD'], sun: '#B79CED', main: '#6E5A9E', side: '#9A86C4', windows: ['#F2C66D', '#453664'] },
  },
  {
    name: 'Harbor Point', city: 'Sydney', occupancy: 75, revenue: '$1,284', units: '9/12', rating: '4.7',
    palette: { sky: ['#D3EAF6', '#F5FBFE'], sun: '#8FD0F0', main: '#4E7A8C', side: '#83A7B5', windows: ['#F2C66D', '#31505E'] },
  },
  {
    name: 'Olive Gardens', city: 'Athens', occupancy: 75, revenue: '$1,105', units: '9/12', rating: '4.6',
    palette: { sky: ['#DFEDD2', '#F8FCF3'], sun: '#AEE59A', main: '#6C8A52', side: '#97B07E', windows: ['#F2C66D', '#42592F'] },
  },
  {
    name: 'Birch Studios', city: 'Oslo', occupancy: 64, revenue: '$895', units: '7/11', rating: '4.9',
    palette: { sky: ['#F2DAE6', '#FCF5F8'], sun: '#F2A0C4', main: '#8A5570', side: '#B18399', windows: ['#F2C66D', '#573647'] },
  },
]

export const PROPERTY_STATS = [
  { label: 'Properties', value: 8, format: (v) => `${Math.round(v)}` },
  { label: 'Units booked', value: 104, format: (v) => `${Math.round(v)} / 132` },
  { label: 'Occupancy', value: 79, format: (v) => `${Math.round(v)}%` },
  { label: 'Revenue this month', value: 14474, format: (v) => `$${Math.round(v).toLocaleString('en-US')}` },
]

export const PAGES = {
  home: { title: 'Hey, Codexr!', sub: 'Explore information and activity about your property' },
  wallet: { title: 'Wallet & transfers', sub: 'Cards, balance and every dollar in or out' },
  analytics: { title: 'Analytics', sub: 'Revenue, occupancy and trends across the portfolio' },
  properties: { title: 'Your properties', sub: 'Occupancy, revenue and ratings per building' },
  guests: { title: 'Guests', sub: 'People staying across your properties' },
  bookings: { title: 'Bookings', sub: 'Check-ins, check-outs and what is next' },
  settings: { title: 'Settings', sub: 'Workspace, notifications and security' },
}
