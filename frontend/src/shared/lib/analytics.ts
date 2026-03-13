import { apiClient } from './apiClient'

function getSessionId(): string {
  const key = 'flashcards-session-id'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
  }
  return id
}

/**
 * Fire-and-forget event tracking. Never blocks UI or throws.
 */
export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  apiClient.post('/analytics/track', {
    event_name: eventName,
    session_id: getSessionId(),
    properties,
  }).catch(() => {})
}
