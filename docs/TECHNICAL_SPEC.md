# Техническое задание: Веб-сайт Жезказганского университета (ZhezU)

**Версия:** 1.0
**Дата:** 23 февраля 2026
**Основа:** ТЗ_Веб-сайт_университета_v1.0 (адаптировано для ZhezU)
**Заказчик:** АО «Жезказганский университет имени О.А. Байконурова»
**Целевой сайт:** https://zhezu.edu.kz/

---

## 1. Общие сведения

### 1.1 Наименование проекта

Новая цифровая платформа **ZhezU** для Жезказганского университета имени О.А. Байконурова.

### 1.2 Цель создания

Разработка современного, безопасного, производительного и мультиязычного веб-сайта для замены скомпрометированного текущего ресурса zhezu.edu.kz. Платформа должна обеспечить полный цикл взаимодействия с университетом: от привлечения абитуриентов до трудоустройства выпускников.

### 1.3 Целевые аудитории

| Сегмент | Доля трафика | Пиковая нагрузка |
|---------|:------------:|:-----------------:|
| Абитуриенты и родители | 40% | Июнь-Август (приём) |
| Текущие студенты | 25% | Сентябрь-Май (учёба) |
| Преподаватели и сотрудники | 15% | Постоянно |
| Работодатели и партнёры | 10% | Апрель-Июнь (найм) |
| Выпускники (Alumni) | 5% | Нерегулярно |
| Внешние посетители / СМИ | 5% | Нерегулярно |

### 1.4 Языки интерфейса

| Язык | Код | Приоритет | Маршрут |
|------|:---:|:---------:|---------|
| Казахский | kk | Государственный | /kk/... |
| Русский | ru | Основной для пользователей | /ru/... |
| Английский | en | Международный | /en/... |

---

## 2. Информационная архитектура

### 2.1 Модель: Hub-and-Spoke

Центральный портал (hub) — zhezu.edu.kz — содержит общеуниверситетский контент. Каждая из 5 кафедр получает микросайт (spoke) с единым шаблоном, но индивидуальным контентом.

### 2.2 Разделы верхнего уровня (10)

| # | Раздел | URL | Описание |
|---|--------|-----|----------|
| 1 | Главная | /[locale]/ | Hero, статистика, новости, CTA |
| 2 | Университет | /university/ | О вузе, руководство, аккредитация, партнёры, документы |
| 3 | Поступление | /admission/ | Программы, требования, заявка, стипендии, FAQ, виртуальный тур |
| 4 | Образование | /academics/ | Бакалавриат, магистратура, кафедры, расписание, библиотека |
| 5 | Наука | /research/ | Публикации, конференции, лаборатории, гранты |
| 6 | AI-Центр | /ai-center/ | Проекты, агенты, приложения, инструменты, лаборатория |
| 7 | Жизнь | /life/ | Новости, события, спорт, общежития, организации |
| 8 | Карьера | /career/ | Пул талантов, вакансии, менторство |
| 9 | Контакты | /contact/ | Форма обратной связи, карта, реквизиты |
| 10 | Поиск | /search/ | Глобальный полнотекстовый поиск |

### 2.3 Шаблоны страниц (8 типов)

| # | Шаблон | Структура | Повторное использование |
|---|--------|----------|------------------------|
| 1 | **Hero Landing** | Hero + Stats + Cards + CTA | Главная, посадочные аудиторий (5+) |
| 2 | **Content + Sidebar** | Заголовок + Контент + Sidebar (related, nav) | Новости, статьи, страницы «О нас» (30+) |
| 3 | **Card Grid** | Фильтры + Grid/List toggle + Pagination | Программы, вакансии, AI-проекты (10+) |
| 4 | **Profile** | Avatar + Info + Tabs (bio, publications, courses) | Преподаватели, студенты (динамические) |
| 5 | **Dashboard** | Sidebar nav + Widgets + Charts | Личный кабинет, статистика (3-5) |
| 6 | **Form Wizard** | Stepper + Form fields + Validation + Progress | Заявка, обратная связь (3-5 форм) |
| 7 | **Interactive** | Canvas/WebGL + Controls + Info panels | Виртуальный тур, карта навыков (2-3) |
| 8 | **Search Results** | Search bar + Facets + Results + Pagination | Глобальный поиск (1) |

