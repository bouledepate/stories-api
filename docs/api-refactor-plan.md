# API Architecture Notes

## Статус

Рефакторинг backend/API для `Auth` и `Rooms` завершён.

## Цель

Полностью переработать `src` без изменения бизнес-логики и публичного поведения API.

Целевое направление:
- layered architecture;
- ясные и не конфликтующие по смыслу названия слоёв;
- локальность файлов внутри конкретного use case;
- постепенный перенос без big bang rewrite;
- сохранение текущих HTTP-контрактов и бизнес-правил.

## Целевая структура

```text
src/
  Presentation/
  Application/
  Domain/
  Infrastructure/
  Shared/
```

## Правила зависимостей

- `Presentation` зависит от `Application` и `Shared`.
- `Application` зависит от `Domain` и абстракций.
- `Domain` не зависит от `Infrastructure`, `Presentation` и HTTP.
- `Infrastructure` реализует порты и адаптеры для `Application`/`Domain`.
- `Shared` содержит только действительно общие примитивы, которые не являются ни transport-, ни infrastructure-спецификой.

## Уточнённая структура

### Presentation

Назначение:
- HTTP entrypoints;
- middleware;
- response helpers;
- web entrypoints.

Почему не `App`:
- `App` и `Application` визуально и смыслово конфликтуют;
- при чтении дерева непонятно, где transport, а где use case orchestration;
- `Presentation` сразу отвечает на вопрос, что это за слой.

### Application

Назначение:
- use case orchestration.

Правило структуры:
- каждый use case хранит свои handler/request/result в одной директории;
- общие вспомогательные классы внутри слоя держатся отдельно, но только если они реально переиспользуются несколькими use case.

Пример:

```text
Application/
  Auth/
    Register/
      RegisterAction? нет
      RegisterHandler.php
      RegisterRequest.php
      RegisterResult.php
```

Это не полноценная VSA по всему проекту, а локальность внутри слоя `Application`.

### Infrastructure

Назначение:
- DBAL persistence;
- websocket server;
- env/config adapters.

### Shared

Назначение:
- error types;
- общие security/value-like утилиты;
- действительно общие нормализаторы.

Что сюда не должно попадать:
- HTTP responders;
- middleware;
- request auth extraction;
- websocket delivery;
- DB connection factories;
- cache config adapters.

## Что сделано

- сформирована целевая структура `Presentation / Application / Domain / Infrastructure / Shared`;
- добавлены новые слои:
  - `Domain/Auth/Repository`
  - `Application/Auth/*`
  - `Infrastructure/Persistence/Auth`
- добавлены новые слои для `Rooms`:
  - `Domain/Rooms/Model`
  - `Domain/Rooms/Repository`
  - `Application/Rooms/*`
  - `Infrastructure/Persistence/Rooms`
- добавлен новый transport-слой:
  - `Presentation/Http/Action/Auth`
  - `Presentation/Http/Action/Rooms`
- введён `AuthUserRepository` как порт;
- добавлен `DbalAuthUserRepository` как инфраструктурный адаптер;
- логика `Auth` разрезана на use case handlers:
  - `RegisterHandler`
  - `LoginHandler`
  - `GetMeHandler`
  - `UpdateProfileHandler`
  - `ChangePasswordHandler`
- добавлены typed result objects для `Auth`;
- добавлены typed result objects для `Rooms` snapshot/list сценариев;
- создан базовый HTTP helper `Presentation/Http/Action/JsonAction` для общей JSON-обвязки transport-слоя;
- маршруты `Auth` и `Rooms` переведены со `Slices/*/Action` на `Presentation/Http/Action/*`;
- `App` переименован в `Presentation`, чтобы слой transport не конфликтовал по смыслу с `Application`;
- request DTO и result objects для `Auth` локализованы по use case папкам внутри `Application`;
- request DTO для `Rooms` локализованы по use case папкам внутри `Application`;
- typed result objects добавлены для room snapshot/list сценариев;
- legacy `Slices/Auth` transport/service слой удалён полностью;
- legacy `Slices/Rooms/Action` и `RoomService` удалены;
- legacy room persistence перенесён в `Infrastructure/Persistence/Rooms`;
- legacy `Slices/Rooms` удалён полностью;
- transport- и infrastructure-специфичные классы вынесены из `Shared` в `Presentation` и `Infrastructure`;
- unit-тесты отвязаны от legacy facade-сервисов и теперь проверяют application handlers напрямую;
- DI-контейнер привязан к новому `AuthUserRepository`;
- DI-контейнер привязан к новым room-портам;
- unit-тесты `Auth` переведены на новый dependency graph;
- unit-тесты `Rooms` переведены на новый dependency graph;
- текущее поведение API сохранено.

