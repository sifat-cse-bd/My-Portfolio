import { ArrowRight, Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems, profile } from '../../data/portfolio.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') setOpen(false) }
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 ease-in-out">
      <div
        className={[
          'mx-auto max-w-6xl transition-all duration-300 ease-in-out',
          isScrolled
            ? 'mt-0 rounded-none border-b border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-xl'
            : 'mt-6 rounded-full border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md'
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" onClick={close} className="flex items-center gap-2.5 text-sm font-extrabold tracking-tight text-white">
            <span className="grid size-8 place-items-center rounded-lg bg-[#e6ff00] font-mono text-[10px] font-bold text-black shadow-[0_0_24px_rgba(230,255,0,0.45)]">FAS</span>
            <span className="text-white">{profile.name}</span>
          </Link>

          <button className="rounded-lg p-2 text-slate-200 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className={`${open ? 'absolute left-4 right-4 top-[calc(100%+10px)] flex' : 'hidden'} flex-col gap-1 rounded-2xl border border-white/10 bg-black/80 p-2 text-xs font-semibold text-slate-300 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={close}
                className={({ isActive }) => `rounded-full px-3 py-2 transition-colors duration-200 hover:text-white md:px-0 md:py-2 ${isActive ? 'text-[#e6ff00]' : 'text-slate-300'}`}
              >
                {item.label}
              </NavLink>
            ))}

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e6ff00]/45 bg-[#e6ff00] px-4 py-2 text-[11px] font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(230,255,0,0.3)] md:ml-2"
            >
              <Download size={14} />
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