---

## 3. Функциональные требования (FR)

### 3.1 Главная страница (FR-001 — FR-010)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-001 | Hero-секция с ротацией баннеров (CMS-управляемая) | Must | 2 |
| FR-002 | Блок «Университет в цифрах» — 6+ анимированных счётчиков (ISR из CMS) | Must | 2 |
| FR-003 | Карусель «Популярные программы» — Top-6 по просмотрам | Must | 2 |
| FR-004 | Лента новостей — 3-4 последних с пагинацией и фильтром по категориям | Must | 2 |
| FR-005 | Блок «Предстоящие события» с интеграцией Google Calendar | Should | 3 |
| FR-006 | Блок «Отзывы» — карусель отзывов студентов/выпускников | Should | 3 |
| FR-007 | Блок «Партнёры и работодатели» — логотипы с ссылками | Could | 3 |
| FR-008 | Floating CTA «Поступить» — sticky на мобильных | Must | 1 |
| FR-009 | Quick Links для каждой аудитории (абитуриент, студент, преподаватель) | Must | 1 |
| FR-010 | SEO: JSON-LD (Organization), OG-теги, hreflang | Must | 1 |

### 3.2 Каталог программ (FR-011 — FR-020)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-011 | Отображение 22+ бакалаврских и 3+ магистерских программ | Must | 2 |
| FR-012 | Фасетная фильтрация: уровень (бакалавриат/магистратура), кафедра, язык обучения, форма | Must | 2 |
| FR-013 | Полнотекстовый поиск по названию и описанию программ (Meilisearch) | Should | 2 |
| FR-014 | Детальная страница программы: описание, учебный план, карьерные перспективы, преподаватели | Must | 2 |
| FR-015 | Кнопка «Подать заявку» с pre-fill данных программы | Must | 3 |
| FR-016 | Сравнение 2-3 программ side-by-side | Could | 4 |
| FR-017 | Рейтинг/популярность программ (по просмотрам/заявкам) | Could | 4 |
| FR-018 | PDF-export карточки программы | Could | 4 |
| FR-019 | Связь с профилями преподавателей кафедры | Should | 3 |
| FR-020 | Structured Data (Course schema.org) для SEO | Must | 2 |

### 3.3 Портал приёмной комиссии (FR-021 — FR-032)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-021 | Многошаговая форма подачи заявки (Form Wizard: 5+ шагов) | Must | 3 |
| FR-022 | Загрузка документов (фото, аттестат, ЕНТ, паспорт) — до 10 MB, S3 | Must | 3 |
| FR-023 | Валидация формы: клиент (Zod) + сервер (Zod) + real-time подсказки | Must | 3 |
| FR-024 | Сохранение черновика заявки (localStorage + server draft) | Should | 3 |
| FR-025 | Отслеживание статуса заявки (timeline: подана → на рассмотрении → принята/отклонена) | Must | 3 |
| FR-026 | Email-уведомления при смене статуса (SendGrid) | Must | 3 |
| FR-027 | Калькулятор стипендий (входные: ЕНТ балл, доход семьи, достижения → грант/стипендия) | Should | 3 |
| FR-028 | Чек-лист документов по выбранной программе | Must | 3 |
| FR-029 | FAQ с accordion и поиском (CMS-управляемый) | Should | 2 |
| FR-030 | Виртуальный тур по кампусу (360° панорамы) | Should | 4 |
| FR-031 | Административная панель: список заявок, фильтры, статистика воронки | Must | 3 |
| FR-032 | Массовые действия (одобрить/отклонить) + массовые email-уведомления | Should | 4 |

