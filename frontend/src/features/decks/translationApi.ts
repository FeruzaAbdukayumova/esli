import { apiClient } from '@/shared/lib/apiClient'
import { TranslatedCard } from './types'

export const translationApi = {
  getTranslatedCard: async (cardId: string, lang: string): Promise<TranslatedCard> => {
    const response = await apiClient.get<TranslatedCard>(`/cards/${cardId}/translated?lang=${lang}`)
    return response
  },

  translateText: async (text: string, lang: string): Promise<string> => {
    const response = await apiClient.post<{ translated_text: string }>('/cards/translate-text', {
      text,
      lang,
    })
    return response.translated_text
  },
}
