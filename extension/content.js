// Guard against duplicate injection
if (!window.__esliContentScriptLoaded) {
  window.__esliContentScriptLoaded = true;

  const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

  browserAPI.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_SELECTION_FROM_PAGE') {
      const selection = window.getSelection().toString().trim();
      sendResponse({ text: selection });
      return false;
    }

    if (msg.type === 'GET_PAGE_TEXT') {
      const sel = window.getSelection();
      const selected = sel ? sel.toString().trim() : '';
      if (selected) {
        sendResponse({ text: selected });
      } else {
        const body = (document.body.innerText || '').trim().slice(0, 5000);
        sendResponse({ text: body });
      }
      return false;
    }
  });
}
