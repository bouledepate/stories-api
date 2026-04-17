# Stories API (PHP + Slim v4)

Vertical Slice backend scaffold for a turn-based board game API.

## Stack

- PHP 8.5-ready codebase (composer constraint: `>=8.3`)
- Slim v4
- Bearer token auth (HMAC-signed token service)
- In-memory data store for MVP speed

## Architecture

This project uses **Vertical Slice Architecture**:

- `src/Slices/Auth` — registration, login, me
- `src/Slices/Rooms` — room lifecycle + round actions
- `src/Slices/Admin` — card management endpoints
- `src/Shared` — shared cross-slice concerns only (JWT, responder, store)

Each slice contains `Action` + `Dto` + `Service`.

## Run locally

```bash
composer install
composer serve
```

Server starts at `http://localhost:8080`.

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

- `JWT_SECRET` (default: `change-me`)
- `DISCONNECT_GRACE_SECONDS` (default: `30`)

## Notes

- SOLID/DRY/YAGNI: minimal abstractions, slice-local logic, shared concerns only where needed.
- WebSocket intentionally omitted in this iteration to keep MVP focused on core HTTP game loop; realtime transport can be added as a dedicated slice (`Realtime`) without changing current domain services.
