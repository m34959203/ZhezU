# Глубокий анализ репозитория ZhezU

**Дата анализа:** 27 февраля 2026
**Ветка:** `claude/update-project-documentation-RUssC`
**Репозиторий:** github.com/m34959203/ZhezU
**Версия:** 3.0

---

## 1. Общий обзор

**Проект:** Новая цифровая платформа для Жезказганского университета им. О.А. Байконурова
**Тип:** Full-stack веб-приложение на Next.js 16 с JSON-based CMS, AI-интеграциями и мультиязычностью
**Размер:** ~570KB TypeScript/TSX + ~567KB переводов (JSON) + 6 файлов данных CMS
**Языки/технологии:** TypeScript, React 19, Next.js 16, Tailwind CSS 4, next-intl 4
**Статус:** Фазы 1-3 завершены. Функциональный фронтенд + CMS-админка + CI/CD

### Структура каталогов

```
ZhezU/
├── zhezu-app/                          # Основное Next.js приложение
│   ├── src/
│   │   ├── app/                        # App Router — 82 публичных + 11 admin + 25 API
│   │   ├── components/                 # 30 React-компонентов
│   │   ├── i18n/messages/              # 3 языка × ~3 350 ключей
│   │   ├── lib/                        # Утилиты + admin-логика + AI
│   │   ├── __tests__/                  # 7 unit-тестов + setup
│   │   ├── hooks/                      # React-хуки
│   │   └── types/                      # TypeScript-типы
│   ├── data/                           # JSON-хранилище CMS (6 файлов)
│   ├── e2e/                            # E2E тесты (Playwright)
│   ├── public/                         # Статические файлы
│   ├── vitest.config.ts               # Конфигурация тестов
│   └── package.json                    # 12 prod + 19 dev зависимостей
├── stitch/                             # Дизайн-прототипы v2 (9 макетов)
├── stitch_admission_guide_portal/      # Дизайн-прототипы v1 (30 макетов)
├── docs/                               # Документация (8 файлов)
├── .github/workflows/ci.yml           # CI/CD Pipeline
├── Dockerfile                          # Multi-stage Docker (Node 22 Alpine)
├── railway.toml                        # Railway deploy config
├── DEVELOPMENT_PLAN.md                 # План разработки v3.0
├── DESIGN_ANALYSIS.md                  # Аудит дизайн-системы
├── README.md                           # Обзор проекта v3.0
└── logo.png                            # Логотип университета
```

---

## 2. Технологический стек

| Технология | Версия | Назначение | Статус |
|-----------|--------|-----------|--------|
| **Next.js** | 16.1.6 | SSR/SSG, App Router, API routes | Продакшен |
| **React** | 19.2.3 | UI-библиотека, Server Components | Продакшен |
| **TypeScript** | 5.x | Статическая типизация | Продакшен |
| **Tailwind CSS** | 4.x | Утилитарные стили, build-time | Продакшен |
| **next-intl** | 4.8.2 | i18n: маршрутизация, переводы | Продакшен |
| **next-themes** | 0.4.6 | Dark/light переключение | Продакшен |
| **Framer Motion** | 12.31.1 | Анимации и transitions | Продакшен |
| **Zustand** | 5.0.11 | Client state management | Продакшен |
| **React Hook Form** | 7.71.1 | Управление формами | Продакшен |
| **Zod** | 4.3.6 | Валидация схем | Продакшен |
| **Lucide React** | 0.563.0 | SVG-иконки (tree-shakeable) | Продакшен |
| **Vitest** | 4.0.18 | Unit-тестирование | Настроен |
| **Playwright** | 1.58.2 | E2E-тестирование | Настроен |
| **ESLint** | 9.x | Линтинг кода | Продакшен |
| **Prettier** | 3.8.1 | Форматирование кода | Продакшен |
| **pnpm** | 10.x | Пакетный менеджер | Продакшен |

---

## 3. Статистика проекта

| Метрика | Значение |
|---------|---------|
| Публичных страниц ([locale]) | **82** |
| Административных страниц | **11** |
| API-эндпоинтов | **25** (17 admin + 6 public + 2 general) |
| React-компонентов | **30** |
| UI-компонентов | **11** (Button, Card, Input, Badge, Select, Tabs, Accordion, Breadcrumb, Pagination, Skeleton, Toast) |
| Файлов переводов | **3** (kk: 210KB, ru: 216KB, en: 141KB) |
| Ключей переводов | **~3 350+** на каждый язык |
| Namespaces i18n | **22** |
| JSON-файлов данных (CMS) | **6** (news, settings, menu, homepage, university, contact) |
| Seed-новостей | **16** (9 категорий) |
| Тестовых файлов | **8** (6 component + 1 lib + 1 setup) |
| Git-коммитов | **20+** |
| Production-зависимостей | **12** |
| Dev-зависимостей | **19** |

