import os
import pytest
import subprocess
from typing import AsyncGenerator
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy import text

from app.main import app
from app.db.base import Base
from app.db.session import get_db


# Override DATABASE_URL for tests
TEST_DATABASE_URL = os.getenv(
    "TEST_DATABASE_URL",
    "postgresql+asyncpg://flashcards:flashcards@db:5432/flashcards_test"
)

# Create test engine
test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestSessionLocal = async_sessionmaker(
    bind=test_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


@pytest.fixture(scope="session", autouse=True)
async def setup_test_database():
    """Set up test database: create if needed, run migrations, and truncate tables."""
    # Create test database if it doesn't exist
    import asyncpg

    try:
        conn = await asyncpg.connect(
            host="db",
            port=5432,
            user="flashcards",
            password="flashcards",
            database="postgres"
        )

        exists = await conn.fetchval(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            "flashcards_test"
        )

        if not exists:
            await conn.execute("CREATE DATABASE flashcards_test")

        await conn.close()
    except Exception as e:
        check_result = subprocess.run(
            ["psql", "-h", "db", "-U", "flashcards", "-d", "postgres", "-tc",
             "SELECT 1 FROM pg_database WHERE datname = 'flashcards_test'"],
            env={"PGPASSWORD": "flashcards", **os.environ},
            capture_output=True,
            text=True
        )

        if check_result.stdout.strip() != "1":
            create_result = subprocess.run(
                ["psql", "-h", "db", "-U", "flashcards", "-d", "postgres", "-c",
                 "CREATE DATABASE flashcards_test"],
                env={"PGPASSWORD": "flashcards", **os.environ},
                capture_output=True,
                text=True
            )

            if create_result.returncode != 0:
                raise RuntimeError(
                    f"Failed to create test database. "
                    f"Asyncpg error: {e}. Psql error: {create_result.stderr}"
                )

    # Drop all existing tables before running migrations to ensure clean state
    async with test_engine.connect() as conn:
        await conn.execute(text("DROP SCHEMA IF EXISTS public CASCADE"))
        await conn.execute(text("CREATE SCHEMA public"))
        await conn.execute(text("GRANT ALL ON SCHEMA public TO flashcards"))
        await conn.execute(text("GRANT ALL ON SCHEMA public TO public"))
        await conn.commit()

    # Run migrations using subprocess
    env = os.environ.copy()
    env["DATABASE_URL"] = TEST_DATABASE_URL

    backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    result = subprocess.run(
        ["alembic", "upgrade", "head"],
        env=env,
        cwd=backend_dir,
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        raise RuntimeError(f"Migration failed: {result.stderr}\n{result.stdout}")

    yield

    # Cleanup: truncate all tables after test session
    async with test_engine.connect() as conn:
        result = await conn.execute(
            text("""
                SELECT tablename FROM pg_tables
                WHERE schemaname = 'public'
            """)
        )
        tables = [row[0] for row in result]

        if tables:
            await conn.execute(text("TRUNCATE TABLE " + ", ".join(tables) + " RESTART IDENTITY CASCADE"))
            await conn.commit()

    await test_engine.dispose()


@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Create a database session for tests."""
    async with TestSessionLocal() as session:
        yield session
        await session.rollback()


@pytest.fixture
async def async_client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """Create an async HTTP client for testing."""
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as client:
        yield client

    app.dependency_overrides.clear()
