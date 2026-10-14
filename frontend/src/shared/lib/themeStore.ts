// Color presets were removed 2026-10-14: the sticker palette is fixed (DESIGN.md).
// Clear what the old picker left behind so it can't override the brand colors.
export function clearLegacyColorTheme(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('flashcards-theme')
  document.getElementById('flashcards-theme-vars')?.remove()
}

// ── Dark mode ────────────────────────────────────────────────────────

export type DarkMode = 'light' | 'dark' | 'system'

const DARK_MODE_KEY = 'flashcards-dark-mode'

export function getStoredDarkMode(): DarkMode {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(DARK_MODE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  // Dark is the brand default for first-time visitors (see .claude/rules/frontend-design.md).
  return 'dark'
}

export function setStoredDarkMode(mode: DarkMode): void {
  localStorage.setItem(DARK_MODE_KEY, mode)
}

export function applyDarkModeToDocument(mode: DarkMode): void {
  const shouldBeDark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  document.documentElement.classList.toggle('dark', shouldBeDark)
}
