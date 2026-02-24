import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  Trophy,
  Globe,
  TrendingUp,
  BarChart3,
  GraduationCap,
  Users,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.rankings' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function RankingsPage() {
  const t = useTranslations('university.rankings');

  const rankings = [
    { key: 'national', icon: <Trophy size={24} /> },
    { key: 'webometrics', icon: <Globe size={24} /> },
    { key: 'edurank', icon: <BarChart3 size={24} /> },
    { key: 'unirank', icon: <TrendingUp size={24} /> },
  ];

  const indicators = [
    { key: 'students', icon: <Users size={20} /> },
    { key: 'programs', icon: <GraduationCap size={20} /> },
    { key: 'employment', icon: <Briefcase size={20} /> },
    { key: 'experience', icon: <Trophy size={20} /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
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

      {/* Rankings Cards */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('rankingsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('rankingsSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {rankings.map((r) => (
              <Card key={r.key} padding="lg" hover>
                <div className="mb-5 flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <span className="text-primary dark:text-primary-light">{r.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{t(`rankings.${r.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`rankings.${r.key}.source`)}
                    </p>
                  </div>
                </div>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-primary dark:text-primary-light font-display text-3xl font-bold">
                    {t(`rankings.${r.key}.position`)}
                  </span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {t(`rankings.${r.key}.scope`)}
                  </span>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t(`rankings.${r.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Indicators */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">{t('indicatorsTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((ind) => (
              <div
                key={ind.key}
                className="border-border-light dark:border-border-dark rounded-xl border p-6 text-center"
              >
                <div className="bg-gold/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <span className="text-gold">{ind.icon}</span>
                </div>
                <p className="text-primary dark:text-primary-light font-display text-2xl font-bold">
                  {t(`indicators.${ind.key}.value`)}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                  {t(`indicators.${ind.key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Rankings */}
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

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/accreditation">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAccreditation')}
              </Button>
            </Link>
            <Link href="/university/about">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAbout')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
