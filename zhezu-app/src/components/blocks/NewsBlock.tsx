'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Calendar } from 'lucide-react';
import type { Locale } from '@/types';
import type { NewsArticle, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';
import { formatDateShort, formatMonthShort } from '@/lib/format-date';

const FALLBACK_CATEGORY_LABELS: Record<string, string> = {
  news: 'Новости',
  announcement: 'Объявления',
  event: 'События',
  achievement: 'Достижения',
  university: 'Университет',
  science: 'Наука',
  students: 'Студенты',
  sport: 'Спорт',
  culture: 'Культура',
};

interface NewsBlockProps {
  newsItems: NewsArticle[];
  categoryLabels: Record<string, string>;
  maxItems?: number;
  size?: BlockSize;
}

export default function NewsBlock({ newsItems, categoryLabels, maxItems = 4, size = 'full' }: NewsBlockProps) {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const labels =
    categoryLabels && Object.keys(categoryLabels).length > 0
      ? categoryLabels
      : FALLBACK_CATEGORY_LABELS;

  const items = newsItems.slice(0, maxItems);
  const featured = items[0] ?? null;
  const sideNews = items.slice(1);

  return (
    <section className="bg-surface-light dark:bg-surface-dark py-20">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-10 text-center text-3xl font-bold md:text-4xl">
          {t('news.title')}
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featured && (
            <div className="group cursor-pointer lg:col-span-2">
              <div className="relative mb-4 h-[300px] overflow-hidden rounded-2xl md:h-[400px]">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featured.image})` }}
                />
                {(() => {
                  const d = new Date(featured.createdAt);
                  return (
                    <div className="dark:bg-surface-dark/90 absolute top-4 left-4 min-w-[60px] rounded-lg bg-white/90 px-4 py-2 text-center backdrop-blur">
                      <span className="text-text-primary-light dark:text-text-primary-dark block text-xl leading-none font-bold">
                        {d.getDate()}
                      </span>
                      <span className="text-text-secondary-light dark:text-text-secondary-dark block text-xs font-medium uppercase">
                        {formatMonthShort(d, locale)}
                      </span>
                    </div>
                  );
                })()}
              </div>
              <div className="pr-4">
                <div className="text-text-secondary-light dark:text-text-secondary-dark mb-2 flex items-center gap-3 text-sm">
                  <span className="text-gold font-semibold">
                    {labels[featured.category] ?? featured.category}
                  </span>
                </div>
                <h3 className="text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light mb-3 text-2xl font-bold transition-colors">
                  {featured.title[locale]}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                  {featured.excerpt[locale]}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {sideNews.map((item, i) => {
              const d = new Date(item.createdAt);
              return (
                <div
                  key={item.id}
                  className={`group flex cursor-pointer gap-4 ${i < sideNews.length - 1 ? 'border-border-light dark:border-border-dark border-b pb-6' : ''}`}
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  <div>
                    <span className="text-primary dark:text-primary-light mb-1 block text-xs font-bold">
                      {labels[item.category] ?? item.category}
                    </span>
                    <h4 className="text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light mb-1 text-lg leading-tight font-bold transition-colors">
                      {item.title[locale]}
                    </h4>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                      <Calendar size={10} />
                      {formatDateShort(d, locale)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/life/news">
            <Button variant="outline" size="md">
              {t('news.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
