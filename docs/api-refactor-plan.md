# API Refactor Notes

## Статус

- Рефакторинг backend/API завершён для модулей `Auth` и `Rooms`.
- Архитектура приведена к целевой layered-модели.
- Legacy-слои `Slices/Auth` и `Slices/Rooms` удалены.

## Что сделано

- Принята и внедрена структура слоёв:
- `src/Presentation`
- `src/Application`
- `src/Domain`
- `src/Infrastructure`
- `src/Shared`

- Полностью перенесены `Auth` и `Rooms` в новые слои:
- HTTP transport: `Presentation/Http/Action/*`
- Use cases: `Application/Auth/*`, `Application/Rooms/*`
- Порты/модели: `Domain/Auth/*`, `Domain/Rooms/*`
- DBAL-адаптеры: `Infrastructure/Persistence/*`

- Удалены legacy-компоненты:
- `src/Slices/Auth/*`
- `src/Slices/Rooms/*`

- Локализованы use case файлы в `Application`:
- `Handler`, `Request`, `Result` хранятся рядом в директории конкретного use case.

- Введены явные result-объекты для критичных room-сценариев:
- snapshot/result/view модели для чтения состояния и списков.

- Транспорт и инфраструктура вынесены из `Shared`:
- HTTP/middleware/responder -> `Presentation`
- websocket/persistence/cache config -> `Infrastructure`

- Тесты обновлены под новую архитектуру и отвязаны от legacy фасадов.

## Почему сделано

- Разделить transport/orchestration/domain/persistence и убрать смешение ответственности.
- Упростить поддержку и расширение под будущий игровой движок.
- Сделать use case код локальным и предсказуемым для навигации.
- Исключить “свалку” в `Shared`.
- Сохранить поведение API при глубокой внутренней переработке.

## Теоретическая сводка по решениям и паттернам

### Layered Architecture

Суть:
- Явное разделение слоёв с разными зонами ответственности.

Где применено:
- Полная структура `Presentation / Application / Domain / Infrastructure / Shared`.

Плюсы:
- Читаемые границы.
- Изоляция бизнес-логики от HTTP и БД.
- Проще тестировать use cases.

Минусы:
- Больше файлов и namespace-шума.
- Требует дисциплины по зависимостям.

### Ports and Adapters

Суть:
- Use case зависит от портов (интерфейсов), а не от конкретных инфраструктурных реализаций.

Где применено:
- Репозитории и провайдеры в `Domain/*/Repository`.
- DBAL-реализации в `Infrastructure/Persistence/*`.

Плюсы:
- Смена persistence без переписывания use case.
- Простые unit-тесты на моках портов.

Минусы:
- Лишний слой абстракций при маленьком функционале.

### Thin Controller / Action

Суть:
- Action обрабатывает только transport-задачи, orchestration делает handler.

Где применено:
- `Presentation/Http/Action/*` + `Application/*/*Handler`.

Плюсы:
- Контроллеры короткие и предсказуемые.
- Меньше дублей в HTTP-слое.

Минусы:
- Увеличение количества мелких классов.

### Use Case Locality

Суть:
- Все файлы конкретного use case лежат рядом.

Где применено:
- `Application/<Module>/<UseCase>/{Handler,Request,Result}`.

Плюсы:
- Быстрая навигация.
- Меньше контекстных прыжков по папкам.

Минусы:
- Возможное дублирование похожих DTO между use case.

### Explicit Result Objects

Суть:
- Явные result/view объекты вместо неструктурированных массивов в ключевых сценариях.

Где применено:
- Room snapshot/list сценарии.

Плюсы:
- Ясные контракты внутри application слоя.
- Меньше “магических ключей” и ошибок структуры.

Минусы:
- Дополнительный код сериализации.

### Backward-Compatible Refactor

Суть:
- Внутренности переписаны без изменения публичного API-поведения.

Где применено:
- Маршруты/контракты сохранены, изменена только внутренняя архитектура.

Плюсы:
- Безопасное внедрение.
- Легче контролировать регрессии.

Минусы:
- Часть решений приходится делать более консервативно.
