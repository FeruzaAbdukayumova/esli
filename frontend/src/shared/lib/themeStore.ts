export type ThemeName = 'indigo' | 'emerald' | 'rose' | 'amber' | 'violet' | 'slate'

export interface ThemePreset {
  name: ThemeName
  label: string
  colors: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: 'indigo',
    label: 'Indigo',
    colors: {
      50: '238 242 255',
      100: '224 231 255',
      200: '199 210 254',
      300: '165 180 252',
      400: '129 140 248',
      500: '99 102 241',
      600: '79 70 229',
      700: '67 56 202',
      800: '55 48 163',
      900: '49 46 129',
    },
  },
  {
    name: 'emerald',
    label: 'Emerald',
    colors: {
      50: '236 253 245',
      100: '209 250 229',
      200: '167 243 208',
      300: '110 231 183',
      400: '52 211 153',
      500: '16 185 129',
      600: '5 150 105',
      700: '4 120 87',
      800: '6 95 70',
      900: '6 78 59',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    colors: {
      50: '255 241 242',
      100: '255 228 230',
      200: '254 205 211',
      300: '253 164 175',
      400: '251 113 133',
      500: '244 63 94',
      600: '225 29 72',
      700: '190 18 60',
      800: '159 18 57',
      900: '136 19 55',
    },
  },
  {
    name: 'amber',
    label: 'Amber',
    colors: {
      50: '255 251 235',
      100: '254 243 199',
      200: '253 230 138',
      300: '252 211 77',
      400: '251 191 36',
      500: '245 158 11',
      600: '217 119 6',
      700: '180 83 9',
      800: '146 64 14',
      900: '120 53 15',
    },
  },
  {
    name: 'violet',
    label: 'Violet',
    colors: {
      50: '245 243 255',
      100: '237 233 254',
      200: '221 214 254',
      300: '196 181 253',
      400: '167 139 250',
      500: '139 92 246',
      600: '124 58 237',
      700: '109 40 217',
      800: '91 33 182',
      900: '76 29 149',
    },
  },
  {
    name: 'slate',
    label: 'Slate',
    colors: {
      50: '248 250 252',
      100: '241 245 249',
      200: '226 232 240',
      300: '203 213 225',
      400: '148 163 184',
      500: '100 116 139',
      600: '71 85 105',
      700: '51 65 85',
      800: '30 41 59',
      900: '15 23 42',
    },
  },
]

// ── Color theme ──────────────────────────────────────────────────────

const STORAGE_KEY = 'flashcards-theme'

export function getStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return 'indigo'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && THEME_PRESETS.some((t) => t.name === stored)) {
    return stored as ThemeName
  }
  return 'indigo'
}

export function setStoredTheme(name: ThemeName): void {
  localStorage.setItem(STORAGE_KEY, name)
}

export function getThemePreset(name: ThemeName): ThemePreset {
  return THEME_PRESETS.find((t) => t.name === name) || THEME_PRESETS[0]
}

export function applyThemeToDocument(name: ThemeName): void {
  const preset = getThemePreset(name)

  // Inject/update a <style> tag that overrides the CSS variables
  const STYLE_ID = 'flashcards-theme-vars'
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    document.head.appendChild(styleEl)
  }

  const declarations = Object.entries(preset.colors)
    .map(([shade, rgb]) => `  --color-primary-${shade}: ${rgb} !important;`)
    .join('\n')

  styleEl.textContent = `:root {\n${declarations}\n}`
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
