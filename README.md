# Flashcards

A modern, full-stack flashcards application with spaced repetition learning.

## Overview

Flashcards is a study application that helps users create, organize, and review flashcards using spaced repetition algorithms. The application supports both authenticated users with cloud storage and guest users with local browser storage.

## Features

- **Deck Management** - Create, edit, and organize flashcards into decks with category tags
- **SM-2 Spaced Repetition** - Industry-standard algorithm (like Anki) with adaptive intervals based on performance
  - **Again** - Didn't remember (resets card, review in 1 minute)
  - **Hard** - Struggled to recall (small interval increase, ease decreases)
  - **Good** - Remembered correctly (normal progression)
  - **Easy** - Knew it instantly (larger interval, ease increases)
- **Dynamic Intervals** - Each response button shows when you'll see the card next
- **Guest Mode** - Use without registration with localStorage persistence
- **Data Sync** - Seamlessly migrate guest data to a registered account
- **Browse Public Decks** - Discover and copy community-shared flashcard decks
- **Multi-language Support** - Translate card backs to 13+ languages via AI
- **Keyboard Shortcuts** - Efficient studying with Space (flip), Arrow keys (navigate), and 1/2/3/4 (respond)
- **Responsive Design** - Clean, modern interface with smooth 3D flip animations

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, TypeScript, Vite, TanStack Query, Tailwind CSS |
| Backend | FastAPI, Python 3.12, SQLAlchemy 2.0, Pydantic |
| Database | PostgreSQL 16 |
| Auth | JWT with bcrypt |
| Infrastructure | Docker, Docker Compose |

## Quick Start

```bash
# Start database
docker-compose up -d db

# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
flashcards/
├── frontend/          # React + TypeScript application
├── backend/           # FastAPI Python server
└── docs/              # Detailed documentation
```

## Documentation

| Document | Description |
|----------|-------------|
| [docs/README.md](docs/README.md) | Documentation index |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design and patterns |
| [docs/API.md](docs/API.md) | REST API reference |
| [docs/FRONTEND.md](docs/FRONTEND.md) | Frontend architecture |
| [docs/BACKEND.md](docs/BACKEND.md) | Backend services |
| [docs/DATABASE.md](docs/DATABASE.md) | Database schema |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Development setup |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Production deployment |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/register` | POST | Register new user |
| `/api/v1/auth/login` | POST | Login user |
| `/api/v1/auth/me` | GET | Get current user |
| `/api/v1/decks` | GET/POST | List/create decks |
| `/api/v1/decks/{id}` | PATCH/DELETE | Update/delete deck |
| `/api/v1/decks/{id}/cards` | GET/POST | List/create cards |
| `/api/v1/cards/{id}` | PATCH/DELETE | Update/delete card |
| `/api/v1/cards/{id}/review` | POST | Record card review (SM-2 algorithm) |
| `/api/v1/cards/{id}/intervals` | GET | Get next review intervals for each response |
| `/api/v1/sync/import` | POST | Import guest data |
| `/api/v1/public/decks` | GET | Browse public decks |
| `/api/v1/public/decks/{id}` | GET | Get public deck details |
| `/api/v1/public/decks/{id}/cards` | GET | Preview public deck cards |
| `/api/v1/public/decks/{id}/copy` | POST | Copy public deck to library |

## License

MIT
