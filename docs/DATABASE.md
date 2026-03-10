# Database Schema Documentation

Complete documentation of the PostgreSQL database schema and SQLAlchemy models.

## Overview

The Flashcards application uses PostgreSQL 16 with SQLAlchemy 2.0 async ORM. All tables use UUIDs as primary keys and include timestamp tracking.

## Entity Relationship Diagram

```
┌─────────────────────────┐
│         users            │
├─────────────────────────┤
│ id (PK)                  │─────────────────────────────┐
│ email (unique)           │                             │
│ password_hash            │                             │
│ auth_provider            │                             │
│ google_sub               │                             │
│ username                 │                             │
│ theme                    │                             │
│ dark_mode                │                             │
│ preferred_language       │                             │
│ daily_new_card_limit     │                             │
│ created_at               │                             │
└─────────────────────────┘                             │
         │                                               │
         │ user_id                            owner_id   │
         ▼                                               ▼
┌─────────────────────┐                    ┌─────────────────────┐
│   refresh_tokens    │                    │       decks         │
├─────────────────────┤                    ├─────────────────────┤
│ id (PK)             │                    │ id (PK)             │
│ user_id (FK)        │                    │ owner_id (FK)       │
│ token_hash (unique) │                    │ title               │
│ expires_at          │                    │ category_tags       │
│ created_at          │                    │ is_shared           │
└─────────────────────┘                    │ copy_count          │
                                           │ created_at          │
         ┌─────────────────────┐           │ updated_at          │
         │    review_logs      │           └─────────────────────┘
         ├─────────────────────┤                    │
         │ id (PK)             │                    │ deck_id
         │ user_id (FK)        │                    ▼
         │ card_id (FK)        │           ┌─────────────────────┐
         │ deck_id (FK, idx)   │           │       cards         │
         │ response            │◄──────────├─────────────────────┤
         │ reviewed_at         │  card_id  │ id (PK)             │
         └─────────────────────┘           │ deck_id (FK, idx)   │
                                           │ front_text          │
                                           │ back_text           │
                                           │ front_image_url     │
                                           │ back_image_url      │
                                           │ translations (JSONB)│
                                           │ ease_factor         │
                                           │ interval            │
                                           │ repetitions         │
                                           │ last_reviewed_at    │
                                           │ next_review_at      │
                                           │ created_at          │
                                           │ updated_at          │
                                           └─────────────────────┘

Relationships:
- users (1) ──► (N) decks           : One user owns many decks
- users (1) ──► (N) refresh_tokens  : One user has many tokens
- users (1) ──► (N) review_logs     : One user has many reviews
- decks (1) ──► (N) cards           : One deck contains many cards
- decks (1) ──► (N) review_logs     : One deck has many reviews
- cards (1) ──► (N) review_logs     : One card has many reviews
```

## Tables

### users

Stores user account information and preferences.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid4 | Unique identifier |
| email | VARCHAR(320) | NOT NULL, UNIQUE, INDEX | User's email address |
| password_hash | VARCHAR(255) | NULLABLE | Bcrypt hashed password |
| auth_provider | VARCHAR(32) | NOT NULL, DEFAULT 'password' | Authentication method |
| google_sub | VARCHAR | UNIQUE, NULLABLE | Google OAuth subject ID |
| username | VARCHAR(50) | UNIQUE, NULLABLE | Display name |
| theme | VARCHAR(20) | NOT NULL, DEFAULT 'indigo' | Color theme preset |
| dark_mode | VARCHAR(10) | NOT NULL, DEFAULT 'system' | Dark mode preference |
| preferred_language | VARCHAR(10) | NOT NULL, DEFAULT 'en' | Preferred translation language |
| daily_new_card_limit | INTEGER | NOT NULL, DEFAULT 20 | Max new cards per day (0-9999) |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Account creation time |

