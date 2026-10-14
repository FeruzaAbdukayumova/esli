import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { authApi } from '@/features/auth/api'
import { storage } from '@/shared/lib/storage'

export const OAuthCallbackPage = () => {
  const { t } = useTranslation()
  const { provider } = useParams<{ provider: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const savedState = sessionStorage.getItem('oauth_state')

    if (searchParams.get('error')) {
      setError(t('auth.oauthFailed'))
      return
    }

    if (!code || !state || state !== savedState) {
      setError(t('auth.oauthStateMismatch'))
      return
    }

    sessionStorage.removeItem('oauth_state')

    if (provider !== 'google') {
      setError(t('auth.oauthFailed'))
      return
    }

    const isExtension = sessionStorage.getItem('oauth_from_extension') === '1'

    authApi
      .oauthCallback(provider, code, state)
      .then((response) => {
        storage.setToken(response.access_token)
        queryClient.invalidateQueries({ queryKey: ['me'] })
        if (isExtension) {
          sessionStorage.removeItem('oauth_from_extension')
          navigate('/auth/extension-done', { replace: true })
        } else {
          navigate('/dashboard', { replace: true })
        }
      })
      .catch(() => {
        setError(t('auth.oauthFailed'))
      })
    // Intentionally run once: re-running would replay the one-shot OAuth code exchange.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="sheet w-full max-w-sm p-6 sm:p-8 text-center">
          <p role="alert" className="mb-6 text-base font-medium text-fg">{error}</p>
          <Link to="/login" className="btn-brand w-full min-h-[52px] px-5 text-base">
            {t('auth.backToLogin')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center" role="status" aria-live="polite">
        <svg aria-hidden
          className="animate-spin h-8 w-8 text-fg mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-base font-medium text-muted">{t('auth.oauthAuthenticating')}</p>
      </div>
    </div>
  )
}
