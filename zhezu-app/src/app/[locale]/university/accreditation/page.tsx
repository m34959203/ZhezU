import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, FileCheck, Globe, CheckCircle, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.accreditation' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function AccreditationPage() {
  const t = useTranslations('university.accreditation');

  const timeline = [
    { key: '2001', icon: <FileCheck size={20} /> },
    { key: '2006', icon: <ShieldCheck size={20} /> },
    { key: '2008', icon: <CheckCircle size={20} /> },
    { key: '2010', icon: <Globe size={20} /> },
    { key: '2016', icon: <Award size={20} /> },
    { key: '2019', icon: <Award size={20} /> },
  ];

  const standards = [
    { key: 'state', icon: <FileCheck size={24} /> },
    { key: 'iqaa', icon: <Award size={24} /> },
    { key: 'iso', icon: <ShieldCheck size={24} /> },
    { key: 'bologna', icon: <Globe size={24} /> },
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

      {/* Standards Cards */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">
            {t('standardsTitle')}
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('standardsSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {standards.map((s) => (
              <Card key={s.key} padding="lg" hover>
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <span className="text-primary dark:text-primary-light">{s.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {t(`standards.${s.key}.title`)}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`standards.${s.key}.status`)}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t(`standards.${s.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">
            {t('timelineTitle')}
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="relative space-y-8">
              {/* Vertical line */}
              <div className="border-border-light dark:border-border-dark absolute top-0 bottom-0 left-6 w-px border-l-2" />

              {timeline.map((item) => (
                <div key={item.key} className="relative flex items-start gap-6 pl-2">
                  <div className="bg-primary dark:bg-primary-light z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white dark:text-gray-900">
                    {item.icon}
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3">
                      <span className="bg-gold/10 text-gold rounded-full px-3 py-0.5 text-sm font-semibold">
                        {t(`timeline.${item.key}.year`)}
                      </span>
                    </div>
                    <h3 className="font-display mt-2 text-base font-semibold">
                      {t(`timeline.${item.key}.title`)}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                      {t(`timeline.${item.key}.text`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(['programs', 'years', 'employment', 'iso'] as const).map((key) => (
              <div
                key={key}
                className="border-border-light dark:border-border-dark rounded-xl border p-6 text-center"
              >
                <p className="text-primary dark:text-primary-light font-display text-3xl font-bold">
                  {t(`figures.${key}.value`)}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm">
                  {t(`figures.${key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/about">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAbout')}
              </Button>
            </Link>
            <Link href="/university/mission">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaMission')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