### 3.4 Новости и события (FR-033 — FR-040)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-033 | Лента новостей с категоризацией (университет, наука, студенты, спорт) | Must | 2 |
| FR-034 | Детальная страница новости с rich-text (CMS), изображения, видео | Must | 2 |
| FR-035 | Календарь событий (month/week/list view) + интеграция Google Calendar | Should | 3 |
| FR-036 | Регистрация на события (форма + email-подтверждение) | Should | 3 |
| FR-037 | RSS-фид новостей | Could | 4 |
| FR-038 | Шеринг в соцсети (Telegram, Instagram, Facebook, WhatsApp) | Should | 2 |
| FR-039 | Уведомления о новых новостях (push notifications для PWA) | Could | 5 |
| FR-040 | Тегирование и связанные новости (related articles) | Should | 2 |

### 3.5 Глобальный поиск (FR-041 — FR-046)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-041 | Поисковая строка в header с автодополнением (typeahead) | Must | 2 |
| FR-042 | Полнотекстовый поиск по всему контенту (Meilisearch) | Must | 2 |
| FR-043 | Фасеты: тип контента (страница, новость, программа, преподаватель) | Should | 2 |
| FR-044 | Подсветка найденного текста в результатах | Should | 2 |
| FR-045 | Typo-tolerance (опечатки) и стемминг для 3 языков | Must | 2 |
| FR-046 | Время ответа поиска: < 50 мс (p95) | Must | 2 |

### 3.6 CMS и управление контентом (FR-047 — FR-054)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-047 | Headless CMS (Strapi 5 или Payload CMS 3) с REST + GraphQL API | Must | 2 |
| FR-048 | RBAC: роли (Admin, Editor, Author, Reviewer) с гранулярными правами | Must | 2 |
| FR-049 | Мультиязычный контент (kk/ru/en) с workflow перевода | Must | 2 |
| FR-050 | Media library: загрузка, кроп, ресайз, WebP-конвертация, S3 хранение | Must | 2 |
| FR-051 | Preview (draft) → Publish workflow с расписанием публикации | Should | 3 |
| FR-052 | Версионирование контента (история изменений, откат) | Should | 3 |
| FR-053 | API-кэширование (Redis) с инвалидацией при обновлении контента | Must | 2 |
| FR-054 | Webhook-уведомления при публикации (для ISR revalidation) | Must | 2 |

### 3.7 Интернационализация (FR-055 — FR-060)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-055 | URL-маршрутизация: /kk/, /ru/, /en/ с next-intl | Must | 1 ✅ |
| FR-056 | Переключатель языков в header (dropdown с флагами) | Must | 1 ✅ |
| FR-057 | hreflang-теги для всех страниц (SEO) | Must | 1 |
| FR-058 | Locale-detection по Accept-Language + GeoIP (fallback: ru) | Should | 2 |
| FR-059 | RTL-поддержка (потенциально для арабского в будущем) | Won't | — |
| FR-060 | Локализованные форматы дат, чисел, валют (Intl API) | Should | 2 |

### 3.8 Аутентификация и авторизация (FR-061 — FR-068)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-061 | NextAuth.js: Email/Password + OAuth (Google) | Must | 3 |
| FR-062 | University SSO (SAML 2.0 / OIDC) для студентов и преподавателей | Should | 4 |
| FR-063 | RBAC: Student, Faculty, Staff, Admin, Recruiter, Public | Must | 3 |
| FR-064 | Защищённые маршруты (middleware-level) | Must | 3 |
| FR-065 | JWT refresh tokens с ротацией | Must | 3 |
| FR-066 | Rate limiting на auth endpoints (Redis) | Must | 3 |
| FR-067 | Двухфакторная аутентификация (2FA) — TOTP | Could | 5 |
| FR-068 | Password recovery flow (email + token) | Must | 3 |

