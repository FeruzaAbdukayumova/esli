import { tokenStorage } from './lib/storage.js';
import { login, fetchMe, fetchDecks, createDeck, createCard, generateCards, batchCreateCards, logout } from './lib/api.js';

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// App URL for sign-up links
const APP_URL = 'https://app.esli.app';

// DOM elements — Login
const loginSection = document.getElementById('login-section');
const cardSection = document.getElementById('card-section');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('password-toggle');
const googleSignInBtn = document.getElementById('google-signin-btn');

// DOM elements — Guest CTA
const guestCta = document.getElementById('guest-cta');
const guestCtaLink = document.getElementById('guest-cta-link');

// DOM elements — Manual tab
const frontInput = document.getElementById('front-input');
const backInput = document.getElementById('back-input');
const deckSelect = document.getElementById('deck-select');
const newDeckBtn = document.getElementById('new-deck-btn');
const newDeckForm = document.getElementById('new-deck-form');
const newDeckName = document.getElementById('new-deck-name');
const createDeckBtn = document.getElementById('create-deck-btn');
const cancelDeckBtn = document.getElementById('cancel-deck-btn');
const addCardBtn = document.getElementById('add-card-btn');
const cardError = document.getElementById('card-error');
const cardSuccess = document.getElementById('card-success');
const manualGuestCta = document.getElementById('manual-guest-cta');
const manualGuestLink = document.getElementById('manual-guest-link');

// DOM elements — Tabs
const tabManual = document.getElementById('tab-manual');
const tabAi = document.getElementById('tab-ai');
const tabs = document.querySelectorAll('.tab');

// DOM elements — AI tab
const extractPageBtn = document.getElementById('extract-page-btn');
const pageTextPreview = document.getElementById('page-text-preview');
const pageText = document.getElementById('page-text');
const pageTextLength = document.getElementById('page-text-length');
const aiCount = document.getElementById('ai-count');
const aiDeckSelect = document.getElementById('ai-deck-select');
const aiNewDeckBtn = document.getElementById('ai-new-deck-btn');
const aiNewDeckForm = document.getElementById('ai-new-deck-form');
const aiNewDeckName = document.getElementById('ai-new-deck-name');
const aiCreateDeckBtn = document.getElementById('ai-create-deck-btn');
const aiCancelDeckBtn = document.getElementById('ai-cancel-deck-btn');
const aiError = document.getElementById('ai-error');
const aiGenerateBtn = document.getElementById('ai-generate-btn');
const aiLoading = document.getElementById('ai-loading');
const aiForm = document.getElementById('ai-form');
const aiPreview = document.getElementById('ai-preview');
const aiPreviewCount = document.getElementById('ai-preview-count');
const aiCardList = document.getElementById('ai-card-list');
const aiBackBtn = document.getElementById('ai-back-btn');
const aiSaveBtn = document.getElementById('ai-save-btn');
const aiSaveError = document.getElementById('ai-save-error');
const aiSaveSuccess = document.getElementById('ai-save-success');
const aiSaveSuccessText = document.getElementById('ai-save-success-text');
const aiLanguage = document.getElementById('ai-language');
const aiRemoveAllBtn = document.getElementById('ai-remove-all-btn');
const aiGuestSaveCta = document.getElementById('ai-guest-save-cta');
const aiGuestSaveLink = document.getElementById('ai-guest-save-link');
const loadingMessage = document.querySelector('.loading-message');
const loadingSub = document.querySelector('.loading-sub');

let decks = [];
let generatedCards = [];
let isGuest = false;
let userTier = 'free';

const TIER_CARD_OPTIONS = {
  free: [5, 10, 20],
  pro: [5, 10, 20, 30, 50],
  premium: [5, 10, 20, 30, 50, 75, 100],
};

function updateCardCountOptions(tier) {
  const options = TIER_CARD_OPTIONS[tier] || TIER_CARD_OPTIONS.free;
  const currentValue = parseInt(aiCount.value) || 10;
  aiCount.innerHTML = '';
  options.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    if (n === currentValue) opt.selected = true;
    aiCount.appendChild(opt);
  });
  // If current value not in new options, select the closest
  if (!options.includes(currentValue)) {
    const closest = options.reduce((a, b) => Math.abs(b - currentValue) < Math.abs(a - currentValue) ? b : a);
    aiCount.value = closest;
  }
}

