import { useQuery } from '@tanstack/react-query'
import { useDeckRepo } from '@/features/decks/repo'
import { fetchDashboardStats } from './statsApi'
import { computeGuestStats } from './guestStats'
import { guestStorage } from '@/shared/lib/guestStorage'
import type { DashboardStats } from './types'

export const statsKeys = {
  dashboard: ['stats', 'dashboard'] as const,
}

export function useDashboardStats() {
  const { mode } = useDeckRepo()

  return useQuery<DashboardStats>({
    queryKey: [...statsKeys.dashboard, mode],
    queryFn: () => {
      if (mode === 'api') {
        return fetchDashboardStats()
      }
      const data = guestStorage.read()
      return Promise.resolve(computeGuestStats(data))
    },
    staleTime: 30_000,
    retry: 2,
  })
}