### 3.9 AI-Центр (FR-069 — FR-074)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-069 | Витрина AI-проектов (Card Grid с фильтрами по типу, технологии, статусу) | Should | 4 |
| FR-070 | Каталог AI-агентов: описание, демо, API-доступ | Should | 4 |
| FR-071 | Каталог AI-приложений: веб-инструменты, калькуляторы, генераторы | Should | 4 |
| FR-072 | Каталог AI-инструментов (tools): datasets, libraries, frameworks | Could | 5 |
| FR-073 | AI-лаборатория: sandbox для экспериментов | Could | 6 |
| FR-074 | AI-чатбот для абитуриентов (FAQ, навигация, рекомендации программ) | Should | 3 |

### 3.10 Карьерный центр и пул талантов (FR-075 — FR-082)

| ID | Требование | Приоритет | Фаза |
|----|-----------|:---------:|:----:|
| FR-075 | Публичные профили студентов (портфолио, навыки, GPA, проекты) | Should | 4 |
| FR-076 | Фильтрация студентов: кафедра, навыки, GPA, курс, язык | Should | 4 |
| FR-077 | Вакансии и стажировки (CMS-управляемые карточки) | Should | 4 |
| FR-078 | Менторская программа: профили менторов, запись на консультацию | Could | 5 |
| FR-079 | CV-билдер (генерация PDF из профиля) | Could | 5 |
| FR-080 | Система Talapker: геймификация (20 уровней, XP, квесты, значки) | Could | 4-5 |
| FR-081 | Лидерборд и рейтинг студентов | Could | 5 |
| FR-082 | Приглашение рекрутером (кнопка «Пригласить» → email студенту) | Could | 5 |

---

## 4. Нефункциональные требования (NFR)

### 4.1 Производительность (NFR-01 — NFR-07)

| ID | Требование | Целевое значение | Метод проверки |
|----|-----------|:----------------:|---------------|
| NFR-01 | LCP (Largest Contentful Paint) | ≤ 2.5 сек | Lighthouse CI |
| NFR-02 | FID (First Input Delay) | ≤ 100 мс | Chrome UX Report |
| NFR-03 | CLS (Cumulative Layout Shift) | ≤ 0.1 | Lighthouse CI |
| NFR-04 | TTFB (Time to First Byte) | ≤ 200 мс | Synthetic monitoring |
| NFR-05 | Lighthouse Performance Score | ≥ 90 | Lighthouse CI в CI/CD |
| NFR-06 | First Load JS Bundle | ≤ 100 KB | Bundle analyzer |
| NFR-07 | Image optimization | WebP/AVIF, lazy loading, srcset | Automated audit |

### 4.2 Масштабируемость (NFR-08 — NFR-12)

| ID | Требование | Целевое значение | Метод проверки |
|----|-----------|:----------------:|---------------|
| NFR-08 | Одновременных пользователей | 10 000 | k6 load testing |
| NFR-09 | API RPS (requests per second) | 500 | k6 + Grafana |
| NFR-10 | API response time (p95) | ≤ 300 мс | APM (Sentry) |
| NFR-11 | Search response time (p95) | ≤ 50 мс | Meilisearch metrics |
| NFR-12 | CDN cache hit ratio | ≥ 90% | Cloudflare analytics |

### 4.3 Надёжность (NFR-13 — NFR-16)

| ID | Требование | Целевое значение | Метод проверки |
|----|-----------|:----------------:|---------------|
| NFR-13 | Uptime SLA | 99.5% | Uptime monitoring (Better Stack) |
| NFR-14 | RPO (Recovery Point Objective) | 1 час | Backup verification |
| NFR-15 | RTO (Recovery Time Objective) | 4 часа | Disaster recovery drill |
| NFR-16 | Zero-downtime deployments | Blue/Green или Rolling | CI/CD pipeline |

### 4.4 Безопасность (NFR-17 — NFR-22)

| ID | Требование | Целевое значение | Метод проверки |
|----|-----------|:----------------:|---------------|
| NFR-17 | HTTPS (TLS 1.3) | Все запросы | SSL Labs A+ |
| NFR-18 | Content Security Policy (CSP) | Strict policy | Security headers scan |
| NFR-19 | Web Application Firewall | Cloudflare WAF | Attack simulation |
| NFR-20 | OWASP Top 10 compliance | 0 critical/high | OWASP ZAP scan |
| NFR-21 | Dependency vulnerabilities | 0 known critical | Dependabot + Snyk |
| NFR-22 | Rate limiting | Auth: 5/min, API: 100/min | Automated tests |

