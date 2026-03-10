# Architecture Overview

This document describes the high-level architecture, design patterns, and key architectural decisions of the Flashcards application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Application                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐│  │
│  │  │   Pages     │  │  Features   │  │   Shared Libs       ││  │
│  │  │  Dashboard  │  │  Auth       │  │   API Client        ││  │
│  │  │  Browse     │  │  Decks      │  │   Guest Storage     ││  │
│  │  │  Study      │  │  Study      │  │   Theme Store       ││  │
│  │  │  Deck       │  │  Sync       │  │   JWT Utils         ││  │
│  │  │  Profile    │  │  Stats      │  │   UI Components     ││  │
│  │  │  Settings   │  │             │  │                     ││  │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘│  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                    localStorage (Guest Mode)                     │
└──────────────────────────────┼───────────────────────────────────┘
                               │ HTTP/REST
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        FastAPI Backend                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      API Layer                             │  │
│  │  /auth │ /decks │ /cards │ /sync │ /public │ /stats │ /ai │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Service Layer                           │  │
│  │  User │ Deck │ Card │ Review │ Sync │ Stats │ AI │ Transl.│  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Data Layer                              │  │
│  │           SQLAlchemy ORM  │  Pydantic Schemas              │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────┼───────────────────────────────────┘
              │                │                │
              ▼                ▼                ▼
   ┌─────────────────┐  ┌───────────┐  ┌─────────────┐
   │  PostgreSQL 16   │  │ Anthropic │  │  MyMemory   │
   │  users, decks,   │  │ Claude API│  │ Translation │
   │  cards, reviews, │  │ (AI gen)  │  │  API        │
   │  refresh_tokens  │  └───────────┘  └─────────────┘
   └─────────────────┘
```

## Design Patterns

### Frontend Patterns

#### Feature-Based Architecture
The frontend organizes code by feature rather than by type:

```
src/features/
├── auth/           # Authentication feature
│   ├── api.ts      # API calls
│   ├── hooks/      # React Query hooks
│   ├── components/ # Feature-specific components
│   └── types.ts    # TypeScript interfaces
├── decks/          # Deck management
│   ├── hooks.ts        # User deck hooks
│   ├── publicApi.ts    # Public deck API calls
│   ├── publicHooks.ts  # Public deck hooks
│   ├── aiApi.ts        # AI generation API
│   ├── translationApi.ts # Translation API
│   ├── utils/          # Spreadsheet parsing
│   └── repo/           # Repository abstraction
├── study/          # Study functionality
│   └── scheduler.ts # SM-2 scheduling logic
├── stats/          # Dashboard statistics
│   ├── types.ts, statsApi.ts, statsHooks.ts
│   └── guestStats.ts  # Guest mode stats
└── sync/           # Data synchronization
```

**Benefits:**
- High cohesion within features
- Easy to understand feature scope
- Simplifies code navigation
- Enables independent feature development

#### Repository Pattern (Data Access Abstraction)
The `repo/` abstraction layer enables dual storage modes:

```typescript
// Unified interface for data operations
interface DeckRepository {
  getDecks(): Promise<Deck[]>;
  createDeck(deck: DeckCreate): Promise<Deck>;
  updateDeck(id: string, deck: DeckUpdate): Promise<Deck>;
  deleteDeck(id: string): Promise<void>;
  // ... cards, review, etc.
}

// useDeckRepo() hook selects implementation based on auth state
const repo = isAuthenticated ? apiRepo : localRepo;
```

**Implementations:**
- `apiRepo` - Calls backend REST API (authenticated mode)
- `localRepo` - Uses localStorage (guest mode)

#### Provider Pattern
Application state is managed via React Context providers:

```typescript
// Provider hierarchy in App.tsx
<QueryClientProvider>
  <ThemeProvider>     {/* Color theme + dark mode */}
    <AuthProvider>    {/* User auth state */}
      <RouterProvider />
    </AuthProvider>
  </ThemeProvider>
</QueryClientProvider>

// Access auth state
const { user, isAuthenticated, logout } = useAuth();

// Access theme state
const { theme, setTheme, darkMode, setDarkMode } = useTheme();
```

#### React Query for Server State
TanStack Query manages API data:

```typescript
// Automatic caching, refetching, and state management
const { data: decks, isLoading, error } = useDecks();

// Mutations with cache invalidation
const createDeck = useCreateDeck();
createDeck.mutate(newDeck);
```

### Backend Patterns

#### Layered Architecture
Clear separation of concerns:

```
┌─────────────────────────────────────┐
│          API Routes Layer           │  ← HTTP handling, validation
├─────────────────────────────────────┤
│          Service Layer              │  ← Business logic
├─────────────────────────────────────┤
│          Data Access Layer          │  ← Database operations
├─────────────────────────────────────┤
│          Database Layer             │  ← PostgreSQL
└─────────────────────────────────────┘
```

#### Dependency Injection
FastAPI's dependency system injects database sessions and authenticated users:

```python
@router.get("/")
async def list_decks(
    db: AsyncSession = Depends(get_db),      # Database session
    user: User = Depends(get_current_user),  # Authenticated user
) -> list[DeckResponse]:
    return await deck_service.get_decks_by_owner(db, user.id)
