# План разработки мультиязычного кроссплатформенного приложения ZhezU

**Версия:** 3.0
**Дата:** 27 февраля 2026
**Проект:** Разработка нового сайта Жезказганского университета имени О.А. Байконурова

> **Целевой сайт:** https://zhezu.edu.kz/
>
> Данный проект разрабатывается для полного обновления официального сайта
> Жезказганского университета имени О.А. Байконурова. Новая платформа заменит
> текущий сайт по адресу https://zhezu.edu.kz/ и будет включать портал приёмной
> комиссии, академический каталог, карьерный центр и студенческие сервисы.

---

## 1. Экспертная группа

### Product Owner / Продуктовый аналитик
**Видение продукта:** Единая цифровая платформа университета, объединяющая приёмную комиссию, академический каталог, карьерный центр и студенческие сервисы. Платформа должна работать на трёх языках (қазақша, русский, English) и быть доступна как веб-приложение и PWA на мобильных устройствах.

**Целевые аудитории:**
- Абитуриенты и их родители (основная)
- Текущие студенты
- Преподаватели и кураторы
- Работодатели-партнёры
- Администраторы университета

### Frontend-архитектор
**Архитектурное решение:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4

**Обоснование:**
- App Router — встроенная поддержка i18n через middleware и сегменты маршрутов
- TypeScript — строгая типизация для масштабируемости
- Tailwind CSS — соответствие существующим прототипам, build-time компиляция
- React Server Components — оптимальная производительность (SEO-критично для университета)
- PWA через next-pwa — кроссплатформенность без отдельной мобильной разработки

### UI/UX дизайнер
**Дизайн-система:** Единая палитра, типографика и компонентная библиотека

**Палитра (финальная, унифицированная):**
```
Primary Blue:    #1D56C9  — основной цвет университета
Primary Gold:    #E6B325  — акцентный цвет
Background Dark: #0A0E17  — тёмная тема
Background Light:#F8F9FB  — светлая тема
Surface Dark:    #111827  — карточки в тёмной теме
Surface Light:   #FFFFFF  — карточки в светлой теме
Text Primary:    #0F172A  — основной текст (светлая тема)
Text Secondary:  #64748B  — вторичный текст
Border:          #E2E8F0  — границы (светлая тема)
Border Dark:     #1E293B  — границы (тёмная тема)
Success:         #10B981
Warning:         #F59E0B
Error:           #EF4444
```

**Типографика:**
- Display/Headings: Lexend (600-700 weight)
- Body: Inter (400-500 weight)
- Mono: JetBrains Mono (код, данные)

### Backend-архитектор
**На текущем этапе:** JSON-based CMS реализована (файловое хранилище `data/*.json` — 6 файлов: news, settings, menu, homepage, university, contact). Админ-панель с HMAC-SHA256 аутентификацией — 11 страниц, 25 API-эндпоинтов (17 admin + 6 public + 2 general). AI-функции (Google Gemini): авто-перевод, анализ, валидация. Авто-публикация в Telegram и Instagram. Загрузка фото. Архитектура подготовлена для миграции на headless CMS (Strapi/Payload) и PostgreSQL.

### DevOps-инженер
**Инфраструктура:**
- Хостинг: Vercel (оптимально для Next.js) или self-hosted
- CI/CD: GitHub Actions
- Мониторинг: Vercel Analytics + Web Vitals

### QA-инженер
**Стратегия тестирования:**
- Unit: Vitest + React Testing Library
- E2E: Playwright (мультибраузер)
- Accessibility: axe-core + Lighthouse
- Visual: Playwright screenshots

### Специалист по локализации
**Языковая стратегия:**
- Казахский (қазақша) — основной для государственных требований
- Русский — основной для большинства пользователей
- Английский — для международных студентов и SEO

---

## 2. Технологический стек

