#!/bin/bash
# Initialize test database
# This script creates the flashcards_test database if it doesn't exist

set -e

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-flashcards}"
DB_PASSWORD="${DB_PASSWORD:-flashcards}"
DB_NAME="flashcards_test"

export PGPASSWORD="$DB_PASSWORD"

echo "Creating test database '$DB_NAME' if it doesn't exist..."

psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -tc \
  "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
  psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c \
  "CREATE DATABASE $DB_NAME"

echo "Test database '$DB_NAME' is ready."