```

#### Service Layer Pattern
Business logic is encapsulated in service modules:

```python
# Services handle business rules, not routes
async def create_deck(db, owner_id, data):
    deck = Deck(owner_id=owner_id, **data.model_dump())
    db.add(deck)
    await db.commit()
    return deck
```

#### Schema Validation
Pydantic schemas validate all input/output:

```python
class DeckCreate(BaseModel):
    title: str = Field(max_length=255)
    category_tags: str = Field(default="", max_length=500)
    is_shared: bool = False
```

## Key Architectural Decisions

### 1. Monorepo Structure

**Decision:** Keep frontend and backend in a single repository.

**Rationale:**
- Simplified development workflow
- Atomic commits across stack
- Shared documentation
- Easier CI/CD configuration

### 2. Async Database Operations

**Decision:** Use async SQLAlchemy with asyncpg driver.

**Rationale:**
- Non-blocking I/O for better concurrency
- Aligns with FastAPI's async-first design
- Better resource utilization under load

### 3. JWT + Refresh Token Authentication

**Decision:** Dual-token authentication with short-lived JWTs and long-lived refresh tokens.

**Token Configuration:**
- Access token: JWT (HS256), 4-hour expiration, stored in localStorage
- Refresh token: Random 32-byte string, 7-day expiration, HTTP-only cookie (path-scoped to `/api/v1/auth`)
- Token rotation: Old refresh token revoked when issuing new one
- SHA256 hashing: Refresh tokens stored as hashes in database

**Rationale:**
- Short access token lifetime limits exposure
- Refresh tokens enable long sessions without re-login
- HTTP-only cookies protect refresh tokens from XSS
- Token rotation prevents replay attacks

### 4. Guest Mode with Local Storage

**Decision:** Support unauthenticated usage with localStorage.

**Rationale:**
- Lower barrier to entry
- Try before registering
- Offline-capable for guest data
- Seamless upgrade path to account

### 5. SM-2 Spaced Repetition Algorithm

**Decision:** Full SM-2 implementation with 4 response levels.

**Algorithm:**
- Tracks `ease_factor` (2.5 default, 1.3-3.0 range), `interval` (days), and `repetitions` (consecutive correct)
- Four responses: Again (reset), Hard (slow), Good (normal), Easy (accelerated)
- Ease factor adjusts based on response quality
- Interval grows exponentially with consecutive correct answers

**Rationale:**
- Proven, well-documented algorithm
- Provides nuanced control over review scheduling
- Adapts to individual card difficulty

### 6. UUIDs for Primary Keys

**Decision:** Use UUIDs instead of auto-incrementing integers.

**Rationale:**
- Globally unique identifiers
- Safe for distributed systems
- No ID enumeration attacks
- Client-side ID generation possible

### 7. Theme System with CSS Custom Properties

**Decision:** CSS custom properties for theming with inline script for flash prevention.

**Implementation:**
- 6 color presets (Indigo, Emerald, Rose, Amber, Violet, Slate) with CSS variables `--color-primary-50` through `--color-primary-900`
- Dark mode: class-based (`.dark` on `<html>`) with system preference detection
- Inline script in `index.html` prevents flash of wrong theme on load
- Theme synced to user profile (authenticated) or localStorage (guest)

### 8. Public AI and Translation Endpoints

**Decision:** AI generation and translation endpoints are public (no auth required).

**Rationale:**
- Guest users can use full study features
- Lower friction for new users
- Translation caching in DB is auth-only (prevents abuse)

## Data Flow

### Authentication Flow

```
┌──────────┐     POST /login      ┌──────────┐
│  Client  │ ──────────────────── │  Server  │
│          │     {email, pass}    │          │
│          │ ◄─────────────────── │          │
│          │  {access_token} +    │          │
│          │  Set-Cookie: refresh │          │
└──────────┘                      └──────────┘
     │
     │ Store access token in localStorage
     │ Refresh cookie set automatically
     ▼
┌──────────────────────────────────────────┐
│  Subsequent requests:                     │
│  Authorization: Bearer <access_token>     │
│                                           │
│  On 401 → POST /auth/refresh              │
│  (cookie sent automatically)              │
│  → New access token + rotated cookie      │
└──────────────────────────────────────────┘
```

### Study Session Flow

```
┌────────────────┐
│  User enters   │
│  study mode    │
└───────┬────────┘
        │
        ▼
┌────────────────┐     ┌────────────────┐
│  Fetch cards   │────▶│  Filter due    │
│  for deck      │     │  cards + apply │
│                │     │  daily limit   │
└────────────────┘     └───────┬────────┘
                               │
        ┌──────────────────────┘
        ▼
┌────────────────┐
│  Show card     │◄──────────────────────┐
│  front         │                       │
└───────┬────────┘                       │
        │ (flip)                         │
        ▼                                │
┌────────────────┐                       │
│  Show card     │                       │
│  back          │                       │
└───────┬────────┘                       │
        │ (rate: again/hard/good/easy)   │
        ▼                                │
