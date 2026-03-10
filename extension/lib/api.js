import { tokenStorage } from './storage.js';

async function apiRequest(endpoint, options = {}) {
  const baseUrl = await tokenStorage.getApiBaseUrl();
  const token = await tokenStorage.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}/api/v1${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    await tokenStorage.removeToken();
    throw new Error('AUTH_EXPIRED');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    const detail = error.detail;
    const message = typeof detail === 'string' ? detail
      : Array.isArray(detail) ? detail.map(d => d.msg || d.message || JSON.stringify(d)).join('; ')
      : `HTTP ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function login(email, password) {
  const baseUrl = await tokenStorage.getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(err.detail || 'Login failed');
  }

  const data = await response.json();
  await tokenStorage.setToken(data.access_token);
  return data;
}

export async function fetchMe() {
  return apiRequest('/auth/me', { method: 'GET' });
}

export async function fetchDecks() {
  return apiRequest('/decks', { method: 'GET' });
}

export async function createDeck(title) {
  return apiRequest('/decks', {
    method: 'POST',
    body: JSON.stringify({ title })
  });
}

export async function createCard(deckId, frontText, backText) {
  return apiRequest(`/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({ front_text: frontText, back_text: backText })
  });
}

export async function generateCards(topic, count = 10, language = '') {
  const body = { topic, count };
  if (language) body.language = language;
  return apiRequest('/ai/generate-cards', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export async function generateCardsFromPdf(file, count = 10, topic = '', language = '') {
  const baseUrl = await tokenStorage.getApiBaseUrl();
  const token = await tokenStorage.getToken();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('count', String(count));
  if (topic) formData.append('topic', topic);
  if (language) formData.append('language', language);

  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${baseUrl}/api/v1/ai/generate-cards-from-pdf`, {
    method: 'POST',
    headers,
    body: formData
  });

  if (response.status === 401) {
    await tokenStorage.removeToken();
    throw new Error('AUTH_EXPIRED');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    const detail = error.detail;
    const message = typeof detail === 'string' ? detail
      : Array.isArray(detail) ? detail.map(d => d.msg || d.message || JSON.stringify(d)).join('; ')
      : `HTTP ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export async function batchCreateCards(deckId, cards) {
  return apiRequest(`/decks/${deckId}/cards/batch`, {
    method: 'POST',
    body: JSON.stringify({ cards: cards.map(c => ({ front_text: c.front_text, back_text: c.back_text })) })
  });
}

export async function logout() {
  await tokenStorage.removeToken();
}
