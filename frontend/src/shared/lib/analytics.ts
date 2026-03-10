import { apiClient } from './apiClient'

/**
 * Fire-and-forget event tracking. Never blocks UI or throws.
 */
export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  apiClient.post('/analytics/track', { event_name: eventName, properties }).catch(() => {})
}
