import {
  Deck,
  Card,
  CreateDeckInput,
  UpdateDeckInput,
  CreateCardInput,
  UpdateCardInput,
  RecallResponse,
  CardIntervals,
} from '../types'

export interface DeckRepository {
  listDecks(): Promise<Deck[]>
  getDeck(deckId: string): Promise<Deck | null>
  createDeck(input: CreateDeckInput): Promise<Deck>
  updateDeck(deckId: string, patch: UpdateDeckInput): Promise<Deck>
  deleteDeck(deckId: string): Promise<void>
  listCards(deckId: string): Promise<Card[]>
  addCard(deckId: string, cardInput: CreateCardInput): Promise<Card>
  addCardsBatch(deckId: string, cards: CreateCardInput[]): Promise<Card[]>
  updateCard(deckId: string, cardId: string, patch: UpdateCardInput): Promise<Card>
  deleteCard(deckId: string, cardId: string): Promise<void>
  reviewCard(deckId: string, cardId: string, response: RecallResponse): Promise<Card>
  getCardIntervals?(cardId: string): Promise<CardIntervals>
}
