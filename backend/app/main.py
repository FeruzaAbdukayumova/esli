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


run_migrations()

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
