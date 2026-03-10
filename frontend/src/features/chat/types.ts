export interface ChatMessage {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'admin'
  content: string
  created_at: string
}

export interface ChatConversation {
  id: string
  user_id: string | null
  guest_id: string | null
  type: 'ai' | 'admin'
  status: 'open' | 'closed'
  created_at: string
  updated_at: string
  last_message?: ChatMessage | null
}