┌────────────────┐                       │
│  SM-2 updates  │                       │
│  ease, interval│                       │
│  repetitions   │                       │
└───────┬────────┘                       │
        │                                │
        ▼                                │
┌────────────────┐     ┌─────────────────┴──┐
│  Save review   │────▶│  More cards?       │
│  + log entry   │     │  Yes → next card   │
└────────────────┘     │  No  → complete    │
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │  Completion screen │
                       │  • Trophy + confetti│
                       │  • Stats bars       │
                       │  • Relative next    │
                       │    review time      │
                       └────────────────────┘
```

**Session Persistence:**
- Progress saved to `sessionStorage` on every card change (keyed by `study-session-${deckId}`)
- Stores: card IDs, current index, practice mode flag, session stats (Again/Hard/Good/Easy counts)
- Restored automatically when user navigates back to the study page
- Cleared on session/round completion or explicit practice mode exit

### AI Card Generation Flow

```
┌────────────────┐
│  User selects  │
│  Topic or PDF  │
└───────┬────────┘
        │
        ▼
┌────────────────┐     ┌────────────────┐
│  POST /ai/     │────▶│  Claude API    │
│  generate-cards│     │  generates     │
│  (or from-pdf) │     │  card pairs    │
└────────────────┘     └───────┬────────┘
                               │
        ┌──────────────────────┘
        ▼
┌────────────────┐     ┌────────────────┐
│  Return cards  │────▶│  User reviews  │
│  + suggested   │     │  and adds to   │
│  title/tags    │     │  deck          │
└────────────────┘     └────────────────┘
```

### Guest Data Sync Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Guest Mode                                │
│  ┌────────────┐    ┌────────────┐    ┌────────────────────┐ │
│  │ Create     │───▶│ Store in   │───▶│ Use app normally   │ │
│  │ decks/cards│    │ localStorage│    │ (local only)       │ │
│  └────────────┘    └────────────┘    └────────────────────┘ │
└────────────────────────────────────────────────────────────┬┘
                                                              │
                                        User registers        │
                                              ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Sync Process                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │ Read local  │───▶│ POST /sync/ │───▶│ Server creates  │  │
│  │ data        │    │ import      │    │ decks & cards   │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│                                               │              │
│                                               ▼              │
│                           ┌─────────────────────────────┐   │
│                           │ Clear localStorage          │   │
│                           │ Switch to API mode          │   │
│                           └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Security Architecture

### Authentication Security

```
┌─────────────────────────────────────────────────────┐
│                 Security Layers                      │
├─────────────────────────────────────────────────────┤
│  Password Hashing      │  bcrypt (72-byte limit)    │
│  Access Token          │  JWT with HS256, 4 hours   │
│  Refresh Token         │  Random 32-byte, 7 days    │
│  Refresh Storage       │  SHA256 hash in database   │
│  Refresh Transport     │  HTTP-only cookie, SameSite│
│  Token Rotation        │  Old revoked on refresh    │
│  Transport             │  HTTPS required in prod    │
│  CORS                  │  Specific origins only     │
└─────────────────────────────────────────────────────┘
```

### Authorization Model

```
Resource Access:
┌──────────────┬───────────────────────────────────┐
│   Resource   │          Access Rule              │
├──────────────┼───────────────────────────────────┤
│   User       │  Can only access own profile      │
│   Deck       │  Can only access own decks        │
│   Card       │  Can only access cards in own     │
│              │  decks (via deck ownership)       │
│   Public     │  Anyone can browse shared decks   │
│   AI / Trans │  Public endpoints (no auth)       │
└──────────────┴───────────────────────────────────┘
```

## Performance Considerations

### Frontend
- **React Query caching**: Reduces redundant API calls
- **Code splitting**: Vite handles automatic chunk splitting
- **Lazy loading**: Pages loaded on demand
- **Theme flash prevention**: Inline script in index.html

### Backend
- **Async I/O**: Non-blocking database operations
- **Connection pooling**: SQLAlchemy manages database connections
- **Indexed queries**: Foreign keys, emails, and review timestamps indexed
- **Translation caching**: Stored in JSONB column to avoid repeat API calls

### Database
- **Indexed columns**: `deck_id` on cards, `email` on users, composite indexes on review_logs
- **Cascade deletes**: Efficient cleanup of related records
- **UUID optimization**: PostgreSQL native UUID type
- **JSONB translations**: Avoids separate translation table

## Scalability Considerations

### Horizontal Scaling

```
                    ┌─────────────────┐
                    │  Load Balancer  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
   ┌───────────┐       ┌───────────┐       ┌───────────┐
   │  API Pod  │       │  API Pod  │       │  API Pod  │
   └─────┬─────┘       └─────┬─────┘       └─────┬─────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │   (Primary)     │
                    └─────────────────┘
```

**Stateless Design:**
- JWT tokens require no server-side session storage
- Any API instance can handle any request
- Refresh tokens stored in database (shared state)
- Easy container orchestration (Kubernetes, ECS)

**Database Scaling:**
- Read replicas for query distribution
- Connection pooling (PgBouncer)
- Partitioning by user for large datasets
