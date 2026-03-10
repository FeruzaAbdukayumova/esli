import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { promoAdminApi } from './promoAdminApi'
import type { PromoCodeCreateRequest, PromoCodeUpdateRequest } from './promoAdminApi'

export const promoAdminKeys = {
  all: ['admin', 'promo-codes'] as const,
}

export function usePromoCodes() {
  return useQuery({
    queryKey: promoAdminKeys.all,
    queryFn: () => promoAdminApi.list(true),
    staleTime: 30_000,
  })
}

export function useCreatePromoCode() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (data: PromoCodeCreateRequest) => promoAdminApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoAdminKeys.all })
      toast.success(t('admin.promo.createSuccess'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('admin.promo.createError'))
    },
  })
}

export function useUpdatePromoCode() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PromoCodeUpdateRequest }) =>
      promoAdminApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoAdminKeys.all })
      toast.success(t('admin.promo.updateSuccess'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('admin.promo.updateError'))
    },
  })
}

export function useDeletePromoCode() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (id: string) => promoAdminApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoAdminKeys.all })
      toast.success(t('admin.promo.deleteSuccess'))
    },
    onError: (err: Error) => {
      toast.error(err.message || t('admin.promo.deleteError'))
    },
  })
}
