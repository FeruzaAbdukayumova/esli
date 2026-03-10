const GUEST_CHAT_ID_KEY = 'flashcards_guest_chat_id'

export function getGuestChatId(): string {
  let id = localStorage.getItem(GUEST_CHAT_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(GUEST_CHAT_ID_KEY, id)
  }
  return id
}
