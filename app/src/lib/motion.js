// Preset gerak terpusat — semua halaman & kartu memakai varian dari sini
// agar easing, durasi, dan hover konsisten (tidak ada duplikasi rise() lokal).

export const EASE = [0.22, 1, 0.36, 1]

export const DUR = {
  pageEnter: 0.26,
  pageExit: 0.18,
  rise: 0.5,
}

/** Transisi halaman (App): opacity + y saja, tanpa blur. */
export const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.pageEnter, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DUR.pageExit, ease: EASE },
  },
}

/** Kemunculan satu blok: pudar + naik. `i` = urutan untuk stagger manual. */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.rise, delay, ease: EASE },
})

/** Seperti fadeUp, tapi delay dihitung dari indeks (base + step × i). */
export const rise = (i = 0, base = 0, step = 0.06) => fadeUp(base + step * i)

/** Stagger varian untuk daftar/grid (container + item). */
export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

export const staggerItem = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.rise, ease: EASE },
  },
}

/** Hover kartu yang seragam di seluruh template: naik −5px. */
export const hoverLift = {
  whileHover: { y: -5 },
  transition: { type: 'spring', stiffness: 320, damping: 22 },
}
