import { apiClient } from '@/shared/lib/apiClient'
import type { SyncImportPayload, SyncImportResponse } from './types'

export const syncApi = {
  /** POST /api/v1/sync/import with Bearer token. */
  syncImport(payload: SyncImportPayload): Promise<SyncImportResponse> {
    return apiClient.post<SyncImportResponse>('/sync/import', payload)
  },
}
