import { useState, FormEvent, useId } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { authApi } from '@/features/auth/api'
import { isValidEmail, getEmailValidationMessage } from '@/shared/lib/validation'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { AuthPageLayout } from './AuthPageLayout'

const inputBase =
  'w-full px-4 py-2.5 sm:py-3 min-h-[44px] rounded-lg border bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:shadow-focus-primary dark:focus:shadow-focus-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed hover:border-slate-400 dark:hover:border-slate-500'

const inputError = 'border-red-500 dark:border-red-400'
const inputValid = 'border-green-500 dark:border-green-400'
const inputDefault = 'border-slate-300 dark:border-slate-600'

export const LoginPage = () => {
  const { t } = useTranslation()
  usePageMeta({
    title: t('seo.login.title', 'Log In'),
    description: t('seo.login.description', 'Log in to Esli to access your flashcard decks and continue studying.'),
    canonical: '/login',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'google' | null>(null)
  const { login, isLoggingIn, loginError } = useAuth()

  const handleOAuth = async (provider: 'google') => {
    try {
      setOauthLoading(provider)
      const { authorize_url, state } = await authApi.oauthAuthorize(provider)
      sessionStorage.setItem('oauth_state', state)
      // Preserve extension flag through OAuth redirect
      const isExtension = new URLSearchParams(window.location.search).get('ext') === '1'
      if (isExtension) {
        sessionStorage.setItem('oauth_from_extension', '1')
      }
      window.location.href = authorize_url
    } catch {
      setOauthLoading(null)
      toast.error(t('auth.oauthFailed'))
    }
  }

  const emailError = emailTouched ? getEmailValidationMessage(email, t) : null
  const emailValid = email.length > 0 && isValidEmail(email)
  const passwordError = passwordTouched && !password.trim() ? t('auth.passwordRequired') : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    const emailMsg = getEmailValidationMessage(email, t)
    if (emailMsg || !password.trim()) return
    login({ email: email.trim(), password })
  }

  const emailId = useId()
  const passwordId = useId()
  const emailErrorId = useId()
  const passwordErrorId = useId()
  const formErrorId = useId()

  return (
    <AuthPageLayout
      title={t('auth.welcomeBack')}
      subtitle={t('auth.signInSubtitle')}
      alternateLink={{ to: '/register', label: t('auth.register') }}
    >
      {/* Social login */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => handleOAuth('google')}
          disabled={oauthLoading !== null}
          className="w-full flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label={t('auth.signInWithGoogle')}
        >
          {oauthLoading === 'google' ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          )}
          <span>{t('auth.signInWithGoogle')}</span>
        </button>
      </div>
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-slate-200 dark:border-slate-600" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">{t('auth.orContinueWithEmail')}</span>
        </div>
      </div>

      <div id={formErrorId} role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
        {loginError && (loginError instanceof Error ? loginError.message : t('auth.loginFailed'))}
      </div>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
        className={`space-y-4 relative transition-opacity duration-200 ${isLoggingIn ? 'opacity-90' : ''}`}
        aria-busy={isLoggingIn}
        aria-describedby={loginError ? formErrorId : undefined}
        style={{ pointerEvents: isLoggingIn ? 'none' : undefined }}
      >
        <input type="text" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden />
        <input type="password" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="new-password" aria-hidden />

        <div>
          <label htmlFor={emailId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('auth.email')}
          </label>
          <div className="relative">
            <input
              id={emailId}
              name="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              required
              disabled={isLoggingIn}
              autoComplete="off"
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? emailErrorId : undefined}
              aria-label={t('auth.emailAddressLabel')}
              placeholder="you@example.com"
              className={`${inputBase} pr-10 ${emailError ? inputError : emailValid ? inputValid : inputDefault}`}
            />
            {emailValid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400 animate-checkmark-pop" aria-hidden>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          {emailError && (
            <p id={emailErrorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400 transition-all duration-200 animate-fade-in" role="alert">
              {emailError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={passwordId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {t('auth.password')}
          </label>
          <div className="relative">
            <input
              id={passwordId}
              name="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              required
              disabled={isLoggingIn}
              autoComplete="new-password"
              aria-invalid={passwordError ? true : undefined}
              aria-describedby={passwordError ? passwordErrorId : undefined}
              aria-label={t('auth.passwordLabel')}
              placeholder="••••••••"
              className={`${inputBase} pr-11 ${passwordError ? inputError : inputDefault}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -my-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0"
              aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
              tabIndex={0}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p id={passwordErrorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400 transition-all duration-200 animate-fade-in" role="alert">
              {passwordError}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 text-sm">
          <div />
          <button
            type="button"
            onClick={() => toast(t('auth.forgotPasswordComingSoon'), { icon: '🔒' })}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
          >
            {t('auth.forgotPassword')}
          </button>
        </div>

        {loginError && (
          <div
            className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm transition-all duration-200 animate-fade-in"
            role="alert"
            aria-live="assertive"
          >
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{loginError instanceof Error ? loginError.message : t('auth.loginFailed')}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full min-h-[44px] py-3 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          aria-busy={isLoggingIn}
          aria-label={isLoggingIn ? t('auth.loggingIn') : t('auth.login')}
        >
          {isLoggingIn ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t('auth.loggingIn')}
            </>
          ) : (
            t('auth.login')
          )}
        </button>
      </form>
    </AuthPageLayout>
  )
}
