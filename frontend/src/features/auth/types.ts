export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface TokenResponse {
  access_token: string
}

export interface User {
  id: string
  email: string
  auth_provider: string
  username: string | null
  theme: string
  dark_mode: string
  preferred_language: string
  daily_new_card_limit: number
  subscription_tier: string
  subscription_status: string
  is_admin: boolean
  created_at: string
}

export interface UserUpdateRequest {
  preferred_language?: string
  daily_new_card_limit?: number
  username?: string
  theme?: string
  dark_mode?: string
}

export interface SupportedLanguages {
  languages: Record<string, string>
}
