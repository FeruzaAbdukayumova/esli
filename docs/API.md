# API Reference

Complete REST API documentation for the Flashcards backend.

## Base URL

```
Development: http://localhost:8000/api/v1
Production: https://your-domain.com/api/v1
```

## Authentication

The API uses JWT Bearer token authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Access tokens expire after 4 hours (configurable via `ACCESS_TOKEN_EXPIRE_MINUTES`). Refresh tokens are stored as HTTP-only cookies with a 7-day lifetime.

---

## Endpoints

### Authentication (`/auth`)

#### Register User

Creates a new user account, returns a JWT access token, and sets a refresh token cookie.

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| email | string | Valid email format |
| password | string | 8-72 characters |

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Set-Cookie:** `refresh_token=<token>; HttpOnly; Path=/api/v1/auth; Max-Age=604800; SameSite=lax`

**Errors:**
| Status | Description |
|--------|-------------|
| 409 | Email already registered |
| 422 | Validation error (invalid email format, password too short/long) |

---

#### Login

Authenticates a user, returns a JWT access token, and sets a refresh token cookie.

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Set-Cookie:** `refresh_token=<token>; HttpOnly; Path=/api/v1/auth; Max-Age=604800; SameSite=lax`

**Errors:**
| Status | Description |
|--------|-------------|
| 401 | Invalid email or password |
| 422 | Validation error |

---

#### Refresh Token

Rotates the refresh token and returns a new access token. The old refresh token is revoked.

```
POST /auth/refresh
```

**Cookie Required:** `refresh_token` (set automatically by login/register)

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Set-Cookie:** New `refresh_token` cookie (old one revoked)

**Errors:**
| Status | Description |
|--------|-------------|
| 401 | Missing, invalid, or expired refresh token |

---

#### Logout

Revokes the refresh token and clears the cookie.

```
POST /auth/logout
```

**Cookie Required:** `refresh_token`

**Response (200 OK):**
```json
{
  "message": "Logged out"
}
```

---

#### Get Current User

Returns the authenticated user's profile.

```
GET /auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "auth_provider": "password",
  "username": "johndoe",
  "theme": "indigo",
  "dark_mode": "system",
  "preferred_language": "en",
  "daily_new_card_limit": 20,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Errors:**
| Status | Description |
|--------|-------------|
| 401 | Missing or invalid token |

---

#### Update User Settings

Updates the authenticated user's profile and settings.

```
PATCH /auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Request Body (all fields optional):**
```json
{
  "username": "newname",
  "theme": "emerald",
  "dark_mode": "dark",
  "preferred_language": "es",
  "daily_new_card_limit": 30
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| username | string | 1-50 chars, must be unique |
| theme | string | One of: `indigo`, `emerald`, `rose`, `amber`, `violet`, `slate` |
| dark_mode | string | One of: `light`, `dark`, `system` |
| preferred_language | string | `en` or supported language code |
| daily_new_card_limit | integer | 0-9999 |

**Response (200 OK):** Updated user object (same shape as GET /auth/me)

**Errors:**
| Status | Description |
|--------|-------------|
| 409 | Username already taken |
| 422 | Validation error |

---

### Decks (`/decks`)

#### List Decks

Returns all decks owned by the authenticated user, ordered by `updated_at` descending.

```
GET /decks
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Spanish Vocabulary",
    "category_tags": "language,spanish,beginner",
    "is_shared": false,
    "copy_count": 0,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

---

#### Create Deck

```
POST /decks
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Spanish Vocabulary",
  "category_tags": "language,spanish,beginner",
  "is_shared": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Deck title (max 255 chars) |
| category_tags | string | No | Comma-separated tags (max 500 chars) |
| is_shared | boolean | No | Public visibility (default: false) |

**Response (201 Created):** Deck object

---

#### Update Deck

```
PATCH /decks/{deck_id}
```

**Path Parameters:** `deck_id` (UUID)

**Headers:** `Authorization: Bearer <token>`

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "category_tags": "new,tags",
  "is_shared": true
}
```

**Response (200 OK):** Updated deck object

**Errors:**
| Status | Description |
|--------|-------------|
| 404 | Deck not found or not owned by user |

---

#### Delete Deck

Deletes a deck and all its cards (cascade).

```
DELETE /decks/{deck_id}
```

**Response (204 No Content)**

---

#### List Cards in Deck

