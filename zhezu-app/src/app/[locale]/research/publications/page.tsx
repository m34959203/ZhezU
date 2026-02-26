import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research.publications' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function PublicationsPage() {
  const t = useTranslations('research.publications');

  const journals = ['vestnik', 'baykonurov', 'keleshek'];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4">{t('badge')}</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('journalsTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {journals.map((key) => (
              <Card key={key} padding="lg" hover>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <BookOpen size={24} className="text-primary" />
                </div>
                <h3 className="mb-2 font-bold">{t(`journals.${key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm">
                  {t(`journals.${key}.text`)}
                </p>
                <p className="text-primary text-xs font-semibold">{t(`journals.${key}.issn`)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-center text-2xl font-bold">{t('indexingTitle')}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['scopus', 'wos', 'rinc', 'kinc'].map((key) => (
              <Card key={key} padding="md" className="text-center">
                <p className="text-sm font-bold">{t(`indexing.${key}`)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/research/articles">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaArticles')}
              </Button>
            </Link>
            <Link href="/research">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaResearch')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
