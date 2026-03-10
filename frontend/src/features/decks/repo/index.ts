import { useAuthContext } from '@/app/providers/AuthProvider'
import { localDeckRepo } from './localRepo'
import { apiDeckRepo } from './apiRepo'
import type { DeckRepository } from './types'

export type DeckRepoMode = 'guest' | 'api'

export function getDeckRepo(mode: DeckRepoMode): DeckRepository {
  return mode === 'api' ? apiDeckRepo : localDeckRepo
}

/**
 * Returns the deck repo and mode for the current auth state.
 * Use api repo when user is authenticated, local repo otherwise.
 */
export function useDeckRepo(): { repo: DeckRepository; mode: DeckRepoMode } {
  const { user } = useAuthContext()
  const mode: DeckRepoMode = user ? 'api' : 'guest'
  const repo = getDeckRepo(mode)
  return { repo, mode }
}

export { localDeckRepo } from './localRepo'
export { apiDeckRepo } from './apiRepo'
export type { DeckRepository } from './types'