// ---- Initialization ----

async function init() {
  browserAPI.runtime.sendMessage({ type: 'POPUP_OPENED' }).catch(() => {});

  const draft = await tokenStorage.getCardDraft();
  frontInput.value = draft.front;
  backInput.value = draft.back;

  // Set sign-up links
  const signUpUrl = `${APP_URL}/register`;
  guestCtaLink.href = signUpUrl;
  aiGuestSaveLink.href = signUpUrl;
  manualGuestLink.href = signUpUrl;

  const token = await tokenStorage.getToken();
  if (token) {
    isGuest = false;
    await showCardSection();
  } else {
    isGuest = true;
    showCardSectionGuest();
  }

  // Check for pending AI text from context menu
  const pendingAIText = await tokenStorage.getPendingAIText();
  if (pendingAIText) {
    await tokenStorage.clearPendingAIText();
    // Switch to AI tab
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="ai"]').classList.add('active');
    tabManual.classList.add('hidden');
    tabAi.classList.remove('hidden');
    // Pre-fill extracted text
    pageText.value = pendingAIText;
    pageTextPreview.classList.remove('hidden');
    updatePageTextLength();
  }
}

// ---- Draft persistence ----
frontInput.addEventListener('input', () => {
  tokenStorage.saveCardDraft(frontInput.value, backInput.value);
});
backInput.addEventListener('input', () => {
  tokenStorage.saveCardDraft(frontInput.value, backInput.value);
});

// ---- UI State ----

function showLoginSection() {
  loginSection.classList.remove('hidden');
  cardSection.classList.add('hidden');
}

async function showCardSection() {
  loginSection.classList.add('hidden');
  cardSection.classList.remove('hidden');
  logoutBtn.textContent = 'Sign Out';
  logoutBtn.title = 'Sign out';

  // Hide guest CTAs, show auth controls
  guestCta.classList.add('hidden');
  setGuestUI(false);

  try {
    const [me, fetchedDecks] = await Promise.all([fetchMe(), fetchDecks()]);
    userTier = me.subscription_tier || 'free';
    updateCardCountOptions(userTier);
    decks = fetchedDecks;
    populateDeckDropdown(deckSelect, decks);
    populateDeckDropdown(aiDeckSelect, decks);
    await restoreLastDeck();
  } catch (e) {
    if (e.message === 'AUTH_EXPIRED') {
      isGuest = true;
      showCardSectionGuest();
      return;
    }
    showError(cardError, 'Failed to load decks');
  }
}

function showCardSectionGuest() {
  loginSection.classList.add('hidden');
  cardSection.classList.remove('hidden');
  logoutBtn.textContent = 'Sign In';
  logoutBtn.title = 'Sign in to your account';

  // Show guest CTA, hide auth-only controls
  guestCta.classList.remove('hidden');
  setGuestUI(true);

  // Reset to free tier options
  userTier = 'free';
  updateCardCountOptions('free');

  // Empty deck dropdowns for guest
  populateDeckDropdown(deckSelect, []);
  populateDeckDropdown(aiDeckSelect, []);
}

function setGuestUI(guest) {
  // AI tab: hide deck selector + new deck form, show guest save CTA instead of save button
  const aiDeckField = aiDeckSelect.closest('.field');
  if (guest) {
    aiDeckField.classList.add('hidden');
    aiNewDeckForm.classList.add('hidden');
    aiNewDeckBtn.classList.add('hidden');
  } else {
    aiDeckField.classList.remove('hidden');
    aiNewDeckBtn.classList.remove('hidden');
  }

  // Manual tab: hide deck selector + new deck + add card button, show guest CTA
  const manualDeckField = deckSelect.closest('.field');
  if (guest) {
    manualDeckField.classList.add('hidden');
    newDeckForm.classList.add('hidden');
    newDeckBtn.classList.add('hidden');
    addCardBtn.classList.add('hidden');
    manualGuestCta.classList.remove('hidden');
  } else {
    manualDeckField.classList.remove('hidden');
    newDeckBtn.classList.remove('hidden');
    addCardBtn.classList.remove('hidden');
    manualGuestCta.classList.add('hidden');
  }
}