**Notes:**
- `password_hash` is nullable to support OAuth-only accounts
- `auth_provider` values: `'password'`, `'google'`
- `theme` values: `indigo`, `emerald`, `rose`, `amber`, `violet`, `slate`
- `dark_mode` values: `light`, `dark`, `system`
- All timestamps are timezone-aware (UTC)

---

### decks

Stores flashcard deck metadata.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid4 | Unique identifier |
| owner_id | UUID | NOT NULL, FOREIGN KEY → users.id, INDEX | Deck owner |
| title | VARCHAR(255) | NOT NULL | Deck title |
| category_tags | VARCHAR(500) | NOT NULL, DEFAULT '' | Comma-separated tags |
| is_shared | BOOLEAN | NOT NULL, DEFAULT FALSE | Public visibility |
| copy_count | INTEGER | NOT NULL, DEFAULT 0 | Number of times copied |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Creation time |
| updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Last modification |

**Constraints:**
- `decks_owner_id_fkey` - Foreign key to `users(id)` with CASCADE DELETE

**Notes:**
- Deleting a user cascades to delete all their decks
- `updated_at` is automatically updated on modifications
- `category_tags` format: `"tag1,tag2,tag3"` (comma-separated)

---

### cards

Stores individual flashcard content, translations, and SM-2 review scheduling.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid4 | Unique identifier |
| deck_id | UUID | NOT NULL, FOREIGN KEY → decks.id, INDEX | Parent deck |
| front_text | VARCHAR(1000) | NULLABLE | Front side text content |
| back_text | VARCHAR(1000) | NULLABLE | Back side text content |
| front_image_url | VARCHAR(500) | NULLABLE | Front side image URL |
| back_image_url | VARCHAR(500) | NULLABLE | Back side image URL |
| translations | JSONB | NULLABLE | Cached translations by language code |
| ease_factor | FLOAT | NOT NULL, DEFAULT 2.5 | SM-2 ease multiplier (1.3-3.0) |
| interval | INTEGER | NOT NULL, DEFAULT 0 | SM-2 interval in days |
| repetitions | INTEGER | NOT NULL, DEFAULT 0 | SM-2 consecutive correct |
| last_reviewed_at | TIMESTAMP WITH TIME ZONE | NULLABLE | Last review timestamp |
| next_review_at | TIMESTAMP WITH TIME ZONE | NULLABLE | Scheduled review time |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Creation time |
| updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Last modification |

**Constraints:**
- `cards_deck_id_fkey` - Foreign key to `decks(id)` with CASCADE DELETE

**Notes:**
- Deleting a deck cascades to delete all its cards
- Both text and image fields are optional (cards can have either or both)
- `translations` example: `{"es": "Hola", "fr": "Bonjour"}`
- `next_review_at` is NULL for new/unreviewed cards

---

### review_logs

Tracks every card review for analytics and statistics.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid4 | Unique identifier |
| user_id | UUID | NOT NULL, FOREIGN KEY → users.id (CASCADE) | Reviewing user |
| card_id | UUID | NOT NULL, FOREIGN KEY → cards.id (CASCADE) | Reviewed card |
| deck_id | UUID | NOT NULL, FOREIGN KEY → decks.id (CASCADE), INDEX | Parent deck |
| response | VARCHAR(10) | NOT NULL | Response: again, hard, good, easy |
| reviewed_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Review timestamp |

**Indexes:**
- `ix_review_logs_deck_id` - Index on `deck_id`
- `ix_review_logs_user_reviewed` - Composite index on `(user_id, reviewed_at)`

**Notes:**
- Used for streak calculation, retention rate, and daily review counts
- Cascade deletes from user, card, or deck

---

### refresh_tokens

Stores hashed refresh tokens for JWT authentication.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid4 | Unique identifier |
| user_id | UUID | NOT NULL, FOREIGN KEY → users.id (CASCADE), INDEX | Token owner |
| token_hash | VARCHAR(64) | NOT NULL, UNIQUE, INDEX | SHA256 hash of token |
| expires_at | TIMESTAMP WITH TIME ZONE | NOT NULL | Token expiration |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Token creation time |

