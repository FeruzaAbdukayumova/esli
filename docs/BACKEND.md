# Backend Documentation

Complete guide to the FastAPI Python backend application.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | >=0.115 | Web framework |
| Python | 3.12 | Runtime |
| SQLAlchemy | 2.0+ | ORM |
| Pydantic | >=2.8 | Data validation |
| pydantic-settings | >=2.4 | Settings management |
| Uvicorn | >=0.30 | ASGI server |
| Alembic | >=1.13 | Database migrations |
| asyncpg | >=0.29 | Async PostgreSQL driver |
| python-jose | >=3.3 | JWT handling |
| bcrypt | >=4.0 | Password hashing |
| structlog | >=24.1 | Structured logging |
| anthropic | >=0.40.0 | Claude AI integration |
| python-multipart | >=0.0.9 | File upload support |
| email-validator | >=2.0 | Email validation |

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   │
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py       # Route aggregation
│   │       ├── deps.py         # FastAPI dependencies (auth)
│   │       └── routes/
│   │           ├── auth.py     # Authentication (register, login, refresh, logout, me)
│   │           ├── decks.py    # Deck CRUD, batch card create
│   │           ├── cards.py    # Card CRUD, review, intervals, translation
│   │           ├── sync.py     # Guest data import
│   │           ├── public.py   # Public deck browsing and copying
│   │           ├── stats.py    # Dashboard statistics
│   │           └── ai.py       # AI card generation (topic + PDF)
│   │
│   ├── core/
│   │   ├── config.py          # Settings and environment
│   │   └── security.py        # JWT, password, and refresh token utils
│   │
│   ├── db/
│   │   ├── base.py            # SQLAlchemy base
│   │   ├── session.py         # Database session
│   │   ├── models/
│   │   │   ├── __init__.py    # Model exports
│   │   │   ├── user.py        # User model
│   │   │   ├── deck.py        # Deck model
│   │   │   ├── card.py        # Card model
│   │   │   ├── review_log.py  # Review log model
│   │   │   └── refresh_token.py # Refresh token model
│   │   └── migrations/        # Alembic migrations
│   │
│   ├── schemas/
│   │   ├── auth.py            # Auth request/response (register, login, user, settings)
│   │   ├── deck.py            # Deck schemas (create, update, response, public)
│   │   ├── card.py            # Card schemas (create, update, response, batch, translated)
│   │   ├── review.py          # Review schemas (review input, intervals response)
│   │   ├── stats.py           # Dashboard statistics schemas
│   │   ├── sync.py            # Sync import schemas
│   │   └── ai_generation.py   # AI generation request/response schemas
│   │
│   └── services/
│       ├── user_service.py          # User CRUD
│       ├── deck_service.py          # Deck CRUD + public deck operations
│       ├── card_service.py          # Card CRUD + batch create
│       ├── review_service.py        # SM-2 algorithm + review logging
│       ├── sync_service.py          # Guest data import
│       ├── stats_service.py         # Dashboard statistics aggregation
│       ├── refresh_token_service.py # Token create/validate/revoke
│       ├── translation_service.py   # MyMemory API translation + caching
│       └── ai_generation_service.py # Claude AI card generation
│
├── tests/                      # Test suite
│   ├── conftest.py            # Fixtures (test DB, session, client)
│   └── test_auth.py           # Auth endpoint tests
├── scripts/                    # Utility scripts
├── alembic.ini                # Migration config
├── requirements.txt           # Dependencies
├── Dockerfile                 # Container config
├── docker-compose.yml         # DB + API containers
├── Makefile                   # Dev commands
├── pytest.ini                 # Test config
└── .env                       # Environment variables
```

## Application Entry Point

### main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.core.config import settings

app = FastAPI(title="Flashcards API", docs_url="/docs", redoc_url="/redoc")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)
```

### router.py

```python
api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(decks.router, prefix="/decks", tags=["decks"])
api_router.include_router(cards.router, prefix="/cards", tags=["cards"])
api_router.include_router(sync.router, prefix="/sync", tags=["sync"])
api_router.include_router(public.router, prefix="/public", tags=["public"])
api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
```

## Core Modules

### Configuration (`core/config.py`)

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "flashcards-api"
    API_V1_PREFIX: str = "/api/v1"
    DATABASE_URL: str | None = None
    CORS_ORIGINS: str = "http://localhost:5173"
    JWT_SECRET: str
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 240  # 4 hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    ANTHROPIC_API_KEY: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"
```

### Security (`core/security.py`)

```python
# Password hashing (bcrypt, 72-byte limit)
def hash_password(password: str) -> str: ...
def verify_password(plain: str, hashed: str) -> bool: ...

# JWT access tokens (HS256, 4-hour default)
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str: ...

