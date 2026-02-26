# ZhezU App — Next.js приложение

Основное веб-приложение проекта ZhezU — нового сайта Жезказганского университета им. О.А. Байконурова.

## Технологический стек

| Технология           | Версия | Назначение                               |
| -------------------- | ------ | ---------------------------------------- |
| Next.js (App Router) | 16.x   | SSR/SSG, React Server Components         |
| React                | 19.x   | UI library                               |
| TypeScript           | 5.x    | Статическая типизация                    |
| Tailwind CSS         | 4.x    | Утилитарные стили, дизайн-токены         |
| next-intl            | 4.x    | i18n: маршрутизация, переводы (kk/ru/en) |
| next-themes          | 0.4.x  | Dark/Light тема                          |
| Framer Motion        | 12.x   | Анимации                                 |
| Lucide React         | latest | SVG-иконки                               |
| pnpm                 | 9.x    | Пакетный менеджер                        |

## Быстрый старт

```bash
# Установка зависимостей
pnpm install

# Запуск dev-сервера
pnpm dev

# Сборка для продакшена
pnpm build

# Запуск продакшен-сервера
pnpm start

# Проверка типов
pnpm lint
```

Приложение доступно по адресу `http://localhost:3000`.

## Структура приложения

```
src/
├── app/
│   ├── [locale]/              # 78 публичных страниц
│   │   ├── page.tsx           # Главная
│   │   ├── university/        # Университет (14 стр.)
│   │   ├── admission/         # Поступление (15 стр.)
│   │   ├── academics/         # Образование (13 стр.)
│   │   ├── research/          # Наука (11 стр.)
│   │   ├── ai-center/         # AI-Центр (9 стр.)
│   │   ├── life/              # Студенческая жизнь (12 стр.)
│   │   ├── career/            # Карьера
│   │   ├── contact/           # Контакты
│   │   ├── talent-pool/       # Пул талантов
│   │   └── skill-map/         # Карта навыков
│   ├── admin/                 # 7 страниц админ-панели
│   │   ├── page.tsx           # Дашборд
│   │   ├── login/             # Авторизация
│   │   ├── news/              # Управление новостями
│   │   ├── settings/          # Настройки
│   │   ├── translations/      # Переводы
│   │   └── pages/             # Страницы
│   └── api/                   # 10 API-эндпоинтов
│       ├── health/            # Health check
│       ├── contact/           # Форма обратной связи
│       ├── admin/             # Защищённые API
│       └── public/            # Публичные API
├── components/                # 30 React-компонентов
│   ├── ui/                    # UI-кит (11 компонентов)
│   ├── layout/                # Header, Footer, MobileMenu и т.д.
│   ├── cards/                 # NewsCard, EventCard, ProgramCard, StatCard
│   ├── admin/                 # AdminHeader, AdminSidebar
│   ├── search/                # SearchOverlay
│   ├── talent/                # SkillMap, RadarChart и т.д.
│   └── providers/             # ThemeProvider
├── i18n/
│   ├── messages/              # kk.json, ru.json, en.json
│   ├── config.ts              # Конфигурация i18n
│   ├── request.ts             # Server-side i18n
│   └── navigation.ts          # Навигация с i18n
├── lib/
│   ├── admin/                 # auth.ts, storage.ts, public-data.ts, types.ts
│   ├── constants.ts           # Программы, кафедры и т.д.
│   ├── navigation.ts          # Структура навигации
│   └── utils.ts               # Утилиты
├── hooks/                     # React-хуки
└── types/                     # TypeScript-типы
```

## Админ-панель

- **URL:** `/admin`
- **Аутентификация:** HMAC-SHA256 токены, httpOnly cookies
- **Пароль:** задаётся через переменную окружения `ADMIN_SECRET`

### Возможности

- **Новости:** CRUD с 9 категориями (news, announcement, event, achievement, university, science, students, sport, culture)
- **Настройки:** контакты, адрес (трёхъязычный), соцсети, объявления
- **Переводы:** редактирование строк локализации (kk/ru/en)
- **Страницы:** управление страницами

## Хранилище данных

Данные хранятся в JSON-файлах в директории `data/`:

- `data/news.json` — новости (16 seed-статей)
- `data/settings.json` — настройки сайта

Публичные страницы получают данные двумя способами:

- **Server Components:** прямой импорт из `lib/admin/public-data.ts`
- **Client Components:** fetch из `/api/public/news` и `/api/public/settings`

## Переменные окружения

| Переменная     | Описание                        | Обязательная |
| -------------- | ------------------------------- | :----------: |
| `ADMIN_SECRET` | Пароль для входа в админ-панель |      Да      |

## Интернационализация

- **3 локали:** қазақша (kk), русский (ru), English (en)
- **22 namespace-а** переводов
- **Размер файлов переводов:** kk ~201KB, ru ~207KB, en ~135KB
- URL-структура: `/{locale}/...`
- Middleware для определения языка
- Переключатель языков в header
