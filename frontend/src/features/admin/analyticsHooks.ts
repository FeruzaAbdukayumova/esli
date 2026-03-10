import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from './analyticsApi'

export const analyticsKeys = {
  userGrowth: (range: string, gran: string) => ['admin', 'analytics', 'user-growth', range, gran] as const,
  studyEngagement: (range: string, gran: string) => ['admin', 'analytics', 'study', range, gran] as const,
  contentMetrics: (range: string, gran: string) => ['admin', 'analytics', 'content', range, gran] as const,
  subscriptions: (range: string) => ['admin', 'analytics', 'subs', range] as const,
  customEvents: (range: string) => ['admin', 'analytics', 'events', range] as const,
}

export function useUserGrowth(range: string, granularity: string) {
  return useQuery({
    queryKey: analyticsKeys.userGrowth(range, granularity),
    queryFn: () => analyticsApi.getUserGrowth(range, granularity),
    staleTime: 120_000,
  })
}

export function useStudyEngagement(range: string, granularity: string) {
  return useQuery({
    queryKey: analyticsKeys.studyEngagement(range, granularity),
    queryFn: () => analyticsApi.getStudyEngagement(range, granularity),
    staleTime: 120_000,
  })
}

export function useContentMetrics(range: string, granularity: string) {
  return useQuery({
    queryKey: analyticsKeys.contentMetrics(range, granularity),
    queryFn: () => analyticsApi.getContentMetrics(range, granularity),
    staleTime: 120_000,
  })
}

export function useSubscriptions(range: string) {
  return useQuery({
    queryKey: analyticsKeys.subscriptions(range),
    queryFn: () => analyticsApi.getSubscriptions(range),
    staleTime: 120_000,
  })
}

export function useCustomEvents(range: string) {
  return useQuery({
    queryKey: analyticsKeys.customEvents(range),
    queryFn: () => analyticsApi.getCustomEvents(range),
    staleTime: 120_000,
  })
}
