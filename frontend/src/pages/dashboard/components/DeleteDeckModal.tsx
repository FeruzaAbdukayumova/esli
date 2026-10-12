import { useTranslation } from 'react-i18next'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'

interface DeleteDeckModalProps {
  isOpen: boolean
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDeckModal({ isOpen, isPending, onClose, onConfirm }: DeleteDeckModalProps) {
  const { t } = useTranslation()
  return (
    <ConfirmDialog
      isOpen={isOpen}
      title={t('deck.deleteDeckConfirm')}
      description={t('deck.deleteDeckWarning')}
      confirmLabel={isPending ? t('deck.deleting') : t('common.delete')}
      danger
      isPending={isPending}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  )
}
