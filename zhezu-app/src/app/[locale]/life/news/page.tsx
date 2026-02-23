'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NEWS_ARTICLES, NEWS_CATEGORIES } from '@/lib/news-data';
import { Calendar, ArrowRight, User } from 'lucide-react';
import type { Locale } from '@/types';

export default function NewsPage() {
  const t = useTranslations('news');
  const params = useParams();
  const locale = (params.locale || 'ru') as Locale;
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredNews =
    activeCategory === 'all'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((article) => article.category === activeCategory);

  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4">{t('badge')}</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 sticky top-16 z-30 border-b backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex gap-1 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                }`}
              >
                {t(cat.labelKey.replace('news.', ''))}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {sortedNews.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {t('noArticles')}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedNews.map((article) => (
                <Link key={article.id} href={`/life/news/${article.id}`}>
                  <Card
                    hover
                    glow
                    padding="none"
                    image={article.image}
                    imageAlt={article.title[locale]}
                    imageHeight="h-48"
                    className="h-full"
                  >
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="default" className="text-xs">
                          {t(`categories.${article.category}`)}
                        </Badge>
                      </div>
                      <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                        {article.title[locale]}
                      </h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2 text-sm">
                        {article.excerpt[locale]}
                      </p>
                      <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.date).toLocaleDateString(
                            locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-US' : 'ru-RU',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {article.author}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
