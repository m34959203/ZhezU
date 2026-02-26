'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';
import type { NewsArticle } from '@/lib/admin/types';

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

type CategoryId =
  | 'all'
  | 'university'
  | 'science'
  | 'students'
  | 'sport'
  | 'culture'
  | 'event'
  | 'announcement'
  | 'news'
  | 'achievement';

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'university', label: 'Университет' },
  { id: 'science', label: 'Наука' },
  { id: 'students', label: 'Студенты' },
  { id: 'sport', label: 'Спорт' },
  { id: 'culture', label: 'Культура' },
  { id: 'event', label: 'События' },
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
  event: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  announcement: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
  },
  news: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  achievement: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300',
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  university: 'Университет',
  science: 'Наука',
  students: 'Студенты',
  sport: 'Спорт',
  culture: 'Культура',
  event: 'События',
  announcement: 'Объявления',
  news: 'Новости',
  achievement: 'Достижения',
};

const ITEMS_PER_PAGE = 6;
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NewsPage() {
  const locale = useLocale() as Locale;
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/public/news', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const dateFmt = locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-US' : 'ru-RU';
  const filtered =
    activeCategory === 'all' ? articles : articles.filter((a) => a.category === activeCategory);
  const featured = articles[0];
  const gridArticles = filtered.filter((a) => a.id !== featured?.id);
  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ITEMS_PER_PAGE));
  const paged = gridArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function handleCategoryChange(id: CategoryId) {
    setActiveCategory(id);
    setCurrentPage(1);
  }

  function renderCategoryBadge(category: string) {
    const colors = CATEGORY_COLORS[category] ?? {
      bg: 'bg-bg-light dark:bg-bg-dark',
      text: 'text-text-secondary-light dark:text-text-secondary-dark',
    };
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
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
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors ${currentPage === p ? 'bg-primary focus-visible:outline-primary z-10 text-white' : 'text-text-primary-light dark:text-text-primary-dark ring-border-light dark:ring-border-dark hover:bg-bg-light dark:hover:bg-bg-dark ring-1 ring-inset'}`}
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="mb-10 overflow-x-auto pb-2">
            <div className="flex gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex h-9 shrink-0 items-center justify-center rounded-full px-5 text-sm font-medium transition-all active:scale-95 ${activeCategory === cat.id ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900' : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:bg-bg-light dark:hover:bg-bg-dark border'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Story */}
          {featured && (
            <section className="mb-16">
              <Link href={`/life/news/${featured.id}`}>
                <div className="group bg-surface-light dark:bg-surface-dark relative flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-900/5 lg:flex-row dark:ring-white/10">
                  <div className="relative h-64 w-full flex-shrink-0 overflow-hidden lg:h-auto lg:w-3/5">
                    <Image
                      src={featured.image || FALLBACK_IMG}
                      alt={featured.title[locale]}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:w-2/5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-primary dark:text-primary-light font-semibold">
                        {CATEGORY_LABELS[featured.category] ?? featured.category}
                      </span>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        &bull;
                      </span>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(featured.createdAt).toLocaleDateString(dateFmt, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-text-primary-light dark:text-text-primary-dark mt-4 text-2xl font-bold tracking-tight lg:text-3xl">
                      {featured.title[locale]}
                    </h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4 text-base leading-relaxed lg:text-lg">
                      {featured.excerpt[locale]}
                    </p>
                    <div className="mt-8 flex items-center gap-2">
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
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Latest News Grid */}
          <section>
            <div className="mb-8">
              <h3 className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold">
                Последние новости
              </h3>
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
                  <Link key={article.id} href={`/life/news/${article.id}`}>
                    <article className="group flex cursor-pointer flex-col">
                      <div className="bg-bg-light dark:bg-bg-dark relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                        <Image
                          src={article.image || FALLBACK_IMG}
                          alt={article.title[locale]}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-xs font-medium">
                        {renderCategoryBadge(article.category)}
                        <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.createdAt).toLocaleDateString(dateFmt, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="group-hover:text-primary dark:group-hover:text-primary-light text-text-primary-light dark:text-text-primary-dark mt-3 text-lg leading-tight font-bold transition-colors">
                        {article.title[locale]}
                      </h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 line-clamp-2 text-sm leading-relaxed">
                        {article.excerpt[locale]}
                      </p>
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
                  </Link>
                ))}
              </div>
            )}
          </section>

          {totalPages > 1 && renderPagination()}
        </div>
      </main>
    </div>
  );
}
