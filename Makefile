# Top-level Makefile
# Use `make` or `make all` to lint, build, and run everything.

# Variables
FRONTEND_DIR := frontend
BACKEND_DIR  := backend

# Default target
.PHONY: all
all: lint-frontend build-frontend lint-backend build-backend run

# -----------------------------
# Frontend
# -----------------------------
.PHONY: lint-frontend
lint-frontend:
	@echo "==> Linting frontend..."
	@npm --prefix $(FRONTEND_DIR) run lint:fix
	@npm --prefix $(FRONTEND_DIR) run lint

.PHONY: build-frontend
build-frontend:
	@echo "==> Building frontend..."
	@npm --prefix $(FRONTEND_DIR) run build

# -----------------------------
# Backend
# -----------------------------
.PHONY: lint-backend
lint-backend:
	@echo "==> Linting backend..."
	# TODO: Add backend linting (golangci-lint / flake8 / etc.)

.PHONY: build-backend
build-backend:
	@echo "==> Building backend..."
	# TODO: Add backend build command (go build / python setup.py / etc.)

# -----------------------------
# Run
# -----------------------------
.PHONY: run
run:
	@echo "==> Running app..."
	@npm --prefix $(FRONTEND_DIR) run dev