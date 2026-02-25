import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research.conferences' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ConferencesPage() {
  const t = useTranslations('research.conferences');

  const conferences = ['baykonurov', 'keleshek', 'regional'];

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
          <div className="grid gap-6 md:grid-cols-3">
            {conferences.map((key) => (
              <Card key={key} padding="lg" hover>
                <Badge variant="default" className="mb-3 text-xs">
                  {t(`conf.${key}.type`)}
                </Badge>
                <h3 className="mb-2 text-lg font-bold">{t(`conf.${key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`conf.${key}.text`)}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} /> {t(`conf.${key}.date`)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} /> {t(`conf.${key}.location`)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/research/conferences/archive">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaArchive')}
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