```
GET /decks/{deck_id}/cards
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "deck_id": "550e8400-e29b-41d4-a716-446655440001",
    "front_text": "Hola",
    "back_text": "Hello",
    "front_image_url": null,
    "back_image_url": null,
    "translations": null,
    "ease_factor": 2.5,
    "interval": 0,
    "repetitions": 0,
    "last_reviewed_at": null,
    "next_review_at": null,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

---

#### Create Card in Deck

```
POST /decks/{deck_id}/cards
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "front_text": "Hola",
  "back_text": "Hello",
  "front_image_url": null,
  "back_image_url": null
}
```

**Response (201 Created):** Card object

---

#### Batch Create Cards

Creates multiple cards in a single request.

```
POST /decks/{deck_id}/cards/batch
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "cards": [
    { "front_text": "Hola", "back_text": "Hello" },
    { "front_text": "Adiós", "back_text": "Goodbye" }
  ]
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| cards | array | 1-500 card objects |

**Response (201 Created):**
```json
{
  "created": 2,
  "cards": [...]
}
```

---

### Cards (`/cards`)

#### Update Card

```
PATCH /cards/{card_id}
```

**Headers:** `Authorization: Bearer <token>`

**Request Body (all fields optional):**
```json
{
  "front_text": "Updated front",
  "back_text": "Updated back",
  "front_image_url": "https://example.com/image.jpg",
  "back_image_url": null
}
```

**Response (200 OK):** Updated card object

---

#### Delete Card

```
DELETE /cards/{card_id}
```

**Response (204 No Content)**

---

#### Record Card Review (SM-2)

Records a review using the SM-2 spaced repetition algorithm and creates a ReviewLog entry.

```
POST /cards/{card_id}/review
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "response": "good"
}
```

| Field | Type | Required | Values |
|-------|------|----------|--------|
| response | string | Yes | `again`, `hard`, `good`, `easy` |

**SM-2 Response Effects:**
| Response | Ease Change | Interval Logic | Next Review |
|----------|-------------|----------------|-------------|
| `again` | -0.2 (min 1.3) | Reset interval and repetitions | 1 minute |
| `hard` | -0.15 (min 1.3) | Learning: 10 min; Review: interval x 1.2 | 10 min or days |
| `good` | No change | Rep 0: 1d, Rep 1: 3d, Rep 2+: interval x ease | Standard |
| `easy` | +0.15 (max 3.0) | Rep 0: 4d, Rep 1+: interval x ease x 1.3 | Accelerated |

**Response (200 OK):** Updated card object with new `ease_factor`, `interval`, `repetitions`, `next_review_at`

---

#### Get Card Intervals

Preview the next review intervals for each response option without recording a review.

```
GET /cards/{card_id}/intervals
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "again": "1m",
  "hard": "10m",
  "good": "1d",
  "easy": "4d"
}
```

---

#### Get Translated Card

Returns a card with translated back text. Translations are cached in the database.

```
GET /cards/{card_id}/translated?lang=es
```