# Refresh tokens (random 32-byte, SHA256 hashed for storage)
def generate_refresh_token() -> str: ...
def hash_token(token: str) -> str: ...
```

### Dependencies (`api/v1/deps.py`)

```python
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Extract and validate JWT token, return current user."""
```

## Services

### Review Service (`services/review_service.py`)

SM-2 spaced repetition algorithm:

**Constants:**
- `MIN_EASE_FACTOR`: 1.3
- `DEFAULT_EASE_FACTOR`: 2.5
- Max ease factor: 3.0

**Response Effects:**
| Response | Ease Change | Interval Logic |
|----------|-------------|----------------|
| `again` | -0.2 (min 1.3) | Reset to 0, review in 1 minute |
| `hard` | -0.15 (min 1.3) | Learning: 10 min; Review: interval x 1.2 |
| `good` | No change | Rep 0: 1d, Rep 1: 3d, Rep 2+: interval x ease |
| `easy` | +0.15 (max 3.0) | Rep 0: 4d, Rep 1+: interval x ease x 1.3 |

**Functions:**
- `compute_sm2(response, ease, interval, reps)` - Calculate new SM-2 values
- `get_next_intervals(...)` - Human-readable intervals for UI (e.g., "1m", "1d", "3mo")
- `record_review(db, card_id, owner_id, response)` - Update card + create ReviewLog
- `get_card_intervals(db, card_id, owner_id)` - Preview intervals without recording

### AI Generation Service (`services/ai_generation_service.py`)

- Uses Anthropic `claude-sonnet-4-20250514` model
- `generate_cards(topic, count, include_deck_info)` - Topic-based generation
- `generate_cards_from_pdf(pdf_data, count, topic)` - PDF document-based generation
- Max tokens: 8192, max cards: 100
- PDF max size: 10 MB, uses document content block
- Returns cards + optional suggested_title/tags

### Translation Service (`services/translation_service.py`)

- Uses MyMemory API (free, autodetect source language)
- `translate_text(text, target_lang)` - Raw translation
- `get_card_translation(db, card, target_lang)` - Cached translation (JSONB)
- `get_translated_card(db, card_id, target_lang)` - Full card with translation
- `get_supported_languages()` - Returns 13 language names
- Caches translations in `Card.translations` JSONB column

### Stats Service (`services/stats_service.py`)

- `get_user_stats(db, user_id, daily_new_card_limit)` - Aggregated dashboard stats
- Calculates: last studied deck, cards due, reviewed today, total cards/decks, mastery %, streak days, retention %, deck progress, 7-day forecast
- Card stages: New (reps=0), Learning (reps>0, interval<21), Mature (interval>=21)

### Refresh Token Service (`services/refresh_token_service.py`)

- `create_refresh_token(db, user_id)` - Generate + store hashed token
- `validate_refresh_token(db, raw_token)` - Validate + check expiry
- `revoke_refresh_token(db, raw_token)` - Delete by hash
- `revoke_all_user_tokens(db, user_id)` - Delete all for user
- Token rotation: old token revoked when new one issued

### Other Services

- **User Service** - `create_user()`, `get_user_by_email()`, `get_user_by_id()`
- **Deck Service** - CRUD + `list_public_decks()`, `copy_deck()`
- **Card Service** - CRUD + `create_cards_batch()` (max 500)
- **Sync Service** - `import_guest_data()` (max 200 decks, 5000 cards)

## Database Session

```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

engine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True)
async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db() -> AsyncSession:
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()
```

## Testing

### Test Configuration

```ini
# pytest.ini
[pytest]
asyncio_mode = auto
testpaths = tests
addopts = -v --tb=short --strict-markers
```

### Test Fixtures (`tests/conftest.py`)

- Session-scoped `setup_test_database` - Creates test DB, runs migrations, truncates after
- `db_session` - Provides AsyncSession with rollback
- `async_client` - httpx AsyncClient with test transport
- Overrides `get_db` dependency

### Running Tests

```bash
# All tests
make test

# Specific test file
make test-auth

# Verbose output
make test-verbose
```

## Development

### Running the Server

```bash
# Using Docker
cd backend
docker-compose up -d
docker compose exec api alembic upgrade head

# Or manually
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Add new column"

# Run migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Environment Variables

Required `.env` configuration:

```env
APP_NAME=flashcards-api
API_V1_PREFIX=/api/v1
DATABASE_URL=postgresql+asyncpg://flashcards:flashcards@db:5432/flashcards
CORS_ORIGINS=http://localhost:5173
JWT_SECRET=your-secret-key-change-in-production
JWT_ALG=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=240
REFRESH_TOKEN_EXPIRE_DAYS=7
ANTHROPIC_API_KEY=your-anthropic-api-key
```