---

## 4. Реализованные компоненты (30 шт.)

### UI-компоненты (11)

| Компонент | Описание |
|-----------|----------|
| Button | Кнопка с вариантами (primary, secondary, outline, ghost, danger) |
| Card | Карточка с image, hover, glow-эффектами |
| Input | Поле ввода с label, error, helper |
| Badge | Бейдж статуса/категории |
| Select | Выпадающий список |
| Tabs | Вкладки (horizontal/vertical) |
| Accordion | Аккордеон (FAQ, документы) |
| Breadcrumb | Хлебные крошки (SEO) |
| Pagination | Пагинация |
| Skeleton | Скелетон для loading states |
| Toast | Уведомления (success, error, warning, info) |

### Layout-компоненты (5)

| Компонент | Описание |
|-----------|----------|
| Header | Мега-меню с 6 разделами, поиск, переключатели |
| Footer | Динамический, данные из admin settings |
| MobileMenu | Мобильная навигация с accordion |
| ThemeToggle | Переключатель тёмной/светлой темы |
| LanguageSwitcher | Переключатель языков (kk/ru/en) |

### Card-компоненты (4)

| Компонент | Описание |
|-----------|----------|
| NewsCard | Карточка новости |
| EventCard | Карточка события |
| ProgramCard | Карточка образовательной программы |
| StatCard | Карточка статистики |

### Admin-компоненты (2)

| Компонент | Описание |
|-----------|----------|
| AdminHeader | Заголовок админ-панели с logout |
| AdminSidebar | Навигация админ-панели (9 разделов) |

### Прочие (8)

| Компонент | Описание |
|-----------|----------|
| SearchOverlay | Глобальный поиск |
| ThemeProvider | Провайдер темы |
| StudentCard | Карточка студента |
| ProgressBar | Прогресс-бар навыков |
| SkillMap | Визуализация навыков |
| CircularProgress | Круговой прогресс |
| RadarChart | Радарная диаграмма |
| StudentProfileView | Профиль студента |

---

## 5. API-эндпоинты (25 шт.)

### Общие (2)

| Маршрут | Метод | Описание |
|---------|-------|----------|
| `/api/health` | GET | Health check (status, timestamp, uptime) |
| `/api/contact` | POST | Форма обратной связи |

### Защищённые — Admin (17)

| Маршрут | Метод | Описание |
|---------|-------|----------|
| `/api/admin/auth` | POST, DELETE | Авторизация / выход |
| `/api/admin/session` | GET | Проверка сессии |
| `/api/admin/news` | GET, POST | Список / создание новостей |
| `/api/admin/news/[id]` | GET, PUT, DELETE | Чтение / обновление / удаление |
| `/api/admin/settings` | GET, PUT | Настройки сайта |
| `/api/admin/translations` | GET, PUT | Переводы (22 namespace-а) |
| `/api/admin/menu` | GET, POST | Навигационное меню |
| `/api/admin/university` | GET, PUT | Данные университета |
| `/api/admin/homepage` | GET, PUT | Секции главной страницы |
| `/api/admin/contact` | GET, PUT | Контактная информация |
| `/api/admin/upload` | POST | Загрузка файлов (фото, 5MB max) |
| `/api/admin/ai/translate` | POST | AI авто-перевод (Google Gemini) |
| `/api/admin/ai/translate-keys` | POST | AI перевод ключей i18n |
| `/api/admin/ai/analyze` | POST | AI анализ контента |
| `/api/admin/ai/validate` | POST | Валидация API-ключей |
| `/api/admin/social/telegram` | POST | Публикация в Telegram |
| `/api/admin/social/instagram` | POST | Публикация в Instagram |

### Публичные (6)

| Маршрут | Метод | Описание |
|---------|-------|----------|
| `/api/public/news` | GET | Публичные новости |
| `/api/public/settings` | GET | Публичные настройки |
| `/api/public/menu` | GET | Данные навигационного меню |
| `/api/public/homepage` | GET | Данные главной страницы |
| `/api/public/university` | GET | Данные университета |
| `/api/public/contact` | GET, POST | Контакты / форма |

---

## 6. Админ-панель (11 страниц)

