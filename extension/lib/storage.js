const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

export const tokenStorage = {
  async getToken() {
    const data = await browserAPI.storage.local.get('access_token');
    return data.access_token || null;
  },

  async setToken(token) {
    await browserAPI.storage.local.set({ access_token: token });
  },

  async removeToken() {
    await browserAPI.storage.local.remove('access_token');
  },

  async getApiBaseUrl() {
    const data = await browserAPI.storage.local.get('api_base_url');
    return data.api_base_url || 'http://localhost:8000';
  },

  // Persists both front and back — each selection merges into the draft
  async setPendingSelection(text, side) {
    const data = await browserAPI.storage.local.get('cardDraft');
    const draft = data.cardDraft || { front: '', back: '' };
    draft[side] = text;
    await browserAPI.storage.local.set({ cardDraft: draft });
  },

  async getCardDraft() {
    const data = await browserAPI.storage.local.get('cardDraft');
    return data.cardDraft || { front: '', back: '' };
  },

  async saveCardDraft(front, back) {
    await browserAPI.storage.local.set({ cardDraft: { front, back } });
  },

  async clearCardDraft() {
    await browserAPI.storage.local.remove('cardDraft');
  },

  // AI generate from context menu
  async setPendingAIText(text) {
    await browserAPI.storage.local.set({ pendingAIText: text });
  },

  async getPendingAIText() {
    const data = await browserAPI.storage.local.get('pendingAIText');
    return data.pendingAIText || null;
  },

  async clearPendingAIText() {
    await browserAPI.storage.local.remove('pendingAIText');
  },

  // Deck persistence
  async getLastDeckId() {
    const data = await browserAPI.storage.local.get('lastDeckId');
    return data.lastDeckId || null;
  },

  async setLastDeckId(deckId) {
    await browserAPI.storage.local.set({ lastDeckId: deckId });
  }
};

