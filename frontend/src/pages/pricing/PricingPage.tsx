import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Check, ChevronRight, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { useDeckRepo } from '@/features/decks/repo'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { usePlans } from '@/features/subscription/hooks'
import { Button } from '@/shared/ui/Button'
import { PromoCodeInput } from '@/features/subscription/components/PromoCodeInput'
import { useTier } from '@/features/subscription/useTier'
import { useGuestSync } from '@/features/sync/useGuestSync'
import { trackEvent } from '@/shared/lib/analytics'
import { DashboardNavbar } from '@/pages/dashboard/components/DashboardNavbar'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { openPaddleCheckout } from '@/features/billing/paddle'
import { pageLink } from '@/pages/auth/AuthPageLayout'
import type { PlanTier, PlanInfo } from '@/features/subscription/types'

// Plan stickers (DESIGN.md palette). Pro is the recommended plan: tilted and taped down.
const PLAN_STYLE: Record<PlanTier, string> = {
  free: 'bg-white md:rotate-[-0.6deg]',
  pro: 'bg-sky md:rotate-[1deg]',
  premium: 'bg-bubblegum md:rotate-[-0.8deg]',
}

const featureItem = 'flex items-start gap-2.5 text-[15px] font-medium text-ink'
const featureCheck = <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={3} aria-hidden />

