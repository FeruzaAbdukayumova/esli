import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Users,
  Layers,
  Shield,
  Headphones,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'
import { useAuthContext } from '@/app/providers/AuthProvider'

const SIDEBAR_ITEMS = [
  { path: '/admin', icon: LayoutDashboard, labelKey: 'admin.nav.overview', exact: true },
  { path: '/admin/users', icon: Users, labelKey: 'admin.nav.users' },
  { path: '/admin/decks', icon: Layers, labelKey: 'admin.nav.decks' },
  { path: '/admin/analytics', icon: BarChart3, labelKey: 'admin.nav.analytics' },
  { path: '/admin/promo', icon: Shield, labelKey: 'admin.nav.promo' },
  { path: '/admin/support', icon: Headphones, labelKey: 'admin.nav.support' },
]

export function AdminLayout() {
  const { t } = useTranslation()
  const { user, isLoading } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, isLoading, navigate])

  // Close the mobile sidebar on Escape
  useEffect(() => {
    if (!sidebarOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  if (isLoading || !user?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <span className="inline-block w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isActiveRoute = (path: string, exact = false) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-[61] transition-transform duration-200 lg:translate-x-0 lg:z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span className="font-bold text-lg text-slate-800 dark:text-slate-100">
              {t('admin.nav.title')}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label={t('admin.nav.closeMenu', 'Close menu')}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActiveRoute(item.path, item.exact)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
                  active
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{t(item.labelKey)}</span>
              </Link>
            )
          })}
        </nav>

        {/* Back to Dashboard */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            to="/dashboard?view=user"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t('admin.nav.backToDashboard')}</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-50 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label={t('admin.nav.openMenu', 'Open menu')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 font-semibold text-slate-800 dark:text-slate-100">
            {t('admin.nav.title')}
          </span>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
