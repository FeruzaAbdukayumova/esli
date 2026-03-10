import { apiClient } from '@/shared/lib/apiClient'

export interface AdminStats {
  total_users: number
  total_decks: number
  total_cards: number
  total_reviews: number
  users_by_tier: Record<string, number>
  new_users_this_week: number
  new_users_this_month: number
  open_support_tickets: number
  active_sessions_today: number
}

export interface AdminUser {
  id: string
  email: string
  username: string | null
  auth_provider: string
  is_admin: boolean
  tier: string
  deck_count: number
  card_count: number
  last_activity: string | null
  created_at: string
}

export interface AdminUserListResponse {
  users: AdminUser[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface AdminDeck {
  id: string
  title: string
  owner_id: string
  owner_email: string
  owner_username: string | null
  is_shared: boolean
  copy_count: number
  card_count: number
  category_tags: string
  created_at: string
  updated_at: string
}

export interface AdminDeckListResponse {
  decks: AdminDeck[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export const adminApi = {
  getStats(): Promise<AdminStats> {
    return apiClient.get<AdminStats>('/admin/stats')
  },

  listUsers(params?: {
    page?: number
    per_page?: number
    search?: string
    tier?: string
    provider?: string
    is_admin?: boolean
  }): Promise<AdminUserListResponse> {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.per_page) query.append('per_page', params.per_page.toString())
    if (params?.search) query.append('search', params.search)
    if (params?.tier) query.append('tier', params.tier)
    if (params?.provider) query.append('provider', params.provider)
    if (params?.is_admin !== undefined) query.append('is_admin', params.is_admin.toString())

    const qs = query.toString()
    return apiClient.get<AdminUserListResponse>(`/admin/users${qs ? `?${qs}` : ''}`)
  },

  updateUser(userId: string, data: { is_admin?: boolean }): Promise<AdminUser> {
    return apiClient.patch<AdminUser>(`/admin/users/${userId}`, data)
  },

  listDecks(params?: {
    page?: number
    per_page?: number
    search?: string
    is_shared?: boolean
  }): Promise<AdminDeckListResponse> {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.per_page) query.append('per_page', params.per_page.toString())
    if (params?.search) query.append('search', params.search)
    if (params?.is_shared !== undefined) query.append('is_shared', params.is_shared.toString())

    const qs = query.toString()
    return apiClient.get<AdminDeckListResponse>(`/admin/decks${qs ? `?${qs}` : ''}`)
  },

  updateDeck(deckId: string, data: { is_shared?: boolean }): Promise<AdminDeck> {
    return apiClient.patch<AdminDeck>(`/admin/decks/${deckId}`, data)
  },

  deleteDeck(deckId: string): Promise<void> {
    return apiClient.delete<void>(`/admin/decks/${deckId}`)
  },
}
