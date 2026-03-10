import { tokenStorage } from './lib/storage.js';

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Register context menu on install
browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.contextMenus.create({
    id: 'flashcards-parent',
    title: 'Add to Esli',
    contexts: ['selection']
  });
  browserAPI.contextMenus.create({
    id: 'add-as-front',
    parentId: 'flashcards-parent',
    title: 'As Front side',
    contexts: ['selection']
  });
  browserAPI.contextMenus.create({
    id: 'add-as-back',
    parentId: 'flashcards-parent',
    title: 'As Back side',
    contexts: ['selection']
  });
  browserAPI.contextMenus.create({
    id: 'ai-generate-separator',
    parentId: 'flashcards-parent',
    type: 'separator',
    contexts: ['selection']
  });
  browserAPI.contextMenus.create({
    id: 'ai-generate',
    parentId: 'flashcards-parent',
    title: 'AI Generate Cards',
    contexts: ['selection']
  });
});

// Handle context menu click
browserAPI.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.selectionText) return;
  const text = info.selectionText.trim();

  if (info.menuItemId === 'add-as-front') {
    await tokenStorage.setPendingSelection(text, 'front');
  } else if (info.menuItemId === 'add-as-back') {
    await tokenStorage.setPendingSelection(text, 'back');
  } else if (info.menuItemId === 'ai-generate') {
    await tokenStorage.setPendingAIText(text);
  } else {
    return;
  }

  try {
    await browserAPI.action.openPopup();
  } catch (e) {
    browserAPI.action.setBadgeText({ text: '1' });
    browserAPI.action.setBadgeBackgroundColor({ color: '#6366f1' });
  }
});

// Clear badge when popup opens + handle app login flow
browserAPI.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'POPUP_OPENED') {
    browserAPI.action.setBadgeText({ text: '' });
    sendResponse({ ok: true });
  }

  if (msg.type === 'OPEN_APP_LOGIN') {
    openAppLogin(msg.appUrl);
    sendResponse({ ok: true });
  }

  return true;
});

// Open the app login page and monitor for token callback
async function openAppLogin(appUrl) {
  const loginUrl = `${appUrl}/login?ext=1`;
  const tab = await browserAPI.tabs.create({ url: loginUrl });
  const tabId = tab.id;

  const onUpdated = (updatedTabId, changeInfo) => {
    if (updatedTabId !== tabId || !changeInfo.url) return;

    const url = changeInfo.url;
    if (url.includes('/auth/extension-done')) {
      const hashIndex = url.indexOf('#token=');
      if (hashIndex !== -1) {
        const token = url.substring(hashIndex + 7);
        if (token) {
          tokenStorage.setToken(token).then(() => {
            cleanup();
            browserAPI.tabs.remove(tabId).catch(() => {});
            // Show badge to indicate sign-in success
            browserAPI.action.setBadgeText({ text: '✓' });
            browserAPI.action.setBadgeBackgroundColor({ color: '#22c55e' });
            setTimeout(() => browserAPI.action.setBadgeText({ text: '' }), 3000);
          });
        }
      }
    }
  };

  const onRemoved = (closedTabId) => {
    if (closedTabId === tabId) cleanup();
  };

  function cleanup() {
    browserAPI.tabs.onUpdated.removeListener(onUpdated);
    browserAPI.tabs.onRemoved.removeListener(onRemoved);
  }

  browserAPI.tabs.onUpdated.addListener(onUpdated);
  browserAPI.tabs.onRemoved.addListener(onRemoved);
}
