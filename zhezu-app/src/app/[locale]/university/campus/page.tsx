import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Building2,
  BookOpen,
  FlaskConical,
  Dumbbell,
  Utensils,
  Wifi,
  MapPin,
  TreePine,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.campus' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function CampusPage() {
  const t = useTranslations('university.campus');

  const facilities = [
    { key: 'academic', icon: Building2, color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
    { key: 'library', icon: BookOpen, color: 'text-gold', bg: 'bg-gold/10' },
    { key: 'labs', icon: FlaskConical, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-600/10 dark:bg-purple-400/10' },
    { key: 'sports', icon: Dumbbell, color: 'text-success', bg: 'bg-success/10' },
    { key: 'dining', icon: Utensils, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-600/10 dark:bg-orange-400/10' },
    { key: 'digital', icon: Wifi, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-600/10 dark:bg-blue-400/10' },
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

      {/* About Campus */}
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

      {/* Location */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <MapPin size={20} className="text-primary dark:text-primary-light" />
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center">
              {t('location')}
            </p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('facilitiesTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('facilitiesSubtitle')}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <Card key={f.key} padding="lg" hover>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${f.bg}`}>
                  <f.icon size={24} className={f.color} />
                </div>
                <h3 className="font-display mb-2 text-lg font-semibold">{t(`facilities.${f.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t(`facilities.${f.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Green Campus */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-success/10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
              <TreePine size={28} className="text-success" />
            </div>
            <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">{t('greenTitle')}</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
              {t('greenText')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