## Применяемые принципы и парадигмы

### 1. Layered Architecture

Смысл:
- разделить transport, use case orchestration, бизнес-логику и инфраструктуру.

Плюсы:
- чище границы ответственности;
- проще тестировать use cases отдельно от HTTP;
- проще развивать сложную игровую доменную модель;
- легче менять persistence и transport.

Минусы:
- больше файлов;
- выше цена входа в проект;
- если переусердствовать, появляется “архитектурный шум”.

### 1.1. Semantic Layer Naming

Смысл:
- названия слоёв должны отвечать на вопрос “за что отвечает слой”, а не дублировать друг друга.

Плюсы:
- `Presentation` и `Application` не конкурируют по значению;
- дерево проекта читается быстрее;
- уменьшается когнитивный шум.

Минусы:
- при переименовании приходится массово править namespaces и документацию.

### 2. Ports and Adapters

Смысл:
- use case не знает, как именно работает БД, JWT, websocket или framework.

Плюсы:
- проще менять адаптеры;
- проще писать unit-тесты на use case;
- инфраструктура перестаёт протекать в application layer.

Минусы:
- требует дисциплины;
- плохо спроектированные интерфейсы только добавляют бойлерплейт.

### 3. Thin Controller / Action

Смысл:
- HTTP action занимается только transport-задачами: извлечь входные данные, вызвать handler, вернуть JSON-ответ.

Плюсы:
- orchestration не размазывается по контроллерам;
- transport-код становится предсказуемым и однообразным;
- проще переносить API между framework-слоями без затрагивания use cases.

Минусы:
- появляется больше маленьких классов;
- без дисциплины часть действий всё равно может уехать обратно в action-слой.

### 4. Use Case Locality Inside Layer

Смысл:
- внутри `Application` всё, что относится к одному use case, лежит рядом: handler, request, result.

Плюсы:
- проще навигация;
- меньше прыжков между `Dto/Result/Handler`;
- use case читается как локальная единица.

Минусы:
- часть классов с похожими payload начинает дублироваться;
- нельзя бездумно раскладывать всё по “общим DTO”, иначе теряется локальность.

### 5. Backward-compatible refactoring

Смысл:
- внутренности меняются, внешнее поведение нет.

Плюсы:
- можно безопасно рефакторить под существующие тесты;
- легко отслеживать регрессии;
- пользовательский слой не страдает.

Минусы:
- иногда приходится временно терпеть промежуточные компромиссы в коде.

## Практическое правило

Если новый слой не делает код понятнее, локальнее и тестируемее, значит абстракция добавлена слишком рано или слишком глубоко.

## Что считать нормой дальше

- Новый HTTP-код идёт только в `Presentation`.
- Новый use case получает свою директорию в `Application/<Module>/<UseCase>`.
- Если request/result используются одним use case, они лежат рядом с ним.
- Если структура начинает тащить transport или persistence в `Shared`, это считается архитектурной ошибкой.
- Если use case начинает возвращать большой ассоциативный массив, сначала нужно проверить, не пора ли ввести явный result-объект.

## Проверка результата

- `php -l` для конфигурации и `src`
- `vendor/bin/phpunit tests/Unit/AuthServiceTest.php tests/Unit/RoomServiceTest.php tests/Unit/JwtServiceTest.php`

Рефакторинг считается завершённым, если:
- слои не спорят по смыслу;
- `Shared` не разрастается в техническую свалку;
- новый use case можно добавить без изобретения новой структуры;
- transport, orchestration и persistence не смешиваются;
- JSON-контракты API сохраняются без регрессий.

## Критерий успеха рефакторинга

- бизнес-логика не изменилась;
- HTTP API не изменился;
- use case код стал локальнее и понятнее;
- инфраструктура отделена от orchestration;
- transport-слой больше не зависит от legacy `Slices/*`;
- persistence `Rooms` больше не зависит от legacy `Slices/*`;
- названия слоёв не конфликтуют между собой;
- `Shared` не содержит transport и infrastructure мусор;
- use case файлы внутри `Application` лежат локально, а не россыпью по общим папкам;
- следующие модули можно переносить по тому же шаблону без big bang rewrite.
