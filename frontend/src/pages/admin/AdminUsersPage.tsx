import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdminUsers, useUpdateUser } from '@/features/admin/adminHooks'
import type { AdminUser } from '@/features/admin/adminApi'
import { usePageMeta } from '@/shared/lib/usePageMeta'

export function AdminUsersPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('admin.nav.users', 'Admin Users'), noIndex: true })
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<string | undefined>(undefined)
  const [adminFilter, setAdminFilter] = useState<boolean | undefined>(undefined)
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  const { data, isLoading } = useAdminUsers({
    page,
    per_page: 20,
    search: debouncedSearch || undefined,
    tier: tierFilter,
    is_admin: adminFilter,
  })
  const updateUserMutation = useUpdateUser()

  const handleSearchChange = (value: string) => {
    setSearch(value)
    if (searchTimeout) clearTimeout(searchTimeout)
    setSearchTimeout(
      setTimeout(() => {
        setDebouncedSearch(value)
        setPage(1)
      }, 300),
    )
  }

  const handleToggleAdmin = (user: AdminUser) => {
    if (window.confirm(t('admin.users.confirmToggleAdmin', { email: user.email }))) {
      updateUserMutation.mutate({ userId: user.id, data: { is_admin: !user.is_admin } })
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t('admin.users.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('admin.users.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('admin.users.searchPlaceholder')}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={tierFilter || ''}
            onChange={(e) => {
              setTierFilter(e.target.value || undefined)
              setPage(1)
            }}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">{t('admin.users.allTiers')}</option>
            <option value="free">{t('admin.users.tierFree')}</option>
            <option value="pro">{t('admin.users.tierPro')}</option>
            <option value="premium">{t('admin.users.tierPremium')}</option>
          </select>

          <select
            value={adminFilter === undefined ? '' : adminFilter.toString()}
            onChange={(e) => {
              setAdminFilter(e.target.value === '' ? undefined : e.target.value === 'true')
              setPage(1)
            }}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">{t('admin.users.allUsers')}</option>
            <option value="true">{t('admin.users.adminsOnly')}</option>
            <option value="false">{t('admin.users.regularOnly')}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <span className="inline-block w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data && data.users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.email')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.username')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.tier')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.decks')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.cards')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.joined')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.users.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {data.users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                        <span>{user.email}</span>
                        {user.is_admin && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                            {t('admin.users.adminBadge')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {user.username || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="capitalize font-medium text-slate-800 dark:text-slate-200">
                          {user.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {user.deck_count}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {user.card_count}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleToggleAdmin(user)}
                          disabled={updateUserMutation.isPending}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium disabled:opacity-50"
                        >
                          {user.is_admin ? t('admin.users.revokeAdmin') : t('admin.users.grantAdmin')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {t('admin.users.showing', {
                  start: (page - 1) * 20 + 1,
                  end: Math.min(page * 20, data.total),
                  total: data.total,
                })}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm text-slate-700 dark:text-slate-300">
                  {page} / {data.total_pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
                  disabled={page >= data.total_pages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            {t('admin.users.noResults')}
          </div>
        )}
      </div>
    </div>
  )
}
