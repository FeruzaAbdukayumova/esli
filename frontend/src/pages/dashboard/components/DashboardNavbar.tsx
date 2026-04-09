import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  User,
  UserX,
  Menu,
  X,
  ChevronDown,
  Mail,
  Sparkles,
  Settings,
  UserCircle,
  Palette,
  Check,
  Sun,
  Moon,
  Monitor,
  Languages,
  Shield,
  Crown,
  Puzzle,
} from 'lucide-react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { THEME_PRESETS, type DarkMode } from '@/shared/lib/themeStore'
import { SUPPORTED_LANGUAGES } from '@/shared/i18n'
import { useTier } from '@/features/subscription/useTier'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { authApi } from '@/features/auth/api'
import { guestStorage } from '@/shared/lib/guestStorage'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface DashboardNavbarProps {
  user: { email: string; auth_provider: string; username?: string | null; is_admin?: boolean } | null
  isApiMode: boolean
  hasGuestDecksToSave: boolean
  isSyncing: boolean
  onSaveGuestDecks: () => void
  onLogout: () => void
}

const DARK_MODE_OPTIONS: { mode: DarkMode; icon: React.ReactNode; labelKey: string }[] = [
  { mode: 'light', icon: <Sun className="w-4 h-4" />, labelKey: 'nav.light' },
  { mode: 'dark', icon: <Moon className="w-4 h-4" />, labelKey: 'nav.dark' },
  { mode: 'system', icon: <Monitor className="w-4 h-4" />, labelKey: 'nav.system' },
]

function LanguageDropdown() {
  const { i18n, t } = useTranslation()
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const updateLangMutation = useMutation({
    mutationFn: (lang: string) => authApi.updateMe({ preferred_language: lang }),
    onSuccess: (updatedUser) => { queryClient.setQueryData(['me'], updatedUser) },
  })

  const handleChange = (code: string) => {
    i18n.changeLanguage(code)
    if (!user) {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, language: code } })
    } else {
      updateLangMutation.mutate(code)
    }
  }

  return (
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 px-1 flex items-center gap-1.5">
        <Languages className="w-3.5 h-3.5" />
        {t('nav.language')}
      </p>
      <select
        value={i18n.language}
        onChange={(e) => handleChange(e.target.value)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 cursor-pointer"
        aria-label={t('nav.language')}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  )
}

