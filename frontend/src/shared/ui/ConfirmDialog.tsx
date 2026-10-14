import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from './Modal'
import { Button } from './Button'

interface ConfirmDialogProps {
  isOpen: boolean
  title: ReactNode
  description?: ReactNode
  confirmLabel?: ReactNode
  /** styles the confirm action red for destructive operations */
  danger?: boolean
  isPending?: boolean
  onClose: () => void
  onConfirm: () => void
}

/** Standard confirmation dialog — replaces window.confirm() everywhere. */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  danger = false,
  isPending = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" zIndex={1001} hideClose locked={isPending}>
      {description != null && (
        <p className="text-[15px] text-muted mb-6">{description}</p>
      )}
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={onClose} disabled={isPending} data-autofocus>
          {t('common.cancel')}
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={isPending}>
          {confirmLabel ?? t('common.confirm')}
        </Button>
      </div>
    </Modal>
  )
}
