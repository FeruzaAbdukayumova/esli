import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ChevronRight, Check, Loader2, Sun, Moon, Monitor } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeckRepo } from '@/features/decks/repo'
import { useTheme } from '@/app/providers/ThemeProvider'
import { authApi } from '@/features/auth/api'
import { useGuestSync } from '@/features/sync/useGuestSync'
import { guestStorage } from '@/shared/lib/guestStorage'
import { statsKeys } from '@/features/stats/statsHooks'
import { type DarkMode } from '@/shared/lib/themeStore'
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
  const { darkMode, setDarkMode } = useTheme()
  const isGuest = !user

  const { hasGuestDecksToSave, isSyncing, saveGuestDecks } = useGuestSync()

  // Daily new card limit state (string so the field can be cleared while typing)
  const [newCardLimit, setNewCardLimit] = useState<string>(() => {
    if (user) return String(user.daily_new_card_limit ?? 20)
    return String(guestStorage.read().settings?.dailyNewCardLimit ?? 20)
  })
  useEffect(() => {
    if (user?.daily_new_card_limit != null) {
      setNewCardLimit(String(user.daily_new_card_limit))
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
    const parsed = parseInt(newCardLimit, 10)
    if (Number.isNaN(parsed)) return
    const clampedLimit = Math.max(0, Math.min(9999, parsed))
    setNewCardLimit(String(clampedLimit))

    if (isGuest) {
      const data = guestStorage.read()
      guestStorage.write({ ...data, settings: { ...data.settings, dailyNewCardLimit: clampedLimit } })
      queryClient.invalidateQueries({ queryKey: statsKeys.dashboard })
      toast.success(t('toast.dailyLimitSaved'))
    } else {
      updateLimitMutation.mutate(clampedLimit)
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

  const sectionHead = (title: string, description: string) => (
    <div className="mb-5">
      <h2 className="font-display text-lg text-fg">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  )

  const settingsContent = (
    <div className="space-y-6">
      {/* Subscription Section */}
      {!isGuest && (
        <section className="sheet p-5 sm:p-6">
          {sectionHead(t('subscription.title'), t('subscription.manageDescription'))}

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-fg">
                  {t('subscription.currentPlan')}
                </span>
                <span className={`rounded-lg border-2 border-ink px-2 py-0.5 text-xs font-extrabold text-ink ${
                  tier === 'premium' ? 'bg-sun' : tier === 'pro' ? 'bg-sky' : 'bg-white'
                }`}>
                  {tier === 'premium' ? t('tier.premium', 'Premium') : tier === 'pro' ? t('tier.pro', 'Pro') : t('tier.free', 'Free')}
                </span>
              </div>
              <Link
                to="/pricing"
                className="rounded text-sm font-bold text-fg underline decoration-brand/50 underline-offset-4 hover:decoration-brand active:opacity-70 transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {isFree ? t('pricing.upgrade') : t('subscription.changePlan')}
              </Link>
            </div>

            {subscription && subscription.usage && (
              <p className="text-sm text-muted">
                {subscription.usage.ai_generations_limit === -1
                  ? t('subscription.aiUsageUnlimited', { used: subscription.usage.ai_generations_used })
                  : t('subscription.aiUsage', { used: subscription.usage.ai_generations_used, limit: subscription.usage.ai_generations_limit })
                }
              </p>
            )}

            {subscription?.current_period_end && (
              <p className="text-sm text-muted">
                {subscription.cancel_at_period_end
                  ? t('subscription.cancelsAt', { date: new Date(subscription.current_period_end).toLocaleDateString() })
                  : t('subscription.renewsAt', { date: new Date(subscription.current_period_end).toLocaleDateString() })
                }
              </p>
            )}

            {!isFree && (
              <button
                type="button"
                onClick={() => portalMutation.mutate()}
                disabled={portalMutation.isPending}
                className="btn-quiet min-h-[44px] px-4 text-sm"
              >
                {portalMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t('subscription.manageBilling')
                )}
              </button>
            )}

            <div className="mt-4 pt-5 border-t-2 border-dashed border-line">
              <PromoCodeInput />
            </div>
          </div>
        </section>
      )}

      {/* Language Section */}
      <section className="sheet p-5 sm:p-6">
        {sectionHead(t('settings.language'), t('settings.languageDescription'))}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = i18n.language === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleLanguageChange(lang.code)}
                className={`btn-sticker min-h-[46px] justify-start px-3.5 text-sm font-bold ${isActive ? 'bg-sky' : 'bg-white'}`}
              >
                <span className="truncate">{lang.nativeLabel}</span>
                {isActive && <Check className="w-4 h-4 ml-auto shrink-0" strokeWidth={3} aria-hidden />}
              </button>
            )
          })}
        </div>
      </section>

      {/* Daily New Card Limit Section */}
      <section className="sheet p-5 sm:p-6">
        {sectionHead(t('settings.dailyNewCardLimit'), t('settings.dailyNewCardLimitDescription'))}

        <div className="flex flex-wrap items-center gap-3">
          <input
            id="daily-new-card-limit"
            type="number"
            inputMode="numeric"
            min={0}
            max={9999}
            aria-label={t('settings.dailyNewCardLimit')}
            value={newCardLimit}
            onChange={(e) => setNewCardLimit(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLimitSave() }}
            className="field !w-28 text-center font-bold"
          />
          <label htmlFor="daily-new-card-limit" className="text-sm font-medium text-muted">{t('settings.cardsPerDay')}</label>
          <button
            type="button"
            onClick={handleLimitSave}
            disabled={updateLimitMutation.isPending || newCardLimit.trim() === ''}
            className="btn-brand min-h-[46px] px-5 text-sm"
          >
            {updateLimitMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t('common.save')
            )}
          </button>
        </div>

        <p className="mt-3 text-sm text-muted">
          {t('settings.dailyNewCardLimitHelp')} {t('settings.limitSaveHint', 'Press Enter or click Save to apply.')}
        </p>
      </section>

      {/* Appearance Section */}
      <section className="sheet p-5 sm:p-6">
        {sectionHead(t('settings.appearance'), t('settings.appearanceDescription'))}

        <div className="grid grid-cols-3 gap-1.5 rounded-[18px] border-2 border-edge/80 p-1.5">
          {darkModeOptions.map((opt) => {
            const isActive = darkMode === opt.mode
            return (
              <button
                key={opt.mode}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleDarkModeChange(opt.mode)}
                className={`flex flex-col items-center gap-1.5 rounded-[14px] px-2 py-3 transition-[transform,background-color] duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
                  isActive
                    ? 'border-[2.5px] border-ink bg-sky text-ink shadow-sticker-sm'
                    : 'border-[2.5px] border-transparent text-fg hover:bg-fg/[0.07]'
                }`}
              >
                {opt.icon}
                <span className="text-sm font-bold">{opt.label}</span>
                <span className={`hidden sm:block text-xs text-center ${isActive ? 'text-ink/70' : 'text-muted'}`}>
                  {opt.description}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar
        user={user}
        isApiMode={mode === 'api'}
        hasGuestDecksToSave={hasGuestDecksToSave}
        isSyncing={isSyncing}
        onSaveGuestDecks={saveGuestDecks}
        onLogout={logout}
      />

      <main className="relative flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4" aria-label={t('nav.breadcrumb', 'Breadcrumb')}>
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link to="/" className="rounded font-medium underline decoration-brand/40 underline-offset-4 hover:text-fg hover:decoration-brand active:opacity-70 transition-[color,opacity] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                {t('common.home')}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" aria-hidden />
            </li>
            <li className="font-bold text-fg" aria-current="page">
              {t('settings.title')}
            </li>
          </ol>
        </nav>

        <h1 className="font-display text-[1.75rem] leading-[1.1] md:text-[2.25rem] text-fg mb-6">{t('settings.title')}</h1>
        {settingsContent}
      </main>
    </div>
  )
}