async function restoreLastDeck() {
  const lastDeckId = await tokenStorage.getLastDeckId();
  if (lastDeckId) {
    const exists = decks.some(d => String(d.id) === String(lastDeckId));
    if (exists) {
      deckSelect.value = lastDeckId;
      aiDeckSelect.value = lastDeckId;
    }
  }
}

function populateDeckDropdown(selectEl, deckList) {
  selectEl.innerHTML = '';
  if (!deckList || deckList.length === 0) {
    selectEl.innerHTML = '<option value="">No decks — create one</option>';
    return;
  }
  deckList.forEach(deck => {
    const opt = document.createElement('option');
    opt.value = deck.id;
    opt.textContent = deck.title;
    selectEl.appendChild(opt);
  });
}

function showError(el, message) {
  el.textContent = message;
  el.classList.remove('hidden');
}

function hideError(el) {
  el.classList.add('hidden');
}

function showSuccess(el) {
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 3000);
}

// ---- Persist deck selection ----
deckSelect.addEventListener('change', () => {
  tokenStorage.setLastDeckId(deckSelect.value);
  aiDeckSelect.value = deckSelect.value;
});
aiDeckSelect.addEventListener('change', () => {
  tokenStorage.setLastDeckId(aiDeckSelect.value);
  deckSelect.value = aiDeckSelect.value;
});

// ---- Tab Switching ----

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.tab;
    if (target === 'manual') {
      tabManual.classList.remove('hidden');
      tabAi.classList.add('hidden');
    } else {
      tabManual.classList.add('hidden');
      tabAi.classList.remove('hidden');
    }
  });
});

// ---- Password Toggle ----

passwordToggle.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  passwordToggle.textContent = isPassword ? '🙈' : '👁';
  passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

// ---- Clear login errors on typing ----

emailInput.addEventListener('input', () => hideError(loginError));
passwordInput.addEventListener('input', () => hideError(loginError));

// ---- Page Text Length ----

function updatePageTextLength() {
  if (pageText.value) {
    pageTextLength.textContent = `(${pageText.value.length.toLocaleString()} chars)`;
  }
}

// ---- Keyboard Shortcuts ----

newDeckName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); createDeckBtn.click(); }
  if (e.key === 'Escape') { e.preventDefault(); newDeckForm.classList.add('hidden'); }
});

aiNewDeckName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); aiCreateDeckBtn.click(); }
  if (e.key === 'Escape') { e.preventDefault(); aiNewDeckForm.classList.add('hidden'); }
});

// ---- Event Handlers — Login ----

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError(loginError);

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="btn-spinner"></span> Signing in...';
    await login(email, password);
    isGuest = false;
    await showCardSection();
  } catch (err) {
    showError(loginError, err.message);
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  }
});

// ---- Event Handlers — Sign In via App ----

googleSignInBtn.addEventListener('click', async () => {
  hideError(loginError);
  // Tell background script to open login tab and monitor for token
  browserAPI.runtime.sendMessage({ type: 'OPEN_APP_LOGIN', appUrl: APP_URL });
  // Popup will close when user switches to the new tab.
  // When they finish login, background captures the token.
  // Next time popup opens, init() will detect the token.
});

logoutBtn.addEventListener('click', async () => {
  if (isGuest) {
    showLoginSection();
  } else {
    await logout();
    isGuest = true;
    showCardSectionGuest();
  }
});

// ---- Event Handlers — Manual Tab (New Deck) ----

newDeckBtn.addEventListener('click', () => {
  newDeckForm.classList.remove('hidden');
  newDeckName.value = '';
  newDeckName.focus();
});

cancelDeckBtn.addEventListener('click', () => {
  newDeckForm.classList.add('hidden');
});