// Declared outside component; receives `t` at call site
function formatLimit(value: number, unlimitedLabel: string): string {
  if (value === -1) return unlimitedLabel
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
  const navigate = useNavigate()
  const { tier: currentTier, isGuest } = useTier()
  const { data: plansData, isLoading, isError, refetch, isRefetching } = usePlans()
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month')
  const [checkoutTier, setCheckoutTier] = useState<PlanTier | null>(null)

  const { hasGuestDecksToSave, isSyncing, saveGuestDecks } = useGuestSync()

  const handleUpgrade = async (tier: PlanTier, plan: PlanInfo) => {
    if (checkoutTier) return
    trackEvent('pricing.upgrade_click', { tier, interval: billingInterval })
    if (isGuest) {
      navigate('/register')
      return
    }
    if (tier !== 'pro' && tier !== 'premium') return

    const priceId = billingInterval === 'month' ? plan.monthly_price_id : plan.yearly_price_id
    const token = plansData?.paddle_client_token
    const env = plansData?.paddle_env

    // Checkout config missing (shouldn't happen in production): never hand out free plans
    if (!priceId || !token || !env || !user) {
      toast.error(t('pricing.checkoutError', 'Could not open checkout. Please try again.'))
      return
    }

    setCheckoutTier(tier)
    try {
      await openPaddleCheckout(token, env, {
        priceId,
        email: user.email,
        userId: user.id,
        successUrl: `${window.location.origin}/dashboard?upgraded=${tier}`,
      })
    } catch (err) {
      console.error('Paddle checkout failed', err)
      toast.error(t('pricing.checkoutError', 'Could not open checkout. Please try again.'))
    } finally {
      setCheckoutTier(null)
    }
  }

  const plans = plansData?.plans ?? []

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

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label={t('nav.breadcrumb', 'Breadcrumb')}>
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link to="/" className="font-medium hover:text-fg rounded focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky active:opacity-70 transition-opacity duration-150">
                {t('common.home')}
              </Link>
            </li>
            <li><ChevronRight className="w-4 h-4 rtl:rotate-180" aria-hidden /></li>
            <li className="font-bold text-fg" aria-current="page">
              {t('pricing.title')}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-[2rem] sm:text-[2.5rem] leading-[1.1] text-fg mb-3 [text-wrap:balance]">
            {t('pricing.title')}
          </h1>
          <p className="text-base text-muted max-w-[52ch] mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 rounded-[18px] border-[2.5px] border-edge bg-sheet p-1">
            <button
              type="button"
              aria-pressed={billingInterval === 'month'}
              onClick={() => {
                setBillingInterval('month')
                trackEvent('pricing.billing_toggle', { interval: 'month' })
              }}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-[14px] px-4 text-sm font-bold transition-transform duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
                billingInterval === 'month' ? 'bg-fg text-canvas' : 'text-muted hover:text-fg'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              type="button"
              aria-pressed={billingInterval === 'year'}
              onClick={() => {
                setBillingInterval('year')
                trackEvent('pricing.billing_toggle', { interval: 'year' })
              }}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-[14px] px-4 text-sm font-bold transition-transform duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
                billingInterval === 'year' ? 'bg-fg text-canvas' : 'text-muted hover:text-fg'
              }`}
            >
              {t('pricing.yearly')}
              <span className="rounded-full border-2 border-ink bg-mint px-1.5 text-xs font-extrabold text-ink">
                {t('pricing.savePercent')}
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        {isLoading ? (
          <div className="flex justify-center py-12" role="status" aria-label={t('common.loading', 'Loading')}>
            <Loader2 className="w-8 h-8 animate-spin text-muted" aria-hidden />
          </div>
        ) : isError || plans.length === 0 ? (
          <div className="sheet max-w-md mx-auto text-center p-6 sm:p-8">
            <AlertCircle className="w-8 h-8 text-muted mx-auto mb-3" aria-hidden />
            <p className="text-base text-muted mb-5">
              {t('pricing.plansError', 'Could not load plans. Check your connection and try again.')}
            </p>
            <Button variant="secondary" size="sm" loading={isRefetching} onClick={() => refetch()}>
              {t('common.retry', 'Retry')}
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {plans.map((plan) => {
              const isCurrent = currentTier === plan.tier
              const price = billingInterval === 'month' ? plan.monthly_price : plan.yearly_price
              const perMonth = billingInterval === 'year' ? Math.round((plan.yearly_price / 12) * 100) / 100 : plan.monthly_price

              return (
                <div
                  key={plan.tier}
                  className={`sticker relative flex flex-col p-6 ${PLAN_STYLE[plan.tier]}`}
                >
                  {plan.tier === 'pro' && (
                    // Washi tape marks the recommended plan
                    <span className="tape bg-sun/80 -top-4 left-1/2 -translate-x-1/2 -rotate-3 w-auto min-w-[92px] px-4 flex items-center justify-center whitespace-nowrap text-xs font-extrabold text-ink">
                      {t('pricing.popular')}
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="font-display text-2xl leading-tight text-ink">
                      {plan.name}
                    </h2>
                    {isCurrent && (
                      <span className="ml-auto rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-xs font-bold text-ink">
                        {t('pricing.currentPlan')}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    {price === 0 ? (
                      <div className="font-display text-4xl leading-tight text-ink">
                        {t('pricing.free')}
                      </div>
                    ) : (
                      <div>
                        <span className="font-display text-4xl leading-tight text-ink">
                          ${billingInterval === 'month' ? price : perMonth}
                        </span>
                        <span className="ml-1 text-sm font-semibold text-ink/70">
                          {t('pricing.perMonth')}
                        </span>
                        {billingInterval === 'year' && (
                          <p className="text-sm font-semibold text-ink/70 mt-1">
                            ${price}{t('pricing.perYear')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1 border-t-2 border-ink/15 pt-5">
                    <li className={featureItem}>
                      {featureCheck}
                      <span>{formatLimit(plan.limits.ai_generations_per_month, t('common.unlimited'))} {t('pricing.features.aiGenerations')}</span>
                    </li>
                    <li className={featureItem}>
                      {featureCheck}
                      <span>{formatLimit(plan.limits.max_decks, t('common.unlimited'))} {t('pricing.features.maxDecks')}</span>
                    </li>
                    <li className={featureItem}>
                      {featureCheck}
                      <span>{formatLimit(plan.limits.max_cards_per_deck, t('common.unlimited'))} {t('pricing.features.maxCardsPerDeck')}</span>
                    </li>
                    <li className={featureItem}>
                      {featureCheck}
                      <span>{formatLimit(plan.limits.max_total_cards, t('common.unlimited'))} {t('pricing.features.maxTotalCards')}</span>
                    </li>
                    {plan.limits.pdf_ai_generation && (
                      <li className={featureItem}>
                        {featureCheck}
                        <span>
                          {t('pricing.features.pdfAi')}
                          {plan.limits.pdf_max_pages > 0 && (
                            <span className="ml-1 text-sm text-ink/70">
                              ({t('pricing.features.pdfMaxPages', { count: plan.limits.pdf_max_pages })})
                            </span>
                          )}
                        </span>
                      </li>
                    )}
                    {plan.limits.advanced_analytics && (
                      <li className={featureItem}>
                        {featureCheck}
                        <span>{t('pricing.features.analytics')}</span>
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  {plan.tier === 'free' ? (
                    isCurrent ? (
                      <div className="text-center text-sm font-bold text-ink/70 min-h-[48px] flex items-center justify-center">
                        {t('pricing.currentPlan')}
                      </div>
                    ) : isGuest ? (
                      <Link to="/register" className="btn-quiet w-full min-h-[48px] px-4 text-[15px]">
                        {t('pricing.getStarted')}
                      </Link>
                    ) : (
                      // No billing portal pre-Paddle: paid users see no action on the free card.
                      <div className="min-h-[48px]" aria-hidden />
                    )
                  ) : isCurrent ? (
                    <div className="text-center text-sm font-bold text-ink/70 min-h-[48px] flex items-center justify-center">
                      {t('pricing.currentPlan')}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleUpgrade(plan.tier, plan)}
                      disabled={checkoutTier !== null}
                      className={`${plan.tier === 'pro' ? 'btn-brand' : 'btn-quiet'} w-full min-h-[48px] px-4 text-[15px]`}
                    >
                      {checkoutTier === plan.tier && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
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

        {/* Trust note */}
        <p className="mt-10 text-center text-sm text-muted">
          {t('pricing.cancelAnytime', 'Cancel anytime.')}{' '}
          <a
            href="https://esli.app/refund"
            target="_blank"
            rel="noopener noreferrer"
            className={pageLink}
          >
            {t('pricing.refundPolicy', 'Refund policy')}
          </a>
        </p>

        {/* Promo Code Section */}
        {!isGuest && (
          <div className="mt-8 max-w-md mx-auto">
            <PromoCodeInput />
          </div>
        )}
      </main>
    </div>
  )
}
