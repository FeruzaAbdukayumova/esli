import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { storage } from '@/shared/lib/storage'
import { jwt } from '@/shared/lib/jwt'
import { authApi } from '@/features/auth/api'
import { useMe } from '@/features/auth/hooks/useMe'
import { User } from '@/features/auth/types'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation()
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = storage.getToken()
    if (storedToken && jwt.isValid(storedToken)) {
      return storedToken
    }
    // Don't clear yet — we may be able to refresh
    return null
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryClient = useQueryClient()

  // On mount, if no valid token but we might have a refresh cookie, try silent refresh
  useEffect(() => {
    const storedToken = storage.getToken()
    if (!storedToken || jwt.isExpired(storedToken)) {
      setIsRefreshing(true)
      authApi
        .refresh()
        .then((res) => {
          storage.setToken(res.access_token)
          setToken(res.access_token)
        })
        .catch(() => {
          // No valid refresh token either — user must log in
          storage.removeToken()
          setToken(null)
        })
        .finally(() => setIsRefreshing(false))
    }
  }, [])

  // Enable /me query only when we have a valid token
  const hasValidToken = !!token && jwt.isValid(token)
  const { data: user, error, isError, isLoading } = useMe({
    enabled: hasValidToken,
  })

  // Sync language from user preferences on login
  useEffect(() => {
    if (user?.preferred_language && user.preferred_language !== i18n.language) {
      i18n.changeLanguage(user.preferred_language)
    }
  }, [user?.preferred_language, i18n])

  // Invalidate deck queries when auth changes (login/logout) so UI refreshes
  const prevAuthRef = useRef<{ user: unknown; token: string | null }>({ user: null, token: null })
  useEffect(() => {
    const prev = prevAuthRef.current
    const authChanged = prev.user !== user || prev.token !== token
    prevAuthRef.current = { user, token }
    if (authChanged) {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
    }
  }, [user, token, queryClient])

  // Handle 401 errors from /me endpoint
  useEffect(() => {
    if (isError && error) {
      const apiError = error as Error & { status?: number }
      if (apiError.status === 401) {
        storage.removeToken()
        setToken(null)
        queryClient.removeQueries({ queryKey: ['me'] })
      }
    }
  }, [isError, error, queryClient])

  // Subscribe to storage changes
  useEffect(() => {
    const updateToken = () => {
      const currentToken = storage.getToken()
      if (currentToken && jwt.isValid(currentToken)) {
        setToken(currentToken)
      } else {
        setToken(null)
        queryClient.removeQueries({ queryKey: ['me'] })
      }
    }

    // Subscribe to storage changes (same tab)
    const unsubscribe = storage.subscribe(updateToken)

    // Listen for storage changes (other tabs/windows)
    window.addEventListener('storage', updateToken)

    return () => {
      unsubscribe()
      window.removeEventListener('storage', updateToken)
    }
  }, [queryClient])

  const logout = async () => {
    await authApi.logout().catch(() => {})
    storage.removeToken()
    setToken(null)
    queryClient.removeQueries({ queryKey: ['me'] })
    queryClient.clear()
    window.location.href = window.location.origin + '/login'
  }

  // isLoading is true when refreshing or when fetching user data with a valid token
  const isUserLoading = isRefreshing || (hasValidToken && isLoading)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user && !!token,
        token,
        user: user ?? null,
        isLoading: isUserLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