**No authentication required.**

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| lang | string | Yes | Target language code |

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "front_text": "Hola",
  "back_text": "Hello",
  "translated_back": "Hola"
}
```

---

#### Translate Text (Guest Mode)

Translates arbitrary text without requiring a card in the database. For guest mode users.

```
POST /cards/translate-text
```

**No authentication required.**

**Request Body:**
```json
{
  "text": "Hello, world",
  "lang": "es"
}
```

**Response (200 OK):**
```json
{
  "translated_text": "Hola, mundo"
}
```

---

#### Get Supported Languages

Returns the list of supported translation languages.

```
GET /cards/languages/supported
```

**No authentication required.**

**Response (200 OK):**
```json
{
  "es": "Spanish",
  "zh": "Chinese",
  "ru": "Russian",
  "ar": "Arabic",
  "ja": "Japanese",
  "ko": "Korean",
  "pt": "Portuguese",
  "fr": "French",
  "de": "German",
  "hi": "Hindi",
  "tr": "Turkish",
  "vi": "Vietnamese",
  "uz": "Uzbek"
}
```

---

### AI Generation (`/ai`)

#### Generate Cards from Topic

Generates flashcard pairs from a text topic using Claude AI.

```
POST /ai/generate-cards
```

**No authentication required.**

**Request Body:**
```json
{
  "topic": "Basic Spanish greetings",
  "count": 10,
  "include_deck_info": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| topic | string | Yes | Topic to generate cards about |
| count | integer | No | Number of cards (default: 10, max: 100) |
| include_deck_info | boolean | No | Include suggested title/tags |

**Response (200 OK):**
```json
{
  "cards": [
    { "front_text": "Hola", "back_text": "Hello" },
    { "front_text": "Buenos días", "back_text": "Good morning" }
  ],
  "suggested_title": "Basic Spanish Greetings",
  "suggested_tags": "spanish,greetings,beginner"
}
```

---

#### Generate Cards from PDF

Generates flashcard pairs from an uploaded PDF document.

```
POST /ai/generate-cards-from-pdf
```

**No authentication required.**

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | file | Yes | PDF file (max 10 MB) |
| count | integer | No | Number of cards (default: 10, max: 100) |
| topic | string | No | Optional focus topic to narrow generation |

**Response (200 OK):** Same format as topic-based generation

---

### Public Decks (`/public`)

#### List Public Decks

Returns a paginated list of public (shared) decks.

```
GET /public/decks
```

**No authentication required.**

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 1 | Page number (1-indexed) |
| per_page | int | 20 | Items per page (1-100) |
| search | string | null | Search in title and tags |
| sort_by | string | "popular" | Sort: `popular`, `recent`, `title` |
| category | string | null | Filter by category tag |

**Response (200 OK):**
```json
{
  "decks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Spanish Vocabulary",
      "category_tags": "language,spanish,beginner",
      "copy_count": 42,
      "card_count": 150,
      "owner": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "per_page": 20,
  "total_pages": 5
}
```

---

#### Get Public Deck

```
GET /public/decks/{deck_id}
```

**Response (200 OK):** Single public deck object with card count

---

#### Get Public Deck Cards (Preview)

Returns a limited preview of cards from a public deck.

```
GET /public/decks/{deck_id}/cards
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | int | 10 | Number of preview cards (max 500) |

**Response (200 OK):** Array of card objects

---

#### Copy Public Deck

Copies a public deck to the authenticated user's library with all cards. Review state is reset. Increments `copy_count` on the source deck.

```
POST /public/decks/{deck_id}/copy
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440099",
  "title": "Spanish Vocabulary",
  "category_tags": "language,spanish,beginner",
  "card_count": 150,
  "message": "Successfully copied deck with 150 cards"
}
```

---

### Statistics (`/stats`)

#### Get Dashboard Statistics

Returns aggregated statistics for the authenticated user's dashboard.

```
GET /stats/dashboard
```

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "last_studied_deck": { "id": "...", "title": "Spanish" },
  "cards_due_today": 15,
  "new_cards_available": 42,
  "cards_reviewed_today": 8,
  "total_cards": 250,
  "total_decks": 5,
  "mastery_percent": 35.2,
  "streak_days": 7,
  "retention_percent": 82.5,
  "deck_progress": [
    {
      "deck_id": "...",
      "title": "Spanish",
      "new_count": 10,
      "learning_count": 15,
      "mature_count": 25,
      "total": 50
    }
  ],
  "review_forecast": [
    { "date": "2024-01-16", "count": 12 },
    { "date": "2024-01-17", "count": 8 }
  ]
}
```

**Card Stage Definitions:**
| Stage | Condition |
|-------|-----------|
| New | `repetitions == 0` |
| Learning | `repetitions > 0` AND `interval < 21` |
| Mature | `interval >= 21` |

---

### Data Synchronization (`/sync`)

#### Import Guest Data

Imports decks and cards from guest mode (localStorage) into the user's account.

```
POST /sync/import
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "decks": [
    {
      "guest_deck_id": "local-123",
      "title": "My Guest Deck",
      "category_tags": "imported",
      "is_shared": false
    }
  ],
  "cards": [
    {
      "guest_deck_id": "local-123",
      "front_text": "Front",
      "back_text": "Back",
      "front_image_url": null,
      "back_image_url": null
    }
  ]
}
```

**Limits:**
- Maximum 200 decks per import
- Maximum 5000 cards per import

**Response (200 OK):**
```json
{
  "imported_decks": 1,
  "imported_cards": 1,
  "deck_id_map": { "local-123": "550e8400-..." }
}
```

---

## Error Responses

All errors follow a consistent format:

**Validation Error (422):**
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

**Authentication Error (401):**
```json
{
  "detail": "Could not validate credentials"
}
```

**Not Found Error (404):**
```json
{
  "detail": "Deck not found"
}
```

**Conflict Error (409):**
```json
{
  "detail": "Email already registered"
}
```

---

## OpenAPI Documentation

Interactive API documentation is available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`
