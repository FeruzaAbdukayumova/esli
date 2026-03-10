import { apiClient } from '@/shared/lib/apiClient'

export interface TimeSeriesPoint {
  date: string
  value: number
}

export interface UserGrowthData {
  signups: TimeSeriesPoint[]
  active_users: TimeSeriesPoint[]
  total_users: number
  retention_rate: number
}

export interface StudyEngagementData {
  reviews_over_time: TimeSeriesPoint[]
  response_distribution: Record<string, number>
  peak_hours: number[]
}

export interface ContentMetricsData {
  decks_over_time: TimeSeriesPoint[]
  cards_over_time: TimeSeriesPoint[]
  popular_decks: { title: string; copy_count: number; card_count: number; owner: string }[]
  category_breakdown: Record<string, number>
  shared_vs_private: Record<string, number>
}

export interface SubscriptionData {
  users_by_tier: Record<string, number>
  promo_usage: { code: string; tier: string; redemptions: number }[]
}

export interface CustomEventsData {
  events: Record<string, number>
}

export const analyticsApi = {
  getUserGrowth(range: string, granularity: string): Promise<UserGrowthData> {
    return apiClient.get<UserGrowthData>(`/analytics/user-growth?range=${range}&granularity=${granularity}`)
  },

  getStudyEngagement(range: string, granularity: string): Promise<StudyEngagementData> {
    return apiClient.get<StudyEngagementData>(`/analytics/study-engagement?range=${range}&granularity=${granularity}`)
  },

  getContentMetrics(range: string, granularity: string): Promise<ContentMetricsData> {
    return apiClient.get<ContentMetricsData>(`/analytics/content-metrics?range=${range}&granularity=${granularity}`)
  },

  getSubscriptions(range: string): Promise<SubscriptionData> {
    return apiClient.get<SubscriptionData>(`/analytics/subscriptions?range=${range}`)
  },

  getCustomEvents(range: string): Promise<CustomEventsData> {
    return apiClient.get<CustomEventsData>(`/analytics/custom-events?range=${range}`)
  },
}
