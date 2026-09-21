import { Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems, profile } from '../../data/portfolio.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  return <header className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-30px)] max-w-[1180px] -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-[#0d111bcc] p-2 pl-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:w-[calc(100%-48px)]">
    <Link to="/" onClick={close} className="flex items-center gap-2.5 text-sm font-extrabold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-[#b6f36b] font-mono text-[10px] text-[#07111e] shadow-[0_0_24px_rgba(182,243,107,.2)]">FAS</span>{profile.name}</Link>
    <button className="rounded-lg p-2 text-slate-200 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
    <nav className={`${open ? 'absolute left-0 right-0 top-[calc(100%+8px)] flex' : 'hidden'} flex-col gap-1 rounded-xl border border-white/10 bg-[#0d111b] p-2 text-xs font-semibold text-slate-400 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
      {navItems.map((item) => <NavLink key={item.href} to={item.href} onClick={close} className={({ isActive }) => `rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-white md:px-0 md:py-2 ${isActive ? 'text-[#b6f36b]' : ''}`}>{item.label}</NavLink>)}
      <a href="/resume.pdf" download className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#b6f36b]/40 bg-[#b6f36b]/10 px-3 py-2 text-[#dfffb1] transition hover:bg-[#b6f36b]/20 md:mt-0"><Download size={14} /> Resume</a>
    </nav>
  </header>
}