createDeckBtn.addEventListener('click', async () => {
  const title = newDeckName.value.trim();
  if (!title) return;

  try {
    createDeckBtn.disabled = true;
    createDeckBtn.textContent = '...';
    const newDeck = await createDeck(title);
    decks.unshift(newDeck);
    populateDeckDropdown(deckSelect, decks);
    populateDeckDropdown(aiDeckSelect, decks);
    deckSelect.value = newDeck.id;
    aiDeckSelect.value = newDeck.id;
    tokenStorage.setLastDeckId(newDeck.id);
    newDeckForm.classList.add('hidden');
  } catch (err) {
    if (err.message === 'AUTH_EXPIRED') { isGuest = true; showCardSectionGuest(); return; }
    showError(cardError, err.message);
  } finally {
    createDeckBtn.disabled = false;
    createDeckBtn.textContent = 'Create';
  }
});

// ---- Event Handlers — Manual Tab (Add Card) ----

addCardBtn.addEventListener('click', async () => {
  hideError(cardError);

  const deckId = deckSelect.value;
  const front = frontInput.value.trim();
  const back = backInput.value.trim();

  let valid = true;
  if (!front) { frontInput.classList.add('invalid'); valid = false; } else { frontInput.classList.remove('invalid'); }
  if (!back) { backInput.classList.add('invalid'); valid = false; } else { backInput.classList.remove('invalid'); }

  if (!deckId) { showError(cardError, 'Please select a deck'); return; }
  if (!valid) { showError(cardError, 'Please fill in both sides of the card'); return; }

  try {
    addCardBtn.disabled = true;
    addCardBtn.innerHTML = '<span class="btn-spinner"></span> Adding...';
    await createCard(deckId, front, back);

    const deckName = decks.find(d => String(d.id) === String(deckId))?.title || 'deck';
    document.getElementById('card-success-text').textContent = ` Card added to ${deckName}!`;
    showSuccess(cardSuccess);
    frontInput.value = '';
    backInput.value = '';
    frontInput.classList.remove('invalid');
    backInput.classList.remove('invalid');
    await tokenStorage.clearCardDraft();
  } catch (err) {
    if (err.message === 'AUTH_EXPIRED') { isGuest = true; showCardSectionGuest(); return; }
    showError(cardError, err.message);
  } finally {
    addCardBtn.disabled = false;
    addCardBtn.textContent = 'Add Card';
  }
});

frontInput.addEventListener('input', () => frontInput.classList.remove('invalid'));
backInput.addEventListener('input', () => backInput.classList.remove('invalid'));

// ---- Event Handlers — AI Tab (New Deck) ----

aiNewDeckBtn.addEventListener('click', () => {
  aiNewDeckForm.classList.remove('hidden');
  aiNewDeckName.value = '';
  aiNewDeckName.focus();
});

aiCancelDeckBtn.addEventListener('click', () => {
  aiNewDeckForm.classList.add('hidden');
});

aiCreateDeckBtn.addEventListener('click', async () => {
  const title = aiNewDeckName.value.trim();
  if (!title) return;

  try {
    aiCreateDeckBtn.disabled = true;
    aiCreateDeckBtn.textContent = '...';
    const newDeck = await createDeck(title);
    decks.unshift(newDeck);
    populateDeckDropdown(deckSelect, decks);
    populateDeckDropdown(aiDeckSelect, decks);
    deckSelect.value = newDeck.id;
    aiDeckSelect.value = newDeck.id;
    tokenStorage.setLastDeckId(newDeck.id);
    aiNewDeckForm.classList.add('hidden');
  } catch (err) {
    if (err.message === 'AUTH_EXPIRED') { isGuest = true; showCardSectionGuest(); return; }
    showError(aiError, err.message);
  } finally {
    aiCreateDeckBtn.disabled = false;
    aiCreateDeckBtn.textContent = 'Create';
  }
});

// ---- Event Handlers — AI Tab (Page Text Extraction) ----

