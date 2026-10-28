// Data properti — palet header ilustrasi per properti memang data warna
// ([skyAtas, skyBawah], matahari, gedung utama, gedung samping, jendela),
// jadi hex tinggal di berkas data ini, bukan di komponen.

// Palet bawaan BuildingArt bila sebuah properti tidak membawa palet sendiri.
export const DEFAULT_BUILDING_PALETTE = {
  sky: ['#F7D9A8', '#F3E9D2'],
  sun: '#F5B841',
  main: '#5F7161',
  side: '#8A9B84',
  windows: ['#FFD98A', '#43503F'],
}

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
    name: 'Linden House', city: 'Berlin', occupancy: 90, revenue: '$1,520', units: '11/13', rating: '4.8',
    palette: { sky: ['#E2D8F3', '#F8F5FD'], sun: '#B79CED', main: '#6E5A9E', side: '#9A86C4', windows: ['#F2C66D', '#453664'] },
  },
  {
    name: 'Harbor Point', city: 'Sydney', occupancy: 75, revenue: '$1,284', units: '9/12', rating: '4.7',
    palette: { sky: ['#D3EAF6', '#F5FBFE'], sun: '#8FD0F0', main: '#4E7A8C', side: '#83A7B5', windows: ['#F2C66D', '#31505E'] },
  },
  {
    name: 'Olive Gardens', city: 'Athens', occupancy: 71, revenue: '$1,105', units: '9/12', rating: '4.6',
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

/** Total unit portofolio (dari statistik "Units booked": 104 / 132). */
export const TOTAL_UNITS = 132
