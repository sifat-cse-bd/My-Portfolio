import { Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems, profile } from '../../data/portfolio.js'
import { useAssetPreview } from '../../hooks/useAssetPreview.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const photo = useAssetPreview('photo')
  const close = () => setOpen(false)

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') setOpen(false) }
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? '' : 'px-2 sm:px-4'}`}>
      <div
        className={[
          'w-full transition-all duration-300 ease-in-out',
          isScrolled
            ? 'mt-0 rounded-none border-b border-[var(--border)] bg-[color:var(--panel-strong)] shadow-[0_10px_30px_var(--shadow)] backdrop-blur-xl'
            : 'mx-auto mt-3 max-w-[1500px] rounded-full border border-[var(--border)] bg-[color:var(--panel)] shadow-[0_14px_40px_var(--shadow)] backdrop-blur-md'
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" onClick={close} className="flex items-center gap-2.5 text-sm font-extrabold tracking-tight text-[var(--text)]">
            <span className="grid size-8 place-items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--accent-soft)] font-mono text-[10px] font-bold text-[var(--text)] shadow-[0_0_24px_rgba(248,217,122,0.18)]">
              {photo.preview && photo.preview !== '__loading__' ? <img src={photo.preview} alt="" className="size-full object-cover" /> : photo.loading ? <span className="size-full animate-pulse rounded-full bg-[var(--accent-soft)]" /> : profile.initials}
            </span>
            <span>{profile.name}</span>
          </Link>

          <button className="rounded-lg p-2 text-[var(--text)] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className={`${open ? 'absolute left-3 right-3 top-[calc(100%+10px)] flex' : 'hidden'} flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[color:var(--panel-strong)] p-2 text-xs font-semibold text-[var(--muted-strong)] shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={close}
                className={({ isActive }) => `rounded-full px-3 py-2 transition-colors duration-200 hover:text-[var(--text)] md:px-0 md:py-2 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--muted-strong)]'}`}
              >
                {item.label}
              </NavLink>
            ))}

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)] px-4 py-2 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(255,122,47,0.25)] md:ml-2"
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