### 4.5 Доступность (NFR-23 — NFR-26)

| ID | Требование | Целевое значение | Метод проверки |
|----|-----------|:----------------:|---------------|
| NFR-23 | WCAG 2.2 Level AA | Полное соответствие | axe-core + manual audit |
| NFR-24 | Lighthouse Accessibility Score | ≥ 90 | Lighthouse CI |
| NFR-25 | Keyboard navigation | Все функции доступны | Manual testing |
| NFR-26 | Screen reader compatibility | NVDA + VoiceOver | Manual testing |

### 4.6 SEO (NFR-27 — NFR-29)

| ID | Требование | Целевое значение | Метод проверки |
|----|-----------|:----------------:|---------------|
| NFR-27 | Lighthouse SEO Score | ≥ 95 | Lighthouse CI |
| NFR-28 | Structured Data | Organization, Course, BreadcrumbList, Event, FAQ | Schema.org validator |
| NFR-29 | Canonical + hreflang | Все страницы × 3 языка | Screaming Frog |

---

## 5. Технологический стек

### 5.1 Frontend

| Технология | Версия | Назначение |
|-----------|:------:|-----------|
| Next.js (App Router) | 16 | SSR/SSG/ISR, React Server Components, Edge Runtime |
| React | 19 | UI library, Server Components, Suspense |
| TypeScript | 5 | Строгая типизация |
| Tailwind CSS | 4 | Utility-first CSS, дизайн-токены |
| next-intl | 4 | i18n: маршрутизация, перевод, форматирование |
| next-themes | — | Dark/Light/System theme |
| Framer Motion | 12 | Анимации, page transitions |
| Zustand | 5 | Client state management |
| React Hook Form | 7 | Управление формами |
| Zod | 4 | Валидация схем (клиент + сервер) |
| Lucide React | — | SVG-иконки (tree-shakeable) |

### 5.2 Backend

| Технология | Версия | Назначение |
|-----------|:------:|-----------|
| Strapi / Payload CMS | 5 / 3 | Headless CMS, REST + GraphQL, RBAC |
| PostgreSQL | 16 | Основная БД (ACID, JSON, FTS) |
| Redis | 7 | Кэш, сессии, rate limiting, pub/sub |
| Meilisearch | 1.x | Полнотекстовый поиск (<50ms, typo-tolerant) |
| NextAuth.js | 5 | Аутентификация (Email, OAuth, SSO) |
| SendGrid | — | Транзакционные email |

### 5.3 Инфраструктура

| Технология | Назначение |
|-----------|-----------|
| Docker (Node 22 Alpine) | Контейнеризация |
| Railway / K8s | Оркестрация и деплой |
| S3-compatible (MinIO) | Хранение файлов и медиа |
| Cloudflare | CDN, WAF, DDoS-защита, DNS |
| GitHub Actions | CI/CD: lint → test → build → deploy |
| Sentry | Error tracking, APM, performance |
| Grafana + Prometheus | Мониторинг, дашборды, алертинг |
| Plausible / GA4 | Веб-аналитика |

---

## 6. Дизайн-система

### 6.1 Методология: Atomic Design

5 уровней компонентной иерархии:

| Уровень | Примеры | Количество |
|---------|---------|:----------:|
| **Атомы** | Button, Input, Badge, Icon, Typography, Skeleton | 14+ |
| **Молекулы** | SearchBar, FormField, NavItem, StatCard, SocialLinks | 10+ |
| **Организмы** | Header, Footer, MegaMenu, ProgramCard, NewsCard | 15+ |
| **Шаблоны** | HeroLanding, CardGrid, Profile, Dashboard, FormWizard | 8 |
| **Страницы** | Home, Admission, Programs, Contact, Search | 30+ |

