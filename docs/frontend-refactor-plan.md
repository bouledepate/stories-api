# Frontend Refactor Notes

## Статус

- Рефакторинг frontend-архитектуры завершён.
- Монолитные `events.js` и `views.js` разрезаны на модули.
- Bootstrap, state и сервисный слой приведены к предсказуемой структуре.

## Что сделано

- Введена целевая структура приложения:
- `app/features/*` для сценариев
- `app/ui/*` для рендера
- `app/bootstrap/*` для старта и восстановления сессии
- `app/store/*` для state-модификаций и selectors
- `app/services/*` для transport/storage/feedback

- Разрезан events-слой:
- `events.js` оставлен как barrel
- сценарии вынесены в feature-модули (`auth`, `common`, `lobbies`, `profile`, `rooms`, `realtime`)

- Разрезан views-слой:
- `layout`, `modals`, `screens/*`, `shared/view-helpers`
- `views.js` оставлен как совместимый реэкспорт

- Упрощён entrypoint:
- `main.js` только запускает приложение
- orchestration и initial load вынесены в `bootstrap/*`

- Нормализован state-слой:
- добавлены `store/mutations.js` и `store/selectors.js`
- критичные сценарии переведены с прямых присваиваний на именованные mutations

- Вынесены низкоуровневые сервисы:
- `services/socket.js`
- `services/feedback.js`
- `services/storage.js`

- `localStorage` обращения централизованы через `storage` service.

## Почему сделано

- Убрать смешение UI, DOM-bindings, API, realtime и state в одном файле.
- Сделать код локально читаемым по пользовательским сценариям.
- Снизить риск регрессий при добавлении новых room/game фич.
- Избавиться от хаотичных изменений состояния.
- Сохранить текущий стек и поведение приложения без переписывания на новый framework.

## Теоретическая сводка по решениям и паттернам

### Feature-Oriented Modularization

Суть:
- Код группируется по сценариям и фичам, а не только по техническим типам.

Где применено:
- `app/features/*` (auth/lobbies/profile/rooms/realtime/common).

Плюсы:
- Быстрая навигация по бизнес-флоу.
- Локальные изменения без каскадных правок.

Минусы:
- Риск избыточного дробления на мелкие файлы.

### Thin Entry / Bootstrap Separation

Суть:
- `main.js` только стартует приложение, а бизнес-инициализация вынесена в bootstrap.

Где применено:
- `main.js` + `app/bootstrap/start-app.js`, `app/bootstrap/session.js`.

Плюсы:
- Предсказуемый entrypoint.
- Проще тестировать и менять стартовый пайплайн.

Минусы:
- Появляется дополнительный организационный слой.

### Separation of UI and Orchestration

Суть:
- UI-рендер и сценарная логика разделены.

Где применено:
- UI в `app/ui/*`, orchestration в `app/features/*`.

Плюсы:
- UI не знает транспортных деталей.
- Сценарии проще поддерживать.

Минусы:
- Нужна дисциплина по границам слоёв.

### Explicit State Mutations

Суть:
- Изменение состояния происходит через именованные mutations, а не через произвольные прямые записи.

Где применено:
- `app/store/mutations.js`.

Плюсы:
- Прозрачные side effects.
- Меньше скрытых рассинхронов состояния.

Минусы:
- Больше кода-обвязки.

### Selectors for Derived State

Суть:
- Повторяемая вычисляемая логика чтения состояния выносится в selectors.

Где применено:
- `app/store/selectors.js`.

Плюсы:
- Меньше дублирования условных проверок.
- Более читаемый feature-код.

Минусы:
- Избыточные selectors могут раздувать слой store.

### Service Extraction

Суть:
- Низкоуровневые зависимости (socket/storage/feedback) не размазываются по фичам.

Где применено:
- `app/services/socket.js`, `app/services/storage.js`, `app/services/feedback.js`.

Плюсы:
- Снижение связности.
- Централизованный контроль внешних side effects.

Минусы:
- `services` может стать “новым shared-монолитом” без дисциплины.

### Compatibility Barrels

Суть:
- Старые точки входа сохраняются как тонкие реэкспорты.

Где применено:
- `app/events.js`, `app/views.js`.

Плюсы:
- Безболезненная миграция импортов.
- Меньше одномоментных ломающих изменений.

Минусы:
- Есть риск повторно превратить barrel в место концентрации логики.