| Страница | Описание | Ключевые функции |
|----------|----------|-----------------|
| Дашборд | Обзор статистики | Счётчики, быстрые действия |
| Авторизация | Вход в панель | HMAC-SHA256, httpOnly cookies |
| Новости | CRUD управление | 9 категорий, мультиязычность, AI-перевод, auto-publish |
| Новость [id] | Детальная редактура | Rich-text, загрузка фото, AI-анализ |
| Настройки | Конфигурация сайта | Контакты, соцсети, токены, модели AI, toggle-и |
| Переводы | Редактор переводов | 22 namespace-а, AI-авто-перевод, поиск ключей |
| Страницы | Управление контентом | Редактор содержимого страниц |
| Меню | Навигационное меню | Add/remove/reorder, иерархия, видимость |
| Главная | Секции главной | Hero, статистика, программы, новости |
| Университет | Данные о вузе | Ректор, проректоры, загрузка фото |
| Контакты | Контактная информация | Адрес, телефоны, email, карта |

---

## 7. Инфраструктура и DevOps

### CI/CD Pipeline (GitHub Actions)

```
Push/PR → Lint (ESLint + Prettier) → TypeScript (tsc) → Unit Tests (Vitest) → Build (Next.js)
```

- Node.js 22, pnpm 10, Ubuntu latest
- Concurrency: cancel-in-progress
- Build зависит от успеха lint + typecheck + test

### Docker

- Multi-stage build (3 стадии: deps → build → production)
- Base: Node 22 Alpine
- Output: standalone
- Security: non-root user (UID 1001)
- Production-ready

### Railway

- Health check: `GET /api/health`
- Restart policy: on_failure (max 3)
- Timeout: 300s

### Переменные окружения

| Переменная | Обязательность | Описание |
|-----------|---------------|----------|
| `ADMIN_SECRET` | Обязательна | Пароль админа (мин. 8 символов) |
| `PORT` | Опционально | Порт сервера (default: 3000) |
| `NEXT_PUBLIC_SITE_URL` | Опционально | URL сайта (для Railway) |
| `GEMINI_API_KEY` | Опционально | Google Gemini AI |
| `TELEGRAM_BOT_TOKEN` | Опционально | Telegram-бот |
| `TELEGRAM_CHAT_ID` | Опционально | Telegram-канал |
| `INSTAGRAM_ACCESS_TOKEN` | Опционально | Instagram Graph API |
| `INSTAGRAM_PAGE_ID` | Опционально | Instagram бизнес-страница |

---

## 8. Безопасность

### Реализовано

| Мера | Описание |
|------|----------|
| HMAC-SHA256 Auth | Токены с 8-часовым TTL для админ-панели |
| httpOnly Cookies | Сессии хранятся в httpOnly cookies |
| `poweredByHeader: false` | Убран X-Powered-By заголовок |
| Non-root Docker | Контейнер работает от UID 1001 |
| File validation | Проверка размера (5MB) и типа файлов при загрузке |
| `.gitignore` | Настроен для исключения node_modules, .env, .next |
| `.env.example` | Шаблон переменных окружения без секретов |

### Требуется реализовать

| Мера | Приоритет |
|------|-----------|
| Content-Security-Policy (CSP) | Высокий |
| HSTS headers | Высокий |
| Rate limiting | Высокий |
| CSRF protection | Средний |
| WAF (Cloudflare) | Средний |
| 2FA для администраторов | Низкий |
| Аутентификация пользователей (NextAuth.js) | Планируется (Фаза 6) |

---

## 9. Тестирование

### Текущее состояние

| Метрика | Значение |
|---------|---------|
| Unit-тесты (компоненты) | **6** (Button, Card, Input, Accordion, Skeleton, Tabs) |
| Unit-тесты (утилиты) | **1** (utils.ts) |
| Setup-файл | **1** (setup.ts) |
| E2E-тесты | **0** (инфраструктура настроена, тесты не написаны) |
| Фреймворк unit | Vitest 4.0.18 + React Testing Library 16.3.2 |
| Фреймворк E2E | Playwright 1.58.2 |
| Coverage provider | @vitest/coverage-v8 4.0.18 |
| CI-интеграция | GitHub Actions — `pnpm test:ci` |

### Требуется

- Увеличить unit-покрытие до ≥80%
- Написать E2E-тесты для критических сценариев
- Добавить тесты API-эндпоинтов
- Добавить accessibility-тесты (axe-core)
- Настроить Lighthouse CI

---

## 10. SEO и производительность

### Реализовано

