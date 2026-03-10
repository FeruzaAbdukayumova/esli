import { useMutation, useQueryClient } from '@tanstack/react-query'
import { syncApi } from './api'
import type { SyncImportPayload } from './types'

export function useSyncImport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SyncImportPayload) => syncApi.syncImport(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
    },
  })
}
