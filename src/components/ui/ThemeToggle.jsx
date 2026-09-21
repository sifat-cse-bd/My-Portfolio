import { MonitorCog, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/themeContext.js'

export default function ThemeToggle() {
  const { theme, preference, setPreference } = useTheme()
  const preferences = ['system', 'dark', 'light']
  const nextPreference = preferences[(preferences.indexOf(preference) + 1) % preferences.length]
  const Icon = preference === 'system' ? MonitorCog : theme === 'dark' ? Moon : Sun

  return <button type="button" onClick={() => setPreference(nextPreference)} aria-label={`Switch to ${nextPreference} theme`} title={`Theme: ${preference}`} className="fixed right-4 top-24 z-40 grid size-9 place-items-center rounded-full border border-white/10 bg-slate-900/70 text-slate-400 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-indigo-400/50 hover:text-indigo-300 sm:right-6"><Icon size={15} /></button>
}
