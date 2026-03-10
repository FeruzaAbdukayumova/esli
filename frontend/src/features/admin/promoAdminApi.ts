import { apiClient } from '@/shared/lib/apiClient'

export interface PromoCode {
  id: string
  code: string
  tier: string
  duration_days: number
  max_redemptions: number
  current_redemptions: number
  valid_from: string | null
  valid_until: string | null
  is_active: boolean
  created_at: string
}

export interface PromoCodeCreateRequest {
  code: string
  tier: 'pro' | 'premium'
  duration_days: number
  max_redemptions?: number
  valid_from?: string | null
  valid_until?: string | null
}

export interface PromoCodeUpdateRequest {
  is_active?: boolean
  max_redemptions?: number
  valid_from?: string | null
  valid_until?: string | null
}

export const promoAdminApi = {
  list(includeInactive = true): Promise<PromoCode[]> {
    return apiClient.get<PromoCode[]>(
      `/promo/admin/codes?include_inactive=${includeInactive}`
    )
  },

  create(data: PromoCodeCreateRequest): Promise<PromoCode> {
    return apiClient.post<PromoCode>('/promo/admin/codes', data)
  },

  update(id: string, data: PromoCodeUpdateRequest): Promise<PromoCode> {
    return apiClient.patch<PromoCode>(`/promo/admin/codes/${id}`, data)
  },

  delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/promo/admin/codes/${id}`)
  },
}