function AppearanceSection() {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 px-1">{t('nav.appearance')}</p>
        <div className="flex items-center gap-1 px-1">
          {DARK_MODE_OPTIONS.map((opt) => (
            <button
              key={opt.mode}
              type="button"
              onClick={() => setDarkMode(opt.mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                darkMode === opt.mode
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {opt.icon}
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 px-1">{t('nav.theme')}</p>
        <div className="flex items-center gap-2 px-1">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setTheme(preset.name)}
              className={`relative w-7 h-7 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-800 ${
                theme === preset.name ? 'ring-2 ring-primary-500 ring-offset-2 scale-110' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: `rgb(${preset.colors[500]})` }}
              aria-label={preset.label}
              title={preset.label}
            >
              {theme === preset.name && (
                <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TierBadge({ tier }: { tier: string }) {
  if (tier === 'free') return null
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
      tier === 'premium'
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
    }`}>
      <Crown className="w-3 h-3" />
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  )
}

export function DashboardNavbar({ user, isApiMode, hasGuestDecksToSave, isSyncing, onSaveGuestDecks, onLogout }: DashboardNavbarProps) {
  const { t } = useTranslation()
  const { tier } = useTier()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [appearanceOpen, setAppearanceOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const appearanceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!userMenuOpen && !appearanceOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (document.activeElement?.tagName === 'SELECT') return
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
      if (appearanceOpen && appearanceRef.current && !appearanceRef.current.contains(e.target as Node)) {
        setAppearanceOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [userMenuOpen, appearanceOpen])

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onLogout()
    setMobileMenuOpen(false)
  }

  const handleSaveGuest = () => {
    onSaveGuestDecks()
    setUserMenuOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm shadow-black/5 dark:shadow-black/20 border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link to="/" className="text-xl font-bold text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              {t('nav.brand')}
            </Link>

            <div className="hidden md:flex items-center gap-3 sm:gap-4 min-w-0">
              <Link to="/pricing" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 shrink-0">
                <Sparkles className="w-4 h-4" />
                {t('nav.pricing')}
              </Link>
              <a
                href="https://github.com/feruzaabdukayumova/flashcards-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
                title={t('nav.extension')}
              >
                <Puzzle className="w-4 h-4" />
                {t('nav.extension')}
              </a>
              {!isApiMode && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 transition-all duration-200 shrink-0" title="Guest mode">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-amber-500" aria-hidden />
                  <UserX className="w-4 h-4 shrink-0" />
                  {t('nav.guestMode')}
                </span>
              )}
              {user ? (
                <div className="relative min-w-0" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 max-w-[240px]"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                    aria-label={t('nav.accountMenu')}
                  >
                    <User className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />
                    <span className="truncate">{user.username || user.email}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-72 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 py-2 z-50 animate-fade-in" role="menu">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          {user.username && (
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.username}</p>
                          )}
                          <TierBadge tier={tier} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                      {hasGuestDecksToSave && (
                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                          <button type="button" onClick={handleSaveGuest} disabled={isSyncing} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors disabled:opacity-60" role="menuitem">
                            {isSyncing ? t('nav.saving') : t('nav.saveGuestDecks')}
                          </button>
                        </div>
                      )}
                      <div className="px-2 pt-1">
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" role="menuitem">
                          <UserCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          {t('nav.profile')}
                        </Link>
                        <Link to="/settings" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" role="menuitem">
                          <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          {t('nav.settings')}
                        </Link>
                        {user.is_admin && (
                          <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" role="menuitem">
                            <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            {t('admin.nav.title')}
                          </Link>
                        )}
                      </div>
                      <div className="px-3 py-3 border-t border-slate-100 dark:border-slate-700 space-y-3">
                        <AppearanceSection />
                        <LanguageDropdown />
                      </div>
                      <div className="px-2 pb-1 border-t border-slate-100 dark:border-slate-700 pt-1">
                        <button type="button" onClick={(e) => { setUserMenuOpen(false); handleLogout(e) }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" role="menuitem">
                          {t('nav.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="relative" ref={appearanceRef}>
                    <button
                      type="button"
                      onClick={() => setAppearanceOpen((o) => !o)}
                      className="min-w-[44px] min-h-[44px] flex items-center gap-1.5 justify-center px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label={t('nav.appearance')}
                    >
                      <Palette className="w-4 h-4" />
                      {t('nav.appearance')}
                    </button>
                    {appearanceOpen && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-elevation-lg p-3 z-50 animate-fade-in space-y-3">
                        <AppearanceSection />
                        <LanguageDropdown />
                      </div>
                    )}
                  </div>
                  <Link to="/register" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 shrink-0 active:scale-[0.97]">{t('nav.getStarted')}</Link>
                </>
              )}
            </div>

            <div className="flex md:hidden items-center gap-2">
              {!isApiMode && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden />
                  <UserX className="w-4 h-4 shrink-0" />
                  {t('nav.guest')}
                </span>
              )}
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500" aria-expanded={mobileMenuOpen} aria-label={t('nav.openMenu')} aria-haspopup="dialog">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile side drawer */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/30 transition-opacity duration-200 md:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden />
          <div className="fixed top-0 right-0 bottom-0 z-[61] w-72 max-w-[85vw] bg-white dark:bg-slate-800 shadow-2xl border-l border-slate-200 dark:border-slate-700 animate-slide-in-right md:hidden overflow-y-auto" role="dialog" aria-label={t('nav.userMenu')}>
            <div className="flex flex-col h-full pt-14 px-4 pb-6">
              {user && (
                <div className="py-3 border-b border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    {user.username && (
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.username}</p>
                    )}
                    <TierBadge tier={tier} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2 py-4">
                {user ? (
                  <>
                    <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                      <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      {t('nav.pricing')}
                    </Link>
                    <a href="https://github.com/feruzaabdukayumova/flashcards-extension" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                      <Puzzle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                      {t('nav.extension')}
                    </a>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                      <UserCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      {t('nav.profile')}
                    </Link>
                    <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                      <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      {t('nav.settings')}
                    </Link>
                    {user.is_admin && (
                      <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                        <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        {t('admin.nav.title')}
                      </Link>
                    )}
                    {hasGuestDecksToSave && (
                      <button type="button" onClick={handleSaveGuest} disabled={isSyncing} className="w-full text-left min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all duration-200 disabled:opacity-60">
                        {isSyncing ? t('nav.saving') : t('nav.saveGuestDecks')}
                      </button>
                    )}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
                      <button type="button" onClick={handleLogout} className="w-full text-left min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">{t('nav.logout')}</button>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-600 space-y-3">
                      <AppearanceSection />
                      <LanguageDropdown />
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                      <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      {t('nav.pricing')}
                    </Link>
                    <a href="https://github.com/feruzaabdukayumova/flashcards-extension" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                      <Puzzle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                      {t('nav.extension')}
                    </a>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-center transition-colors">{t('nav.getStarted')}</Link>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-center transition-colors">{t('nav.alreadyHaveAccount')}</Link>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-600 space-y-3">
                      <AppearanceSection />
                      <LanguageDropdown />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
