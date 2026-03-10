import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import { storage } from '@/shared/lib/storage'
import { RegisterRequest, LoginRequest } from '../types'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      storage.setToken(response.access_token)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      const isExtension = new URLSearchParams(window.location.search).get('ext') === '1'
      navigate(isExtension ? '/auth/extension-done' : '/dashboard')
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      storage.setToken(response.access_token)
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['me'] })
      navigate('/dashboard')
    },
  })

  const logout = async () => {
    try {
      // Revoke refresh token server-side
      await authApi.logout().catch(() => {})
      storage.removeToken()
      queryClient.removeQueries({ queryKey: ['me'] })
      queryClient.clear()
      window.location.href = window.location.origin + '/login'
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = window.location.origin + '/login'
    }
  }

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}