### 6.2 Цвета

| Токен | Hex | Применение |
|-------|:---:|-----------|
| primary | #1D56C9 | Основной цвет бренда |
| primary-gold | #E6B325 | Акцент, CTA |
| bg-light | #F8F9FB | Фон (светлая тема) |
| bg-dark | #0A0E17 | Фон (тёмная тема) |
| surface-light | #FFFFFF | Карточки (светлая) |
| surface-dark | #111827 | Карточки (тёмная) |
| text-primary | #0F172A | Основной текст |
| text-secondary | #64748B | Вторичный текст |
| success | #10B981 | Успех |
| warning | #F59E0B | Предупреждение |
| error | #EF4444 | Ошибка |
| info | #3B82F6 | Информация |

### 6.3 Типографика

**Модульная шкала:** 1.25 (Major Third)

| Уровень | Размер (rem) | Шрифт | Вес |
|---------|:------------:|-------|:---:|
| H1 (Display) | 2.441 | Lexend | 700 |
| H2 | 1.953 | Lexend | 600 |
| H3 | 1.563 | Lexend | 600 |
| H4 | 1.25 | Lexend | 600 |
| Body | 1.0 (16px) | Inter | 400 |
| Small | 0.8 | Inter | 400 |
| Mono | 0.875 | JetBrains Mono | 400 |

### 6.4 Сетка и Breakpoints

- **Сетка:** 12-колоночная
- **Максимальная ширина:** 1280px
- **Gutters:** 16px (sm) → 24px (md) → 32px (lg)

| Breakpoint | Ширина | Колонки | Gutter |
|-----------|:------:|:-------:|:------:|
| sm | ≥ 640px | 4 | 16px |
| md | ≥ 768px | 8 | 24px |
| lg | ≥ 1024px | 12 | 32px |
| xl | ≥ 1280px | 12 | 32px |
| 2xl | ≥ 1536px | 12 | 32px |

### 6.5 Компоненты с состояниями доступности

| Компонент | A11y-атрибуты |
|-----------|--------------|
| Button | `aria-disabled`, `aria-busy` (loading), `focus-visible` |
| Input | `aria-invalid`, `aria-describedby`, `aria-required` |
| Dialog/Modal | `aria-modal`, `role="dialog"`, focus-trap |
| Tabs | `role="tablist"`, `aria-selected`, `aria-controls` |
| Accordion | `aria-expanded`, `aria-controls` |
| Toast | `role="alert"`, `aria-live="polite"` |
| Tooltip | `role="tooltip"`, `aria-describedby` |
| Select | `aria-expanded`, `aria-activedescendant` |
| Table | `aria-sort`, `scope="col"/"row"` |
| Breadcrumb | `aria-label="Breadcrumb"`, `aria-current="page"` |
| Pagination | `aria-current="page"`, `aria-label` |
| Navigation | `aria-current="page"`, skip-links |

---

## 7. Интеграции

### 7.1 Перечень внешних систем

| # | Система | Протокол | Данные | Направление | Фаза |
|---|---------|----------|--------|:-----------:|:----:|
| 1 | **LMS (Moodle)** | REST API / LTI 1.3 | Курсы, оценки, материалы | ← → | 4 |
| 2 | **CRM (HubSpot)** | REST API | Лиды (абитуриенты), воронка | → | 3 |
| 3 | **Google Calendar** | CalDAV / REST API | События, расписание | ← | 3 |
| 4 | **Email (SendGrid)** | SMTP / REST API | Транзакционные письма | → | 2 |
| 5 | **Платежи (Kaspi Pay)** | REST API | Оплата обучения, общежития | ← → | 5 |
| 6 | **University SSO** | SAML 2.0 / OIDC | Аутентификация | ← → | 4 |
| 7 | **Scopus / WoS** | REST API | Публикации, h-index, цитирования | ← | 5 |
| 8 | **Library OPAC** | Z39.50 / SRU | Каталог библиотеки | ← | 5 |
| 9 | **Support (Intercom)** | Widget + REST API | Чат, тикеты | ← → | 3 |
| 10 | **Google Maps** | JS API v3 | Карта кампуса, маршруты | ← | 2 |

