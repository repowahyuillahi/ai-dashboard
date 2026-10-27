// Kerangka aplikasi Sage — AI Property Dashboard (template "ai-dashboard").
// Susunan: Topbar + Sidebar rail + konten halaman dengan transisi blur-crossfade,
// orb/pill Ask Sage melayang, panel chat Sage, dan palet perintah ⌘K.

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import CommandPalette from './components/CommandPalette'
import { OrbButton, SagePanel } from './components/AskSage'
import Home from './pages/Home'
import Wallet from './pages/Wallet'
import Analytics from './pages/Analytics'
import Properties from './pages/Properties'
import { Guests, Bookings, Settings } from './pages/Others'
import { PAGES } from './data'

const PAGE_COMPONENTS = {
  home: Home,
  wallet: Wallet,
  analytics: Analytics,
  properties: Properties,
  guests: Guests,
  bookings: Bookings,
  settings: Settings,
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
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-5 sm:px-7">
        <Topbar title={meta.title} sub={meta.sub} onSearchFocus={() => setPaletteOpen(true)} />

        <div className="mt-6 flex items-start gap-5">
          <Sidebar page={page} onNavigate={navigate} />
          <main className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 14 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <PageComp onAskSage={openSage} onNavigate={navigate} />
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

      {/* Panel chat Sage */}
      <AnimatePresence>
        {sageOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <SagePanel onClose={() => setSageOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onSelect={handlePaletteSelect} />
    </div>
  )
}
