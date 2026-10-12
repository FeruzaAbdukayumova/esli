import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MailCheck } from 'lucide-react'
import { authApi } from '@/features/auth/api'
import { isValidEmail, getEmailValidationMessage } from '@/shared/lib/validation'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { AuthPageLayout } from './AuthPageLayout'

export const ForgotPasswordPage = () => {
  const { t } = useTranslation()
  usePageMeta({
    title: t('auth.forgot.title', 'Reset your password'),
    canonical: '/forgot-password',
  })
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const emailError = touched ? getEmailValidationMessage(email, t) : null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (getEmailValidationMessage(email, t)) return
    setSubmitting(true)
    setError(null)
    try {
      await authApi.forgotPassword(email.trim())
      setSentTo(email.trim())
    } catch {
      setError(t('auth.genericError', 'Something went wrong. Please try again.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      title={t('auth.forgot.title', 'Reset your password')}
      subtitle={
        sentTo
          ? t('auth.forgot.sentSubtitle', 'Check your inbox')
          : t('auth.forgot.subtitle', "Enter your email and we'll send you a link to set a new password.")
      }
      alternateLink={{ to: '/login', label: t('auth.login') }}
    >
      {sentTo ? (
        <div className="text-center space-y-4" role="status" aria-live="polite">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
            <MailCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden />
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t('auth.forgot.sentBody', {
              email: sentTo,
              defaultValue:
                'If an account exists for {{email}}, a reset link is on its way. It works for 1 hour. Check your spam folder if you don\'t see it.',
            })}
          </p>
          <Button variant="secondary" fullWidth onClick={() => setSentTo(null)}>
            {t('auth.forgot.tryAnother', 'Use a different email')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label={t('auth.email')}
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            error={emailError}
            valid={email.length > 0 && isValidEmail(email)}
            disabled={submitting}
          />
          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <Button type="submit" fullWidth loading={submitting}>
            {t('auth.forgot.submit', 'Send reset link')}
          </Button>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            {t('auth.forgot.googleHint', 'Signed up with Google? Sign in with Google instead, no password needed.')}
          </p>
        </form>
      )}
    </AuthPageLayout>
  )
}