| Функция | Статус |
|---------|--------|
| hreflang-теги | ✅ Все страницы × 3 языка |
| Мета-теги (title, description) | ✅ Все страницы |
| Open Graph теги | ✅ Все страницы |
| robots.txt | ✅ Автоматическая генерация |
| sitemap.xml | ✅ Автоматическая генерация |
| SSR/SSG | ✅ React Server Components |
| Next.js Image Optimization | ✅ remotePatterns настроены |

### Требуется

| Функция | Приоритет |
|---------|-----------|
| Schema.org JSON-LD (Organization, Course, Article) | Высокий |
| Canonical URLs | Средний |
| Structured Data для BreadcrumbList | Средний |
| Lighthouse CI в pipeline | Средний |

---

## 11. Интернационализация (i18n)

### Конфигурация

- **Фреймворк:** next-intl 4.8.2
- **Языки:** kk (казахский), ru (русский), en (английский)
- **Язык по умолчанию:** ru
- **Маршрутизация:** `/{locale}/...` (middleware)
- **Namespaces:** 22

### Файлы переводов

| Язык | Файл | Размер | Строк |
|------|------|--------|-------|
| Казахский | kk.json | 210 KB | 3 364 |
| Русский | ru.json | 216 KB | 3 352 |
| Английский | en.json | 141 KB | 3 352 |

### Функции

- Переключатель языков в header (сохраняет текущую страницу)
- Locale detection через Accept-Language (middleware)
- Редактор переводов в админ-панели
- AI-авто-перевод через Google Gemini
- Мультиязычный контент в новостях и настройках (kk/ru/en)

---

## 12. Прогресс по фазам разработки

### Фаза 1 — Фундамент: ✅ ЗАВЕРШЕНА

- Next.js + TypeScript + Tailwind CSS
- i18n система (kk/ru/en, 22 namespace-а)
- Dark/light тема
- UI-компоненты (11 шт.)
- Layout (Header, Footer, MobileMenu, LanguageSwitcher, ThemeToggle)
- Базовые страницы (главная, приём, каталог, контакты, карьера)

### Фаза 2 — Расширение контента: ✅ ЗАВЕРШЕНА

- Университет (16 стр.), Наука (11), Образование (13), Поступление (14)
- Студенческая жизнь (12), AI-Центр (9)
- SEO: hreflang, мета-теги, OG-теги, robots.txt, sitemap.xml

### Фаза 3 — Администрирование: ✅ ЗАВЕРШЕНА

- Админ-панель: 11 страниц, 25 API
- CRUD новостей, настройки, переводы, меню, университет, главная, контакты
- AI-функции (Google Gemini), авто-публикация (Telegram, Instagram)
- Загрузка фото, JSON-CMS (6 файлов данных)
- CI/CD (GitHub Actions), unit-тесты (Vitest)

### Фаза 4 — Студенческие сервисы: ⏳ ПЛАНИРУЕТСЯ

- Личный кабинет студента
- Профиль для работодателей
- Система чата куратор-студент

### Фаза 5 — AI-сервисы: ⏳ ПЛАНИРУЕТСЯ

- AI Career Path Predictor
- AI-ассистент для абитуриентов

### Фаза 6 — Backend и интеграции: ⏳ ПЛАНИРУЕТСЯ

- Headless CMS (Strapi/Payload) + PostgreSQL
- Аутентификация пользователей (NextAuth.js)
- Интеграция с АИС университета

---

## 13. Рекомендации для дальнейшей разработки

### Высокий приоритет

1. **Увеличить тестовое покрытие** — написать unit-тесты для API-эндпоинтов, admin-утилит, E2E для критических сценариев
2. **Добавить security headers** — CSP, HSTS, X-Frame-Options через Next.js middleware
3. **Schema.org разметка** — JSON-LD для Organization, Course, Article, BreadcrumbList
4. **Rate limiting** — защита API-эндпоинтов от abuse

### Средний приоритет

5. **Миграция на Headless CMS** — Strapi 5 или Payload CMS 3 + PostgreSQL
6. **CDN (Cloudflare)** — кеширование, WAF, DDoS-защита
7. **Мониторинг (Sentry)** — error tracking, performance monitoring
8. **Перенос изображений на S3** — убрать зависимость от Unsplash

### Низкий приоритет

9. **Storybook** — документация компонентов
10. **PWA** — offline-доступ, push-уведомления
11. **Kubernetes** — горизонтальное масштабирование
12. **Lighthouse CI** — автоматические performance-аудиты в pipeline

---

*Анализ выполнен: 27 февраля 2026 г.*
*Версия: 3.0 — обновлено до текущего состояния проекта*
