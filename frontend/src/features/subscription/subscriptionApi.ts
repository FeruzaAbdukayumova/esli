import { apiClient } from '@/shared/lib/apiClient'
import type { SubscriptionInfo, PlansResponse } from './types'

export const subscriptionApi = {
  getSubscription(): Promise<SubscriptionInfo> {
    return apiClient.get<SubscriptionInfo>('/stripe/subscription')
  },

  getPlans(): Promise<PlansResponse> {
    return apiClient.get<PlansResponse>('/stripe/plans')
  },

  createCheckoutSession(priceId: string): Promise<{ url: string }> {
    return apiClient.post<{ url: string }>('/stripe/create-checkout-session', {
      price_id: priceId,
    })
  },

  createPortalSession(): Promise<{ url: string }> {
    return apiClient.post<{ url: string }>('/stripe/create-portal-session')
  },
}
