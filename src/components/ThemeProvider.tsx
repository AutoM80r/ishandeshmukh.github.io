'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeCtxType { theme: Theme; toggle: () => void }

const ThemeCtx = createContext<ThemeCtxType>({ theme: 'dark', toggle: () => {} })

export const useTheme = () => useContext(ThemeCtx)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Read what the inline anti-flash script already set
    const attr = document.documentElement.getAttribute('data-theme')
    setTheme(attr === 'light' ? 'light' : 'dark')
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (_) {}
  }

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}
