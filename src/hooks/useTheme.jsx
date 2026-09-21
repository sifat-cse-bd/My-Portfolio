import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext.js'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(() => localStorage.getItem('faruk-theme') || 'system')
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme())
  const theme = preference === 'system' ? systemTheme : preference

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (event) => setSystemTheme(event.matches ? 'light' : 'dark')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('faruk-theme', preference)
  }, [preference, theme])

  const value = useMemo(() => ({ theme, preference, setPreference }), [theme, preference])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

