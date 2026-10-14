import { useLocation, Link } from 'react-router-dom'
import { Home, BookOpen, Globe, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const NAV_ITEMS = [
  { path: '/dashboard', icon: Home, labelKey: 'nav.home' },
  { path: '/decks', icon: BookOpen, labelKey: 'nav.decks' },
  { path: '/browse', icon: Globe, labelKey: 'nav.browse' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
] as const

export function BottomNav() {
  const { t } = useTranslation()
  const location = useLocation()

  // Hide on auth pages, study pages, and admin pages
  const hiddenPrefixes = ['/login', '/register', '/study/', '/admin', '/auth/']
  if (hiddenPrefixes.some(p => location.pathname.startsWith(p))) return null

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-canvas border-t-2 border-line lg:hidden safe-area-bottom" aria-label={t('nav.mobileNavigation', 'Mobile navigation')}>
      <div className="flex items-center justify-around h-[68px] px-2">
        {NAV_ITEMS.map(({ path, icon: Icon, labelKey }) => {
          const isActive = location.pathname === path
            || (location.pathname === '/' && path === '/dashboard')
            || (path === '/decks' && location.pathname.startsWith('/deck/'))
            || (path === '/browse' && location.pathname.startsWith('/browse/'))
            || (path === '/profile' && location.pathname.startsWith('/profile/'))
          return (
            <Link
              key={path}
              to={path}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-transform duration-150 active:scale-[0.94] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-sky ${
                isActive ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              <span
                className={`flex h-8 w-11 items-center justify-center rounded-[12px] border-2 transition-[background-color] duration-150 ${
                  isActive ? 'border-ink bg-sky text-ink' : 'border-transparent group-hover:bg-fg/[0.07]'
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden />
              </span>
              <span className={`text-[11px] ${isActive ? 'font-extrabold' : 'font-semibold'}`}>{t(labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
