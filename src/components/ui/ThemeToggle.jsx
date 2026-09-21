import { MonitorCog, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/themeContext.js'

export default function ThemeToggle() {
  const { theme, preference, setPreference } = useTheme()
  const preferences = ['system', 'dark', 'light']
  const nextPreference = preferences[(preferences.indexOf(preference) + 1) % preferences.length]
  const Icon = preference === 'system' ? MonitorCog : theme === 'dark' ? Moon : Sun

  return <button type="button" onClick={() => setPreference(nextPreference)} aria-label={`Switch to ${nextPreference} theme`} title={`Theme: ${preference}`} className="fixed right-4 top-24 z-40 grid size-9 place-items-center rounded-full border border-[var(--border)] bg-[color:var(--panel-strong)] text-[var(--muted)] shadow-xl shadow-[var(--shadow)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] sm:right-6"><Icon size={15} /></button>
}
