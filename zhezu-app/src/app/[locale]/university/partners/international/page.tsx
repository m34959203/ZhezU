import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Globe, GraduationCap, Users, BookOpen, ArrowRight, Handshake } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.internationalPartners' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function InternationalPartnersPage() {
  const t = useTranslations('university.internationalPartners');

  const directions = [
    {
      key: 'exchange',
      icon: Users,
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    { key: 'research', icon: BookOpen, color: 'text-gold', bg: 'bg-gold/10' },
    { key: 'dual', icon: GraduationCap, color: 'text-success', bg: 'bg-success/10' },
    {
      key: 'grants',
      icon: Handshake,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-600/10 dark:bg-purple-400/10',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('badge')}</Badge>
            <h1 className="font-display mb-6 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">{t('aboutTitle')}</h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-4 leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">
            {t('directionsTitle')}
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('directionsSubtitle')}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((d) => (
              <Card key={d.key} padding="lg" hover>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${d.bg}`}
                >
                  <d.icon size={24} className={d.color} />
                </div>
                <h3 className="font-display mb-2 text-base font-semibold">
                  {t(`directions.${d.key}.title`)}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t(`directions.${d.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {(['countries', 'universities', 'programs'] as const).map((key) => (
              <div key={key} className="text-center">
                <div className="bg-primary/10 dark:bg-primary-light/10 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <Globe size={28} className="text-primary dark:text-primary-light" />
                </div>
                <p className="text-primary dark:text-primary-light font-display text-4xl font-bold">
                  {t(`stats.${key}.value`)}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                  {t(`stats.${key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/university/partners">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaBack')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
