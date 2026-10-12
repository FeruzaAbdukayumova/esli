import { useMemo } from 'react'
import { useAuthContext } from '@/app/providers/AuthProvider'
import { guestStorage } from '@/shared/lib/guestStorage'
import { useSyncImport } from './hooks'

/**
 * Shared "save guest decks to my account" affordance used by the navbar on
 * every page. Reads guest storage once per mount.
 */
export function useGuestSync() {
  const { user } = useAuthContext()
  const syncImportMutation = useSyncImport()
  const guestData = useMemo(() => guestStorage.read(), [])

  const hasGuestDecksToSave =
    !!user &&
    Array.isArray(guestData.decks) &&
    typeof guestData.cardsByDeckId === 'object' &&
    guestData.decks.length >= 1

  const saveGuestDecks = () => {
    if (!hasGuestDecksToSave) return
    syncImportMutation.mutate(
      { version: 1 as const, decks: guestData.decks, cardsByDeckId: guestData.cardsByDeckId },
      { onSuccess: () => guestStorage.clear() },
    )
  }

  return { hasGuestDecksToSave, isSyncing: syncImportMutation.isPending, saveGuestDecks }
}
