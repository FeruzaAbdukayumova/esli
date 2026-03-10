# Esli Browser Extension

Chrome + Firefox extension to create flashcards from any webpage.

## Features

- Select text on any page and add it as the front or back of a flashcard
- Persistent draft — select front text, close popup, select back text, reopen popup, both fields are filled
- Quick create new decks without leaving the extension
- Login with your Esli account (email/password)

## How to Use

1. Select text on any webpage
2. Right-click → **Add to Esli** → **As Front side** or **As Back side**
3. Extension popup opens with the selected text in the chosen field
4. Repeat for the other side (or type it manually)
5. Pick a deck (or click **+** to create a new one)
6. Click **Add Card**

## Installation

### Chrome (or Edge, Brave, etc.)

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `extension/` folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `extension/manifest.json`

## File Structure

```
extension/
  manifest.json       # MV3 manifest (Chrome + Firefox)
  background.js       # Service worker: context menu, selection storage
  content.js          # Reads page selection on request
  popup.html          # Popup UI
  popup.js            # Popup logic: login, deck picker, card creation
  popup.css           # Styling
  lib/
    storage.js        # chrome.storage.local wrapper (token, draft)
    api.js            # API client: login, fetchDecks, createDeck, createCard
  icons/
    icon16.png
    icon48.png
    icon128.png
```

## Requirements

- Backend running at `http://localhost:8000` (or configure via `api_base_url` in extension storage)
- A registered user account (email/password login)

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `POST /api/v1/auth/login` | User authentication |
| `GET /api/v1/decks` | Fetch user's decks |
| `POST /api/v1/decks` | Create a new deck |
| `POST /api/v1/decks/{id}/cards` | Create a card |

## Notes

- JWT access token (4-hour lifetime) is stored in `chrome.storage.local`. When it expires, you'll be prompted to sign in again.
- The card draft (front/back text) persists across popup open/close until the card is submitted.
- Firefox requires version 120+ for MV3 service worker support.
