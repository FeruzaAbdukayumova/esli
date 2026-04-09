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
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 lg:hidden safe-area-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16 px-2">
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
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-400 dark:text-slate-500 active:text-slate-600 dark:active:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{t(labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
