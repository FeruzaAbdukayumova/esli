import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { authApi } from '../api'
import { User } from '../types'

export const useMe = (options?: Omit<UseQueryOptions<User, Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.getMe(),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}
