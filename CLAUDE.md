# ZhezU — Инструкции для разработки

## Процесс деплоя (ВАЖНО!)

Хостинг: Plesk на hoster.kz. Деплой через папку `deploy/` в git.

**После любых изменений кода выполнить:**

```bash
cd zhezu-app
pnpm install                  # установить зависимости
bash scripts/deploy.sh        # собрать билд → deploy/
cd ..
git add -A
git commit -m "build: описание изменений"
git push
```

Скрипт `scripts/deploy.sh`:
1. `pnpm install --frozen-lockfile`
2. `next build --webpack` (standalone mode)
3. Копирует public/, .next/static/, data/, i18n messages в standalone
4. Синхронизирует standalone → `deploy/`

**Без этого шага изменения НЕ появятся на сайте!**

## Ограничения хостинга

- Ресурсы ограничены (Plesk shared hosting)
- Билд запускается локально, а не на сервере
- `deploy/` содержит готовый standalone-билд Next.js
- Папка `deploy/` коммитится в git — Plesk забирает изменения

## Структура проекта

```
ZhezU/
├── zhezu-app/           # Исходный код Next.js приложения
│   ├── src/             # Исходники (app/, components/, lib/, i18n/)
│   ├── deploy/          # Production-билд для Plesk (коммитится в git!)
│   ├── scripts/         # deploy.sh
│   └── package.json     # pnpm
├── docs/                # Документация проекта
├── README.md            # Общее описание
└── CLAUDE.md            # Этот файл
```

## Используемый стек

- **Next.js 16.1.6** (App Router, standalone output)
- **React 19.2.3**, TypeScript, Tailwind CSS 4
- **MariaDB** (Drizzle ORM) — хранение настроек и новостей
- **pnpm** — пакетный менеджер (НЕ npm, pnpm-lock.yaml)
- **next-intl** — мультиязычность (kk/ru/en)

## База данных

- MariaDB через Drizzle ORM
- Таблица `settings` (key-value JSON) — homepage, university, contact, settings, menu
- Таблица `news` — статьи новостей
- Авто-сидирование при первом запросе (`ensureSeeded()`)

## Админ-панель (/admin)

| Раздел | Путь | Описание |
|--------|------|----------|
| Дашборд | `/admin` | Статистика |
| Публикации | `/admin/news` | CRUD новостей |
| Меню | `/admin/menu` | Навигация |
| Университет | `/admin/university` | Данные, кафедры, программы |
| **Конструктор** | `/admin/homepage` | **Page builder — блоки главной страницы** |
| Контакты | `/admin/contact` | Контактные данные |
| Настройки | `/admin/settings` | Настройки сайта |

## Конструктор страниц (Page Builder)

Расположение: `/admin/homepage` → вкладка "Конструктор"

### Архитектура

- **Типы блоков** определены в `src/lib/admin/types.ts` (`PageBlock`, `BlockType`, `BlockConfig`)
- **Блоки хранятся** в `HomepageData.blocks[]` (settings table, key: "homepage")
- **Рендер на фронте**: `src/components/blocks/BlockRenderer.tsx` + отдельные компоненты
- **Админ UI**: `src/app/admin/homepage/page.tsx` — drag-and-drop (@dnd-kit) + кнопки вверх/вниз
- **Обратная совместимость**: если `blocks` пуст — рендерится legacy layout

### 10 типов блоков

| Тип | Компонент | Описание |
|-----|-----------|----------|
| `hero` | HeroBlock | Баннер с заголовком и статистикой |
| `programs` | ProgramsBlock | Карусель программ |
| `news` | NewsBlock | Новости и события |
| `departments` | DepartmentsBlock | Сетка кафедр |
| `cta` | CtaBlock | Призыв к действию |
| `text` | TextBlock | HTML-контент (3 языка) |
| `image` | ImageBlock | Изображение с подписью |
| `banner` | BannerBlock | Баннер с фоном и кнопкой |
| `html` | HtmlBlock | Произвольный HTML |
| `divider` | DividerBlock | Разделитель |

### Файлы конструктора

```
src/components/blocks/
├── BlockRenderer.tsx     # Маршрутизатор блоков
├── HeroBlock.tsx
├── ProgramsBlock.tsx
├── NewsBlock.tsx
├── DepartmentsBlock.tsx
├── CtaBlock.tsx
├── TextBlock.tsx
├── ImageBlock.tsx
├── BannerBlock.tsx
├── HtmlBlock.tsx
└── DividerBlock.tsx
```

## Команды разработки

```bash
cd zhezu-app
pnpm dev              # Запуск dev-сервера
pnpm build            # Сборка
pnpm typecheck        # Проверка типов
pnpm lint             # ESLint
pnpm test             # Vitest
bash scripts/deploy.sh  # Билд + копия в deploy/
```

## Переменные окружения

Файл `.env` в `zhezu-app/`:
- `DATABASE_URL` — MariaDB connection string
- `ADMIN_SECRET` — секрет для HMAC-аутентификации
- `GEMINI_API_KEY` — Google Gemini (AI-функции)
