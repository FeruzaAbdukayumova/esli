#!/bin/sh
# Production entrypoint for the API container.
# Runs Alembic migrations to head before starting the app server.

set -e

echo "Running database migrations..."
alembic upgrade head

echo "Starting API on port ${PORT:-8000}..."
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}" --proxy-headers --forwarded-allow-ips="*"
