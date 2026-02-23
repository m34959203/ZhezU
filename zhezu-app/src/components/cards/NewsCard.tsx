import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NewsArticle } from '@/lib/news-data';
import type { Locale } from '@/types';
import Image from 'next/image';

interface NewsCardProps {
  article: NewsArticle;
  locale: Locale;
}

const CATEGORY_VARIANTS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'info'> = {
  university: 'primary',
  science: 'info',
  students: 'success',
  sport: 'warning',
  events: 'default',
};

const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  university: { kk: 'Университет', ru: 'Университет', en: 'University' },
  science: { kk: 'Ғылым', ru: 'Наука', en: 'Science' },
  students: { kk: 'Студенттер', ru: 'Студенты', en: 'Students' },
  sport: { kk: 'Спорт', ru: 'Спорт', en: 'Sport' },
  events: { kk: 'Оқиғалар', ru: 'События', en: 'Events' },
};

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  const localeMap: Record<Locale, string> = { kk: 'kk-KZ', ru: 'ru-RU', en: 'en-US' };
  return date.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function NewsCard({ article, locale }: NewsCardProps) {
  const variant = CATEGORY_VARIANTS[article.category] ?? 'default';
  const categoryLabel = CATEGORY_LABELS[article.category]?.[locale] ?? article.category;

  return (
    <Link href={`/life/news/${article.id}`} className="block group">
      <Card hover padding="none" className="h-full overflow-hidden">
        {/* Image area */}
        <div className="relative h-48 w-full overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title[locale]}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-gold" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={variant} className="shadow-sm backdrop-blur-sm">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-lg leading-snug text-text-primary-light dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
            {article.title[locale]}
          </h3>

          <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
            {article.excerpt[locale]}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-border-light dark:border-border-dark text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-primary/60 dark:text-primary-light/60 shrink-0" />
              {formatDate(article.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User size={13} className="text-primary/60 dark:text-primary-light/60 shrink-0" />
              {article.author}
            </span>
            <ArrowRight
              size={14}
              className={cn(
                'ml-auto text-text-secondary-light/40 dark:text-text-secondary-dark/40',
                'group-hover:text-primary dark:group-hover:text-primary-light',
                'group-hover:translate-x-1 transition-all duration-300'
              )}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