**Notes:**
- Raw tokens are never stored; only SHA256 hashes
- Expired tokens should be cleaned up periodically
- Token rotation: old token deleted when new one issued
- Cascade deletes when user is deleted

## SM-2 Spaced Repetition

### Card Fields

| Field | Default | Range | Purpose |
|-------|---------|-------|---------|
| `ease_factor` | 2.5 | 1.3 - 3.0 | Interval multiplier (difficulty) |
| `interval` | 0 | 0+ | Days until next review |
| `repetitions` | 0 | 0+ | Consecutive correct answers |

### Response Effects

| Response | Ease Change | Interval | Repetitions |
|----------|-------------|----------|-------------|
| `again` | -0.2 | Reset to 0 | Reset to 0 |
| `hard` | -0.15 | Learning: 0; Review: x1.2 | +1 |
| `good` | 0 | Rep 0: 1d, Rep 1: 3d, else: x ease | +1 |
| `easy` | +0.15 | Rep 0: 4d, else: x ease x 1.3 | +1 |

### Card States

| State | Condition | Meaning |
|-------|-----------|---------|
| New | `repetitions == 0` | Never studied or reset |
| Learning | `repetitions > 0` AND `interval < 21` | Being learned |
| Mature | `interval >= 21` | Well-known card |
| Due | `next_review_at <= NOW()` | Ready for review |

### Query Examples

```sql
-- Get all due cards for a deck (new + review)
SELECT * FROM cards
WHERE deck_id = :deck_id
  AND (next_review_at IS NULL OR next_review_at <= NOW())
ORDER BY next_review_at ASC NULLS FIRST;

-- Get review statistics
SELECT
  COUNT(*) FILTER (WHERE repetitions = 0) AS new_cards,
  COUNT(*) FILTER (WHERE repetitions > 0 AND interval < 21) AS learning_cards,
  COUNT(*) FILTER (WHERE interval >= 21) AS mature_cards
FROM cards
WHERE deck_id = :deck_id;

-- Get streak (consecutive days with reviews)
SELECT DISTINCT DATE(reviewed_at) FROM review_logs
WHERE user_id = :user_id
ORDER BY DATE(reviewed_at) DESC;
```

## Migrations

### Alembic Setup

```ini
# alembic.ini
[alembic]
script_location = %(here)s/app/db/migrations
```

### Migration Commands

```bash
# Create migration from model changes
alembic revision --autogenerate -m "Add new field"

# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# Show current revision
alembic current

# Show migration history
alembic history
```

### Migration Pattern for NOT NULL Columns

When adding NOT NULL columns to tables with existing data:

```python
# Use server_default, then remove it
def upgrade():
    op.add_column('cards', sa.Column('ease_factor', sa.Float(),
                  nullable=False, server_default='2.5'))
    op.alter_column('cards', 'ease_factor', server_default=None)
```

## Database Connection

### Connection String Format

```
postgresql+asyncpg://username:password@host:port/database
```

### Example Configuration

```env
# Development (Docker)
DATABASE_URL=postgresql+asyncpg://flashcards:flashcards@db:5432/flashcards

# Test database
TEST_DATABASE_URL=postgresql+asyncpg://flashcards:flashcards@db:5432/flashcards_test
```

## Data Integrity

### Cascade Behavior

| Parent | Child | On Delete |
|--------|-------|-----------|
| users | decks | CASCADE |
| users | refresh_tokens | CASCADE |
| users | review_logs | CASCADE |
| decks | cards | CASCADE |
| decks | review_logs | CASCADE |
| cards | review_logs | CASCADE |

### Data Validation

Validation is enforced at multiple layers:
1. **Database**: Column constraints, foreign keys, unique indexes
2. **SQLAlchemy**: Model type hints and defaults
3. **Pydantic**: Request schema validation (field lengths, value ranges)
