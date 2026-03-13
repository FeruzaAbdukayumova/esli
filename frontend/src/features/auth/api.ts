import { apiClient } from '@/shared/lib/apiClient'
import { RegisterRequest, LoginRequest, TokenResponse, User, UserUpdateRequest, SupportedLanguages } from './types'

export const authApi = {
  register: (data: RegisterRequest): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>('/auth/register', data, { credentials: 'include' })
  },

  login: (data: LoginRequest): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>('/auth/login', data, { credentials: 'include' })
  },

  refresh: (): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>('/auth/refresh', undefined, { credentials: 'include' })
  },

  logout: (): Promise<void> => {
    return apiClient.post<void>('/auth/logout', undefined, { credentials: 'include' })
  },

  getMe: (): Promise<User> => {
    return apiClient.get<User>('/auth/me')
  },

  updateMe: (data: UserUpdateRequest): Promise<User> => {
    return apiClient.patch<User>('/auth/me', data)
  },

  getSupportedLanguages: (): Promise<SupportedLanguages> => {
    return apiClient.get<SupportedLanguages>('/cards/languages/supported')
  },

  oauthAuthorize: (provider: 'google'): Promise<{ authorize_url: string; state: string }> => {
    return apiClient.get<{ authorize_url: string; state: string }>(`/oauth/${provider}/authorize`)
  },

  oauthCallback: (provider: 'google', code: string, state: string): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>(`/oauth/${provider}/callback`, { code, state }, { credentials: 'include' })
  },
}
