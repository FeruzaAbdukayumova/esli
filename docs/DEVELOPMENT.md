# Development Guide

Complete guide for setting up and developing the Flashcards application.

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18+ | Frontend runtime |
| npm | 9+ | Package manager |
| Python | 3.12+ | Backend runtime |
| PostgreSQL | 16+ | Database |
| Docker | 24+ | Containerization |
| Docker Compose | 2.20+ | Multi-container orchestration |
| Git | 2.40+ | Version control |

### Recommended Tools

| Tool | Purpose |
|------|---------|
| VS Code | IDE with extensions |
| Postman / Insomnia | API testing |
| DBeaver / pgAdmin | Database management |
| nvm | Node version management |
| pyenv | Python version management |

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/flashcards.git
cd flashcards
```

### 2. Database Setup

**Option A: Using Docker (Recommended)**

```bash
# Start PostgreSQL and API containers
cd backend
docker-compose up -d

# Verify it's running
docker-compose ps
```

**Option B: Local PostgreSQL**

```bash
# Create database
createdb flashcards

# Create test database
createdb flashcards_test
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your settings

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --port 8000
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Verify Setup

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Environment Configuration

### Backend (.env)

```env
# Application
APP_NAME=flashcards-api
API_V1_PREFIX=/api/v1

# Database
DATABASE_URL=postgresql+asyncpg://flashcards:flashcards@localhost:5432/flashcards

# JWT Authentication
JWT_SECRET=your-secret-key-change-in-production
JWT_ALG=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=240
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS Origins
CORS_ORIGINS=http://localhost:5173

# AI Generation (optional - required for AI card generation)
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Frontend (.env.local)

```env
# API Base URL (optional - defaults to proxy)
VITE_API_URL=http://localhost:8000/api/v1
```

## Development Workflow

### Starting the Application

**Quick Start (Docker)**

```bash
# Start all services (docker-compose.yml is in backend/)
cd backend
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

**Manual Start**

Terminal 1 - Database:
```bash
cd backend
docker-compose up -d db
```

Terminal 2 - Backend:
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Terminal 3 - Frontend:
```bash
cd frontend
npm run dev
```

### Code Changes

**Frontend (Hot Reload)**
- Save file → Vite automatically reloads browser
- TypeScript errors shown in terminal and browser

**Backend (Auto Reload)**
- Save file → Uvicorn restarts server
- Check terminal for errors

### Database Migrations

```bash
cd backend

# Create migration after model changes
alembic revision --autogenerate -m "Description of changes"

# Review generated migration in app/db/migrations/versions/

# Apply migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
make test

# Run specific test file
pytest tests/test_auth.py -v

# Run with coverage
pytest --cov=app tests/

# Watch mode (requires pytest-watch)
make test-watch
```

**Test Database Configuration:**

Tests use a separate database to avoid affecting development data:

```env
# Test database URL (in conftest.py or test .env)
TEST_DATABASE_URL=postgresql+asyncpg://flashcards:flashcards@localhost:5432/flashcards_test
```

### Frontend Tests

```bash
cd frontend

# Run tests (if configured)
npm test

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Code Quality

### Backend Linting

```bash
cd backend

# Install linting tools
pip install black isort flake8 mypy

# Format code
black app/
isort app/

# Check style
flake8 app/

# Type checking
mypy app/
```

### Frontend Linting

```bash
cd frontend

# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Type check
npx tsc --noEmit
```

### Pre-commit Hooks (Optional)

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

## Debugging

### Backend Debugging

**VS Code Launch Configuration:**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--port", "8000"],
      "cwd": "${workspaceFolder}/backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/backend"
      }
    }
  ]
}
```

**Using pdb:**

```python
# Add breakpoint in code
import pdb; pdb.set_trace()

# Or use breakpoint() in Python 3.7+
breakpoint()
```

**Logging:**

```python
import structlog

logger = structlog.get_logger()
logger.debug("Debug message", variable=value)
logger.info("Info message")
logger.error("Error occurred", error=str(e))
```

### Frontend Debugging

**Browser DevTools:**
- React DevTools extension
- Network tab for API calls
- Console for errors

**VS Code Debugging:**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/frontend/src"
    }
  ]
}
```

### Database Debugging

```bash
# Connect to PostgreSQL (from backend/ directory)
cd backend
docker-compose exec db psql -U flashcards -d flashcards

# Common queries
\dt                    # List tables
\d+ users              # Describe users table
SELECT * FROM users;   # View data

# Exit
\q
```

## Common Tasks

### Reset Database

```bash
# Drop and recreate (development only!)
cd backend
docker-compose down -v
docker-compose up -d db
alembic upgrade head
```

### Update Dependencies

**Backend:**
```bash
cd backend
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt
```

**Frontend:**
```bash
cd frontend
npm update
npm audit fix
```

### Add New API Endpoint

1. Create/update Pydantic schema in `app/schemas/`
2. Add service function in `app/services/`
3. Create route in `app/api/v1/routes/`
4. Register route in `app/api/v1/router.py`
5. Write tests in `tests/`

### Add New Frontend Feature

1. Create feature directory in `src/features/`
2. Add types in `types.ts`
3. Add API calls in `api.ts`
4. Add React Query hooks in `hooks.ts`
5. Create components
6. Add route in `app/routes.tsx`

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find and kill process
lsof -i :8000
kill -9 <PID>
```

**Database connection refused:**
```bash
# Check if PostgreSQL is running (from backend/)
cd backend
docker-compose ps

# Restart database
docker-compose restart db
```

**Migration errors:**
```bash
# Check current state
alembic current

# Stamp to known state if needed
alembic stamp head
```

**Node modules issues:**
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

**Python virtual environment issues:**
```bash
# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Getting Help

1. Check existing documentation
2. Search issues on GitHub
3. Review error logs carefully
4. Ask team members

## IDE Setup

### VS Code Extensions

**Required:**
- Python
- Pylance
- ESLint
- Tailwind CSS IntelliSense

**Recommended:**
- GitLens
- Docker
- PostgreSQL
- Thunder Client (API testing)
- Error Lens

### VS Code Settings

```json
// .vscode/settings.json
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "editor.formatOnSave": true,
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Git Workflow

### Branch Naming

```
feature/add-user-profile
bugfix/fix-login-redirect
hotfix/security-patch
docs/update-readme
```

### Commit Messages

Follow conventional commits:

```
feat: add user profile page
fix: correct login redirect URL
docs: update API documentation
refactor: simplify auth flow
test: add deck service tests
chore: update dependencies
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with tests
3. Ensure all tests pass
4. Create PR with description
5. Request code review
6. Address feedback
7. Merge after approval