### 7.2 Архитектура интеграций

```
┌──────────────────┐         ┌──────────────────┐
│   ZhezU Frontend │ ← API → │  Next.js API      │
│   (Next.js 16)   │         │  Route Handlers   │
└──────────────────┘         └────────┬─────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
            ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
            │  Headless CMS│ │  PostgreSQL  │ │    Redis     │
            │  (Strapi)    │ │  (Primary)   │ │   (Cache)    │
            └──────┬───────┘ └──────────────┘ └──────────────┘
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
┌─────────┐ ┌─────────────┐ ┌──────────┐
│ S3/MinIO│ │ Meilisearch │ │ External │
│ (Files) │ │ (Search)    │ │ APIs     │
└─────────┘ └─────────────┘ └──────────┘
                              │
              ┌───────┬───────┼───────┬────────┐
              ▼       ▼       ▼       ▼        ▼
          SendGrid  HubSpot  Google  Kaspi   Moodle
                             Maps    Pay     LMS
```

---

## 8. Тестирование

### 8.1 Типы тестов

| Тип | Инструмент | Покрытие | Запуск | Фаза |
|-----|-----------|:--------:|--------|:----:|
| **Unit** | Vitest | ≥ 80% бизнес-логики | Pre-commit + CI | 1 |
| **Integration** | Vitest + MSW | API endpoints, CMS queries | CI | 2 |
| **E2E** | Playwright | 20+ критических сценариев | CI (nightly) | 3 |
| **Visual Regression** | Playwright Screenshots | UI-компоненты, страницы | CI (PR) | 2 |
| **Accessibility** | axe-core + Lighthouse | WCAG 2.2 AA, все страницы | CI + Manual | 1 |
| **Performance** | Lighthouse CI | Core Web Vitals (LCP, FID, CLS) | CI (PR) | 2 |
| **Security** | OWASP ZAP | OWASP Top 10, pen-test | Monthly + CI | 5 |
| **Load** | k6 | 10K concurrent, 500 RPS | Pre-release | 5 |

### 8.2 Критерии приёмки (Definition of Done)

- [ ] Unit-тесты ≥ 80% покрытие (новый код)
- [ ] E2E-тесты проходят для затронутых сценариев
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 90
- [ ] Нет critical/high уязвимостей (Snyk, OWASP ZAP)
- [ ] Code review одобрен ≥ 1 ревьюером
- [ ] Документация обновлена (если применимо)
- [ ] Все 3 языка (kk/ru/en) проверены

---

## 9. CI/CD Pipeline

```
┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
│  Push  │──▶│  Lint  │──▶│  Test  │──▶│ Build  │──▶│ Deploy │──▶│Monitor │
│        │   │        │   │        │   │        │   │        │   │        │
│ PR/main│   │ESLint  │   │Vitest  │   │Next.js │   │Docker  │   │Sentry  │
│        │   │Prettier│   │axe-core│   │bundle  │   │Railway │   │Grafana │
│        │   │tsc     │   │Playwr. │   │analyze │   │Cloudfl.│   │Alerts  │
└────────┘   └────────┘   └────────┘   └────────┘   └────────┘   └────────┘
                                                         │
                                              ┌──────────┼──────────┐
                                              ▼          ▼          ▼
                                          Staging    Production  Rollback
                                          (PR env)   (main)      (auto)
```

### 9.1 Этапы пайплайна

| Этап | Триггер | Инструменты | Время |
|------|---------|-------------|:-----:|
| **Lint** | Каждый push | ESLint, Prettier, TypeScript | ~30 сек |
| **Unit Tests** | Каждый push | Vitest + coverage | ~1 мин |
| **Build** | Каждый push | Next.js build + bundle analysis | ~2 мин |
| **a11y + Perf** | PR → main | axe-core, Lighthouse CI | ~3 мин |
| **E2E** | PR → main | Playwright (3 browsers) | ~5 мин |
| **Security** | Weekly + PR | OWASP ZAP, Snyk | ~10 мин |
| **Deploy Staging** | PR merge → staging | Docker build + Railway | ~3 мин |
| **Deploy Production** | Manual approve / tag | Blue/Green → Railway | ~3 мин |

