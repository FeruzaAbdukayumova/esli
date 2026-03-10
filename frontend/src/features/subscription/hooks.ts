import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { subscriptionApi } from './subscriptionApi'
import { promoApi } from './promoApi'
import type { SubscriptionInfo, PlansResponse } from './types'

export const subscriptionKeys = {
  info: ['subscription'] as const,
  plans: ['subscription', 'plans'] as const,
}

export function useSubscription() {
  const { isAuthenticated } = useAuthContext()

  return useQuery<SubscriptionInfo>({
    queryKey: subscriptionKeys.info,
    queryFn: () => subscriptionApi.getSubscription(),
    enabled: isAuthenticated,
    staleTime: 60_000,
  })
}

export function usePlans() {
  return useQuery<PlansResponse>({
    queryKey: subscriptionKeys.plans,
    queryFn: () => subscriptionApi.getPlans(),
    staleTime: 300_000,
  })
}

export function useCheckoutSession() {
  return useMutation({
    mutationFn: (priceId: string) => subscriptionApi.createCheckoutSession(priceId),
    onSuccess: (data) => {
      window.location.href = data.url
    },
  })
}

export function usePortalSession() {
  return useMutation({
    mutationFn: () => subscriptionApi.createPortalSession(),
    onSuccess: (data) => {
      window.location.href = data.url
    },
  })
}

export function useRedeemPromo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (code: string) => promoApi.redeemCode(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.info })
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}
