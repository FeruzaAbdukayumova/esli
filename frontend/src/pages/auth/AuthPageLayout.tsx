import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

interface AuthPageLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  alternateLink: { to: string; label: string }
  showBackToHome?: boolean
}

/** Shared link + focus styles for text links on a sheet or the page */
export const pageLink =
  'font-bold text-brand underline decoration-2 underline-offset-4 decoration-brand/40 hover:decoration-brand active:opacity-70 transition-[opacity] duration-150 rounded focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky'

/** The esli sticker mark: the word garden's sprout in its pot (same as the navbar) */
export function EsliMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <path d="M14 16 C 13.6 12, 14.4 9.5, 14 7" stroke="#17171A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M14 11 C 15.5 7.5, 20 6.5, 23 8 C 20.5 11.5, 16.5 12, 14 11 Z" fill="#44D07B" stroke="#17171A" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 9.5 C 12.5 6.5, 8.5 5.5, 5.5 6.5 C 7.5 10, 11.5 10.5, 14 9.5 Z" fill="#44D07B" stroke="#17171A" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 18 H20.5 L18.8 25 Q18.5 26.5 17 26.5 H11 Q9.5 26.5 9.2 25 Z" fill="#FF7A59" stroke="#17171A" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="6" y="14.5" width="16" height="4.5" rx="2.25" fill="#FF7A59" stroke="#17171A" strokeWidth="1.8" />
    </svg>
  )
}

/** Logo link: sticker mark + wordmark */
export function EsliLogo() {
  const { t } = useTranslation()
  return (
    <Link
      to="/"
      aria-label={t('nav.brand')}
      className="group inline-flex items-center gap-2.5 rounded-lg text-fg focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky active:scale-[0.97] transition-transform duration-150"
    >
      <EsliMark className="h-10 w-10 -rotate-6 transition-transform duration-200 ease-out group-hover:rotate-0" />
      <span className="font-display text-2xl">esli</span>
    </Link>
  )
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:p-8">
      <div className="w-full max-w-[440px] flex flex-col">
        <div className="mb-6 flex items-center justify-between gap-3">
          <EsliLogo />
          {showBackToHome && (
            <Link to="/" className="btn-ghost min-h-[44px] text-sm text-muted hover:text-fg">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden />
              {t('auth.backToHome')}
            </Link>
          )}
        </div>

        <div className="relative">
          {/* Washi tape holding the form sheet down */}
          <span className="tape bg-sun/80 -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />
          <div className="sheet p-5 sm:p-8">
            <h1 className="font-display text-[1.75rem] sm:text-[2rem] leading-[1.1] text-fg text-center [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-2 mb-6 text-center text-base text-muted">
              {subtitle}
            </p>

            {children}

            <p className="mt-6 border-t-2 border-line pt-5 text-center text-sm text-muted">
              {alternateLink.to === '/register' ? `${t('auth.dontHaveAccount')} ` : `${t('auth.alreadyHaveAccount')} `}
              <Link to={alternateLink.to} className={pageLink}>
                {alternateLink.label}
              </Link>
            </p>
          </div>
        </div>

        {/* Guest escape hatch */}
        <div className="mt-6 text-center">
          <Link to="/dashboard" className="btn-ghost min-h-[44px] text-sm">
            {t('auth.continueAsGuest', 'Continue without an account')}
          </Link>
          <p className="mt-0.5 text-xs text-muted">
            {t('auth.guestHint', 'Try Esli instantly. Your decks stay on this device until you sign up.')}
          </p>
        </div>

        <footer className="mt-6 text-center">
          <p className="text-xs text-muted">
            {t('auth.byContinuing')}{' '}
            <Link to="/terms" className={pageLink}>
              {t('auth.termsOfService')}
            </Link>{' '}
            {t('auth.and')}{' '}
            <Link to="/privacy" className={pageLink}>
              {t('auth.privacyPolicy')}
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}