---

## 10. Дорожная карта (высокоуровневая)

| Фаза | Период | Ключевые deliverables |
|------|:------:|----------------------|
| **0. Планирование** | Недели 1-2 | ТЗ, дизайн-система (Figma), архитектура, CI/CD |
| **1. Дизайн-система** | Недели 3-6 | Компоненты, навигация, SEO-фундамент, тесты |
| **2. MVP Backend** | Недели 7-12 | CMS, PostgreSQL, Meilisearch, API, контент |
| **3. MVP Страницы** | Недели 13-18 | Поступление, каталог, новости, auth, контакты |
| **4. QA и запуск MVP** | Недели 19-22 | E2E тесты, performance, security, UAT, production |
| **5. Функции роста** | Недели 23-32 | Карьера, AI-Центр, виртуальный тур, Talapker |
| **6. Масштабирование** | Недели 33-40 | Микросайты кафедр, интеграции, AI-лаборатория |

> Детальная дорожная карта с разбивкой по спринтам — см. [ROADMAP.md](ROADMAP.md)

---

## 11. SLA и поддержка

### 11.1 SLA (Service Level Agreement)

| Параметр | Значение |
|----------|:--------:|
| Uptime | 99.5% |
| Время реагирования (P1 — критический) | 1 час |
| Время реагирования (P2 — высокий) | 4 часа |
| Время реагирования (P3 — средний) | 1 рабочий день |
| Время реагирования (P4 — низкий) | 3 рабочих дня |
| Резервное копирование | Ежедневно (автоматическое) |
| Retention бэкапов | 30 дней |

### 11.2 Гарантийный период

- **Длительность:** 3 месяца после продуктивного запуска
- **Включает:** исправление дефектов, консультации, обучение
- **Не включает:** новые фичи, миграцию данных, изменения ТЗ

---

## 12. Документация и обучение

### 12.1 Техническая документация

| Документ | Аудитория | Формат |
|----------|-----------|--------|
| Архитектурный обзор | Разработчики | Markdown (repo) |
| API-документация | Разработчики, интеграторы | Swagger/OpenAPI |
| Компонентная документация | Frontend-разработчики | Storybook |
| Руководство по деплою | DevOps | Markdown (repo) |
| Runbook (инциденты) | Команда поддержки | Markdown (repo) |

### 12.2 Обучение

| Курс | Аудитория | Формат | Длительность |
|------|-----------|--------|:------------:|
| Управление контентом (CMS) | Контент-менеджеры | Видео + практика | 4 часа |
| Работа с заявками | Приёмная комиссия | Видео + практика | 2 часа |
| Администрирование | IT-отдел | Документация + воркшоп | 8 часов |

---

## 13. Связанные документы

| Документ | Описание |
|----------|----------|
| [PROJECT_CONCEPT.md](PROJECT_CONCEPT.md) | Концепция проекта ZhezU v2.0 |
| [GAP_ANALYSIS.md](GAP_ANALYSIS.md) | Анализ разрывов: текущее состояние vs требования |
| [ROADMAP.md](ROADMAP.md) | Детальная дорожная карта (40 недель, 20 спринтов) |
| [NAVIGATION_ARCHITECTURE.md](NAVIGATION_ARCHITECTURE.md) | Архитектура навигации |
| [USER_STORIES.md](USER_STORIES.md) | Пользовательские истории |
| [DEEP_ANALYSIS_REPORT.md](DEEP_ANALYSIS_REPORT.md) | Технический анализ архитектуры |

---

*Документ подготовлен: 23 февраля 2026 г.*
*Версия: 1.0 — адаптировано из ТЗ_Веб-сайт_университета_v1.0.docx*
