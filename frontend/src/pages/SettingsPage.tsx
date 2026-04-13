import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ChevronRight, Check, Loader2, Layers, Palette, Sun, Moon, Monitor, Languages, CreditCard, Sparkles } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useTheme } from '@/app/providers/ThemeProvider'
import { authApi } from '@/features/auth/api'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import { statsKeys } from '@/features/stats/statsHooks'
import { THEME_PRESETS, type ThemeName, type DarkMode } from '@/shared/lib/themeStore'
import { SUPPORTED_LANGUAGES } from '@/shared/i18n'
import { useTier } from '@/features/subscription/useTier'
import { usePortalSession } from '@/features/subscription/hooks'
import { PromoCodeInput } from '@/features/subscription/components/PromoCodeInput'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { DashboardNavbar } from './dashboard/components/DashboardNavbar'

export function SettingsPage() {
  const { t, i18n } = useTranslation()
  usePageMeta({ title: t('seo.settings.title', 'Settings'), noIndex: true })
  const { user } = useAuthContext()
  const { logout } = useAuth()
  const { mode } = useDeckRepo()
  const queryClient = useQueryClient()
  const { theme, setTheme, darkMode, setDarkMode } = useTheme()
  const syncImportMutation = useSyncImport()
  const isGuest = !user

  const guestData = guestStorage.read()
  const hasGuestDecksToSave =
    !!user &&
    Array.isArray(guestData.decks) &&
    typeof guestData.cardsByDeckId === 'object' &&
    guestData.decks.length >= 1
  const handleSaveGuestDecks = () => {
    if (!hasGuestDecksToSave) return
    syncImportMutation.mutate(
      { version: 1 as const, decks: guestData.decks, cardsByDeckId: guestData.cardsByDeckId },
      { onSuccess: () => guestStorage.clear() },
    )
  }

  // Daily new card limit state
  const [newCardLimit, setNewCardLimit] = useState<number>(() => {
    if (user) return user.daily_new_card_limit ?? 20
    return guestStorage.read().settings?.dailyNewCardLimit ?? 20
  })
  useEffect(() => {
    if (user?.daily_new_card_limit != null) {
      setNewCardLimit(user.daily_new_card_limit)
    }
  }, [user?.daily_new_card_limit])

  const updateLimitMutation = useMutation({
    mutationFn: (limit: number) => authApi.updateMe({ daily_new_card_limit: limit }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser)
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
      toast.success(t('toast.dailyLimitSaved'))
    },
    onError: () => {
      toast.error(t('toast.failedToSaveDailyLimit'))
    },
  })

  const handleLimitSave = () => {
    const clampedLimit = Math.max(0, Math.min(9999, newCardLimit))
    setNewCardLimit(clampedLimit)

    if (isGuest) {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, dailyNewCardLimit: clampedLimit } })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
      toast.success(t('toast.dailyLimitSaved'))
    } else {
      updateLimitMutation.mutate(clampedLimit)
    }
  }

  const updateThemeMutation = useMutation({
    mutationFn: (themeName: string) => authApi.updateMe({ theme: themeName }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser)
    },
    onError: () => {
      toast.error(t('toast.failedToSaveTheme'))
    },
  })

  const handleThemeChange = (name: ThemeName) => {
    setTheme(name)
    if (!isGuest) {
      updateThemeMutation.mutate(name)
    }
  }

  const updateDarkModeMutation = useMutation({
    mutationFn: (mode: string) => authApi.updateMe({ dark_mode: mode }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser)
    },
    onError: () => {
      toast.error(t('toast.failedToSaveAppearance'))
    },
  })

  const handleDarkModeChange = (mode: DarkMode) => {
    setDarkMode(mode)
    if (isGuest) {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, darkMode: mode } })
    } else {
      updateDarkModeMutation.mutate(mode)
    }
  }

  const updateLanguageMutation = useMutation({
    mutationFn: (lang: string) => authApi.updateMe({ preferred_language: lang }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser)
    },
  })

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code)
    if (isGuest) {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, language: code } })
    } else {
      updateLanguageMutation.mutate(code)
    }
  }

  const darkModeOptions: { mode: DarkMode; icon: React.ReactNode; label: string; description: string }[] = [
    { mode: 'light', icon: <Sun className="w-5 h-5" />, label: t('nav.light'), description: t('settings.lightDescription') },
    { mode: 'dark', icon: <Moon className="w-5 h-5" />, label: t('nav.dark'), description: t('settings.darkDescription') },
    { mode: 'system', icon: <Monitor className="w-5 h-5" />, label: t('nav.system'), description: t('settings.systemDescription') },
  ]

  const { tier, isFree, subscription } = useTier()
  const portalMutation = usePortalSession()

  const settingsContent = (
    <div className="space-y-8">
      {/* Subscription Section */}
      {!isGuest && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {t('subscription.title')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('subscription.manageDescription')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('subscription.currentPlan')}
                </span>
                <span className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                  tier === 'premium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                  : tier === 'pro' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-300'
                }`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </span>
              </div>
              <Link
                to="/pricing"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                {isFree ? t('pricing.upgrade') : t('subscription.changePlan')}
              </Link>
            </div>

            {subscription && subscription.usage && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {subscription.usage.ai_generations_limit === -1
                    ? t('subscription.aiUsageUnlimited', { used: subscription.usage.ai_generations_used })
                    : t('subscription.aiUsage', { used: subscription.usage.ai_generations_used, limit: subscription.usage.ai_generations_limit })
                  }
                </span>
              </div>
            )}

            {subscription?.current_period_end && (
              <div className="text-sm text-slate-500 dark:text-slate-400 px-3">
                {subscription.cancel_at_period_end
                  ? t('subscription.cancelsAt', { date: new Date(subscription.current_period_end).toLocaleDateString() })
                  : t('subscription.renewsAt', { date: new Date(subscription.current_period_end).toLocaleDateString() })
                }
              </div>
            )}

            {!isFree && (
              <button
                type="button"
                onClick={() => portalMutation.mutate()}
                disabled={portalMutation.isPending}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-60"
              >
                {portalMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t('subscription.manageBilling')
                )}
              </button>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <PromoCodeInput />
            </div>
          </div>
        </section>
      )}

      {/* Language Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
            <Languages className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('settings.language')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('settings.languageDescription')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = i18n.language === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors ${
                  isActive
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <span className={`text-sm font-medium ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {lang.nativeLabel}
                </span>
                {isActive && <Check className="w-4 h-4 ml-auto text-primary-600 dark:text-primary-400" />}
              </button>
            )
          })}
        </div>
      </section>

      {/* Daily New Card Limit Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
            <Layers className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('settings.dailyNewCardLimit')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('settings.dailyNewCardLimitDescription')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={9999}
            value={newCardLimit}
            onChange={(e) => setNewCardLimit(parseInt(e.target.value) || 0)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLimitSave() }}
            className="w-28 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-center font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">{t('settings.cardsPerDay')}</span>
          <button
            type="button"
            onClick={handleLimitSave}
            disabled={updateLimitMutation.isPending}
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors disabled:opacity-60"
          >
            {updateLimitMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t('common.save')
            )}
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {t('settings.dailyNewCardLimitHelp')}
        </p>
      </section>

      {/* Appearance Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30">
            <Sun className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('settings.appearance')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('settings.appearanceDescription')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {darkModeOptions.map((opt) => {
            const isActive = darkMode === opt.mode
            return (
              <button
                key={opt.mode}
                type="button"
                onClick={() => handleDarkModeChange(opt.mode)}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg border-2 transition-colors ${
                  isActive
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <span className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'}>
                  {opt.icon}
                </span>
                <span className={`text-sm font-medium ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {opt.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  {opt.description}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Theme Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <Palette className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t('settings.theme')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('settings.themeDescription')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {THEME_PRESETS.map((preset) => {
            const isActive = theme === preset.name
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleThemeChange(preset.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors ${
                  isActive
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: `rgb(${preset.colors[500]})` }}
                />
                <span className={`text-sm font-medium ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {preset.label}
                </span>
                {isActive && <Check className="w-4 h-4 ml-auto text-primary-600 dark:text-primary-400" />}
              </button>
            )
          })}
        </div>
      </section>

    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F0F11] grain">
      {/* Decorative background */}
      <div
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={syncImportMutation.isPending}
        onSaveGuestDecks={handleSaveGuestDecks}
        onLogout={logout}
      />

      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {t('common.home')}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden />
            </li>
            <li className="font-medium text-slate-800 dark:text-slate-100" aria-current="page">
              {t('settings.title')}
            </li>
          </ol>
        </nav>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/50 p-6 md:p-8">
          <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100 mb-6">{t('settings.title')}</h1>
          {settingsContent}
        </div>
      </main>
    </div>
  )
}
