import { AnimatePresence, motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'

export default function PageLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <ThemeToggle />
      <main className="mx-auto min-h-[calc(100vh-6rem)] w-full max-w-[1500px] bg-[var(--bg)] px-2 pt-16 sm:px-4 lg:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pb-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
