.PHONY: test test-auth test-watch test-setup help

help:
	@echo "Available commands:"
	@echo "  make test-setup  - Rebuild container to install test dependencies"
	@echo "  make test        - Run all tests"
	@echo "  make test-auth   - Run only auth tests"
	@echo "  make test-watch  - Run tests in watch mode"
	@echo "  make test-verbose - Run tests with verbose output"

test-setup:
	docker compose build api
	docker compose up -d api

test:
	docker compose exec api pytest

test-auth:
	docker compose exec api pytest tests/test_auth.py

test-watch:
	docker compose exec api pytest --watch

test-verbose:
	docker compose exec api pytest -v
