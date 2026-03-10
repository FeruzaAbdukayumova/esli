# Flashcards Application

A modern, full-stack flashcards application with spaced repetition learning, built with React/TypeScript frontend and FastAPI backend.

## Overview

Flashcards is a study application that helps users create, organize, and review flashcards using the SM-2 spaced repetition algorithm. The application supports both authenticated users with cloud storage and guest users with local browser storage, with seamless data migration between modes.

## Key Features

- **Deck Management**: Create, edit, and organize flashcards into decks with category tags
- **SM-2 Spaced Repetition**: Intelligent review scheduling with 4 response levels (Again, Hard, Good, Easy) using ease factor, interval, and repetition tracking
- **Daily New Card Limit**: Configurable per-user limit for new cards per day (default: 20)
- **Guest Mode**: Use the app without registration with localStorage persistence
- **Data Sync**: Migrate guest data to a registered account
- **Browse Public Decks**: Discover and copy community-shared flashcard decks
- **AI Card Generation**: Generate flashcards from a topic or PDF using Claude AI
- **Multi-Language Translation**: Translate card content into 13 languages using MyMemory API
- **File Import**: Import flashcards from Excel/CSV files with auto-detect column mapping
- **Theme System**: 6 color presets (Indigo, Emerald, Rose, Amber, Violet, Slate) with dark mode support
- **Profile & Settings**: Editable username, theme preferences, daily card limit configuration
- **Dashboard Statistics**: Streak tracking, mastery percentage, review forecast, deck progress
- **Welcome Modal**: First-time feature highlights dialog introducing AI generation, file import, translation, shortcuts, and community decks
- **Responsive UI**: Clean, modern interface with smooth animations optimized for mobile
- **Keyboard Shortcuts**: Efficient studying with keyboard navigation, with a dismissible shortcuts banner on the study page

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, TypeScript, Vite, TanStack Query, Tailwind CSS |
| Backend | FastAPI, Python 3.12, SQLAlchemy 2.0, Pydantic |
| Database | PostgreSQL 16 |
| Infrastructure | Docker, Docker Compose |
| Authentication | JWT (4-hour access tokens) + HTTP-only refresh tokens (7-day) |
| AI | Anthropic Claude API (card generation) |
| Translation | MyMemory API (13 languages) |

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- Docker and Docker Compose
- PostgreSQL 16 (or use Docker)

### Running with Docker

```bash
# Clone and navigate to project
cd flashcards

# Start database and API
cd backend
docker-compose up -d

# Run database migrations
docker compose exec api alembic upgrade head

# Frontend development server
cd ../frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

**Frontend Routes:**
- `/` or `/dashboard` - Main dashboard
- `/browse` - Browse public decks
- `/browse/:deckId` - Public deck detail
- `/deck/:deckId` - Deck detail view
- `/study/:deckId` - Study mode
- `/decks` - Decks list
- `/settings` - User settings
- `/profile` - User profile
- `/login` - Login page
- `/register` - Registration page

### Manual Setup

See [Development Guide](./DEVELOPMENT.md) for detailed setup instructions.

## Project Structure

```
flashcards/
├── frontend/               # React TypeScript application
│   ├── src/
│   │   ├── app/           # App configuration, providers, router
│   │   ├── pages/         # Page components
│   │   │   ├── dashboard/ # Dashboard (decomposed into sections)
│   │   │   ├── deck/      # Deck detail and card management
│   │   │   ├── study/     # Study mode
│   │   │   ├── auth/      # Login and registration
│   │   │   ├── profile/   # User profile
│   │   │   └── browse/    # Public deck detail
│   │   ├── features/      # Feature modules (auth, decks, study, sync, stats)
│   │   └── shared/        # Shared utilities and UI components
│   └── ...
├── backend/                # FastAPI Python application
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── core/          # Configuration and security
│   │   ├── db/            # Database models and migrations
│   │   ├── schemas/       # Pydantic validation schemas
│   │   └── services/      # Business logic
│   └── ...
└── docs/                   # Documentation
```

## Documentation Index

- [Architecture Overview](./ARCHITECTURE.md) - System design and patterns
- [API Reference](./API.md) - REST API endpoints documentation
- [Frontend Guide](./FRONTEND.md) - Frontend architecture and components
- [Backend Guide](./BACKEND.md) - Backend services and structure
- [Database Schema](./DATABASE.md) - Data models and relationships
- [Development Guide](./DEVELOPMENT.md) - Setup and development workflow
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions

## Core Workflows

### User Registration & Login

1. User registers with email and password
2. Backend validates and hashes password with bcrypt
3. Access token (JWT, 4-hour) returned and stored in localStorage
4. Refresh token (7-day) set as HTTP-only cookie
5. Token auto-refreshes on 401 responses

### Creating and Studying Flashcards

1. First-time users see a welcome modal highlighting key features, and a rich empty state with 3 quick-start options: create manually, generate with AI, or browse shared decks
2. Create a deck with title and optional category tags
3. Add cards manually, via file import (Excel/CSV), or via AI generation
4. Enter study mode to review due cards
5. Rate cards as Again, Hard, Good, or Easy
6. SM-2 algorithm adjusts ease factor and schedules next review
7. Session completion shows trophy icon, confetti, session stats breakdown (Again/Hard/Good/Easy), and relative next review time
8. Sessions are automatically saved — navigate away and return to resume where you left off (works for both due-card sessions and practice mode)
9. Daily new card limit controls how many new cards appear per session

### Guest to Account Migration

1. Guest creates decks and cards (stored in localStorage)
2. Guest registers for an account
3. System automatically syncs localStorage data to account
4. Guest data cleared, user continues with cloud storage

### Browsing and Copying Public Decks

1. Visit the `/browse` page (no login required)
2. Search and sort public decks by popularity, recent, or title
3. Preview deck information (title, tags, card count, copy count)
4. Click "Copy to Library" to add deck to your account (requires login)
5. Guest users can also copy shared decks to localStorage

### AI Card Generation

1. Choose between topic-based or PDF-based generation
2. Specify a topic and desired card count (up to 100)
3. For PDF mode, upload a document (max 10 MB) with optional focus topic
4. AI generates flashcard pairs using Claude
5. Review and add generated cards to your deck
6. Available to both guest and authenticated users

### Multi-Language Translation

1. While studying, select a target language from the language dropdown
2. Card back text is translated into the selected language
3. Translations are cached in the database for authenticated users
4. Supports 13 languages: Spanish, Chinese, Russian, Arabic, Japanese, Korean, Portuguese, French, German, Hindi, Turkish, Vietnamese, Uzbek

## License

MIT License - see LICENSE file for details.
