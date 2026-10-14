/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  type DarkMode,
  clearLegacyColorTheme,
  getStoredDarkMode,
  setStoredDarkMode,
  applyDarkModeToDocument,
} from '@/shared/lib/themeStore'

interface ThemeContextValue {
  darkMode: DarkMode
  setDarkMode: (mode: DarkMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  darkMode: 'system',
  setDarkMode: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState<DarkMode>(getStoredDarkMode)

  useEffect(() => {
    clearLegacyColorTheme()
  }, [])

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

  const setDarkMode = useCallback((mode: DarkMode) => {
    setDarkModeState(mode)
    setStoredDarkMode(mode)
    applyDarkModeToDocument(mode)
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
