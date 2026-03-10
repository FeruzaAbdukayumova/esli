import { apiClient } from '@/shared/lib/apiClient'

export interface PromoRedeemResponse {
  promo_tier: string
  promo_expires_at: string
  message: string
}

export const promoApi = {
  redeemCode(code: string): Promise<PromoRedeemResponse> {
    return apiClient.post<PromoRedeemResponse>('/promo/redeem', { code })
  },
}
