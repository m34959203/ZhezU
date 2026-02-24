'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & Mock Data                                                  */
/* ------------------------------------------------------------------ */

type CategoryId = 'all' | 'university' | 'science' | 'students' | 'sport' | 'culture';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: Exclude<CategoryId, 'all'>;
  author: string;
  readTime: string;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'university', label: 'Университет' },
  { id: 'science', label: 'Наука' },
  { id: 'students', label: 'Студенты' },
  { id: 'sport', label: 'Спорт' },
  { id: 'culture', label: 'Культура' },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  university: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
  },
  science: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  students: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  sport: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
  },
  culture: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300' },
};

const CATEGORY_LABELS: Record<string, string> = {
  university: 'Университет',
  science: 'Наука',
  students: 'Студенты',
  sport: 'Спорт',
  culture: 'Культура',
};

const NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Прорывное исследование: учёные ZhezU открыли новый источник возобновляемой энергии',
    excerpt:
      'Группа исследователей ZhezU опубликовала результаты, которые могут повысить эффективность солнечных панелей на 40% благодаря новым наноматериалам.',
    date: '2026-02-25',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    category: 'science',
    author: 'Д-р Ахмет Касымов',
    readTime: '5 мин',
  },
  {
    id: '2',
    title: 'Выборы студенческого совета: знакомьтесь с кандидатами и их программами',
    excerpt:
      'На неделе выборов мы подробно рассмотрим ключевые предложения трёх основных партий, претендующих на руководство студенческим советом.',
    date: '2026-02-24',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80',
    category: 'university',
    author: 'Сара Ибрагимова',
    readTime: '4 мин',
  },
  {
    id: '3',
    title: 'Баскетбольная команда ZhezU вышла в региональный финал',
    excerpt:
      'Одержав захватывающую победу в овертайме, баскетболисты ZhezU впервые за десятилетие пробились в региональный финал.',
    date: '2026-02-23',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    category: 'sport',
    author: 'Михаил Ким',
    readTime: '3 мин',
  },
  {
    id: '4',
    title: 'Новая художественная выставка «Горизонты» открылась в кампусной галерее',
    excerpt:
      'Представлены работы более 30 студентов-художников. Выставка исследует темы будущих пейзажей и цифровой идентичности.',
    date: '2026-02-22',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    category: 'culture',
    author: 'Кафедра искусств',
    readTime: '4 мин',
  },
  {
    id: '5',
    title: 'Гостевая лекция: будущее ИИ в образовании',
    excerpt:
      'Известный исследователь ИИ профессор Алан Тьюринг III посетил ZhezU, чтобы обсудить влияние больших языковых моделей на обучение.',
    date: '2026-02-21',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    category: 'science',
    author: 'Научный факультет',
    readTime: '6 мин',
  },
  {
    id: '6',
    title: 'Неделя экологической устойчивости стартовала с посадки деревьев',
    excerpt:
      'Сотни студентов присоединились к инициативе «Зелёная команда» и высадили более 500 местных деревьев по периметру кампуса.',
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    category: 'students',
    author: 'Зелёная команда',
    readTime: '3 мин',
  },
  {
    id: '7',
    title: 'Сеть выпускников ZhezU расширяется в Европу',
    excerpt:
      'Новое отделение Ассоциации выпускников ZhezU официально открыто в Берлине, объединяя выпускников по всему ЕС.',
    date: '2026-02-19',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'university',
    author: 'Ассоциация выпускников',
    readTime: '4 мин',
  },
  {
    id: '8',
    title: 'Студенты ZhezU победили на республиканской олимпиаде по программированию',
    excerpt:
      'Команда из трёх студентов факультета ИТ заняла первое место на республиканской олимпиаде, решив все задачи за рекордное время.',
    date: '2026-02-18',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    category: 'students',
    author: 'Факультет ИТ',
    readTime: '5 мин',
  },
];

