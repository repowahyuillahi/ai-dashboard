// Data halaman Bookings. `tone` merujuk set warna kanonis di komponen:
// 'up' = chip naik, 'peach' = aksen peach, 'down' = chip turun.

import { CalendarCheck, CalendarX, Clock } from 'lucide-react'

export const BOOKINGS = [
  { icon: CalendarCheck, tone: 'up', title: 'Check-in · Ocean View Loft', meta: 'Anna Jones · Unit 11 · Today, 15:00' },
  { icon: CalendarCheck, tone: 'up', title: 'Check-in · Cedar Heights', meta: 'Priya Nair · Unit 16 · Today, 16:30' },
  { icon: Clock, tone: 'peach', title: 'Cleaning window · Maple Court', meta: 'Between guests · Tomorrow, 11:00–13:00' },
  { icon: CalendarX, tone: 'down', title: 'Checkout · Birch Studios', meta: 'Sara Lindqvist · Unit 10 · Tomorrow, 10:00' },
  { icon: CalendarCheck, tone: 'up', title: 'Check-in · Harbor Point', meta: 'Marco Ruiz · Unit 12 · Friday, 14:00' },
]