| Слой | Технология | Версия | Назначение |
|------|-----------|--------|-----------|
| **Framework** | Next.js | 16.1.6 | SSR/SSG, App Router, middleware |
| **UI** | React | 19.2.3 | Библиотека интерфейсов |
| **Language** | TypeScript | 5.x | Типизация |
| **Styling** | Tailwind CSS | 4.x | Утилитарные стили, дизайн-токены |
| **i18n** | next-intl | 4.8.2 | Маршрутизация и переводы |
| **Theme** | next-themes | 0.4.6 | Dark/light переключение |
| **Icons** | Lucide React | 0.563.0 | SVG-иконки (замена Material Symbols) |
| **Forms** | React Hook Form + Zod | 7.71.1 + 4.3.6 | Валидация форм |
| **State** | Zustand | 5.0.11 | Клиентское состояние |
| **Animation** | Framer Motion | 12.31.1 | Микроанимации |
| **Linting** | ESLint + Prettier | 9.x + 3.8.1 | Качество кода |
| **Testing** | Vitest + Playwright | 4.0.18 + 1.58.2 | Unit + E2E |
| **CI/CD** | GitHub Actions | — | lint, typecheck, test, build |
| **Package Manager** | pnpm | 10.x | Быстрый, экономный |

---

## 3. Архитектура проекта

