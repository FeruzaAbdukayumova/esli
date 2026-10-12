/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  type ThemeName,
  type DarkMode,
  getStoredTheme,
  setStoredTheme,
  applyThemeToDocument,
  getStoredDarkMode,
  setStoredDarkMode,
  applyDarkModeToDocument,
} from '@/shared/lib/themeStore'

interface ThemeContextValue {
  theme: ThemeName
  setTheme: (name: ThemeName) => void
  darkMode: DarkMode
  setDarkMode: (mode: DarkMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'indigo',
  setTheme: () => {},
  darkMode: 'system',
  setDarkMode: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getStoredTheme)
  const [darkMode, setDarkModeState] = useState<DarkMode>(getStoredDarkMode)

  useEffect(() => {
    applyThemeToDocument(theme)
  }, [theme])

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    applyDarkModeToDocument(darkMode)
  }, [darkMode])

  // Listen for OS color scheme changes when mode is 'system'
  useEffect(() => {
    if (darkMode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyDarkModeToDocument('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [darkMode])

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name)
    setStoredTheme(name)
    applyThemeToDocument(name)
  }, [])

  const setDarkMode = useCallback((mode: DarkMode) => {
    setDarkModeState(mode)
    setStoredDarkMode(mode)
    applyDarkModeToDocument(mode)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
