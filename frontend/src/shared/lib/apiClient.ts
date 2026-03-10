import { storage } from './storage'

const API_BASE_URL = '/api/v1'

let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

async function attemptRefresh(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (!response.ok) return null
    const data = await response.json()
    storage.setToken(data.access_token)
    return data.access_token
  } catch {
    return null
  }
}

function doRefresh(): Promise<string | null> {
  if (!isRefreshing) {
    isRefreshing = true
    refreshPromise = attemptRefresh().finally(() => {
      isRefreshing = false
      refreshPromise = null
    })
  }
  return refreshPromise!
}

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = storage.getToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // On 401, try to refresh the token and retry once
    if (response.status === 401 && !endpoint.startsWith('/auth/refresh') && !endpoint.startsWith('/auth/login') && !endpoint.startsWith('/auth/register')) {
      const newToken = await doRefresh()
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        })
        return this._handleResponse<T>(retryResponse)
      }
      // Refresh failed — clear token and redirect
      storage.removeToken()
      window.location.href = window.location.origin + '/login'
      throw new Error('Session expired')
    }

    return this._handleResponse<T>(response)
  },

  _handleResponse<T>(response: Response): Promise<T> | T {
    if (!response.ok) {
      return response.json().catch(() => ({ detail: 'An error occurred' })).then(error => {
        let errorMessage: string
        if (Array.isArray(error.detail)) {
          errorMessage = error.detail
            .map((err: { msg?: string; loc?: unknown[] }) => {
              const field = Array.isArray(err.loc) ? err.loc[err.loc.length - 1] : ''
              const msg = err.msg || 'Validation error'
              return field ? `${field}: ${msg}` : msg
            })
            .join(', ')
        } else if (typeof error.detail === 'string') {
          errorMessage = error.detail
        } else {
          errorMessage = `HTTP error! status: ${response.status}`
        }

        const apiError = new Error(errorMessage) as Error & { status?: number }
        apiError.status = response.status
        throw apiError
      })
    }

    if (response.status === 204) {
      return undefined as T
    }
    return response.text().then(text => (text ? JSON.parse(text) : undefined) as T)
  },

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  },

  patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  },
}
