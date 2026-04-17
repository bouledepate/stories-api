# Stories API (PHP + Slim v4)

Vertical Slice backend scaffold for a turn-based board game API.

## Stack

- PHP 8.5-ready codebase (composer constraint: `>=8.3`)
- Slim v4
- Doctrine DBAL
- SQLite file database (`var/data.sqlite` by default)
- Bearer token auth (HMAC-signed token service)

## Architecture

This project uses **Vertical Slice Architecture**:

- `src/Slices/Auth` — registration, login, me
- `src/Slices/Rooms` — room lifecycle + round actions
- `src/Slices/Admin` — card management endpoints
- `src/Shared` — shared cross-slice concerns only (DB connection, auth, responder)

Each slice contains `Action` + `Dto` + `Service`.

## Run locally

```bash
composer install
composer migrate
composer serve
```

Server starts at `http://localhost:8080`.

## API documentation

- OpenAPI spec: `GET /openapi.yaml`
- Swagger UI: `GET /docs/`

## Key endpoints

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /rooms`
- `POST /rooms/{roomId}/join?spectator=true|false`
- `POST /rooms/{roomId}/leave`
- `POST /rooms/{roomId}/ready`
- `POST /rooms/{roomId}/start`
- `GET /rooms/{roomId}`
- `POST /rooms/{roomId}/actions`
- `GET /admin/cards?deck=character|decree|event`
- `PATCH /admin/cards/{deck}/{cardCode}`
- `GET /admin/effects`

## Environment

- `DB_PATH` (default: `var/data.sqlite`)
- `JWT_SECRET` (default: `change-me`)
- `DISCONNECT_GRACE_SECONDS` (default: `30`)

## Migrations

- SQL files are in `migrations/`
- Runner script: `bin/migrate.php`
- Applied migrations are tracked in table `schema_migrations`

