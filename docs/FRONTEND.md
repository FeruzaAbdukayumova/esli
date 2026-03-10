# Frontend Documentation

Complete guide to the React/TypeScript frontend application.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.2.2 | Type safety |
| Vite | 5.0.0 | Build tool & dev server |
| TanStack Query | 5.12.0 | Server state management |
| React Router | 6.20.0 | Client-side routing |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| Lucide React | 0.563.0 | Icon library |
| SheetJS (xlsx) | 0.18.5 | Excel/CSV file parsing |

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Application setup
│   │   ├── App.tsx            # Root component (provider hierarchy)
│   │   ├── providers/         # Context providers
│   │   │   ├── AuthProvider.tsx   # Auth state + token refresh
│   │   │   └── ThemeProvider.tsx  # Color theme + dark mode
│   │   └── router.tsx         # Route definitions
│   │
│   ├── pages/                  # Page components
│   │   ├── dashboard/         # Dashboard (decomposed)
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ContinueStudying.tsx
│   │   │   ├── YourDecks.tsx
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── SharedDecksSection.tsx
│   │   │   └── components/    # DeckCard, CreateDeckModal, AIGenerateDeckModal, WelcomeModal, etc.
│   │   ├── auth/              # Authentication pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── AuthPageLayout.tsx
│   │   ├── deck/              # Deck pages
│   │   │   ├── DeckPage.tsx
│   │   │   └── components/    # FileImportTab, AIGenerateTab
│   │   ├── study/             # Study pages
│   │   │   └── StudyPage.tsx
│   │   ├── profile/           # Profile page
│   │   │   └── ProfilePage.tsx
│   │   ├── browse/            # Public deck detail
│   │   │   └── PublicDeckDetailPage.tsx
│   │   ├── BrowsePage.tsx     # Browse public decks
│   │   ├── SettingsPage.tsx   # User settings
│   │   └── DecksPage.tsx      # Decks list
│   │
│   ├── features/               # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── decks/             # Deck management
│   │   ├── study/             # Study functionality
│   │   ├── stats/             # Dashboard statistics
│   │   └── sync/              # Data synchronization
│   │
│   ├── shared/                 # Shared code
│   │   ├── lib/               # Utility libraries
│   │   │   ├── apiClient.ts   # HTTP client with auth + refresh
│   │   │   ├── guestStorage.ts # Guest mode localStorage
│   │   │   ├── themeStore.ts  # Theme management
│   │   │   ├── storage.ts     # Token storage
│   │   │   ├── jwt.ts         # JWT utilities
│   │   │   └── validation.ts  # Form validation
│   │   └── ui/                # Reusable UI components
│   │
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles + Tailwind
│
├── public/                     # Static assets
├── index.html                 # HTML template (theme flash prevention script)
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config (proxy, path alias)
├── tailwind.config.js         # Tailwind config (dark mode, custom colors)
└── postcss.config.js          # PostCSS config
```

## Features

### Authentication (`features/auth/`)

Handles user registration, login, and session management with JWT + refresh tokens.

```
auth/
├── api.ts                  # API calls (login, register, getMe, updateMe)
├── types.ts                # TypeScript interfaces (User, LoginRequest, etc.)
├── hooks/
│   ├── useAuth.ts         # Login/logout mutations
│   └── useMe.ts           # Current user query
└── components/
    └── ProtectedRoute.tsx # Route guard component
```

**Authentication Flow:**

1. User submits login form
2. `useAuth().login()` calls API
3. Access token (4-hour JWT) stored in localStorage
4. Refresh token set as HTTP-only cookie automatically
5. On 401 response, `apiClient` interceptor auto-refreshes using mutex pattern
6. User redirected to dashboard

**Provider Hierarchy:**
```typescript
// App.tsx
<QueryClientProvider>
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </ThemeProvider>
</QueryClientProvider>
```

### Deck Management (`features/decks/`)

CRUD operations for flashcard decks and cards, plus public deck browsing, AI generation, translation, and file import.

```
decks/
├── hooks.ts               # React Query hooks for user decks/cards
├── types.ts               # Deck/Card interfaces
├── publicApi.ts           # Public decks API calls
├── publicHooks.ts         # Hooks for browsing/copying public decks
├── aiApi.ts               # AI card generation (topic + PDF)
├── translationApi.ts      # Card translation API
├── utils/
│   └── parseSpreadsheet.ts # Excel/CSV parsing
└── repo/
    ├── index.ts          # useDeckRepo() hook (selects by auth state)
    ├── types.ts          # DeckRepository interface
    ├── apiRepo.ts        # API-based storage (authenticated)
    └── localRepo.ts      # localStorage storage (guest mode)
