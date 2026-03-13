import subprocess
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.core.config import settings


def run_migrations():
    try:
        subprocess.run(["alembic", "upgrade", "head"], check=True)
        print("Migrations completed successfully")
    except Exception as e:
        print(f"Migration failed: {e}")


def run_seeds():
    try:
        result = subprocess.run(
            ["python", "-m", "app.db.seeds.seed_decks"],
            capture_output=True, text=True
        )
        print(f"Seed stdout: {result.stdout}")
        if result.stderr:
            print(f"Seed stderr: {result.stderr}")
        if result.returncode != 0:
            print(f"Seeding failed with code {result.returncode}")
        else:
            print("Seeding completed successfully")
    except Exception as e:
        print(f"Seeding failed: {e}")


run_migrations()
run_seeds()

app = FastAPI(
    title=settings.APP_NAME,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^(chrome-extension|moz-extension)://.*$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)