extractPageBtn.addEventListener('click', async () => {
  try {
    extractPageBtn.disabled = true;
    extractPageBtn.textContent = 'Extracting...';
    hideError(aiError);

    const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.id) {
      showError(aiError, 'No active tab found');
      return;
    }

    if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('about:'))) {
      showError(aiError, 'Cannot extract text from this page');
      return;
    }

    // Ensure content script is injected
    try {
      await browserAPI.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (e) {
      // Content script may already be injected
    }

    let response;
    try {
      response = await browserAPI.tabs.sendMessage(tab.id, { type: 'GET_PAGE_TEXT' });
    } catch (e) {
      showError(aiError, 'Could not connect to the page. Try refreshing it.');
      return;
    }

    // Extract text — handle various response shapes
    const text = typeof response === 'string' ? response
      : response?.text ?? response?.result?.text ?? null;

    if (text && typeof text === 'string') {
      pageText.value = text;
      pageTextPreview.classList.remove('hidden');
      updatePageTextLength();
    } else {
      showError(aiError, 'No text found on the page');
    }
  } catch (err) {
    showError(aiError, 'Could not extract text. Try refreshing the page.');
  } finally {
    extractPageBtn.disabled = false;
    extractPageBtn.textContent = 'Extract from Page';
  }
});

// ---- Event Handlers — AI Tab (Generate) ----

aiGenerateBtn.addEventListener('click', async () => {
  hideError(aiError);
  const count = parseInt(aiCount.value);
  const language = aiLanguage.value;

  const text = pageText.value.trim();
  if (!text) {
    showError(aiError, 'Please extract text from the page first');
    return;
  }

  try {
    showAiLoading(`Generating ${count} cards from page text...`);
    const result = await generateCards(text, count, language);

    if (result && result.cards && result.cards.length > 0) {
      generatedCards = result.cards.map((c, i) => ({
        id: i,
        front_text: c.front_text,
        back_text: c.back_text
      }));

      // Auto-create deck from suggested title (authenticated users only)
      if (!isGuest && result.suggested_title && decks.length === 0) {
        const newDeck = await createDeck(result.suggested_title);
        decks.unshift(newDeck);
        populateDeckDropdown(deckSelect, decks);
        populateDeckDropdown(aiDeckSelect, decks);
        aiDeckSelect.value = newDeck.id;
        deckSelect.value = newDeck.id;
        tokenStorage.setLastDeckId(newDeck.id);
      }

      showAiPreview();
    } else {
      hideAiLoading();
      showError(aiError, 'No cards were generated. Try a different page.');
    }
  } catch (err) {
    hideAiLoading();
    if (err.message === 'AUTH_EXPIRED') { isGuest = true; showCardSectionGuest(); return; }
    showError(aiError, err.message);
  }
});

// ---- Event Handlers — AI Tab (Preview) ----

aiBackBtn.addEventListener('click', () => {
  if (generatedCards.length > 0) {
    if (!confirm(`Discard ${generatedCards.length} generated card${generatedCards.length !== 1 ? 's' : ''}?`)) {
      return;
    }
  }
  generatedCards = [];
  aiPreview.classList.add('hidden');
  aiForm.classList.remove('hidden');
  hideError(aiSaveError);
  aiSaveSuccess.classList.add('hidden');
});

aiRemoveAllBtn.addEventListener('click', () => {
  if (generatedCards.length === 0) return;
  if (!confirm(`Remove all ${generatedCards.length} cards?`)) return;
  generatedCards = [];
  renderCardList();
});

aiSaveBtn.addEventListener('click', async () => {
  hideError(aiSaveError);

  const deckId = aiDeckSelect.value;
  if (!deckId) { showError(aiSaveError, 'Please select a deck first'); return; }
  if (generatedCards.length === 0) { showError(aiSaveError, 'No cards to save'); return; }

  const deckName = decks.find(d => String(d.id) === String(deckId))?.title || 'deck';
  const cardCount = generatedCards.length;

  try {
    aiSaveBtn.disabled = true;
    aiSaveBtn.innerHTML = '<span class="btn-spinner"></span> Saving...';
    await batchCreateCards(deckId, generatedCards);

    aiSaveSuccessText.textContent = `${cardCount} card${cardCount !== 1 ? 's' : ''} saved to ${deckName}!`;
    showSuccess(aiSaveSuccess);
    aiSaveBtn.textContent = 'Saved!';

    setTimeout(() => {
      generatedCards = [];
      aiPreview.classList.add('hidden');
      aiForm.classList.remove('hidden');
      pageText.value = '';
      pageTextPreview.classList.add('hidden');
      aiSaveBtn.disabled = false;
      aiSaveBtn.textContent = 'Save All to Deck';
    }, 1500);
  } catch (err) {
    if (err.message === 'AUTH_EXPIRED') { isGuest = true; showCardSectionGuest(); return; }
    showError(aiSaveError, err.message);
    aiSaveBtn.disabled = false;
    aiSaveBtn.textContent = 'Save All to Deck';
  }
});

