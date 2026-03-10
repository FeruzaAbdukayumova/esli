# Esli Backend API

FastAPI backend for the Esli application.

## API Endpoints

| Route Prefix | Description |
|--------------|-------------|
| `/api/v1/auth` | Authentication (register, login, refresh, logout, me, settings) |
| `/api/v1/oauth` | OAuth login (Google, GitHub) |
| `/api/v1/decks` | User deck management (CRUD, batch card create) |
| `/api/v1/cards` | Card CRUD, reviews (SM-2), intervals, translation |
| `/api/v1/sync` | Guest data import |
| `/api/v1/public` | Browse and copy public decks |
| `/api/v1/stats` | Dashboard statistics |
| `/api/v1/ai` | AI card generation (topic and PDF) |

See full API documentation at `http://localhost:8000/docs` when running the server.

### CORS

CORS middleware is configured in `app/main.py`:
- Explicit origins from `CORS_ORIGINS` env var (default: `http://localhost:5173`)
- Browser extensions allowed via regex (`chrome-extension://`, `moz-extension://`)

## SM-2 Spaced Repetition Algorithm

The backend implements the SM-2 (SuperMemo 2) algorithm for intelligent card scheduling:

### Card Fields
- `ease_factor` - Multiplier for interval calculation (default: 2.5, min: 1.3, max: 3.0)
- `interval` - Days until next review (default: 0)
- `repetitions` - Consecutive correct responses (default: 0)

### Response Types
| Response | Ease Change | Interval Logic | Next Review |
|----------|-------------|----------------|-------------|
| `again` | -0.2 (min 1.3) | Reset to 0, repetitions reset | 1 minute |
| `hard` | -0.15 (min 1.3) | Learning: 10 min; Review: interval x 1.2 | 10 min or interval days |
| `good` | No change | Rep 0: 1d, Rep 1: 3d, Rep 2+: interval x ease | Standard progression |
| `easy` | +0.15 (max 3.0) | Rep 0: 4d, Rep 1+: interval x ease x 1.3 | Accelerated |

### Endpoints
- `POST /api/v1/cards/{id}/review` - Submit response, returns updated card with new SM-2 values
- `GET /api/v1/cards/{id}/intervals` - Preview next intervals for each response option

### Review Logging
Every review creates a `ReviewLog` entry tracking user, card, deck, response, and timestamp for analytics.

## Project Structure

```
app/
├── api/v1/           # API routes and dependencies
│   ├── router.py     # Route aggregation
│   ├── deps.py       # FastAPI dependencies (auth)
│   └── routes/       # Endpoint handlers
│       ├── auth.py   # Auth (register, login, refresh, logout, me)
│       ├── oauth.py  # OAuth login (Google, GitHub)
│       ├── decks.py  # Deck CRUD, batch card create
│       ├── cards.py  # Card CRUD, review, intervals, translation
│       ├── sync.py   # Guest data import
│       ├── public.py # Public deck browsing and copying
│       ├── stats.py  # Dashboard statistics
│       └── ai.py     # AI card generation
├── core/             # Configuration and security
├── db/               # Database models and migrations
│   └── models/       # User, Deck, Card, ReviewLog, RefreshToken
├── schemas/          # Pydantic validation schemas
└── services/         # Business logic layer
    ├── user_service.py
    ├── oauth_service.py
    ├── deck_service.py
    ├── card_service.py
    ├── review_service.py
    ├── sync_service.py
    ├── stats_service.py
    ├── refresh_token_service.py
    ├── translation_service.py
    └── ai_generation_service.py
```

## Running Tests

Tests use a separate test database (`flashcards_test`) that is automatically created and managed by pytest fixtures.

### Initial Setup

**Important:** After adding test dependencies, rebuild the container:

```bash
make test-setup
# or manually:
docker compose build api
docker compose up -d api
```

The test database is automatically created and migrations are run before tests execute. No manual setup is required.

### Using Make

```bash
# Run all tests
make test

# Run only auth tests
make test-auth

# Run tests with verbose output
make test-verbose
```

### Using Docker Compose Directly

```bash
# Run all tests
docker compose exec api pytest

# Run only auth tests
docker compose exec api pytest tests/test_auth.py

# Run with verbose output
docker compose exec api pytest -v
```

### Test Database

Tests use a separate PostgreSQL database (`flashcards_test`) in the same container as the main database. The test database is:
- Automatically created before tests run (via `conftest.py` fixture)
- Migrated using Alembic (`alembic upgrade head`) before tests
- Truncated after each test session for isolation

The test database URL can be configured via `TEST_DATABASE_URL` environment variable (defaults to `postgresql+asyncpg://flashcards:flashcards@db:5432/flashcards_test`).

### Test Structure

- `tests/conftest.py` - Pytest fixtures and test configuration
- `tests/test_auth.py` - Authentication endpoint tests

### Test Coverage

The auth test suite covers:
- User registration (success and duplicate email)
- User login (success and wrong password)
- Protected endpoint `/me` (valid token, missing token, invalid token)
