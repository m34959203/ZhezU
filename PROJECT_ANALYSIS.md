# Комплексный анализ проекта ZhezU

**Дата анализа:** 27 февраля 2026
**Версия проекта:** 3.0
**Цель:** Понимание текущего состояния и планирование дальнейшей разработки

---

## 1. Что такое ZhezU

**ZhezU** — новый сайт **Жезказганского университета им. О.А. Байконурова** (https://zhezu.edu.kz/). Это полноценная мультиязычная цифровая платформа на Next.js 16, которая объединяет:

- Публичный сайт (84 страницы на 3 языках)
- Административную CMS-панель (9 страниц + login)
- 25 API-эндпоинтов
- AI-интеграции (Google Gemini)
- Авто-публикацию в соцсети (Telegram, Instagram)

**Текущий сайт** (zhezu.edu.kz) был скомпрометирован — проект заменяет его полностью.

---

## 2. Карта документации

Проект имеет **обширную документацию** (11 файлов). Вот что покрывает каждый документ:

| Документ | Где | Зачем читать |
|----------|-----|-------------|
| **README.md** | `/` | Обзор проекта, быстрый старт, полный список страниц/API/компонентов |
| **DEVELOPMENT_PLAN.md** | `/` | План разработки: стек, архитектура, дизайн-система, компоненты, фазы, PWA |
| **DESIGN_ANALYSIS.md** | `/` | Аудит текущего сайта zhezu.edu.kz, рекомендации по редизайну, промпты для Google Stitch |
| **DEEP_REPO_ANALYSIS.md** | `/` | Технический аудит: статистика, компоненты, API, безопасность, тестирование, рекомендации |
| **ROADMAP.md** | `/docs/` | Дорожная карта: 40 недель, 6 фаз, спринты, команда, риски, геймификация Talapker |
| **TECHNICAL_SPEC.md** | `/docs/` | Техническое задание: 82 FR, шаблоны, 10 интеграций, NFR, целевая архитектура |
| **GAP_ANALYSIS.md** | `/docs/` | GAP-анализ: **~55-60% готовности**, блокеры, план действий |
| **PROJECT_CONCEPT.md** | `/docs/` | Концепция: стратегия, 5 персон, KPI, уникальные отличия (Talapker, AI-Center) |
| **NAVIGATION_ARCHITECTURE.md** | `/docs/` | Архитектура навигации: мега-меню, мобильная версия, URL-структура, 40+ маршрутов |
| **USER_STORIES.md** | `/docs/` | Пользовательские истории: 6 эпиков (абитуриент→студент→выпускник→работодатель→админ) |
| **DESIGN_PROMPT_STITCH.md** | `/docs/` | Промпт для Google Stitch: цвета, типографика, 8 шаблонов, 13 компонентов |
| **DEEP_ANALYSIS_REPORT.md** | `/docs/` | Архитектурный deep-dive: зависимости модулей, дублирование, мёртвый код |

---

## 3. Структура репозитория

```
ZhezU/
├── zhezu-app/                    # Основное приложение (Next.js 16)
│   ├── src/
│   │   ├── app/[locale]/         # 82 публичных страницы × 3 языка
│   │   ├── app/admin/            # 11 admin-страниц
│   │   ├── app/api/              # 25 API-эндпоинтов
│   │   ├── components/           # 30 React-компонентов
│   │   ├── i18n/messages/        # 3 файла переводов (kk/ru/en, ~3350 ключей каждый)
│   │   ├── lib/                  # Утилиты + admin-логика + AI
│   │   ├── hooks/                # React-хуки
│   │   ├── types/                # TypeScript-типы
│   │   ├── __tests__/            # 8 тестовых файлов
│   │   └── middleware.ts         # i18n + security headers
│   ├── data/                     # JSON CMS-хранилище (6 файлов)
│   ├── e2e/                      # E2E-тесты (Playwright, не написаны)
│   └── public/                   # Статика
├── stitch/                       # Дизайн-прототипы v2 (9 макетов)
├── stitch_admission_guide_portal/# Дизайн-прототипы v1 (30 макетов)
├── docs/                         # Документация (8 + 2 docx)
├── .github/workflows/ci.yml     # CI/CD Pipeline
├── Dockerfile                    # Docker (Node 22 Alpine, multi-stage)
├── railway.toml                  # Railway deploy config
└── logo.png                      # Логотип университета
```

---

## 4. Технологический стек

### Фронтенд + фреймворк

| Технология | Версия | Роль |
|-----------|--------|------|
| Next.js | 16.1.6 | SSR/SSG, App Router, API routes, middleware |
| React | 19.2.3 | UI-библиотека, Server Components |
| TypeScript | 5.x | Статическая типизация |
| Tailwind CSS | 4.x | Утилитарные стили |
| next-intl | 4.8.2 | i18n (3 языка, 22 namespace-а) |
| next-themes | 0.4.6 | Dark/light тема |
| Framer Motion | 12.31.1 | Анимации |
| Zustand | 5.0.11 | Client state management |
| React Hook Form + Zod | 7.71 + 4.3 | Формы + валидация |
| Lucide React | 0.563.0 | Иконки (tree-shakeable) |

### Инфраструктура

| Технология | Роль |
|-----------|------|
| Vitest 4.0 + RTL | Unit-тестирование |
| Playwright 1.58 | E2E-тестирование |
| ESLint 9 + Prettier 3.8 | Линтинг/форматирование |
| pnpm 10 | Пакетный менеджер |
| GitHub Actions | CI/CD (lint → typecheck → test → build) |
| Docker (Node 22 Alpine) | Контейнеризация, multi-stage build |
| Railway | Деплой |

### Зависимости: 12 prod + 19 dev

**Production (12):** next, react, react-dom, next-intl, next-themes, framer-motion, zustand, react-hook-form, zod, lucide-react, clsx, tailwind-merge

**Dev (19):** typescript, tailwindcss, eslint, prettier, vitest, playwright, testing-library, и т.д.

---

## 5. Архитектурные решения

### 5.1 Маршрутизация (App Router)

```
/[locale]/                     → Главная (kk, ru, en)
/[locale]/university/...       → 16 страниц университета
/[locale]/admission/...        → 14 страниц приёмной комиссии
/[locale]/academics/...        → 13 страниц образования
/[locale]/research/...         → 11 страниц науки
/[locale]/ai-center/...        → 9 страниц AI-центра
/[locale]/life/...             → 12 страниц студенческой жизни
/[locale]/career/              → Карьерный центр
/[locale]/contact/             → Контакты
/[locale]/talent-pool/...      → 2 страницы
/[locale]/skill-map/           → Карта навыков
/[locale]/privacy/, /sitemap/  → Служебные
/admin/...                     → 11 admin-страниц (без locale)
/api/...                       → 25 API-эндпоинтов
```

### 5.2 Аутентификация (admin)

- **HMAC-SHA256** — самописная реализация (`lib/admin/auth.ts`)
- Пароль — переменная окружения `ADMIN_SECRET` (мин. 8 символов)
- Токены: `base64url(payload).hmac_signature`
- TTL: 8 часов
- Хранение: **httpOnly cookies**
- Нет ролевой модели — только "admin"

### 5.3 Хранилище данных (JSON-based CMS)

**Файлы в `data/`:**

| Файл | Содержимое |
|------|-----------|
| `news.json` | 16 новостей (9 категорий), мультиязычные |
| `settings.json` | Контакты, соцсети, адрес, объявления |
| `menu.json` | Навигационное меню (иерархия, порядок) |
| `homepage.json` | Секции главной страницы |
| `university.json` | Ректор, проректоры, фото |
| `contact.json` | Контактная информация |

**Операции CRUD** реализованы через `lib/admin/storage.ts` — generic функции `getAll`, `getById`, `create`, `update`, `remove` с файловым I/O.

### 5.4 Middleware

Middleware (`src/middleware.ts`) выполняет две задачи:
1. **i18n маршрутизация** — next-intl перенаправления
2. **Security headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy

### 5.5 AI-интеграции

- **Google Gemini** (`lib/admin/gemini.ts`)
  - Авто-перевод контента (kk/ru/en)
  - Перевод ключей i18n
  - Анализ контента
  - Валидация переводов

### 5.6 Авто-публикация

- **Telegram Bot API** — публикация новостей
- **Instagram Graph API** — публикация в Instagram

---

## 6. Текущее состояние — Что готово

### Фаза 1 — Фундамент: ЗАВЕРШЕНА

- Next.js + TypeScript + Tailwind CSS + App Router
- i18n система (kk/ru/en) — 22 namespace-а, ~3350 ключей
- Dark/light тема с определением системных настроек
- 11 UI-компонентов (Button, Card, Input, Badge, Select, Tabs, Accordion, Breadcrumb, Pagination, Skeleton, Toast)
- Layout (Header с мега-меню, Footer, MobileMenu, LanguageSwitcher, ThemeToggle)
- 5 базовых страниц (главная, приём, каталог, контакты, карьера)

### Фаза 2 — Контент: ЗАВЕРШЕНА

- 82 публичных страницы по 6 разделам
- SEO: hreflang, мета-теги, OG-теги, robots.txt, sitemap.xml

### Фаза 3 — Администрирование: ЗАВЕРШЕНА

- Админ-панель: 11 страниц, авторизация HMAC-SHA256
- CRUD новостей (9 категорий) + все CRUD-операции для CMS
- 25 API-эндпоинтов (17 admin + 6 public + 2 general)
- AI-функции (Google Gemini): авто-перевод, анализ, валидация
- Авто-публикация (Telegram + Instagram)
- JSON-based CMS (6 файлов данных)
- CI/CD Pipeline (GitHub Actions)
- Unit-тесты (7 файлов)

---

## 7. GAP-анализ — Что НЕ готово

### Общая готовность: ~55-60%

| Область | Готовность | Что сделано | Что требуется |
|---------|:---------:|-------------|---------------|
| **Фронтенд** | ~90% | 82 страницы, 30 компонентов, i18n, themes | Ещё ~15-20 компонентов по ТЗ |
| **CMS** | ~50% | JSON-based CMS, 11 admin-страниц, 25 API | Миграция на Strapi/Payload + PostgreSQL |
| **База данных** | 0% | Нет | PostgreSQL + ORM |
| **Интеграции** | ~15% | Gemini AI, Telegram, Instagram | LMS (Moodle), CRM, SSO, Google Calendar/Maps, SendGrid, Kaspi Pay |
| **Тестирование** | ~10% | 7 unit-тестов, Vitest+Playwright настроены | ≥80% покрытие, E2E, API-тесты, a11y |
| **Безопасность** | ~40% | HMAC auth, httpOnly, CSP, HSTS, security headers | Rate limiting, CSRF, WAF, 2FA |
| **SEO** | ~70% | hreflang, meta, OG, robots.txt, sitemap | JSON-LD Schema.org, canonical URLs |
| **Производительность** | ~50% | SSR, Image Optimization | Lighthouse CI, CDN, Redis-кэш |
| **PWA** | 0% | Нет | Offline-доступ, push-уведомления |

### Критические блокеры

1. **PostgreSQL** — 0% готовности, блокирует ~60% оставшихся требований
2. **Headless CMS** — миграция с JSON → Strapi/Payload
3. **Аутентификация пользователей** — только admin-auth, нет NextAuth.js
4. **Тестовое покрытие** — 7 unit-тестов = ~5%, нужно ≥80%

---

## 8. Фазы дальнейшей разработки

### Фаза 4 — Студенческие сервисы (планируется)
- Личный кабинет студента
- Профиль для работодателей
- Система чата куратор-студент
- Геймификация Talapker (20 уровней, 28 квестов, 12 бейджей)

### Фаза 5 — AI-сервисы (планируется)
- AI Career Path Predictor
- AI-ассистент для абитуриентов
- AI Tools Directory

### Фаза 6 — Backend и интеграции (планируется)
- Headless CMS (Strapi 5 / Payload CMS 3)
- PostgreSQL + ORM
- Аутентификация (NextAuth.js)
- REST/GraphQL API
- Интеграции: LMS, CRM, SSO, Kaspi Pay, SendGrid
- Интеграция с АИС университета

---

## 9. Компонентная карта

### UI Kit (11 базовых)
`Button` | `Card` | `Input` | `Badge` | `Select` | `Tabs` | `Accordion` | `Breadcrumb` | `Pagination` | `Skeleton` | `Toast`

### Layout (5)
`Header` (мега-меню 6 разделов) | `Footer` | `MobileMenu` | `ThemeToggle` | `LanguageSwitcher`

### Карточки (4)
`NewsCard` | `EventCard` | `ProgramCard` | `StatCard`

### Admin (2)
`AdminHeader` | `AdminSidebar`

### Визуализация / Прочее (8)
`SearchOverlay` | `ThemeProvider` | `StudentCard` | `ProgressBar` | `SkillMap` | `CircularProgress` | `RadarChart` | `StudentProfileView`

### Нужно добавить (~15-20 по ТЗ)
`Dialog/Modal` | `DataTable` | `RichTextEditor` | `FilterPanel` | `Avatar` | `JobCard` | `MentorCard` | `FileUpload` | `DatePicker` | `Dropdown` | `Tooltip` | `Timeline` | `Stepper` | `Chart` | `Map`

---

## 10. API-эндпоинты (25)

### Общие (2)
- `GET /api/health` — Health check
- `POST /api/contact` — Форма обратной связи

### Admin-защищённые (17)
- `POST /api/admin/auth` — Авторизация
- `GET /api/admin/session` — Проверка сессии
- `GET|POST /api/admin/news` — Новости (CRUD)
- `GET|PUT|DELETE /api/admin/news/[id]` — Новость по ID
- `GET|PUT /api/admin/settings` — Настройки
- `GET|PUT /api/admin/translations` — Переводы
- `GET|POST /api/admin/menu` — Меню
- `GET|PUT /api/admin/university` — Данные университета
- `GET|PUT /api/admin/homepage` — Главная страница
- `GET|PUT /api/admin/contact` — Контакты
- `POST /api/admin/upload` — Загрузка файлов
- `POST /api/admin/ai/translate` — AI-перевод
- `POST /api/admin/ai/translate-keys` — AI-перевод ключей
- `POST /api/admin/ai/analyze` — AI-анализ
- `POST /api/admin/ai/validate` — AI-валидация
- `POST /api/admin/social/telegram` — Публикация в Telegram
- `POST /api/admin/social/instagram` — Публикация в Instagram

### Публичные (6)
- `GET /api/public/news` — Новости
- `GET /api/public/settings` — Настройки
- `GET /api/public/menu` — Меню
- `GET /api/public/homepage` — Главная
- `GET /api/public/university` — Университет
- `GET|POST /api/public/contact` — Контакты

---

## 11. Безопасность — текущее состояние

### Реализовано
- HMAC-SHA256 аутентификация с 8-часовым TTL
- httpOnly cookies для сессий
- Content-Security-Policy (CSP) в middleware
- HSTS (Strict-Transport-Security)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy
- poweredByHeader: false (Next.js)
- Non-root Docker user (UID 1001)
- File validation при загрузке (5MB max)

### Требуется
- **Rate limiting** — критично для API
- **CSRF protection** — формы
- **WAF (Cloudflare)** — DDoS, injection
- **2FA для администраторов**
- **Аутентификация пользователей** (NextAuth.js)
- **Аудит зависимостей** (npm audit)

---

## 12. CI/CD Pipeline

```
Push/PR → [Lint] → [TypeScript] → [Unit Tests] → [Build]
           ESLint    tsc --noEmit    Vitest          Next.js
           Prettier                   + Coverage
```

- **Runner:** Ubuntu latest, Node 22, pnpm 10
- **Concurrency:** cancel-in-progress
- **Build зависит от:** lint + typecheck + test (все должны пройти)
- **Нет:** E2E-тестов, Lighthouse CI, deploy-стадии

---

## 13. Дизайн-прототипы

### stitch/ (v2, 9 макетов)
Обновлённые прототипы, созданные в Google Stitch:
1. `zhezu_homepage_light_theme` — Главная (светлая)
2. `zhezu_homepage_dark_theme` — Главная (тёмная)
3. `university_mega_menu_expanded` — Мега-меню
4. `academic_programs_catalog` — Каталог программ
5. `admission_enrollment_page` — Поступление
6. `ai_center_innovation_hub` — AI-Центр
7. `science_research_portal` — Наука
8. `university_news_life` — Новости и жизнь
9. `contact_campus_info` — Контакты

### stitch_admission_guide_portal/ (v1, 31 макет)
Полные прототипы всех ключевых страниц:
- Главная (2 варианта), Приёмная комиссия (2), Каталог программ (2)
- Студенческий портал (3), Профиль студента, Чат куратор-студент (2)
- Карьерный центр (3 варианта: дашборд, вакансии, менторство)
- Админ-панель, Редактор контента, AI-центр, AI-инструменты, AI Career Predictor
- Блог и события, Медиа-галерея, Видеозвонок куратора, Footer (2)

**Принцип маппинга:** варианты одной страницы (_1, _2) = light/dark версии, объединяются в один компонент. Всего **40 прототипов**.

---

## 14. Переменные окружения

| Переменная | Обязательность | Описание |
|-----------|:--------------:|----------|
| `ADMIN_SECRET` | **Да** | Пароль администратора (мин. 8 символов) |
| `PORT` | Нет | Порт (default: 3000) |
| `NEXT_PUBLIC_SITE_URL` | Нет | URL сайта (для Railway) |
| `GEMINI_API_KEY` | Нет | Google Gemini AI |
| `TELEGRAM_BOT_TOKEN` | Нет | Telegram Bot API |
| `TELEGRAM_CHAT_ID` | Нет | ID Telegram-канала |
| `INSTAGRAM_ACCESS_TOKEN` | Нет | Instagram Graph API |
| `INSTAGRAM_PAGE_ID` | Нет | Instagram бизнес-страница |

---

## 15. Рекомендации по приоритетам

### Высокий приоритет (влияет на продакшен)

1. **Увеличить тестовое покрытие** — с ~5% до ≥80% (unit + API + E2E)
2. **Rate limiting** — защита API от abuse
3. **Schema.org JSON-LD** — Organization, Course, Article, BreadcrumbList
4. **Мониторинг (Sentry)** — error tracking, performance
5. **CDN (Cloudflare)** — кэширование, WAF, DDoS-защита

### Средний приоритет (следующие фазы)

6. **PostgreSQL + ORM** — миграция с JSON-хранилища
7. **Headless CMS (Strapi/Payload)** — масштабируемая CMS
8. **NextAuth.js** — аутентификация пользователей
9. **Перенос изображений на S3/R2** — убрать зависимость от Unsplash
10. **CSRF protection** — для форм

### Низкий приоритет (масштабирование)

11. **Storybook** — документация компонентов
12. **PWA** — offline-доступ, push-уведомления
13. **Lighthouse CI** — автоматические performance-аудиты
14. **Kubernetes** — горизонтальное масштабирование

---

## 16. Быстрый старт для разработчика

```bash
# 1. Клонирование
git clone <repo-url> && cd ZhezU/zhezu-app

# 2. Установка зависимостей
pnpm install

# 3. Создание .env
cp .env.example .env.local
# Установить ADMIN_SECRET=your-secret-password

# 4. Запуск
pnpm dev          # http://localhost:3000

# 5. Полезные команды
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm typecheck    # TypeScript
pnpm test         # Vitest (watch)
pnpm test:ci      # Тесты + coverage
pnpm build        # Production build

# 6. Админ-панель
# http://localhost:3000/admin → пароль из ADMIN_SECRET
```

---

## 17. Ключевые файлы для ознакомления

| Файл | Зачем |
|------|-------|
| `zhezu-app/src/middleware.ts` | i18n маршрутизация + security headers |
| `zhezu-app/src/lib/admin/auth.ts` | Аутентификация (HMAC-SHA256) |
| `zhezu-app/src/lib/admin/storage.ts` | CRUD-операции с JSON-хранилищем |
| `zhezu-app/src/lib/admin/gemini.ts` | AI-интеграция (Google Gemini) |
| `zhezu-app/src/i18n/config.ts` | Конфигурация i18n (языки, дефолт) |
| `zhezu-app/src/app/[locale]/layout.tsx` | Корневой layout (Header+Footer) |
| `zhezu-app/src/app/admin/layout.tsx` | Admin layout (Sidebar) |
| `zhezu-app/next.config.ts` | Конфигурация Next.js (standalone, images, i18n plugin) |
| `zhezu-app/data/` | Все JSON-данные CMS |
| `.github/workflows/ci.yml` | CI/CD Pipeline |
| `Dockerfile` | Docker multi-stage build |

---

*Анализ выполнен: 27 февраля 2026 г.*
