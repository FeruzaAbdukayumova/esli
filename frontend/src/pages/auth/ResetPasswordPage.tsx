import { useState, FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { authApi } from '@/features/auth/api'
import { storage } from '@/shared/lib/storage'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { AuthPageLayout } from './AuthPageLayout'

const MIN_LENGTH = 8
const MAX_LENGTH = 72

export const ResetPasswordPage = () => {
  const { t } = useTranslation()
  usePageMeta({ title: t('auth.reset.title', 'Set a new password'), canonical: '/reset-password' })
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [linkInvalid, setLinkInvalid] = useState(!token)
  const [error, setError] = useState<string | null>(null)

  const passwordError =
    touched && password.length < MIN_LENGTH
      ? t('auth.reset.tooShort', { count: MIN_LENGTH, defaultValue: 'Use at least {{count}} characters.' })
      : touched && password.length > MAX_LENGTH
        ? t('auth.reset.tooLong', { count: MAX_LENGTH, defaultValue: 'Use at most {{count}} characters.' })
        : null
  const confirmError =
    touched && confirm !== password ? t('auth.reset.mismatch', "Passwords don't match.") : null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (password.length < MIN_LENGTH || password.length > MAX_LENGTH || confirm !== password) return
    setSubmitting(true)
    setError(null)
    try {
      const { access_token } = await authApi.resetPassword(token, password)
      storage.setToken(access_token)
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      toast.success(t('auth.reset.success', 'Password updated. You\'re signed in.'))
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if ((err as { status?: number }).status === 400) {
        setLinkInvalid(true)
      } else {
        setError(t('auth.genericError', 'Something went wrong. Please try again.'))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      title={t('auth.reset.title', 'Set a new password')}
      subtitle={
        linkInvalid
          ? t('auth.reset.invalidSubtitle', 'This link has expired or was already used.')
          : t('auth.reset.subtitle', 'Choose a new password for your account.')
      }
      alternateLink={{ to: '/login', label: t('auth.login') }}
    >
      {linkInvalid ? (
        <div className="text-center space-y-4">
          <p className="text-base leading-relaxed text-muted">
            {t('auth.reset.invalidBody', 'Reset links work once and expire after 1 hour. Request a fresh one and use it right away.')}
          </p>
          <Link
            to="/forgot-password"
            className="btn-brand w-full min-h-[52px] px-5 text-base"
          >
            {t('auth.reset.requestNew', 'Send me a new link')}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label={t('auth.reset.newPassword', 'New password')}
            type="password"
            autoComplete="new-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            hint={t('auth.reset.hint', { count: MIN_LENGTH, defaultValue: 'At least {{count}} characters.' })}
            disabled={submitting}
          />
          <Input
            label={t('auth.reset.confirmPassword', 'Confirm new password')}
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => confirm && setTouched(true)}
            error={confirmError}
            disabled={submitting}
          />
          {error && (
            <p role="alert" className="text-sm font-medium text-again">
              {error}
            </p>
          )}
          <Button type="submit" fullWidth loading={submitting}>
            {t('auth.reset.submit', 'Save and sign in')}
          </Button>
        </form>
      )}
    </AuthPageLayout>
  )
}