```
zhezu-app/
├── public/
│   ├── icons/                   # PWA-иконки
│   ├── images/                  # Статические изображения
│   └── manifest.json            # PWA-манифест
├── src/
│   ├── app/
│   │   ├── [locale]/            # i18n-сегмент маршрута
│   │   │   ├── layout.tsx       # Корневой layout с Header/Footer
│   │   │   ├── page.tsx         # Главная страница
│   │   │   ├── admission/
│   │   │   │   └── page.tsx     # Приёмная комиссия
│   │   │   ├── academics/
│   │   │   │   └── page.tsx     # Каталог программ
│   │   │   ├── career/
│   │   │   │   ├── page.tsx     # Карьерный центр
│   │   │   │   ├── jobs/
│   │   │   │   └── mentorship/
│   │   │   ├── student/
│   │   │   │   ├── portal/      # Личный кабинет
│   │   │   │   └── profile/     # Профиль для работодателей
│   │   │   ├── blog/
│   │   │   │   └── page.tsx     # Блог и события
│   │   │   ├── contact/
│   │   │   │   └── page.tsx     # Контакты и обратная связь
│   │   │   └── admin/
│   │   │       ├── layout.tsx   # Admin layout с сайдбаром
│   │   │       ├── page.tsx     # Дашборд
│   │   │       └── editor/      # Редактор контента
│   │   └── globals.css          # Глобальные стили + Tailwind
│   ├── components/
│   │   ├── ui/                  # Базовые UI-компоненты
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── ...
│   │   ├── layout/              # Компоненты каркаса
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── home/                # Секции главной страницы
│   │   ├── admission/           # Компоненты приёма
│   │   ├── academics/           # Компоненты каталога
│   │   ├── career/              # Компоненты карьеры
│   │   └── shared/              # Переиспользуемые блоки
│   ├── lib/
│   │   ├── utils.ts             # Утилиты (cn, formatDate, etc.)
│   │   └── constants.ts         # Константы
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── useScrollDirection.ts
│   ├── types/
│   │   ├── index.ts             # Общие типы
│   │   └── api.ts               # Типы API-ответов
│   └── i18n/
│       ├── config.ts            # Конфигурация i18n
│       ├── request.ts           # Server-side i18n
│       └── messages/
│           ├── kk.json          # Казахский
│           ├── ru.json          # Русский
│           └── en.json          # Английский
├── .env.example                 # Пример переменных окружения
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Дизайн-система — Компоненты

### Атомарные компоненты (UI Kit)
| Компонент | Варианты | Props |
|-----------|---------|-------|
| **Button** | primary, secondary, outline, ghost, danger | size: sm/md/lg, loading, disabled, icon |
| **Card** | default, elevated, bordered, interactive | padding, hover, onClick |
| **Input** | text, email, password, search, textarea | label, error, helper, icon |
| **Badge** | default, success, warning, error, info | size: sm/md |
| **Select** | single, multi | options, placeholder, searchable |
| **Dialog** | modal, drawer, sheet | open, onClose, title |
| **Avatar** | image, initials | size: xs/sm/md/lg/xl |
| **Tabs** | horizontal, vertical | items, activeTab, onChange |
| **Skeleton** | text, card, avatar, table | width, height |
| **Toast** | success, error, warning, info | message, duration, action |

### Составные компоненты
| Компонент | Используется в |
|-----------|---------------|
| **ProgramCard** | Academics Catalog |
| **JobCard** | Career Center |
| **EventCard** | Blog, Career Center |
| **StatCard** | Dashboard, Admin |
| **MentorCard** | Career Mentorship |
| **NewsItem** | Home, Blog |
| **FilterPanel** | Catalog, Job Board |
| **DataTable** | Admin Dashboard |
| **RichTextEditor** | Content Editor |
| **LanguageSwitcher** | Header |
| **ThemeToggle** | Header |
| **MobileMenu** | Header (responsive) |
| **Breadcrumb** | All inner pages |
| **Pagination** | Catalog, Blog, Job Board |

---

## 5. Система интернационализации (i18n)

### Архитектура маршрутов
```
/kk          → Главная (казахский)
/ru          → Главная (русский)
/en          → Главная (английский)
/kk/admission → Приём (казахский)
/ru/admission → Приём (русский)
...
```

### Структура переводов (пример)
```json
// ru.json
{
  "common": {
    "nav": {
      "home": "Главная",
      "admission": "Приёмная комиссия",
      "academics": "Программы",
      "career": "Карьера",
      "blog": "Новости",
      "contact": "Контакты"
    },
    "actions": {
      "apply": "Подать заявку",
      "learnMore": "Подробнее",
      "search": "Поиск",
      "filter": "Фильтр",
      "viewAll": "Смотреть все"
    },
    "theme": {
      "light": "Светлая тема",
      "dark": "Тёмная тема"
    }
  },
  "home": {
    "hero": {
      "title": "Жезказганский университет",
      "subtitle": "Образование, определяющее будущее",
      "cta": "Начать поступление"
    }
  }
}
```

### Поддержка RTL
Казахский и русский — LTR. Архитектура позволяет добавить RTL-языки в будущем через `dir` атрибут.

---

## 6. Фазы разработки

### Фаза 1 — Фундамент (завершена)
- [x] Инициализация Next.js + TypeScript + Tailwind
- [x] Настройка дизайн-токенов и палитры
- [x] Система i18n (kk/ru/en) — 22 namespace-а переводов
- [x] Dark/light тема (next-themes с определением системных настроек)
- [x] Базовые UI-компоненты (11 шт.: Button, Card, Input, Badge, Select, Tabs, Accordion, Breadcrumb, Pagination, Skeleton, Toast)
- [x] Layout: Header с мега-меню (6 разделов), Footer, MobileMenu, LanguageSwitcher, ThemeToggle
- [x] Главная страница
- [x] Страница приёмной комиссии
- [x] Каталог программ
- [x] Страница контактов
- [x] Карьерный центр
- [x] Карточные компоненты (NewsCard, EventCard, ProgramCard, StatCard)
- [x] SearchOverlay — глобальный поиск

### Фаза 2 — Расширение контента (завершена)
- [x] Раздел «Университет» (14 страниц: about, leadership, rector, administration, mission, accreditation, partners, rankings, senate, documents)
- [x] Раздел «Поступление» расширен (15 страниц: bachelor, master, doctorate, apply, documents, scholarships, deadlines, exams, faq, status, consultation, contact)
- [x] Раздел «Образование» расширен (13 страниц: bachelor, master, departments, faculty, library, schedule, calendar, curriculum, exams)
- [x] Раздел «Наука» (11 страниц: publications, conferences, labs, grants, equipment, articles)
- [x] Раздел «AI-Центр» (9 страниц: projects, agents, tools, lab, api, showcase)
- [x] Раздел «Студенческая жизнь» (12 страниц: news, events, sports, dormitories, clubs, student-government, announcements)
- [x] SEO: hreflang-теги, мета-теги, OG-теги на всех страницах

### Фаза 3 — Административный интерфейс (завершена)
- [x] Админ-панель с авторизацией (HMAC-SHA256 токены, httpOnly cookies) — **11 страниц**
- [x] CRUD управление новостями (9 категорий: news, announcement, event, achievement, university, science, students, sport, culture)
- [x] Редактор настроек сайта (контакты, соцсети, адрес, объявления)
- [x] Редактор переводов (kk/ru/en) с AI-авто-переводом
- [x] Менеджер страниц
- [x] Менеджер навигационного меню (add/remove/reorder)
- [x] Управление данными главной страницы
- [x] Управление данными университета (ректор, проректоры + загрузка фото)
- [x] Управление контактной информацией
- [x] AI-функции: авто-перевод, анализ контента, валидация (Google Gemini 2.5)
- [x] Авто-публикация в соцсети (Telegram, Instagram)
- [x] Загрузка фотографий (upload API)
- [x] Публичные API — **6 эндпоинтов** (news, settings, menu, homepage, university, contact)
- [x] Привязка всех публичных страниц к админ-данным
- [x] JSON-based файловое хранилище — **6 файлов** (news, settings, menu, homepage, university, contact)
- [x] 16 seed-новостей на 3 языках
- [x] CI/CD Pipeline (GitHub Actions: lint, typecheck, test, build)
- [x] Unit-тесты (Vitest 4.0 + React Testing Library) — 7 тестовых файлов
- [x] Тёмная/светлая тема в админ-панели
- [x] robots.txt и sitemap.xml

### Фаза 4 — Студенческие сервисы (планируется)
- [ ] Личный кабинет студента
- [ ] Профиль для работодателей
- [ ] Блог и события (live mode)
- [ ] Система чата куратор-студент

### Фаза 5 — AI-сервисы (планируется)
- [ ] AI Career Path Predictor
- [ ] AI Tools Directory
- [ ] AI-ассистент для абитуриентов

### Фаза 6 — Backend и интеграции (планируется)
- [ ] Headless CMS (Strapi / Payload) — миграция с JSON-хранилища
- [ ] REST/GraphQL API
- [ ] Аутентификация пользователей (NextAuth.js)
- [ ] База данных (PostgreSQL)
- [ ] Интеграция с АИС университета

---

## 7. Критерии качества

### Производительность (Core Web Vitals)
| Метрика | Целевое значение |
|---------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Lighthouse Performance | > 90 |

### Доступность (WCAG 2.1 AA)
- Все изображения с `alt` атрибутами
- Все формы с связанными `<label>`
- Все интерактивные элементы доступны с клавиатуры
- Контраст текста ≥ 4.5:1 (обычный) / 3:1 (крупный)
- Skip-links для навигации
- `aria-current="page"` для активных пунктов меню
- `prefers-reduced-motion` для анимаций

### SEO
- SSR/SSG для всех публичных страниц
- Мета-теги для каждой страницы на каждом языке
- `hreflang` для мультиязычности
- Структурированные данные (JSON-LD) для университета
- Sitemap.xml и robots.txt
- Open Graph и Twitter Card мета-теги

---

## 8. PWA-стратегия

### Возможности
- Установка на домашний экран (iOS, Android, Desktop)
- Offline-доступ к статическим страницам
- Push-уведомления (Фаза 2)
- Кэширование шрифтов и изображений

### Манифест
```json
{
  "name": "ZhezU — Жезказганский университет",
  "short_name": "ZhezU",
  "theme_color": "#1D56C9",
  "background_color": "#0A0E17",
  "display": "standalone",
  "start_url": "/ru",
  "icons": [...]
}
```

---

## 9. Миграция с прототипов

### Маппинг прототипов → компонентов приложения

| Прототип (stitch/) | → Компонент приложения |
|--------------------|----------------------|
| zhezu_home_page_1 + _2 | `app/[locale]/page.tsx` (единая страница с dark/light) |
| admission_guide_portal_1 + _2 | `app/[locale]/admission/page.tsx` |
| academics_catalog_1 + _2 | `app/[locale]/academics/page.tsx` |
| career_center_dashboard | `app/[locale]/career/page.tsx` |
| career_center_job_board | `app/[locale]/career/jobs/page.tsx` |
| career_center_mentorship | `app/[locale]/career/mentorship/page.tsx` |
| career_super-service_hub | Интегрирован в career layout |
| student_personal_portal_2 + _3 | `app/[locale]/student/portal/page.tsx` |
| student_talent_profile | `app/[locale]/student/profile/page.tsx` |
| zhezu_admin_dashboard | `app/[locale]/admin/page.tsx` |
| zhezu_content_editor | `app/[locale]/admin/editor/page.tsx` |
| zhezu_contact_feedback | `app/[locale]/contact/page.tsx` |
| zhezu_website_footer_1 + _2 | `components/layout/Footer.tsx` |
| university_blog_events | `app/[locale]/blog/page.tsx` |

**Ключевой принцип:** Варианты одной страницы (\_1, \_2) объединяются в единый компонент с dark/light переключением. Никаких дубликатов.
