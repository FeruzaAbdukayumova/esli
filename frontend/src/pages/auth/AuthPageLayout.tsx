import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface AuthPageLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  alternateLink: { to: string; label: string }
  showBackToHome?: boolean
}

export function AuthPageLayout({
  children,
  title,
  subtitle,
  alternateLink,
  showBackToHome = true,
}: AuthPageLayoutProps) {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-primary-300/10 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="w-full max-w-[440px] animate-fade-in relative z-10 flex flex-col">
        {/* Back to home */}
        {showBackToHome && (
          <Link
            to="/"
            className="self-start mb-4 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 rounded"
          >
            ← {t('auth.backToHome')}
          </Link>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-elevation-md border border-slate-100 dark:border-slate-700/50 p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {t('nav.brand')}
            </h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-800 dark:text-slate-100 text-center mb-1">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center text-sm mb-4 sm:mb-6">
            {subtitle}
          </p>

          {/* Divider line above form */}
          <div className="border-t border-slate-200 dark:border-slate-600 mb-4 sm:mb-6" aria-hidden />

          {children}

          {/* Alternate auth link */}
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-4 sm:mt-6">
            {alternateLink.to === '/register' ? `${t('auth.dontHaveAccount')} ` : `${t('auth.alreadyHaveAccount')} `}
            <Link
              to={alternateLink.to}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 rounded"
            >
              {alternateLink.label}
            </Link>
          </p>
        </div>

        {/* Footer: Terms & Privacy */}
        <footer className="mt-6 sm:mt-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {t('auth.byContinuing')}{' '}
            <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">
              {t('auth.termsOfService')}
            </Link>{' '}
            {t('auth.and')}{' '}
            <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">
              {t('auth.privacyPolicy')}
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}
