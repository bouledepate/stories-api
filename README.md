# Stories API (PHP + Slim v4) + Web UI

Vertical Slice backend scaffold for a turn-based board game API with modern web frontend and WebSocket foundation.

## Stack

### Backend
- PHP 8.5-ready codebase (composer constraint: `>=8.3`)
- Slim v4
- PHP-DI (+ Slim Bridge)
- Doctrine DBAL
- `vlucas/phpdotenv`
- Ratchet WebSocket server (`cboden/ratchet`)

### Frontend
- Vite
- Vanilla JS (ES modules)
- SCSS (Sass)
- Built assets are published into `public/web`

## Architecture

This project uses **Vertical Slice Architecture**:

- `src/Slices/Auth` — registration, login, me
- `src/Slices/Rooms` — room lifecycle + round actions
- `src/Slices/Admin` — card management endpoints
- `src/Shared` — shared concerns (DB, auth, responder, websocket)

## Run locally

```bash
composer install
cp .env.example .env # optional
composer migrate
composer frontend:build
composer serve
```

API server starts at `http://localhost:8080`.

### Run WebSocket server

```bash
composer ws:serve
```

WebSocket server starts at `ws://localhost:8081`.

## Frontend development

```bash
cd frontend
npm install
npm run dev
```

Or build production assets to `public/web`:

```bash
npm run build
```

Web UI entrypoint in API runtime: `GET /`.


## API localization for errors

Error responses support locale selection by request headers:
- `Locale: ru|en`
- `Language: ru|en`

Priority: `Locale` -> `Language` -> default `en`.

Error payload format:
```json
{
  "error": "Localized message",
  "errorCode": "MACHINE_READABLE_CODE"
}
```

Response also includes `Content-Language` with the resolved locale.

Translations are stored in PHP message files: `messages/en/app.php` and `messages/ru/app.php` (Yiisoft Translator).

## API docs

- OpenAPI spec: `GET /openapi.yaml`
- Swagger UI: `GET /docs/`

## WebSocket protocol (foundation)

### Client -> server
- `{"type":"ping"}`
- `{"type":"subscribe_room","roomId":"..."}`
- `{"type":"room_event","roomId":"...","event":"...","data":{...}}`

### Server -> client
- `connected`
- `pong`
- `presence`
- `room_event`
- `error`

## Docker Compose

```bash
docker compose up --build
```

Starts:
- `api` on `:8080`
- `ws` on `:8081`

## Environment

The app auto-loads `.env` from project root if present.

- `DB_PATH` (default: `var/data.sqlite`)
- `JWT_SECRET` (default: `change-me`)
- `DISCONNECT_GRACE_SECONDS` (default: `30`)
- `WS_HOST` (default: `0.0.0.0`)
- `WS_PORT` (default: `8081`)

## Migrations

- SQL files are in `migrations/`
- Runner script: `bin/migrate.php`
- Applied migrations are tracked in table `schema_migrations`