```

**Repository Pattern:**

```typescript
// Automatically selects correct repository based on auth state
const repo = useDeckRepo(); // Returns apiRepo or localRepo

// Same interface for both modes
const decks = await repo.getDecks();
const newDeck = await repo.createDeck({ title: "My Deck" });
```

**Core Types:**

```typescript
interface Deck {
  id: string;
  title: string;
  categoryTags: string[];
  isShared: boolean;
  createdAt: string;
  updatedAt: string;
  lastStudiedAt?: string;
}

interface Card {
  id: string;
  frontText?: string;
  backText?: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  translations?: Record<string, string> | null;
  easeFactor: number;      // SM-2: default 2.5
  interval: number;         // SM-2: days until next review
  repetitions: number;      // SM-2: consecutive correct
  createdAt: string;
  updatedAt: string;
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

type RecallResponse = 'again' | 'hard' | 'good' | 'easy';
```

### Study Mode (`features/study/`)

Spaced repetition study interface with SM-2 algorithm.

```
study/
└── scheduler.ts           # Due card filtering, daily limit logic
```

**Key Functions:**
- `isCardDue(card)` - Check if card is due for review
- `getDueCards(cards)` - Filter all due cards
- `getDueCardsWithLimit(cards, limit)` - Apply daily new card limit
- `getNotDueCards(cards)` - Get cards not yet due
- `getEarliestNextReview(cards)` - Find earliest next review time

**Study Interface Features:**
- 3D flip animation (`perspective:2000px`, `rotateY(-180deg)`, 1000ms)
- Session queue: snapshot due cards on load, "again" re-inserts ~3 positions later
- **Session persistence**: progress saved to `sessionStorage` (keyed by `study-session-${deckId}`), restores on return — works for both due-card sessions and practice mode ("Study Again")
- Desktop: prev/next nav on sides of card; Mobile: nav buttons below card
- Keyboard shortcuts (Space, Arrow keys, 1-4) with dismissible shortcuts banner (desktop, localStorage-persisted)
- Language selector dropdown for translation
- Shuffle button
- **Session completion screen**: trophy icon, confetti animation, session stats bars (Again/Hard/Good/Easy breakdown), relative next review time ("Come back in 4 hours")

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| Space | Flip card |
| ← | Previous card |
| → | Next card |
| 1 | Again |
| 2 | Hard |
| 3 | Good |
| 4 | Easy |

### Dashboard Statistics (`features/stats/`)

```
stats/
├── types.ts               # DashboardStats, DeckProgress, DayForecast
├── statsApi.ts            # GET /stats/dashboard
├── statsHooks.ts          # useStats hook
└── guestStats.ts          # Compute stats from localStorage for guest mode
```

### AI Card Generation

Available via `features/decks/aiApi.ts`:

```typescript
// Topic-based generation
const result = await generateCardsAI({ topic: "Spanish greetings", count: 10 });

// PDF-based generation (FormData with fetch)
const result = await generateCardsFromPDF(formData);
```

- Both endpoints are public (work for guest users)
- Max 100 cards per generation
- PDF max 10 MB with optional focus topic

### Translation

Available via `features/decks/translationApi.ts`:

```typescript
// Authenticated mode - caches in DB
const translated = await translationApi.getTranslatedCard(cardId, lang);

// Guest mode - no caching
const translated = await translationApi.translateText(text, lang);
```

- 13 supported languages
- Uses MyMemory API with autodetect source language
- Language preference saved in localStorage (`study-language`)

### File Import

Available via `pages/deck/components/FileImportTab.tsx`:

- Parse on frontend with SheetJS (`xlsx` npm package)
- Auto-detect column mapping (front/question/term → front, back/answer/definition → back)
- Batch API endpoint: max 500 cards per request
- Multi-step flow: upload (drag & drop) → column mapping + preview → importing → done

### Data Sync (`features/sync/`)

Guest to account data migration.

```
sync/
├── api.ts                 # POST /sync/import
├── hooks.ts               # useSyncImport mutation
└── types.ts               # SyncImportRequest/Response
```

## Shared Code

### API Client (`shared/lib/apiClient.ts`)

HTTP client with JWT authentication and automatic token refresh:

- Methods: `get`, `post`, `put`, `delete`, `patch`
- 401 interceptor with mutex pattern for concurrent requests
- Auto-refresh using HTTP-only cookie
- Token stored in localStorage

### Guest Storage (`shared/lib/guestStorage.ts`)

localStorage wrapper for guest mode:

```typescript
interface GuestData {
  version: number;
  decks: Deck[];
  cardsByDeckId: Record<string, Card[]>;
  reviewLogs?: GuestReviewLog[];
  settings?: GuestSettings;
}

interface GuestSettings {
  dailyNewCardLimit?: number;
  darkMode?: string;
}
```

### Theme Store (`shared/lib/themeStore.ts`)

Theme management with CSS custom properties:

- **6 color presets**: indigo, emerald, rose, amber, violet, slate
- **Dark mode**: `'light' | 'dark' | 'system'`
- CSS variables: `--color-primary-50` through `--color-primary-900`
- Functions: `getStoredTheme()`, `setStoredTheme()`, `applyThemeToDocument()`
- Dark mode: `getStoredDarkMode()`, `setStoredDarkMode()`, `applyDarkModeToDocument()`
- Flash prevention: inline script in `index.html` loads theme before first paint

## Pages

### DashboardPage (`pages/dashboard/`)

Decomposed into sections:
- **ContinueStudying** - Shows last studied deck with quick-access study button
- **YourDecks** - Deck grid with create/delete modals, category filter
- **DashboardStats** - Streak, mastery, review forecast, deck progress
- **SharedDecksSection** - Browse shared decks (rendered above YourDecks for guests, below for auth)

**Dashboard Components:**
- `DeckCard` - Clickable card navigates to Study (primary intent)
- `CreateDeckModal` - Create new deck
- `AIGenerateDeckModal` - AI-powered deck creation
- `DeleteDeckModal` - Confirm deck deletion
- `WelcomeModal` - First-time feature highlights (AI generation, file import, translation, keyboard shortcuts, community decks). Shows once, dismissed via localStorage (`flashcards-welcome-seen`)
- `CategoryFilter` - Filter decks by category
- `DeckProgressBar` - Visual progress (new/learning/mature)
- `ReviewForecast` - 7-day review forecast chart
- `StatCard` - Individual stat display

**Empty State (YourDecks):**
When a user has no decks, a rich getting-started grid shows 3 equal-weight options:
- Create Manually (opens `CreateDeckModal`)
- Generate with AI (opens `AIGenerateDeckModal`)
- Browse Shared Decks (links to `/browse`)

### StudyPage (`pages/study/StudyPage.tsx`)

Full-featured study interface:
- 3D card flip with `perspective:2000px` container
- Desktop: nav arrows on card sides; Mobile: nav below card
- 4 response buttons with dynamic interval labels
- Language selector for translation
- Shuffle button
- Session persistence (resumes from last position, including practice mode)
- Session stats tracking (Again/Hard/Good/Easy counts)
- Completion screen with trophy icon, confetti, stats bars, and relative next review time
- Dismissible keyboard shortcuts banner (desktop only)
- Back/exit goes to `/dashboard`

### DeckPage (`pages/deck/DeckPage.tsx`)

Deck detail and card management with tabs:
- Card list with inline edit/delete
- File import tab (Excel/CSV)
- AI generation tab (topic + PDF)

### ProfilePage (`pages/profile/ProfilePage.tsx`)

User profile showing avatar, editable username, email, auth provider, member since, and stats grid.

### SettingsPage (`pages/SettingsPage.tsx`)

User settings: daily new card limit, theme selection, dark mode toggle.

### BrowsePage (`pages/BrowsePage.tsx`)

Browse public decks with search, sort, and pagination.

## Styling

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',  // Class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          // ... through 900
        }
      },
      animation: {
        'fade-in': 'fadeIn ...',
        'slide-down': 'slideDown ...',
        'slide-up': 'slideUp ...',
        'card-in': 'cardIn ...',
        'confetti-piece': 'confettiPiece ...',
        'checkmark-pop': 'checkmarkPop ...',
      },
    },
  },
};
```

### Z-Index Stack

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Navbar | z-50 | Top navigation |
| Mobile drawer | z-[60/61] | Slide-out menu |
| Confetti | z-[900] | Completion animation |
| Modals | z-[1000] | Modal dialogs (portal to body) |
| Delete confirm | z-[1001] | Confirmation over modal |

## State Management

### Server State (TanStack Query)

All API data managed by React Query:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});
```

### Client State

- **Auth context**: User, isAuthenticated, login, logout
- **Theme context**: Theme color, dark mode, setters
- **Component state**: Flip state, current index, modals, etc.

## Configuration

### Vite Config

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

### Environment Variables

Create `.env.local` for local overrides:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Development

### Running the Dev Server

```bash
cd frontend
npm install
npm run dev
```

Development server runs at `http://localhost:5173` with:
- Hot Module Replacement (HMR)
- API proxy to backend
- TypeScript error overlay

### Building for Production

```bash
npm run build
```

Output in `dist/` directory, ready for static hosting.

### Linting

```bash
npm run lint
```

ESLint with TypeScript rules enforces code quality.
