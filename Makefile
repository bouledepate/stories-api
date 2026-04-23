COMPOSE := docker compose
APP_SERVICE := api
WS_SERVICE := ws

.PHONY: help up watch down restart build rebuild logs ps pull sh ws-sh migrate test

help:
	@printf '%s\n' \
		'make up       - start containers' \
		'make watch    - start containers with auto-rebuild on file changes' \
		'make down     - stop containers' \
		'make restart  - restart containers' \
		'make build    - build application images' \
		'make rebuild  - rebuild and start containers' \
		'make logs     - follow compose logs' \
		'make ps       - show container status' \
		'make pull     - pull base images' \
		'make sh       - open shell in api container' \
		'make ws-sh    - open shell in ws container' \
		'make migrate  - run database migrations in api container' \
		'make test     - run PHPUnit in api container'

up:
	$(COMPOSE) up --build

watch:
	$(COMPOSE) up --build --watch

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) down
	$(COMPOSE) up --build

build:
	$(COMPOSE) build

rebuild:
	$(COMPOSE) up --build --force-recreate

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

pull:
	$(COMPOSE) pull

sh:
	$(COMPOSE) exec $(APP_SERVICE) sh

ws-sh:
	$(COMPOSE) exec $(WS_SERVICE) sh

migrate:
	$(COMPOSE) exec $(APP_SERVICE) composer migrate

test:
	$(COMPOSE) exec $(APP_SERVICE) vendor/bin/phpunit
