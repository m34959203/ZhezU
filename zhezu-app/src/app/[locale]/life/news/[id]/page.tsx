import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getNewsById } from '@/lib/admin/public-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const article = await getNewsById(id);
  if (!article) return { title: 'Not Found' };
  const l = locale as Locale;
  return {
    title: article.title[l],
    description: article.excerpt[l],
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const article = await getNewsById(id);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'news' });
  const l = (locale || 'ru') as Locale;

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <section className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="from-bg-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/life/news"
            className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light mb-6 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            {t('backToNews')}
          </Link>

          <Badge className="mb-4">{t(`categories.${article.category}`)}</Badge>

          <h1 className="font-display mb-4 text-3xl font-bold sm:text-4xl">
            {article.title[l]}
          </h1>

          <div className="text-text-secondary-light dark:text-text-secondary-dark border-border-light dark:border-border-dark mb-8 flex items-center gap-4 border-b pb-8 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(article.createdAt).toLocaleDateString(
                l === 'kk' ? 'kk-KZ' : l === 'en' ? 'en-US' : 'ru-RU',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {article.author}
            </span>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
              {article.body[l]}
            </p>
          </div>

          {/* Share */}
          <div className="border-border-light dark:border-border-dark mt-12 border-t pt-8">
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
