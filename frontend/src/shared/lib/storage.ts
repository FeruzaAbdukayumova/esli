const TOKEN_KEY = 'access_token'

type StorageListener = () => void
const listeners = new Set<StorageListener>()

export const storage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
    listeners.forEach(listener => listener())
  },

  removeToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
    listeners.forEach(listener => listener())
  },

  clear(): void {
    if (typeof window === 'undefined') return
    localStorage.clear()
    listeners.forEach(listener => listener())
  },

  subscribe(listener: StorageListener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
