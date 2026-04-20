FROM php:8.5-cli

WORKDIR /app

RUN apt-get update && apt-get install -y libsqlite3-dev libpq-dev unzip git \
    && docker-php-ext-install pdo_sqlite pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY . /app

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-interaction --prefer-dist --no-dev \
    && rm composer-setup.php

EXPOSE 8080 8081

CMD ["sh", "-c", "composer migrate && php -S 0.0.0.0:8080 -t public"]