const ITEMS_PER_PAGE = 6;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [currentPage, setCurrentPage] = useState(1);

  /* Filtering */
  const filtered =
    activeCategory === 'all' ? NEWS : NEWS.filter((a) => a.category === activeCategory);

  /* Featured article is always the first one */
  const featured = NEWS[0];

  /* Grid articles (excluding featured) */
  const gridArticles = filtered.filter((a) => a.id !== featured.id);
  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ITEMS_PER_PAGE));
  const paged = gridArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function handleCategoryChange(id: CategoryId) {
    setActiveCategory(id);
    setCurrentPage(1);
  }

  /* ---------------------------------------------------------------- */
  /*  Render helpers                                                    */
  /* ---------------------------------------------------------------- */

  function renderCategoryBadge(category: string, className?: string) {
    const colors = CATEGORY_COLORS[category] ?? {
      bg: 'bg-bg-light dark:bg-bg-dark',
      text: 'text-text-secondary-light dark:text-text-secondary-dark',
    };
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ${className ?? ''}`}
      >
        {CATEGORY_LABELS[category] ?? category}
      </span>
    );
  }

  function renderPagination() {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
    }

    return (
      <nav aria-label="Pagination" className="mt-16 flex items-center justify-center">
        <div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-text-secondary-light dark:text-text-secondary-dark ring-border-light dark:ring-border-dark hover:bg-bg-light dark:hover:bg-bg-dark relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 transition-colors ring-inset disabled:opacity-40"
          >
            <span className="sr-only">Предыдущая</span>
            <ChevronLeft size={20} />
          </button>

          {pages.map((p, i) =>
            p === '...' ? (
              <span
                key={`ellipsis-${i}`}
                className="text-text-primary-light dark:text-text-primary-dark ring-border-light dark:ring-border-dark relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors ${
                  currentPage === p
                    ? 'bg-primary focus-visible:outline-primary z-10 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                    : 'text-text-primary-light dark:text-text-primary-dark ring-border-light dark:ring-border-dark hover:bg-bg-light dark:hover:bg-bg-dark ring-1 ring-inset'
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-text-secondary-light dark:text-text-secondary-dark ring-border-light dark:ring-border-dark hover:bg-bg-light dark:hover:bg-bg-dark relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 transition-colors ring-inset disabled:opacity-40"
          >
            <span className="sr-only">Следующая</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </nav>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  JSX                                                               */
  /* ---------------------------------------------------------------- */

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          {/* -------- Category Filter Pills -------- */}
          <div className="mb-10 overflow-x-auto pb-2">
            <div className="flex gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex h-9 shrink-0 items-center justify-center rounded-full px-5 text-sm font-medium transition-all active:scale-95 ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                      : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:bg-bg-light dark:hover:bg-bg-dark border'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* -------- Featured Story -------- */}
          <section className="mb-16">
            <div className="group bg-surface-light dark:bg-surface-dark relative flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-900/5 lg:flex-row dark:ring-white/10">
              {/* Image (60%) */}
              <div className="relative h-64 w-full flex-shrink-0 overflow-hidden lg:h-auto lg:w-3/5">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Content (40%) */}
              <div className="flex flex-col justify-center p-8 lg:w-2/5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-primary dark:text-primary-light font-semibold">
                    {CATEGORY_LABELS[featured.category]}
                  </span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    &bull;
                  </span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    {new Date(featured.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-text-primary-light dark:text-text-primary-dark mt-4 text-2xl font-bold tracking-tight lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4 text-base leading-relaxed lg:text-lg">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-bg-light dark:bg-bg-dark flex h-8 w-8 items-center justify-center rounded-full">
                      <User
                        size={14}
                        className="text-text-secondary-light dark:text-text-secondary-dark"
                      />
                    </div>
                    <span className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium">
                      {featured.author}
                    </span>
                  </div>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">|</span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {featured.readTime} чтения
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* -------- Latest News Grid -------- */}
          <section>
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold">
                Последние новости
              </h3>
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="hidden sm:inline-flex"
              >
                Все статьи
              </Button>
            </div>

            {paged.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Статей в этой категории пока нет.
                </p>
              </div>
            ) : (
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {paged.map((article) => (
                  <article key={article.id} className="group flex cursor-pointer flex-col">
                    {/* Card Image */}
                    <div className="bg-bg-light dark:bg-bg-dark relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Meta */}
                    <div className="mt-4 flex items-center gap-3 text-xs font-medium">
                      {renderCategoryBadge(article.category)}
                      <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(article.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="group-hover:text-primary dark:group-hover:text-primary-light text-text-primary-light dark:text-text-primary-dark mt-3 text-lg leading-tight font-bold transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 line-clamp-2 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    <div className="mt-4 flex items-center gap-2">
                      <User
                        size={12}
                        className="text-text-secondary-light dark:text-text-secondary-dark"
                      />
                      <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                        {article.author}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* -------- Pagination -------- */}
          {totalPages > 1 && renderPagination()}
        </div>
      </main>
    </div>
  );
}
