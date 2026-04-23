FROM node:22-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM composer:2 AS composer-builder

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-dev --no-scripts


FROM php:8.5-cli

WORKDIR /app

RUN apt-get update && apt-get install -y libsqlite3-dev libpq-dev unzip git \
    && docker-php-ext-install pdo_sqlite pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY . /app
COPY --from=composer-builder /app/vendor /app/vendor
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
COPY --from=frontend-builder /app/public/web /app/public/web

EXPOSE 8080 8081

CMD ["sh", "-c", "composer migrate && php -S 0.0.0.0:8080 -t public"]
