# Esli Frontend

React + TypeScript frontend application built with Vite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

- Authentication (Register/Login) with JWT + refresh tokens
- Google OAuth support
- Protected routes
- React Router for navigation
- TanStack Query for data fetching
- Deck and card management
- **SM-2 Spaced Repetition Study Mode**
  - 3D flip card animation
  - 4 response options: Again, Hard, Good, Easy
  - Dynamic interval display on each button
  - Navigation arrows on card sides (desktop) / below card (mobile)
  - Must flip card before proceeding to next
  - Keyboard shortcuts: Space (flip), 1-4 (respond), Arrow keys (navigate)
  - Dismissible keyboard shortcuts banner on study page
  - Session queue with "again" re-insertion
  - Session persistence — resume where you left off (both due-card and practice mode)
  - Completion screen with trophy icon, confetti, session stats bars, and relative next review time
- Welcome modal with feature highlights for first-time users
- Rich empty state dashboard with 3 quick-start options (create, AI generate, browse shared)
- Browse and copy public decks
- Multi-language card translation (13 languages via MyMemory API)
- AI card generation from topic or PDF (via Claude API)
- File import from Excel/CSV with auto-detect column mapping
- Daily new card limit (configurable per user, default: 20)
- Theme system: 6 color presets with dark mode (light/dark/system)
- User profile with editable username
- Dashboard statistics (streak, mastery, review forecast)
- Guest mode with localStorage
- **Browser Extension** (Chrome + Firefox) for quick card creation from any webpage

## Project Structure

```
src/
  app/            # App setup, providers (Auth, Theme), router
  pages/          # Page components
    dashboard/    # Dashboard (decomposed: ContinueStudying, YourDecks, DashboardStats, SharedDecksSection)
    deck/         # Deck detail, card management, file import, AI generate
    study/        # Study mode with SM-2
    auth/         # Login, Register, AuthPageLayout
    profile/      # User profile
    browse/       # Public deck detail
  features/       # Feature modules (auth, decks, study, sync, stats)
  shared/         # Shared utilities (apiClient, guestStorage, themeStore) and UI components
```

## Routes

| Path | Description |
|------|-------------|
| `/` or `/dashboard` | Main dashboard |
| `/browse` | Browse public decks |
| `/browse/:deckId` | Public deck detail |
| `/deck/:deckId` | Deck detail view |
| `/study/:deckId` | Study mode |
| `/decks` | Decks list |
| `/settings` | User settings |
| `/profile` | User profile |
| `/login` | Login page |
| `/register` | Registration page |
