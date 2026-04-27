import { apiClient } from '@/shared/lib/apiClient'
import type { SubscriptionInfo, PlansResponse } from './types'

export const subscriptionApi = {
  getSubscription(): Promise<SubscriptionInfo> {
    return apiClient.get<SubscriptionInfo>('/billing/subscription')
  },

  getPlans(): Promise<PlansResponse> {
    return apiClient.get<PlansResponse>('/billing/plans')
  },

  createPortalSession(): Promise<{ url: string }> {
    return apiClient.post<{ url: string }>('/billing/portal-session')
  },

  cancelSubscription(): Promise<{ status: string }> {
    return apiClient.post<{ status: string }>('/billing/cancel')
  },
}
