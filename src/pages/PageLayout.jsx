import { AnimatePresence, motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'

export default function PageLayout() {
  const location = useLocation()
  return <div className="min-h-screen overflow-hidden"><Header /><ThemeToggle /><main className="mx-auto w-[calc(100%-30px)] max-w-[1180px] pt-28 sm:w-[calc(100%-48px)]"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28, ease: 'easeOut' }}><Outlet /></motion.div></AnimatePresence></main><Footer /></div>
}
