import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  User,
  Menu,
  X,
  ChevronDown,
  Mail,
  Settings,
  UserCircle,
  Palette,
  Sun,
  Moon,
  Monitor,
  Languages,
  Shield,
  Crown,
  Puzzle,
  Compass,
} from 'lucide-react'
import { EXTENSION_STORE_URL } from '@/shared/config'
import { useTheme } from '@/app/providers/ThemeProvider'
import { type DarkMode } from '@/shared/lib/themeStore'
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
      <p className="text-sm font-bold text-muted mb-2 px-1 flex items-center gap-1.5">
        <Languages className="w-4 h-4" aria-hidden />
        {t('nav.language')}
      </p>
      <select
        value={i18n.language}
        onChange={(e) => handleChange(e.target.value)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className="field !min-h-[44px] !py-2 text-sm cursor-pointer"
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
  const { darkMode, setDarkMode } = useTheme()
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const persistAppearance = useMutation({
    mutationFn: (patch: { dark_mode?: string }) => authApi.updateMe(patch),
    onSuccess: (updatedUser) => { queryClient.setQueryData(['me'], updatedUser) },
  })

  const handleDarkMode = (mode: DarkMode) => {
    setDarkMode(mode)
    if (user) {
      persistAppearance.mutate({ dark_mode: mode })
    } else {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, darkMode: mode } })
    }
  }


  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-bold text-muted mb-2 px-1">{t('nav.appearance')}</p>
        <div className="grid grid-cols-3 gap-1 rounded-[16px] border-2 border-edge/80 p-1">
          {DARK_MODE_OPTIONS.map((opt) => (
            <button
              key={opt.mode}
              type="button"
              aria-pressed={darkMode === opt.mode}
              onClick={() => handleDarkMode(opt.mode)}
              className={`flex min-h-[40px] min-w-0 items-center justify-center gap-1.5 px-2 rounded-[12px] border-2 text-xs font-bold transition-[transform,background-color] duration-150 active:scale-[0.96] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
                darkMode === opt.mode
                  ? 'border-ink bg-sky text-ink'
                  : 'border-transparent text-fg hover:bg-fg/[0.07]'
              }`}
            >
              {opt.icon}
              {t(opt.labelKey)}
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
    <span className={`inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-xs font-extrabold text-ink rounded-lg border-2 border-ink ${
      tier === 'premium' ? 'bg-sun' : 'bg-sky'
    }`}>
      <Crown className="w-3 h-3" aria-hidden />
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
    if (!mobileMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

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
      <header className="sticky top-0 z-50 bg-canvas border-b-2 border-line">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link to="/" className="group flex items-center gap-2.5 shrink-0 rounded-md text-fg focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky">
              {/* Mark: the word garden's sprout in its pot */}
              <svg viewBox="0 0 28 28" className="h-8 w-8 -rotate-6 transition-transform duration-200 ease-out group-hover:rotate-0" aria-hidden>
                <path d="M14 16 C 13.6 12, 14.4 9.5, 14 7" stroke="#17171A" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M14 11 C 15.5 7.5, 20 6.5, 23 8 C 20.5 11.5, 16.5 12, 14 11 Z" fill="#44D07B" stroke="#17171A" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M14 9.5 C 12.5 6.5, 8.5 5.5, 5.5 6.5 C 7.5 10, 11.5 10.5, 14 9.5 Z" fill="#44D07B" stroke="#17171A" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M7.5 18 H20.5 L18.8 25 Q18.5 26.5 17 26.5 H11 Q9.5 26.5 9.2 25 Z" fill="#FF7A59" stroke="#17171A" strokeWidth="1.8" strokeLinejoin="round" />
                <rect x="6" y="14.5" width="16" height="4.5" rx="2.25" fill="#FF7A59" stroke="#17171A" strokeWidth="1.8" />
              </svg>
              <span className="font-display text-xl">esli</span>
            </Link>

            <div className="hidden lg:flex items-center gap-3 sm:gap-4 min-w-0">
              <Link to="/browse" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-muted hover:text-fg hover:bg-fg/[0.07] active:scale-[0.97] transition-[transform,color,background-color] duration-150 shrink-0 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky">
                <Compass className="w-4 h-4" />
                {t('nav.browse')}
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-muted hover:text-fg hover:bg-fg/[0.07] active:scale-[0.97] transition-[transform,color,background-color] duration-150 shrink-0 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky">
                {t('nav.pricing')}
              </Link>
              {EXTENSION_STORE_URL && (
                <a
                  href={EXTENSION_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-muted hover:text-fg hover:bg-fg/[0.07] active:scale-[0.97] transition-[transform,color,background-color] duration-150 shrink-0 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                  title={t('nav.extension')}
                >
                  <Puzzle className="w-4 h-4" />
                  {t('nav.extension')}
                </a>
              )}
              {!isApiMode && (
                <span className="text-sm text-muted shrink-0">{t('nav.guestMode')}</span>
              )}
              {user ? (
                <div className="relative min-w-0" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex max-w-[220px] items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl text-sm font-bold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                    aria-label={t('nav.accountMenu')}
                  >
                    <User className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                    <span className="truncate">{user.username || user.email}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-150 ${userMenuOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                  {userMenuOpen && (
                    <div className="sheet absolute right-0 top-full mt-2 w-72 max-h-[calc(100vh-5rem)] overflow-y-auto !rounded-[20px] py-2 z-50 animate-fade-in" role="menu">
                      <div className="px-4 py-3 border-b-2 border-line">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          {user.username && (
                            <p className="text-sm font-bold text-fg truncate">{user.username}</p>
                          )}
                          <TierBadge tier={tier} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                      {hasGuestDecksToSave && (
                        <div className="px-3 py-3 border-b-2 border-line">
                          <button type="button" onClick={handleSaveGuest} disabled={isSyncing} className="btn-quiet w-full min-h-[44px] px-3 text-sm" role="menuitem">
                            {isSyncing ? t('nav.saving') : t('nav.saveGuestDecks')}
                          </button>
                        </div>
                      )}
                      <div className="px-2 pt-1">
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60" role="menuitem">
                          <UserCircle className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                          {t('nav.profile')}
                        </Link>
                        <Link to="/settings" onClick={() => setUserMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60" role="menuitem">
                          <Settings className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                          {t('nav.settings')}
                        </Link>
                        {user.is_admin && (
                          <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60" role="menuitem">
                            <Shield className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                            {t('admin.nav.title')}
                          </Link>
                        )}
                      </div>
                      <div className="px-3 py-3 mt-1 border-t-2 border-line space-y-3">
                        <AppearanceSection />
                        <LanguageDropdown />
                      </div>
                      <div className="px-2 pb-1 border-t-2 border-line pt-1">
                        <button type="button" onClick={(e) => { setUserMenuOpen(false); handleLogout(e) }} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60" role="menuitem">
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
                      className="min-w-[44px] min-h-[44px] flex items-center gap-1.5 justify-center px-3 py-2 rounded-xl text-sm font-bold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
                      aria-label={t('nav.appearance')}
                      aria-expanded={appearanceOpen}
                      aria-haspopup="true"
                    >
                      <Palette className="w-4 h-4" aria-hidden />
                      {t('nav.appearance')}
                    </button>
                    {appearanceOpen && (
                      <div className="sheet absolute right-0 top-full mt-2 w-72 !rounded-[20px] p-3 z-50 animate-fade-in space-y-3">
                        <AppearanceSection />
                        <LanguageDropdown />
                      </div>
                    )}
                  </div>
                  <Link to="/register" className="btn-quiet min-h-[40px] px-4 text-sm shrink-0">{t('nav.getStarted')}</Link>
                </>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2">
              {!isApiMode && (
                <span className="text-sm text-muted">{t('nav.guest')}</span>
              )}
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-fg hover:bg-fg/[0.07] active:scale-[0.95] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky" aria-expanded={mobileMenuOpen} aria-label={t('nav.openMenu')} aria-haspopup="dialog">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile side drawer */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-ink/40 transition-opacity duration-200 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden />
          <div className="fixed top-0 right-0 bottom-0 z-[61] w-80 max-w-[85vw] bg-sheet text-fg border-l-[2.5px] border-edge rounded-l-[24px] animate-slide-in-right lg:hidden overflow-y-auto" role="dialog" aria-label={t('nav.userMenu')}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={t('common.close')}
              className="absolute top-3 right-3 flex items-center justify-center w-11 h-11 rounded-xl text-fg hover:bg-fg/[0.07] active:scale-[0.95] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky"
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
            <div className="flex flex-col h-full pt-14 px-4 pb-6">
              {user && (
                <div className="py-3 border-b-2 border-line">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    {user.username && (
                      <p className="text-sm font-bold text-fg truncate">{user.username}</p>
                    )}
                    <TierBadge tier={tier} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2 py-4">
                {user ? (
                  <>
                    <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                      <Crown className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                      {t('nav.pricing')}
                    </Link>
                    {EXTENSION_STORE_URL && (
                      <a href={EXTENSION_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                        <Puzzle className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                        {t('nav.extension')}
                      </a>
                    )}
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                      <UserCircle className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                      {t('nav.profile')}
                    </Link>
                    <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                      <Settings className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                      {t('nav.settings')}
                    </Link>
                    {user.is_admin && (
                      <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                        <Shield className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                        {t('admin.nav.title')}
                      </Link>
                    )}
                    {hasGuestDecksToSave && (
                      <button type="button" onClick={handleSaveGuest} disabled={isSyncing} className="btn-quiet w-full min-h-[44px] px-4 text-sm">
                        {isSyncing ? t('nav.saving') : t('nav.saveGuestDecks')}
                      </button>
                    )}
                    <div className="pt-2 mt-1 border-t-2 border-line">
                      <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">{t('nav.logout')}</button>
                    </div>
                    <div className="pt-4 mt-1 border-t-2 border-line space-y-4">
                      <AppearanceSection />
                      <LanguageDropdown />
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                      <Crown className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                      {t('nav.pricing')}
                    </Link>
                    {EXTENSION_STORE_URL && (
                      <a href={EXTENSION_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center gap-2.5 min-h-[44px] px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-fg hover:bg-fg/[0.07] active:scale-[0.98] transition-[transform,background-color] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky disabled:opacity-60">
                        <Puzzle className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                        {t('nav.extension')}
                      </a>
                    )}
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-brand w-full min-h-[48px] px-4 text-sm">{t('nav.getStarted')}</Link>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-ghost w-full min-h-[44px] text-sm">{t('nav.alreadyHaveAccount')}</Link>
                    <div className="pt-4 mt-1 border-t-2 border-line space-y-4">
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
