import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ChevronLeft, ChevronRight, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useAdminDecks, useUpdateDeck, useDeleteDeck } from '@/features/admin/adminHooks'
import type { AdminDeck } from '@/features/admin/adminApi'
import { usePageMeta } from '@/shared/lib/usePageMeta'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'

export function AdminDecksPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('admin.nav.decks', 'Admin Decks'), noIndex: true })
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sharedFilter, setSharedFilter] = useState<boolean | undefined>(undefined)
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [deckToDelete, setDeckToDelete] = useState<AdminDeck | null>(null)

  const { data, isLoading } = useAdminDecks({
    page,
    per_page: 20,
    search: debouncedSearch || undefined,
    is_shared: sharedFilter,
  })
  const updateDeckMutation = useUpdateDeck()
  const deleteDeckMutation = useDeleteDeck()

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

  const handleToggleShared = (deck: AdminDeck) => {
    updateDeckMutation.mutate({ deckId: deck.id, data: { is_shared: !deck.is_shared } })
  }

  const handleConfirmDelete = () => {
    if (!deckToDelete) return
    deleteDeckMutation.mutate(deckToDelete.id, { onSettled: () => setDeckToDelete(null) })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t('admin.decks.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t('admin.decks.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('admin.decks.searchPlaceholder')}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={sharedFilter === undefined ? '' : sharedFilter.toString()}
            onChange={(e) => {
              setSharedFilter(e.target.value === '' ? undefined : e.target.value === 'true')
              setPage(1)
            }}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">{t('admin.decks.allDecks')}</option>
            <option value="true">{t('admin.decks.publicOnly')}</option>
            <option value="false">{t('admin.decks.privateOnly')}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <span className="inline-block w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data && data.decks.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.deckTitle')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.owner')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.cards')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.visibility')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.copies')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.updated')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('admin.decks.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {data.decks.map((deck) => (
                    <tr key={deck.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {deck.title}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {deck.owner_username || deck.owner_email}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {deck.card_count}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            deck.is_shared
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {deck.is_shared ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {deck.is_shared ? t('admin.decks.public') : t('admin.decks.private')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {deck.copy_count}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(deck.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleShared(deck)}
                            disabled={updateDeckMutation.isPending}
                            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium disabled:opacity-50 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                          >
                            {deck.is_shared ? t('admin.decks.makePrivate') : t('admin.decks.makePublic')}
                          </button>
                          <button
                            onClick={() => setDeckToDelete(deck)}
                            disabled={deleteDeckMutation.isPending}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                            title={t('admin.decks.delete')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {t('admin.decks.showing', {
                  start: (page - 1) * 20 + 1,
                  end: Math.min(page * 20, data.total),
                  total: data.total,
                })}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm text-slate-700 dark:text-slate-300">
                  {page} / {data.total_pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
                  disabled={page >= data.total_pages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            {t('admin.decks.noResults')}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deckToDelete !== null}
        title={t('admin.decks.confirmDeleteTitle', 'Delete this deck?')}
        description={t('admin.decks.confirmDelete', { title: deckToDelete?.title })}
        confirmLabel={t('admin.decks.delete')}
        danger
        isPending={deleteDeckMutation.isPending}
        onClose={() => setDeckToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
