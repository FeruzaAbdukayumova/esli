import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronRight, Loader2, Sparkles, Crown, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useDeckRepo } from '@/features/decks/repo'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { usePlans } from '@/features/subscription/hooks'
import { PromoCodeInput } from '@/features/subscription/components/PromoCodeInput'
import { useTier } from '@/features/subscription/useTier'
import { useSyncImport } from '@/features/sync/hooks'
import { guestStorage } from '@/shared/lib/guestStorage'
import { trackEvent } from '@/shared/lib/analytics'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { PromoGiftModal } from './PromoGiftModal'
import type { PlanTier } from '@/features/subscription/types'

const PLAN_ICONS: Record<PlanTier, React.ReactNode> = {
  free: <Zap className="w-6 h-6" />,
  pro: <Sparkles className="w-6 h-6" />,
  premium: <Crown className="w-6 h-6" />,
}

const PLAN_COLORS: Record<PlanTier, { bg: string; border: string; icon: string; badge: string }> = {
  free: {
    bg: 'bg-slate-50 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-700',
    icon: 'text-slate-500',
    badge: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  },
  pro: {
    bg: 'bg-primary-50/50 dark:bg-primary-900/10',
    border: 'border-primary-300 dark:border-primary-700 ring-2 ring-primary-200 dark:ring-primary-800',
    icon: 'text-primary-600 dark:text-primary-400',
    badge: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  },
  premium: {
    bg: 'bg-amber-50/50 dark:bg-amber-900/10',
    border: 'border-amber-300 dark:border-amber-700',
    icon: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  },
}

function formatLimit(value: number): string {
  if (value === -1) return 'Unlimited'
  return value.toLocaleString()
}

export function PricingPage() {
  const { t } = useTranslation()
  usePageMeta({
    title: t('seo.pricing.title', 'Pricing'),
    description: t('seo.pricing.description', 'Choose your Esli plan. Free tier available with AI-powered flashcards.'),
    canonical: '/pricing',
  })
  const { user } = useAuthContext()
  const { mode } = useDeckRepo()
  const { logout } = useAuth()
  const { tier: currentTier, isGuest } = useTier()
  const { data: plansData, isLoading } = usePlans()
  const syncImportMutation = useSyncImport()
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month')
  const [giftTier, setGiftTier] = useState<'pro' | 'premium' | null>(null)

  const guestData = guestStorage.read()
  const hasGuestDecksToSave =
    !!user &&
    Array.isArray(guestData.decks) &&
    typeof guestData.cardsByDeckId === 'object' &&
    guestData.decks.length >= 1

  const handleUpgrade = (tier: PlanTier) => {
    trackEvent('pricing.upgrade_click', { tier, interval: billingInterval })
    if (isGuest) {
      window.location.href = '/register'
      return
    }
    if (tier === 'pro' || tier === 'premium') {
      setGiftTier(tier)
    }
  }

  const plans = plansData?.plans ?? []

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
        onSaveGuestDecks={() => {
          syncImportMutation.mutate(
            { version: 1 as const, decks: guestData.decks, cardsByDeckId: guestData.cardsByDeckId },
            { onSuccess: () => guestStorage.clear() },
          )
        }}
        onLogout={logout}
      />

      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {t('common.home')}
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4 text-slate-400" aria-hidden /></li>
            <li className="font-medium text-slate-800 dark:text-slate-100" aria-current="page">
              {t('pricing.title')}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {t('pricing.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => {
                setBillingInterval('month')
                trackEvent('pricing.billing_toggle', { interval: 'month' })
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingInterval === 'month'
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => {
                setBillingInterval('year')
                trackEvent('pricing.billing_toggle', { interval: 'year' })
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingInterval === 'year'
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {t('pricing.yearly')}
              <span className="ml-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                {t('pricing.savePercent')}
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const colors = PLAN_COLORS[plan.tier]
              const isCurrent = currentTier === plan.tier
              const price = billingInterval === 'month' ? plan.monthly_price : plan.yearly_price
              const perMonth = billingInterval === 'year' ? Math.round((plan.yearly_price / 12) * 100) / 100 : plan.monthly_price

              return (
                <div
                  key={plan.tier}
                  className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-6 flex flex-col`}
                >
                  {plan.tier === 'pro' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-600 text-white">
                        {t('pricing.popular')}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <span className={colors.icon}>{PLAN_ICONS[plan.tier]}</span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {plan.name}
                    </h3>
                    {isCurrent && (
                      <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                        {t('pricing.currentPlan')}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    {price === 0 ? (
                      <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        {t('pricing.free')}
                      </div>
                    ) : (
                      <div>
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                          ${billingInterval === 'month' ? price : perMonth}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">
                          {t('pricing.perMonth')}
                        </span>
                        {billingInterval === 'year' && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            ${price}{t('pricing.perYear')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {formatLimit(plan.limits.ai_generations_per_month)} {t('pricing.features.aiGenerations')}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {formatLimit(plan.limits.max_decks)} {t('pricing.features.maxDecks')}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {formatLimit(plan.limits.max_cards_per_deck)} {t('pricing.features.maxCardsPerDeck')}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {formatLimit(plan.limits.max_total_cards)} {t('pricing.features.maxTotalCards')}
                    </li>
                    {plan.limits.pdf_ai_generation && (
                      <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        {t('pricing.features.pdfAi')}
                        {plan.limits.pdf_max_pages > 0 && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            ({t('pricing.features.pdfMaxPages', { count: plan.limits.pdf_max_pages })})
                          </span>
                        )}
                      </li>
                    )}
                    {plan.limits.advanced_analytics && (
                      <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        {t('pricing.features.analytics')}
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  {plan.tier === 'free' ? (
                    isCurrent ? (
                      <div className="text-center text-sm text-slate-500 dark:text-slate-400 py-2.5">
                        {t('pricing.currentPlan')}
                      </div>
                    ) : (
                      <Link
                        to={isGuest ? '/register' : '/settings'}
                        className="block text-center px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        {isGuest ? t('pricing.getStarted') : t('pricing.currentPlan')}
                      </Link>
                    )
                  ) : isCurrent ? (
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400 py-2.5">
                      {t('pricing.currentPlan')}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan.tier)}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        plan.tier === 'pro'
                          ? 'bg-primary-600 hover:bg-primary-700 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {isGuest ? (
                        t('pricing.getStarted')
                      ) : (
                        t('pricing.upgrade')
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Promo Code Section */}
        {!isGuest && (
          <div className="mt-8 max-w-md mx-auto">
            <PromoCodeInput />
          </div>
        )}
      </main>

      <PromoGiftModal
        isOpen={!!giftTier}
        tier={giftTier}
        onClose={() => setGiftTier(null)}
      />
    </div>
  )
}
