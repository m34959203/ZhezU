import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { NEWS_ARTICLES } from '@/lib/news-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const article = NEWS_ARTICLES.find((a) => a.id === id);
  if (!article) return { title: 'Not Found' };
  const l = locale as Locale;
  return {
    title: article.title[l],
    description: article.excerpt[l],
  };
}

export default function NewsDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const article = NEWS_ARTICLES.find((a) => a.id === params.id);
  if (!article) notFound();

  const t = useTranslations('news');
  const locale = (params.locale || 'ru') as Locale;

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/life/news"
            className="inline-flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            {t('backToNews')}
          </Link>

          <Badge className="mb-4">{t(`categories.${article.category}`)}</Badge>

          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            {article.title[locale]}
          </h1>

          <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 pb-8 border-b border-border-light dark:border-border-dark">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(article.date).toLocaleDateString(
                locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-US' : 'ru-RU',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {article.author}
            </span>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-lg">
              {article.content[locale]}
            </p>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between">
              <Link href="/life/news">
                <Button variant="outline" icon={<ArrowLeft size={16} />}>
                  {t('backToNews')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