// ---- AI UI Helpers ----

function showAiLoading(message) {
  aiForm.classList.add('hidden');
  aiLoading.classList.remove('hidden');
  aiPreview.classList.add('hidden');
  if (loadingMessage && message) loadingMessage.textContent = message;
  if (loadingSub) loadingSub.textContent = 'This may take 10–30 seconds';
}

function hideAiLoading() {
  aiLoading.classList.add('hidden');
  aiForm.classList.remove('hidden');
}

function showAiPreview() {
  aiLoading.classList.add('hidden');
  aiForm.classList.add('hidden');
  aiPreview.classList.remove('hidden');

  // Toggle save button vs guest CTA
  if (isGuest) {
    aiSaveBtn.classList.add('hidden');
    aiGuestSaveCta.classList.remove('hidden');
    // Hide deck selector in preview for guests
    const aiDeckField = aiDeckSelect.closest('.field');
    if (aiDeckField) aiDeckField.classList.add('hidden');
  } else {
    aiSaveBtn.classList.remove('hidden');
    aiGuestSaveCta.classList.add('hidden');
  }

  renderCardList();
}

function renderCardList() {
  aiCardList.innerHTML = '';
  const count = generatedCards.length;
  aiPreviewCount.textContent = `${count} card${count !== 1 ? 's' : ''}`;

  if (!isGuest) {
    aiSaveBtn.textContent = count > 0
      ? `Save ${count} Card${count !== 1 ? 's' : ''} to Deck`
      : 'No Cards to Save';
    aiSaveBtn.disabled = count === 0;
  }

  if (count === 0) {
    aiCardList.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>All cards have been removed.<br>Go back to generate new ones.</p></div>';
    return;
  }

  generatedCards.forEach((card, index) => {
    const div = document.createElement('div');
    div.className = 'preview-card';
    div.dataset.index = index;
    div.innerHTML = `
      <div class="card-number">Card ${index + 1} of ${count}</div>
      <div class="card-front">${escapeHtml(card.front_text)}</div>
      <div class="card-back">${escapeHtml(card.back_text)}</div>
      <div class="card-actions">
        <button type="button" class="card-action-btn edit" title="Edit">✎</button>
        <button type="button" class="card-action-btn remove" title="Remove">✕</button>
      </div>
    `;

    div.querySelector('.edit').addEventListener('click', () => {
      startEditing(div, index);
    });

    div.querySelector('.remove').addEventListener('click', () => {
      generatedCards.splice(index, 1);
      renderCardList();
    });

    aiCardList.appendChild(div);
  });
}

function startEditing(div, index) {
  const card = generatedCards[index];
  div.classList.add('editing');
  div.innerHTML = `
    <div class="edit-fields">
      <textarea class="edit-front" rows="2">${escapeHtml(card.front_text)}</textarea>
      <textarea class="edit-back" rows="2">${escapeHtml(card.back_text)}</textarea>
      <div class="edit-actions">
        <button type="button" class="btn-small secondary cancel-edit">Cancel</button>
        <button type="button" class="btn-small primary save-edit">Save</button>
      </div>
    </div>
  `;

  const editFront = div.querySelector('.edit-front');
  const editBack = div.querySelector('.edit-back');

  div.querySelector('.save-edit').addEventListener('click', () => {
    const newFront = editFront.value.trim();
    const newBack = editBack.value.trim();
    if (newFront && newBack) {
      generatedCards[index].front_text = newFront;
      generatedCards[index].back_text = newBack;
    }
    renderCardList();
  });

  div.querySelector('.cancel-edit').addEventListener('click', () => {
    renderCardList();
  });

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      renderCardList();
    }
  };
  editFront.addEventListener('keydown', handleEscape);
  editBack.addEventListener('keydown', handleEscape);

  editFront.focus();
}

// ---- Utilities ----

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function truncate(str, maxLen) {
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}

init();
