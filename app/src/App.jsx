// Kerangka aplikasi Sage — AI Property Dashboard (template "ai-dashboard").
// Susunan: Topbar + Sidebar rail + konten halaman (code-split per halaman,
// transisi opacity+y ringan), orb/pill Ask Sage melayang, panel chat Sage,
// dan palet perintah ⌘K.

import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import CommandPalette from './components/CommandPalette'
import { OrbButton, SagePanel } from './components/AskSage'
import { pageVariants } from './lib/motion'
import { PAGES } from './data'

const Home = lazy(() => import('./pages/Home'))
const Wallet = lazy(() => import('./pages/Wallet'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Properties = lazy(() => import('./pages/Properties'))
const Guests = lazy(() => import('./pages/Others').then((m) => ({ default: m.Guests })))
const Bookings = lazy(() => import('./pages/Others').then((m) => ({ default: m.Bookings })))
const Settings = lazy(() => import('./pages/Others').then((m) => ({ default: m.Settings })))

const PAGE_COMPONENTS = {
  home: Home,
  wallet: Wallet,
  analytics: Analytics,
  properties: Properties,
  guests: Guests,
  bookings: Bookings,
  settings: Settings,
}

function PageFallback() {
  return (
    <div className="flex min-h-[320px] items-center justify-center" aria-busy="true">
      <div className="h-[320px] w-full animate-pulse rounded-card bg-surface/70" />
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [sageOpen, setSageOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const navigate = useCallback((key) => {
    if (PAGE_COMPONENTS[key]) setPage(key)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])

  const PageComp = PAGE_COMPONENTS[page]
  const meta = PAGES[page]
  const openSage = useCallback(() => setSageOpen(true), [])

  const handlePaletteSelect = useCallback(
    (item) => {
      setPaletteOpen(false)
      if (!item) return
      if (item.action === 'ask-sage') {
        setSageOpen(true)
      } else if (item.page) {
        navigate(item.page)
      }
    },
    [navigate],
  )

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-cream font-sans text-ink antialiased">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-5 sm:px-7">
          <Topbar title={meta.title} sub={meta.sub} onSearchFocus={() => setPaletteOpen(true)} />

          <div className="mt-6 flex items-start gap-5">
            <Sidebar page={page} onNavigate={navigate} />
            <main className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <Suspense fallback={<PageFallback />}>
                    <PageComp onAskSage={openSage} onNavigate={navigate} />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Pill Ask Sage (di Home digantikan orb besar di dalam halaman) */}
        {page !== 'home' && !sageOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <OrbButton onClick={openSage} />
          </motion.div>
        )}

        {/* Panel chat Sage — anak langsung AnimatePresence berupa komponen motion */}
        <AnimatePresence>
          {sageOpen && (
            <SagePanel
              key="sage-panel"
              onClose={() => setSageOpen(false)}
              className="fixed bottom-6 right-6 z-50"
            />
          )}
        </AnimatePresence>

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onSelect={handlePaletteSelect} />
      </div>
    </MotionConfig>
  )
}
