import { useAuthContext } from '@/app/providers/AuthProvider'
import { useSubscription } from './hooks'
import type { PlanTier } from './types'

export function useTier() {
  const { user, isAuthenticated } = useAuthContext()
  const { data: subscription } = useSubscription()

  const tier: PlanTier = isAuthenticated
    ? (subscription?.tier ?? (user?.subscription_tier as PlanTier) ?? 'free')
    : 'free'

  return {
    tier,
    isFree: tier === 'free',
    isProOrAbove: tier === 'pro' || tier === 'premium',
    isPremium: tier === 'premium',
    isGuest: !isAuthenticated,
    subscription,
    hasActivePromo: !!subscription?.promo_tier && !!subscription?.promo_expires_at,
    promoTier: subscription?.promo_tier ?? null,
    promoExpiresAt: subscription?.promo_expires_at ?? null,
  }
}
