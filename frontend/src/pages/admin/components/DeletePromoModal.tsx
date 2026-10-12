import { useTranslation } from 'react-i18next'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'
import { useDeletePromoCode } from '@/features/admin/promoAdminHooks'
import type { PromoCode } from '@/features/admin/promoAdminApi'

interface DeletePromoModalProps {
  isOpen: boolean
  promo: PromoCode | null
  onClose: () => void
}

export function DeletePromoModal({ isOpen, promo, onClose }: DeletePromoModalProps) {
  const { t } = useTranslation()
  const deleteMutation = useDeletePromoCode()
  const isPending = deleteMutation.isPending

  const handleConfirm = () => {
    if (promo) deleteMutation.mutate(promo.id, { onSuccess: onClose })
  }

  return (
    <ConfirmDialog
      isOpen={isOpen && promo != null}
      title={t('admin.promo.deleteTitle')}
      description={promo ? t('admin.promo.deleteWarning', { code: promo.code }) : undefined}
      confirmLabel={isPending ? t('admin.promo.deleting') : t('common.delete')}
      danger
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}
